"""
FastAPI Main Application
Job Aggregation Platform with AI-Powered Matching

Integrates:
- Firebase/Firestore database
- JWT authentication
- Personalized and general job scrapers
- LangChain + Gemini AI chatbot
- APScheduler for automated scraping
- Redis caching (optional)
"""
import os
import sys
import logging
from contextlib import asynccontextmanager

# Add parent directory to Python path for imports
#sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
#from slowapi import Limiter, _rate_limit_exceeded_handler
#from slowapi.util import get_remote_address
#from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv

# Import routers
from routers import auth, jobs, chat, user, opportunities, resumes
from starlette.middleware.base import BaseHTTPMiddleware

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Rate limiter
#limiter = Limiter(key_func=get_remote_address)

# Lifespan context manager for startup/shutdown events
#@asynccontextmanager
#async def lifespan(app: FastAPI):
#    """
 #   Application lifespan: startup and shutdown events
 #   """
    # Startup
 #   logger.info("Starting Gophora Job Aggregation Platform...")
    
  #  try:
   #     # Import and start scheduler
   #     from services.scheduler import scraper_scheduler
   #     scraper_scheduler.start()
   #     logger.info("Background scheduler started")
   #     
   # except ImportError as e:
   #     logger.error(f"Failed to import scheduler: {e}")
   # except Exception as e:
   #     logger.error(f"Startup error: {e}")
   # 
   # yield
   # 
   # # Shutdown
   # logger.info("Shutting down...")
   # 
   # try:
   #     # Re-import for shutdown
   #     from services.scheduler import scraper_scheduler
   #     scraper_scheduler.stop()
   #     logger.info("Background scheduler stopped")
   # except Exception as e:
   #     logger.warning(f"Error during scheduler shutdown: {e}")

class ForceHTTPSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request.scope["scheme"] = "https"
        return await call_next(request)

# Create FastAPI app
app = FastAPI(
    title="Gophora Job Aggregation API",
    description="AI-Powered Job Matching Platform with Personalized Recommendations",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
   # root_path="/api"
    
)

# Add rate limiter state
#app.state.limiter = limiter
#app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ==================== MIDDLEWARE ====================

# CORS - Allow all origins (configure for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gophora.com",
        "https://www.gophora.com",
        "https://gophora-ai.web.app",
        "http://localhost:5173",

        ],  # Change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"] 
)

app.add_middleware(ForceHTTPSMiddleware)
# Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests"""
    logger.info(f"{request.method} {request.url.path}")
    response = await call_next(request)
    return response

# ==================== ROUTERS ====================

# Include all routers
app.include_router(auth.router)
app.include_router(jobs.router)
app.include_router(chat.router)
app.include_router(user.router)
app.include_router(opportunities.router)  # Frontend-compatible opportunities endpoints
app.include_router(resumes.router)  # Resume management endpoints

# ==================== HEALTH CHECK ENDPOINTS ====================

@app.get("/", tags=["Health"])
async def root():
    """Root endpoint"""
    return {
        "message": "Gophora Job Aggregation API",
        "version": "2.0.0",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Simple health check endpoint
    """
    try:
        from database.firestore_client import firestore_client
        
        # Test Firestore connectivity
        try:
            # Simple Firestore test
            firestore_client.db
            db_status = "connected"
        except Exception as e:
            logger.warning(f"Database connection test failed: {e}")
            db_status = "disconnected"
        
        return {
            "status": "healthy",
            "api": "running",
            "database": db_status,
            "service": "gophora-backend"
        }
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "unhealthy",
                "error": str(e)
            }
        )

# ==================== ERROR HANDLERS ====================

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    """Handle 404 errors"""
    return JSONResponse(
        status_code=404,
        content={"detail": "Endpoint not found"}
    )

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# ==================== MANUAL SCRAPER TRIGGERS (ADMIN) ====================

@app.post("/admin/scrape/personalized", tags=["Admin"])
async def trigger_personalized_scraper():
    """
    Manually trigger personalized job scraper
    
    - Admin only (add authentication in production)
    - Runs scraper for all users
    """
    try:
        from services.scraper_personalized import personalized_scraper
        
        # Run scraper in background
        import asyncio
        asyncio.create_task(personalized_scraper.scrape_jobs_for_all_users())
        
        return {
            "message": "Personalized scraper started in background"
        }
        
    except Exception as e:
        logger.error(f"Manual scraper trigger failed: {e}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )

@app.post("/admin/scrape/general", tags=["Admin"])
async def trigger_general_scraper():
    """
    Manually trigger general job scraper
    
    - Admin only (add authentication in production)
    """
    try:
        from services.scraper_general import general_scraper
        
        # Run scraper in background
        import asyncio
        asyncio.create_task(general_scraper.scrape_all_general_jobs())
        
        return {
            "message": "General scraper started in background"
        }
        
    except Exception as e:
        logger.error(f"Manual scraper trigger failed: {e}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
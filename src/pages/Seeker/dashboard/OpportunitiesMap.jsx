import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import Globe from "react-globe.gl";
import axios from 'axios';
import api from '../../../services/api';

const COLOR_GENERAL = "#FF4F00";
const COLOR_PERSONALIZED = "#333333";

// Helper function to get location details from coordinates
const getLocationDetails = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
    );
    const data = await response.json();
    
    if (data && data.address) {
      const { address } = data;
      return {
        continent: getContinentFromCountry(address.country_code),
        country: address.country || 'Unknown',
        state: address.state || address.region || '',
        city: address.city || address.town || address.village || address.municipality || 'Unknown',
        countryCode: address.country_code ? address.country_code.toUpperCase() : ''
      };
    }
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
  
  return {
    continent: 'Unknown', country: 'Unknown', state: '', city: 'Unknown', countryCode: ''
  };
};

const getContinentFromCountry = (countryCode) => {
  if (!countryCode) return 'Unknown';
  const continentMap = {
    'us': 'North America', 'ca': 'North America', 'mx': 'North America',
    'gb': 'Europe', 'fr': 'Europe', 'de': 'Europe', 'it': 'Europe', 'es': 'Europe',
    'nl': 'Europe', 'se': 'Europe', 'no': 'Europe', 'fi': 'Europe', 'dk': 'Europe',
    'cn': 'Asia', 'jp': 'Asia', 'kr': 'Asia', 'in': 'Asia', 'sg': 'Asia',
    'au': 'Oceania', 'nz': 'Oceania',
    'br': 'South America', 'ar': 'South America', 'cl': 'South America',
    'za': 'Africa', 'ng': 'Africa', 'eg': 'Africa', 'ke': 'Africa'
  };
  return continentMap[countryCode.toLowerCase()] || 'Unknown';
};

const getRandomCoords = () => {
  const cities = [
    { lat: 40.7128, lng: -74.006, city: "New York", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 34.0522, lng: -118.2437, city: "Los Angeles", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 37.7749, lng: -122.4194, city: "San Francisco", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 41.8781, lng: -87.6298, city: "Chicago", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 29.7604, lng: -95.3698, city: "Houston", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 25.7617, lng: -80.1918, city: "Miami", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 47.6062, lng: -122.3321, city: "Seattle", country: "USA", countryCode: "us", continent: "North America" },
    { lat: 42.3601, lng: -71.0589, city: "Boston", country: "USA", countryCode: "us", continent: "North America" },
  ];
  return cities[Math.floor(Math.random() * cities.length)];
};

export default function OpportunitiesMap() {
  const globeEl = useRef();
  const containerRef = useRef(); 
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [personalizedJobs, setPersonalizedJobs] = useState([]);
  const [generalJobs, setGeneralJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState({ features: [] });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [globeReady, setGlobeReady] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 500 
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchJobs();
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    if (globeEl.current && globeReady) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      
      if (!loading) {
        globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
      }
    }
  }, [loading, dimensions, globeReady]);

  useEffect(() => {
    if (globeEl.current && globeReady) {
      globeEl.current.controls().autoRotate = isRotating;
    }
  }, [isRotating, globeReady]);

  useEffect(() => {
    const fetchLoc = async () => {
      if (selectedLocation && !locationDetails) {
        const details = await getLocationDetails(selectedLocation.lat, selectedLocation.lng);
        setLocationDetails(details);
      }
    };
    fetchLoc();
  }, [selectedLocation]);

  const fetchJobs = async () => {
    try {
      let personalizedData = [];
      let generalData = [];
      try {
        const res = await api.get('/jobs/personalized?limit=20');
        personalizedData = res.data.jobs || [];
      } catch (err) { console.log('Auth check skipped'); }
      try {
        const res = await axios.get('/jobs/general?limit=50');
        generalData = res.data.jobs || [];
      } catch (err) { console.error(err); }

      const personalizedWithCoords = personalizedData.map(job => {
        const randomCoords = getRandomCoords();
        return {
          ...job, coords: randomCoords, type: 'personalized', color: COLOR_PERSONALIZED, locationDetails: randomCoords 
        }
      });
      const generalWithCoords = generalData.map(job => {
        const randomCoords = getRandomCoords();
        return {
          ...job, coords: randomCoords, type: 'general', color: COLOR_GENERAL, locationDetails: randomCoords 
        }
      });

      setPersonalizedJobs(personalizedWithCoords);
      setGeneralJobs(generalWithCoords);
      setLoading(false);
    } catch (err) { setLoading(false); }
  };

  const allJobs = useMemo(() => [...personalizedJobs, ...generalJobs], [personalizedJobs, generalJobs]);
  const categories = ["All", ...new Set(allJobs.map(j => j.category).filter(Boolean))];
  const filteredJobs = filter === "All" ? allJobs : allJobs.filter((j) => j.category === filter);

  return (
    <div className="p-4 md:p-6 space-y-6 bg-white min-h-screen text-black flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block px-3 py-1 mb-2 border rounded-full text-[10px] uppercase tracking-[0.4em] border-[#FF4F00]/30 text-[#FF4F00]">
          Global Activation
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Mission <span className="text-[#FF4F00]">Horizons</span>
        </h1>
        <p className="text-sm max-w-md mx-auto text-gray-600">
          Real-time career opportunities across the globe. Select a region or hover over coordinates to explore active missions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* Map Container */}
        <div 
          ref={containerRef} 
          className="relative flex-1 w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg border overflow-hidden shadow-lg border-gray-200 bg-white"
        >
          {/* Loading overlay */}
          {(!dimensions.width || !globeReady) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white">
              <div className="relative">
                {/* Animated globe preview */}
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#FF4F00]/30 animate-spin">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full animate-pulse bg-[#FF4F00]/10"></div>
                  </div>
                </div>
                
                {/* Loading text */}
                <div className="mt-8 text-center space-y-2">
                  <h3 className="text-lg font-bold text-black">INITIALIZING GLOBAL RADAR</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#FF4F00]" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#333333]" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#FF4F00]" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 max-w-sm">
                    Scanning global opportunities...
                    <br />
                    <span className="text-[10px] opacity-50">Loading: {loading ? 'Fetching data...' : 'Rendering globe...'}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {dimensions.width > 0 && (
            <Globe
              ref={globeEl}
              width={dimensions.width}
              height={dimensions.height}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              
              onGlobeReady={() => {
                setTimeout(() => {
                  setGlobeReady(true);
                }, 500);
              }}
              
              polygonsData={countries.features}
              polygonCapColor={d => d === hoveredCountry ? 'rgba(255, 79, 0, 0.3)' : 'rgba(51, 51, 51, 0.1)'}
              polygonSideColor={() => 'rgba(255, 255, 255, 0.05)'}
              polygonStrokeColor={() => '#444'}
              polygonLabel={({ properties: d }) => `
                <div class="bg-white/95 p-2 rounded border border-gray-300 text-xs text-gray-900">
                  ${d.ADMIN}
                </div>
              `}
              
              onPolygonHover={(polygon) => {
                setHoveredCountry(polygon);
                setIsRotating(!polygon);
              }}
              
              onPointHover={(point) => {
                setIsRotating(!point);
                if (point) {
                  setSelectedLocation(point.coords);
                  setLocationDetails(point.locationDetails);
                }
              }}

              onPolygonClick={(polygon) => {
                if (polygon && polygon.properties) {
                  setSelectedLocation({
                    lat: polygon.properties.LAT || 0,
                    lng: polygon.properties.LON || 0
                  });
                  setLocationDetails({
                    continent: polygon.properties.CONTINENT || 'Unknown',
                    country: polygon.properties.ADMIN || 'Unknown',
                    countryCode: polygon.properties.ISO_A2 || '',
                    city: 'Regional Hub',
                    state: polygon.properties.NAME || ''
                  });
                }
              }}
              
              pointsData={filteredJobs}
              pointLat={d => d.coords.lat}
              pointLng={d => d.coords.lng}
              pointColor={d => d.color}
              pointAltitude={0.06}
              pointRadius={0.6}
              pointLabel={d => `
                <div class="bg-white/95 p-3 rounded-lg border border-[#FF4F00]/50 shadow-lg text-gray-900">
                  <b class="text-[#FF4F00]">${d.title || 'Mission Opportunity'}</b><br/>
                  <span class="text-gray-600 text-[10px]">${d.company || 'Classified'}</span>
                </div>
              `}
              
              onPointClick={(job) => {
                setSelectedLocation(job.coords);
                setLocationDetails(job.locationDetails);
                if (job.sourceLink) window.open(job.sourceLink, '_blank');
              }}
            />
          )}
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col shrink-0">
          <div className="rounded-lg p-5 h-full flex flex-col bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse"></div>
              <h2 className="text-lg font-bold text-black">MISSION INTEL</h2>
            </div>
            
            {selectedLocation && locationDetails ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg border bg-gray-50 border-gray-200">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Coordinates</p>
                  <p className="font-mono text-xs text-black">
                    {selectedLocation.lat.toFixed(4)}N, {selectedLocation.lng.toFixed(4)}E
                  </p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "Continent", value: locationDetails.continent },
                    { label: "Country", value: locationDetails.country },
                    { label: "Sector", value: locationDetails.city }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2 border-gray-200">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-black">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { setSelectedLocation(null); setLocationDetails(null); }}
                  className="w-full mt-4 py-2 text-xs rounded-lg transition-all border bg-gray-50 hover:bg-gray-100 border-gray-200 text-black"
                >
                  Reset Scanner
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-12 h-12 border-2 border-dashed rounded-full flex items-center justify-center mb-4 border-[#FF4F00]/30">
                  <span className="text-xl">🛰️</span>
                </div>
                <p className="text-xs text-gray-500">
                  Standby for input...<br/>Select a target on the globe
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
              filter === cat 
                ? "bg-[#FF4F00] border-[#FF4F00] text-white shadow-lg" 
                : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <style jsx>{`
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
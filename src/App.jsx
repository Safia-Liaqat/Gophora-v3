import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';
import './index.css';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import SeekerDashboard from './pages/Seeker/Dashboard';
import ProviderDashboard from './pages/Provider/Dashboard';
import ProviderLayout from './layouts/ProviderLayout';
import LandingPage from './pages/Landing/LandingPage';
import Opportunities from './pages/Provider/Opportunities';
import CreateOpportunity from './pages/Provider/CreateOpportunity';
import Profile from './pages/Provider/Profile';
import SeekerOpportunities from './pages/Seeker/Opportunities';
import Applications from './pages/Seeker/Applications';
import PageNotFound from './pages/PageNotFound';
import VerificationForm from './components/forms/VerificationForm';
import AboutUs from './pages/Landing/About';
import ExploreMissions from './pages/Landing/ExploreMissions';
import MainLayout from './layouts/PublicLayout';
import OpportunityDetails from './pages/Seeker/OpportunityDetails';
import CreateProfile from "./components/forms/createProfile"
import OnboardingFlow from './pages/Seeker/OnboardingFlow';
import JobDetail from './pages/Seeker/JobDetail';
import ResumeBuilder from './components/forms/ResumeBuilder';

import Dashboard from './pages/Seeker/dashboard/Dashboard';
import Wallet from "./pages/Seeker/dashboard/wallet/Wallet";
import DashboardLayout from "./layouts/Dashboard"
import Missions from "./pages/Seeker/dashboard/Mission";
import AIAssistant from "./pages/Seeker/dashboard/AiAssistant";
import SeekerProfile from "./pages/Seeker/dashboard/Profile";
import QuickJobs from "./pages/Seeker/dashboard/QuickJobs";
import OpportunitiesMap from "./pages/Seeker/dashboard/OpportunitiesMap";
import BookHistory from "./pages/Seeker/dashboard/BookHistory";
import Onboarding from "./pages/Seeker/dashboard/Onboarding";
import ShowResume from './pages/Seeker/dashboard/ShowReume';
import ForOrganizations from './components/ForOrganization';
import FAQ from './components/common/Footer/FAQ';

/* admin panel imports 

import AdminLayout from './components/admin/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/Users'
import AdminOpportunities from './pages/admin/AdminOpportunities';
import AdminMissions from './pages/admin/AdminMissions';
import AdminPayments from './pages/admin/Payments';
import AdminDisputes from './pages/admin/Disputes';
import AdminSettings from './pages/admin/Settings';
import ImmediateMissions from './pages/admin/ImmediateMissions';
*/

import AdminDashboard from './components/admin/pages/Dashboard'
import AdminLayout from './components/admin/layout/AdminLayout'
import OpportunitiesList from './components/admin/pages/opportunities/OpportunitiesList'
import ExplorersList from './components/admin/pages/explorers/ExplorersList'
import MissionsList from './components/admin/pages/missions/MissionsList'
import PlatformSettings from './components/admin/pages/settings/PlatformSettings'
import ApplicationsList from './components/admin/pages/applications/ApplicationsList';


/* Footer Imports */
import TermsOfService from './components/common/Footer/TermsOfService';
import PrivacyPolicy from './components/common/Footer/PrivacyPolicy';
import CookiePolicy from './components/common/Footer/CookiePolicy';
import LegalNotices from './components/common/Footer/LegalNotices';
import HelpCenter from './components/common/Footer/HelpCenter';
import ProvidersPage from './pages/admin/provider/ProvidersPage';
import ReviewPage from './pages/admin/provider/ReviewPage';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path="/explore-missions" element={<ExploreMissions />} />
        <Route path='/organizations' element={<ForOrganizations/>}/>
        <Route path='/faq' element={<FAQ/>}/>

        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/legal-notices" element={<LegalNotices />} />
        <Route path="/help-center" element={<HelpCenter />} />
        

        {/* Admin Routes */}
         <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path="/admin/opportunities" element={<OpportunitiesList />} />
          <Route path="/admin/opportunities/:opportunityId/applications" element={<ApplicationsRouteWrapper />} />
          <Route path="/admin/explorers" element={<ExplorersList />} />
          <Route path="admin/missions" element={<MissionsList />} />
        <Route path='/admin/provider' element={<ProvidersPage/>} />
        <Route path="/admin/providers/review" element={<ReviewPage/>} />
          <Route path="/admin/settings" element={<PlatformSettings />} />
        </Route>

        {/* Provider Routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="provider">
              <ProviderLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/verify" element={<VerificationForm />} />
          <Route path="/provider/opportunities" element={<Opportunities />} />
          <Route path="/provider/create-opportunity" element={<CreateOpportunity />} />
          <Route path="/provider/profile" element={<Profile />} />
        </Route>

        {/* Seeker Dashboard Routes (With Sidebar/DashboardLayout) */}
        <Route
          element={
            <ProtectedRoute allowedRole="seeker">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="seeker/dashboard" element={<Dashboard />} />
          <Route path="seeker/dashboard/resume" element={<ResumeBuilder />} />
          <Route path="seeker/dashboard/wallet" element={<Wallet />} />
          <Route path="seeker/dashboard/missions" element={<Missions />} />
          <Route path="seeker/dashboard/assistant" element={<AIAssistant />} />
          <Route path="seeker/dashboard/profile" element={<SeekerProfile />} />
          <Route path="seeker/dashboard/jobs" element={<QuickJobs />} />
          <Route path="seeker/dashboard/opportunities-map" element={<OpportunitiesMap />} />
          <Route path="dashboard/job/:id" element={<JobDetail />} />
          <Route path="seeker/dashboard/book-history" element={<BookHistory />} />
          <Route path="/seeker/opportunities" element={<SeekerOpportunities />} />
          <Route path="/seeker/applications" element={<Applications />} />
          <Route path="/resume-builder/:id" element={<ResumeBuilder />} />
          <Route path="/resumes/:id" element={<ShowResume />} />
        </Route>

        {/* Seeker Onboarding Route (Standalone - Moved outside of DashboardLayout) */}
        <Route
          path="/seeker/onboarding"
          element={
            <ProtectedRoute allowedRole="seeker">
              <OnboardingFlow />
            </ProtectedRoute>
          }
        />

        {/* Other routes */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
import { useParams } from 'react-router-dom'
function ApplicationsRouteWrapper() {
  const { opportunityId } = useParams()
  return <ApplicationsList opportunityId={Number(opportunityId)} />
}

export default App;


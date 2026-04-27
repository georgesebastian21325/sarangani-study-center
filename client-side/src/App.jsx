import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import ContactUsPage from './pages/ContactUsPage';

import AdminDashboard from './components/admin/AdminDashboard';
import ResidentDashboard from './components/resident/ResidentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/events-page" element={<EventsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/resident-dashboard" element={<ResidentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

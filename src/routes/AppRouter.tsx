import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { ServicesPage } from '../pages/ServicesPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<Navigate to="/#faq-preview" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

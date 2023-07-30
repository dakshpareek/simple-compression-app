import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CompressSection from './components/CompressSection';
import FAQSection from './components/FAQSection';
import Sitemap from './components/Sitemap';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <HeroBanner />
        <Routes>
          <Route path="/" element={<CompressSection />} />
          <Route path="/faq" element={<FAQSection />} />
          {/* Add the sitemap route */}
          <Route path="/sitemap.xml" element={<Sitemap />} />
        </Routes>
        {/* Include the FAQSection component on the main page */}
        <FAQSection />
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CompressSection from './components/CompressSection';
import FAQSection from './components/FAQSection';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Sitemap from './components/Sitemap';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <HeroBanner />
        <Routes>
          <Route path="/" element={
            <>
              <CompressSection />
              <FAQSection />  {/* Render FAQSection on the main page */}
            </>
          } />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

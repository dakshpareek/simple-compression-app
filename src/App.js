import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CompressSection from './components/CompressSection';
import FAQSection from './components/FAQSection';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Sitemap from './components/Sitemap';

const App = () => {
  return (
    <HashRouter basename='/'>
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
    </HashRouter>
  );
};

export default App;

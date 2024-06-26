/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogDetail from './components/BlogDetail';
import BlogList from './components/BlogList';
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
          <Route path="/blog" element={<BlogList />} />  {/* Blog list route */}
          <Route path="/blog/:slug" element={<BlogDetail />} />  {/* Blog detail route */}
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

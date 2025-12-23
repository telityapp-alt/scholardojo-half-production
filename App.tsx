
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { NavigationContainer } from './components/navigation/NavigationContainer';
import { DomainType } from './core/contracts/entityMap';
import { LandingPage } from './features/landing/LandingPage';

const DomainRedirect = () => {
    const { domain } = useParams();
    if (domain === DomainType.DOCS) {
        return <Navigate to={`/${domain}/workspace/library`} replace />;
    }
    return <Navigate to={`/${domain}/workspace/home`} replace />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        
        {/* Domain level redirect */}
        <Route path="/:domain" element={<DomainRedirect />} />
        
        <Route path="/:domain/:parent" element={<NavigationContainer />} />
        <Route path="/:domain/:parent/:tab" element={<NavigationContainer />} />
        <Route path="/:domain/:parent/:tab/:detailId" element={<NavigationContainer />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

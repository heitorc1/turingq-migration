import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';
import { AuthStore, KeycloakAuthStore } from './contexts/AuthContext';

import keycloakClient from './auth';

const App: React.FC = () => {
  const useAuthServer = process.env.REACT_APP_USE_AUTH_SERVER === 'true';

  if (useAuthServer) {
    return (
      <ReactKeycloakProvider authClient={keycloakClient}>
        <BrowserRouter>
          <KeycloakAuthStore>
            <Navbar />
            <AppRouter />
          </KeycloakAuthStore>
        </BrowserRouter>
      </ReactKeycloakProvider>
    );
  }
  return (
    <BrowserRouter>
      <AuthStore>
        <Navbar />
        <AppRouter />
      </AuthStore>
    </BrowserRouter>
  );
};

export default App;

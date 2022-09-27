/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Context = React.createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

interface AuthStoreProps {
  children: React.ReactNode;
}

export const KeycloakAuthStore: React.FC<AuthStoreProps> = ({
  children,
}: AuthStoreProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { keycloak } = useKeycloak();

  if (!loggedIn && keycloak.authenticated) {
    setLoggedIn(true);
  }

  return (
    <Context.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export default Context;

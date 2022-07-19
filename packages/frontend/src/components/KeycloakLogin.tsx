import React, { useContext } from 'react';
import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';
import { Redirect } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    marginTop: theme.spacing(2, 'auto'),
  },
}));

const KeycloakLogin: React.FC = () => {
  const classes = useStyles();
  const { keycloak, initialized } = useKeycloak();
  const authContext = useContext(AuthContext);

  if (keycloak.authenticated) {
    authContext.setLoggedIn(true);
    return <Redirect to="/" />;
  }

  if (initialized) {
    keycloak.login();
  }

  return <CircularProgress className={classes.progress} />;
};

export default KeycloakLogin;

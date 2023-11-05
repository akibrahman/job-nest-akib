import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import propTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReloader, setAuthReloader] = useState(true);
  const [privateRouteLoader, setPrivateRouteLoader] = useState(true);
  //! Getting Auth
  const auth = getAuth(app);
  //! For Registration
  const registration = (email, password) => {
    setPrivateRouteLoader(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //! For Login
  const login = (email, password) => {
    setPrivateRouteLoader(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! For Logout
  const logout = () => {
    setPrivateRouteLoader(false);
    return signOut(auth);
  };
  //! State Listener
  useEffect(() => {
    const un = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
        setPrivateRouteLoader(false);
      } else {
        setUser(null);
      }
    });
    return () => un();
  }, [auth, authReloader]);

  const contextInfo = {
    auth,
    authReloader,
    setAuthReloader,
    registration,
    login,
    logout,
    user,
    privateRouteLoader,
  };
  return (
    <AuthContext.Provider value={contextInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default AuthProvider;

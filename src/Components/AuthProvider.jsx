import axios from "axios";
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
      const userEmail = currentUser?.email || user?.email;
      if (currentUser) {
        // console.log(currentUser);
        axios
          .post(
            "http://localhost:5500/create-jwt",
            {
              email: userEmail,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log("Token Created");
          })
          .catch();
        setUser(currentUser);
        setPrivateRouteLoader(false);
      } else {
        axios
          .post(
            "http://localhost:5500/remove-jwt",
            {
              email: userEmail,
            },
            { withCredentials: true }
          )
          .then(() => {
            console.log("Token Removed");
          })
          .catch();
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
    setPrivateRouteLoader,
  };
  return (
    <AuthContext.Provider value={contextInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default AuthProvider;

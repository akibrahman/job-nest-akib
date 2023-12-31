import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  const googleProvider = new GoogleAuthProvider();
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
  //! For Google Login
  const googleLogin = () => {
    setPrivateRouteLoader(false);
    return signInWithPopup(auth, googleProvider);
  };
  //! For Logout
  const logout = () => {
    setPrivateRouteLoader(false);
    return signOut(auth);
  };
  //! State Listener
  useEffect(() => {
    const un = onAuthStateChanged(auth, async (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      if (currentUser) {
        console.log(currentUser);
        axios
          .post(
            `${import.meta.env.VITE_serverUrl}/create-jwt`,
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
        const userData = {
          name: currentUser.displayName,
          email: currentUser.email,
          role: "general",
          requested: false,
        };
        await axios.put(
          `${import.meta.env.VITE_serverUrl}/all-users/${currentUser.email}`,
          userData
        );
        setPrivateRouteLoader(false);
      } else {
        axios
          .post(
            `${import.meta.env.VITE_serverUrl}/remove-jwt`,
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
        setPrivateRouteLoader(false);
      }
    });
    return () => un();
  }, [auth, authReloader, user?.email]);

  const contextInfo = {
    auth,
    authReloader,
    setAuthReloader,
    registration,
    login,
    googleLogin,
    logout,
    user,
    setUser,
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

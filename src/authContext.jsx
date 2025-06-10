import { useState, createContext, useEffect, useContext } from "react";

// This is value which is available throughout the application
const AuthContext = createContext();

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setCurrentUser(userID);
    }
  }, []);

  // this provide in login
  const value = {
    currentUser,
    setCurrentUser,
  };

  // Now we can use value where we want
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

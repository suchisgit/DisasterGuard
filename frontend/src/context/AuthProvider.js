// AuthProvider.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [guserID, setguserID] = useState('');
  const [role, setrole] = useState('');
  const [guserName, setguserName] = useState('');
  const [guserEmail, setguserEmail] = useState('');
  const [guserPassword, setguserPassword] = useState('');
  const [guserPhonenumber, setguserPhonenumber] = useState('');

  return (
    <AuthContext.Provider value={{ guserID, setguserID, role, setrole, guserEmail, setguserEmail, guserName, 
    setguserName, guserPassword, setguserPassword, guserPhonenumber, setguserPhonenumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

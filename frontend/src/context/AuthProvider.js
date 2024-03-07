// AuthProvider.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [guserID, setguserID] = useState('');
  const [guserRole, setguserRole] = useState('');
  const [guserEmail, setguserEmail] = useState('');
  const [guserName, setguserName] = useState('');

  return (
    <AuthContext.Provider value={{ guserID, setguserID, guserRole, setguserRole, guserEmail, setguserEmail, guserName, setguserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

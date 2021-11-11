import React from 'react';
import Navigation from './app/navigations/Navigation';
import { AuthProvider } from './app/utils/Context/AuthContext';

export default function App() {  
  
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
}

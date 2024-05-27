import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { ContentProvider } from '../msteam/GrammarContext';

const Providers = () => {
  return (
    <AuthProvider>
      <ContentProvider>
      <Routes />
      </ContentProvider>
    </AuthProvider>
  );
}

export default Providers;
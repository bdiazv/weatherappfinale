import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
};

export default Layout;
// src/components/Layout.jsx
const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-screen-xl mx-auto">
        {children}
      </div>
    );
  };
  
  export default Layout;
  
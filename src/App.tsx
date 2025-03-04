import React from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

const App: React.FC = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Home />
      </div>
    </div>
  );
};

export default App;

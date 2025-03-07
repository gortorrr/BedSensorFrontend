import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import BedConfig from "../pages/BedConfig.tsx";

const AppRouter: React.FC = () => {
  return (
    <div className="overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bed-config/:bed_id" element={<BedConfig />} />
      </Routes>
    </div>
  );
};

export default AppRouter;

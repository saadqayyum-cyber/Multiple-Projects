import React from "react";
import { Route, Routes } from "react-router-dom";
import Mint from "./Pages/Mint";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Mint />} />
      </Routes>
    </>
  );
}

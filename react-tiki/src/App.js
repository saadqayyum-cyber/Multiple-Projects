import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import WOW from "wowjs";
import Header from "./Base/Header";
import Index from "./Pages/Index";
import Opps from "./Pages/Opps";
import Story from "./Pages/Story/Story";
import Tiki from "./Pages/Tiki/Tiki";

export default function App() {
  const [headerClass, setHeaderClass] = useState("");
  const [connected, setConnected] = useState(false);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    new WOW.WOW({
      boxClass: "wow", // default
      animateClass: "animated", // default
      offset: 0, // default
      mobile: true, // default
      live: true, // default
    }).init();
  }, [location]);
  return (
    <>
      <Header addClass={headerClass} connected={connected} />
      <Routes>
        <Route path="*" element={<Index />} />
        <Route
          path="/opps"
          element={
            <Opps setHeaderClass={setHeaderClass} setConnected={setConnected} />
          }
        />
        <Route path="/collection" element={<Tiki />} />
        <Route path="/story/:id/*" element={<Story />} />
      </Routes>
    </>
  );
}

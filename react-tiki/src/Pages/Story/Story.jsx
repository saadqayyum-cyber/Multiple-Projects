import React from "react";
import { Route, Routes } from "react-router-dom";
import StoryNew from "./StoryNew";
import Success from "./Success";

export default function Story() {
  return (
    <>
      <div className="bg"></div>
      <section className="story wrapper">
        <div className="auto__container">
          <Routes>
            <Route path="" index exact element={<StoryNew />} />
            <Route path="success" element={<Success />} />
          </Routes>
        </div>
      </section>
    </>
  );
}

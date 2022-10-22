import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <div className="App">
      <div className="components">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;

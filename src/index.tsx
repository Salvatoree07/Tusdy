import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@excalidraw/excalidraw/index.css";

import type * as TExcalidraw from "@excalidraw/excalidraw";

import App from "./ExampleApp";

declare global {
  interface Window {
    ExcalidrawLib: typeof TExcalidraw;
  }
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
const { Excalidraw } = window.ExcalidrawLib;
root.render(
  <StrictMode>
    <App
      appTitle={"Excalidraw Example"}
      useCustom={{type:false, body:"", style:"formale", palette:"bianconero"}}
      excalidrawLib={window.ExcalidrawLib}
    >
      <Excalidraw />
    </App>
  </StrictMode>,
);

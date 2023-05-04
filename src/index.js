import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Concentration from "./Concentration";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
console.clear();

root.render(
  <StrictMode>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&family=Pacifico&display=swap"
      rel="stylesheet"
    />
    <Concentration />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "../app";
import { REACT_APP_ID } from "../../constants/config";

import { runHealthCheckMessaging } from "./healthcheck";

const createReactContainer = () => {
  const container = document.createElement("div");

  container.id = REACT_APP_ID;
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.zIndex = "2000";
  container.style.height = "300px";
  container.style.width = "200px";
  container.style.backgroundColor = "lightblue";

  document.body.appendChild(container);
};

const launchReactApp = () => {
  const appContainer = document.getElementById(REACT_APP_ID);

  if (appContainer) {
    const root = createRoot(appContainer);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

export const initializeAppOnce = () => {
  const appContainer = document.getElementById(REACT_APP_ID);

  if (appContainer) return;

  createReactContainer();
  launchReactApp();
  runHealthCheckMessaging();
};

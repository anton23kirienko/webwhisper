const applicationId = "rooms-web-extension-id";

const createReactContainer = () => {
  const container = document.createElement("div");

  container.id = applicationId;
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
  const appContainer = document.getElementById(applicationId);
  console.log("Initializing react: ", { appContainer });
};

export const initializeAppOnce = () => {
  const appContainer = document.getElementById(applicationId);

  if (appContainer) return;

  createReactContainer();
  launchReactApp();
};

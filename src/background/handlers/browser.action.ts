import browser, { Tabs } from "webextension-polyfill";

import { ALLOWED_PROTOCOLS } from "../../constants/config";

export const onBrowserActionClicked = (tab: Tabs.Tab) => {
  if (!tab.id || !tab.url) {
    console.error("Browser tab requires to have id and url.");
    return;
  }
  if (!ALLOWED_PROTOCOLS.some((prot) => tab.url?.startsWith(prot))) {
    console.log(
      "Forbidden protocol is being used, supported protocols: ",
      ALLOWED_PROTOCOLS
    );
  }

  browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
};

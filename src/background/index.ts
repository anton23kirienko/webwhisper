import browser from "webextension-polyfill";

import { onBrowserActionClicked } from "./handlers/browser.action";
import {
  onHealthCheckMessage,
  onSendRequestMessage,
} from "./handlers/runtime.message";

console.log("Bg script executed");

// Top level of bg scripts, all listeners should be added here

browser.action.onClicked.addListener(onBrowserActionClicked);
browser.runtime.onMessage.addListener(onHealthCheckMessage);
browser.runtime.onMessage.addListener(onSendRequestMessage);

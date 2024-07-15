import browser from "webextension-polyfill";

console.log("Bg script executed");

import { onBrowserActionClicked } from "./handlers/browser.action";

browser.action.onClicked.addListener(onBrowserActionClicked);

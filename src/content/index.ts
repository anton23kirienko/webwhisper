import browser from "webextension-polyfill";

import { initializeAppOnce } from "./utils/initialize";

initializeAppOnce();

console.log("Content script executed");

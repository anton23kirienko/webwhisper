import browser from "webextension-polyfill";

import { PLACEHOLDER_BASE_URL } from "../constants/hosts";

import { sendRequest } from "./utils/request";

console.log("Content script executed");

sendRequest({ method: "get", url: `${PLACEHOLDER_BASE_URL}/todos/1` })
  .then((response) => {
    console.log("DEBUGGER[CONTENT_SCRIPT]", response);
  })
  .catch((error) => {
    console.error("DEBUGGER[CONTENT_SCRIPT]:", error);
  });

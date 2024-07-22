import { useEffect } from "react";
import browser from "webextension-polyfill";

import { sendPageRequest } from "../utils/request";
import { PLACEHOLDER_BASE_URL } from "../../constants/api";

export const App = () => {
  const handleMessage = async (message: any) => {
    console.log("Received message is effect: ", { message });
  };
  useEffect(() => {
    browser.runtime.onMessage.addListener(handleMessage);

    console.log("Useeffect request launched");

    sendPageRequest({
      method: "get",
      url: `${PLACEHOLDER_BASE_URL}/todos/1`,
    }).then((response) => {
      console.log("DEBUGGER[CONTENT_SCRIPT]", response);
    });

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  return null;
};

import browser from "webextension-polyfill";

import {
  MessageType,
  BackgroundRequestMessage,
  BackgroundResponse,
} from "../../types";

export const sendPageRequest = async (
  payload: BackgroundRequestMessage["payload"]
): Promise<BackgroundResponse> => {
  const response: BackgroundResponse = await browser.runtime.sendMessage({
    type: MessageType.MakeRequest,
    payload,
  });

  return response;
};

// How to use:
// sendRequest({ method: "get", url: `${PLACEHOLDER_BASE_URL}/todos/1` })
//   .then((response) => {
//     console.log("DEBUGGER[CONTENT_SCRIPT]", response);
//   })
//   .catch((error) => {
//     console.error("DEBUGGER[CONTENT_SCRIPT]:", error);
//   });

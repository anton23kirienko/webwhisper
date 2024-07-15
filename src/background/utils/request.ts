import { AxiosRequestConfig } from "axios";
import browser from "webextension-polyfill";

import axiosInstance from "./axios";

const allowedMethods = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "options",
  "head",
] as const;

interface Message<T = any> {
  eventName: string;
  payload: T;
}

export type AxiosRequestMessage = Message<{
  method: (typeof allowedMethods)[number];
  url: string;
  data?: any;
  axiosConfig?: any;
}>;

export const makeRequestHandler = async (request: AxiosRequestMessage) => {
  if (request.eventName !== "makeRequest") return;
  if (!request.payload || !request.payload.method || !request.payload.url)
    return;
  const { method, url, data, axiosConfig } = request.payload;
  if (!allowedMethods.includes(method)) return;
  console.log("DEBUGGER[REQUEST]:", request);

  if (method === "get") {
    return axiosInstance.get(url, axiosConfig);
  }
  return axiosInstance[method](url, data, axiosConfig);
};

export const wrapAsyncFunction =
  (listener: (request: Message) => any | Promise<any>) =>
  (
    request: any,
    sender: browser.Runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    // the listener(...) might return a non-promise result (not an async function), so we wrap it with Promise.resolve()
    Promise.resolve(listener(request))
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => {
        sendResponse({
          success: false,
          error: {
            message: error.message,
            status: error.response?.status,
            response: error.response?.data,
          },
        });
      });
    return true as true; // return true to indicate you want to send a response asynchronously
  };

// Handling requests made from Content Scripts
// browser.runtime.onMessage.addListener(
//   wrapAsyncFunction(async (request) => {
//     if (request.eventName === "makeRequest") {
//       return makeRequestHandler(request);
//     }
//     return null;
//   })
// );

// fetch directly with axios (e.g. without creds and interceptors)
// const saveUserInfo = () =>
//   axios
//     .get(`${PLACEHOLDER_BASE_URL}/todos/1`)
//     .then((response) => {
//       console.log("DEBUGGER[USER_INFO]:", response.data);
//       // setStorageData({ user: response.data });
//     })
//     .catch((error) => {
//       console.error("DEBUGGER[USER_INFO]:", error);
//       // setStorageData({ user: null }).then();
//     });

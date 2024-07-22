import axios from "axios";

import {
  MessageType,
  BackgroundRequestMessage,
  BackgroundResponse,
} from "../../types";
import { ALLOWED_METHODS } from "../../constants/api";

export const createRequestHandler = (request: BackgroundRequestMessage) => {
  if (request.type !== MessageType.MakeRequest) {
    return;
  }
  if (!request.payload || !request.payload.method || !request.payload.url) {
    return;
  }
  if (!ALLOWED_METHODS.includes(request.payload.method)) {
    return;
  }

  const { method, url, data, axiosConfig } = request.payload;

  console.log(
    "createRequestHandler() - sending request",
    JSON.stringify(request)
  );

  if (method === "get") {
    return axios.get(url, axiosConfig);
  }

  return axios[method](url, data, axiosConfig);
};

export const makeBackgroundRequest = (
  message: BackgroundRequestMessage,
  sendResponse: (response: BackgroundResponse) => void
) => {
  Promise.resolve(createRequestHandler(message))
    .then((response) => sendResponse({ ok: true, data: response?.data }))
    .catch((error) => {
      sendResponse({
        ok: false,
        error: {
          message: error.message,
          status: error.response?.status,
          response: error.response?.data,
        },
      });
    });
};

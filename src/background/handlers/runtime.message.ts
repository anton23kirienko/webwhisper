import browser from "webextension-polyfill";

import { makeBackgroundRequest } from "../utils/request";
import {
  MessageType,
  RuntimeMessage,
  BackgroundRequestMessage,
  BackgroundResponse,
  HealthCheckResponse,
} from "../../types";

export const onHealthCheckMessage = (
  message: RuntimeMessage,
  _sender: browser.Runtime.MessageSender,
  sendResponse: (response: HealthCheckResponse) => void
): true => {
  if (message?.type === MessageType.HealthCheck) {
    sendResponse({ ok: true });
  }

  return true;
};

export const onSendRequestMessage = (
  message: BackgroundRequestMessage,
  _sender: browser.Runtime.MessageSender,
  sendResponse: (response: BackgroundResponse) => void
): true => {
  if (message?.type === MessageType.MakeRequest) {
    makeBackgroundRequest(message, sendResponse);
  }

  return true;
};

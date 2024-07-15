import { AxiosRequestConfig } from "axios";
import browser from "webextension-polyfill";

export type SendRequestProps = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
};

export type SendRequestResponse = {
  data: any;
  status: number;
  statusText: string;
};

export class RequestError extends Error {
  constructor(message: string, public data: any) {
    super(message);
  }
}

export const sendRequest = async ({
  ...props
}: SendRequestProps): Promise<SendRequestResponse> => {
  const res = await browser.runtime.sendMessage({
    eventName: "makeRequest",
    payload: props,
  });
  if (res.success) return res.data;
  const { message, ...error } = res.error;
  throw new RequestError(message, error);
};

// How to use:
// sendRequest({ method: "get", url: `${PLACEHOLDER_BASE_URL}/todos/1` })
//   .then((response) => {
//     console.log("DEBUGGER[CONTENT_SCRIPT]", response);
//   })
//   .catch((error) => {
//     console.error("DEBUGGER[CONTENT_SCRIPT]:", error);
//   });

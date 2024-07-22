import { ALLOWED_METHODS } from "../constants/api";

import { RuntimeMessage } from "./messages";

export type BackgroundRequestMessage = RuntimeMessage<{
  method: (typeof ALLOWED_METHODS)[number];
  url: string;
  data?: any;
  axiosConfig?: any;
}>;

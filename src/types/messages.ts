export enum MessageType {
  MakeRequest = "rooms-extension-make-request",
  ReceiveResponse = "rooms-extension-receive-response",
  HealthCheck = "rooms-extension-health-check",
}

export type RuntimeMessage<T extends any = undefined> = {
  type: MessageType;
  payload?: T;
};

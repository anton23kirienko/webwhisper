export type BackgroundResponseError = {
  message: string;
  status?: number;
  response?: any;
};

export type BackgroundResponse = {
  ok: boolean;
  data?: unknown;
  error?: BackgroundResponseError;
};

export type HealthCheckResponse = {
  ok: boolean;
};

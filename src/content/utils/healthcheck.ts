import browser from "webextension-polyfill";

import { MessageType, HealthCheckResponse } from "../../types";

const HEALTH_CHECK_INTERVAL = 10000;

// to keep worker in active state
export const runHealthCheckMessaging = () => {
  setInterval(async () => {
    const response: HealthCheckResponse = await browser.runtime.sendMessage({
      type: MessageType.HealthCheck,
    });

    if (!response.ok) {
      console.error("runHealthCheckMessaging() - health check broken.");
    }
  }, HEALTH_CHECK_INTERVAL);
};

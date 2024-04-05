import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";

interface EnvironmentConfigInterface {
  baseURL: string;
  storageState: string; // this is only needed for the global login...
}

interface DeviceConfigInterface {
  [key: string]: any;
}

export const getEnvironmentConfig = (): EnvironmentConfigInterface => {
  const env = process.env.NODE_ENV || "dev";
  switch (env) {
    case "dev":
      return {
        baseURL: "https://dev.natter.network/",
        storageState: `state.json`, // this is only needed for the global login...
      };
    case "local":
      return {
        baseURL: "http://localhost:8080/",
        storageState: `state.json`, // this is only needed for the global login...
      };
    default:
      throw new Error(`Unsupported environment: ${env}`);
  }
};

const getDeviceConfig = (device: string): DeviceConfigInterface => {
  switch (device) {
    case "mobile-chrome":
      return {
        ...devices["Pixel 5"],
        name: "Mobile Chrome",
      };
    case "mobile-firefox":
      return {
        ...devices["Pixel 5"],
        name: "Mobile Firefox",
      };
    case "desktop":
    case "desktop":
      return devices["Desktop Chrome"];
    case "chrome":
      return devices["Desktop Chrome"];
    case "firefox":
      return devices["Desktop Firefox"];
    default:
      throw new Error(`Unsupported device: ${device}`);
  }
};

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  workers: 10,
  retries: 0,
  timeout: 60000,
  reporter: "list",
  globalSetup: path.resolve(
    __dirname,
    `e2e/utils/globalSetup.ts` // this is only needed when im using the global login...
  ),

  use: {
    ...getEnvironmentConfig(),
    ...(process.env.DEVICE ? getDeviceConfig(process.env.DEVICE) : {}),
  },
};

export default config;

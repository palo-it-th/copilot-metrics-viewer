import {PublicClientApplication, type AccountInfo, type Configuration} from "@azure/msal-browser";
import {reactive} from "vue";
import config from "@/config";

export const msalConfig: Configuration = {
  auth: {
    clientId: config.msal.clientId,
    authority: `https://login.microsoftonline.com/${config.msal.tenantId}`,
    redirectUri: config.msal.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};

export const graphConfig = {
  scopes: ["openid", "profile", "offline_access"],
}
export const state = reactive({
  isAuthenticated: false,
  account: {} as AccountInfo | null
});

export const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize()
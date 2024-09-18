import { msalInstance, state, graphConfig } from "@/config/msalConfig";

const useAuth = () => {

  const login = async () => {
    try {
      await msalInstance.loginRedirect(graphConfig);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    state.isAuthenticated = false;
    await msalInstance.logoutRedirect()
  }
  const handleRedirect = async () => {
    try {
      const tokenResponse = await msalInstance.handleRedirectPromise();
      if (tokenResponse) {
        // Check if the tokenResponse is null
        // If the tokenResponse !== null, then you are coming back from a successful authentication redirect.
        // If the tokenResponse === null, you are not coming back from an auth redirect.
        state.isAuthenticated = true;
        state.account = tokenResponse.account;
      } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          state.isAuthenticated = true;
          state.account = accounts[0];
        }
      }
    } catch (error) {
      // handle error, either in the library or coming back from the server
      console.error(error);
    }
  }

  return { login, handleRedirect, logout, state };
}

export default useAuth;
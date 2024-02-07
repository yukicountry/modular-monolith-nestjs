type AuthState = {
  isAuthenticated: boolean;
};

const key = "authState";

export const useLocalAuthState = () => {
  const existsLocalAuthState = () => !!window.localStorage.getItem(key);

  const getLocalAuthState = () => {
    const authState = window.localStorage.getItem(key);

    if (authState) {
      return JSON.parse(authState) as AuthState;
    }
  };

  const setLocalAuthState = (authState: AuthState) => {
    window.localStorage.setItem(key, JSON.stringify(authState));
  };

  const removeLocalAuthState = () => {
    window.localStorage.removeItem(key);
  };

  return {
    existsLocalAuthState,
    getLocalAuthState,
    setLocalAuthState,
    removeLocalAuthState,
  };
};

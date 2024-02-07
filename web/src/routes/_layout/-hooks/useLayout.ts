import { useLocalAuthState } from "@/shared/hooks/useLocalAuthState";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";

export const useLayout = () => {
  const navigate = useNavigate();

  const { getLocalAuthState, removeLocalAuthState } = useLocalAuthState();

  const logout = useSubmit({
    path: "/api/auth/logout",
    httpMethod: "post",
    onSuccess() {
      removeLocalAuthState();
      notifications.show({
        color: "blue",
        message: "ログアウトしました。",
      });
      navigate({ to: "/login" });
    },
    onInternalServerError() {
      notifications.show({
        color: "red",
        message: "エラーが発生しました。",
      });
    },
  });

  const onClickLogout = async () => {
    await logout.sendRequest();
  };

  return {
    isAuthenticated: getLocalAuthState()?.isAuthenticated,
    onClickLogout,
  };
};

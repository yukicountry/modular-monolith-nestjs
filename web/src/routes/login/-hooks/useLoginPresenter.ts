import { useForm } from "@mantine/form";
import { LoginFormValues } from "../-types";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { useLocalAuthState } from "@/shared/hooks/useLocalAuthState";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";

export const useLoginPresenter = () => {
  const localAuthState = useLocalAuthState();

  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const submit = useSubmit({
    path: "/api/auth/login",
    httpMethod: "post",
    onSuccess(response) {
      console.log(response);
      localAuthState.setLocalAuthState({ isAuthenticated: true });
      notifications.show({
        color: "blue",
        message: "ログインしました。",
      });
      navigate({ to: "/events" });
    },
  });

  const onClickLogin = async () => {
    await submit.sendRequest(form.values);
  };

  return {
    form,
    onClickLogin,
  };
};

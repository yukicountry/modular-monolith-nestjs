import { useForm } from "@mantine/form";
import { useCallback, useEffect } from "react";
import { AccountSettingsFormValues } from "../-types";
import { useFetch } from "@/shared/hooks/useFetch";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { redirect } from "@tanstack/react-router";
import { useLocalAuthState } from "@/shared/hooks/useLocalAuthState";
import { notifications } from "@mantine/notifications";

export const useAccountSettingsPresenter = () => {
  const { removeLocalAuthState } = useLocalAuthState();

  const form = useForm<AccountSettingsFormValues>({
    initialValues: {
      userName: "",
      email: "",
    },
  });

  const initialFetch = useFetch({
    path: "/api/mypage/account",
    httpMethod: "get",
    onSuccess(response) {
      form.setValues(response);
    },
    onForbiddenError() {
      removeLocalAuthState();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    },
    onInternalServerError() {
      notifications.show({
        color: "red",
        message: "エラーが発生しました。",
      });
    },
  });

  const submitAccountSettings = useSubmit({
    path: "/api/users",
    httpMethod: "post",
    onSuccess(response) {
      console.log(response);
    },
  });

  const onClickSave = useCallback(() => {
    // submitAccountSettings.sendRequest({ userName: form.values.userName });
    alert("OK");
  }, [form.values.userName, submitAccountSettings]);

  useEffect(() => {
    initialFetch.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    onClickSave,
    isLoading: initialFetch.isRequesting,
  };
};

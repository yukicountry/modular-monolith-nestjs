import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { UserRegistrationFormValues } from "../-types";

export const useUserRegistrationPresenter = () => {
  const form = useForm<UserRegistrationFormValues>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const showErrorNotification = () =>
    notifications.show({
      color: "red",
      autoClose: false,
      message: "エラーが発生しました。",
    });

  const { isRequesting, sendRequest } = useSubmit({
    path: "/api/registration",
    httpMethod: "post",
    onSuccess() {
      notifications.show({
        color: "blue",
        autoClose: false,
        message: (
          <pre>{`確認メールを送信しました。\nメールからユーザ登録を完了してください。`}</pre>
        ),
      });
    },
    onValidationError(error) {
      const messages = error.message.reduce(
        (accumulator: { [key: string]: string }, item) => ({
          [item.property]: item.message,
          ...accumulator,
        }),
        {},
      );
      form.setErrors({ ...messages });
    },
    onInternalServerError: showErrorNotification,
    onUnexpectedError: showErrorNotification,
  });

  const isButtonLoading = isRequesting;

  const onClickRegister = async () => {
    await sendRequest(form.values);
  };

  return {
    form,
    onClickRegister,
    isButtonLoading,
  };
};

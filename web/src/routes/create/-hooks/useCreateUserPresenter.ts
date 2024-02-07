import { useForm } from "@mantine/form";
import { CreateUserFormValues } from "../-types";
import { notifications } from "@mantine/notifications";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { useNavigate } from "@tanstack/react-router";

export const useCreateUserPresenter = ({ userRegistrationId }: { userRegistrationId: string }) => {
  const navigate = useNavigate();

  const form = useForm<CreateUserFormValues>({
    initialValues: {
      userName: "",
    },
  });

  const showErrorNotification = () =>
    notifications.show({
      color: "red",
      autoClose: false,
      message: "エラーが発生しました。",
    });

  const { isRequesting, sendRequest } = useSubmit({
    path: "/api/users",
    httpMethod: "post",
    onSuccess() {
      notifications.show({
        color: "blue",
        autoClose: false,
        message: "ユーザ登録完了",
      });
      navigate({ to: "/events" });
    },
    onValidationError() {
      alert("validation error");
      //   const messages = error.message.reduce(
      //     (accumulator: { [key: string]: string }, item) => ({
      //       [item.property]: item.message,
      //       ...accumulator,
      //     }),
      //     {},
      //   );
      //   form.setErrors({ ...messages });
    },
    onInternalServerError: showErrorNotification,
    onUnexpectedError: showErrorNotification,
  });

  const isButtonLoading = isRequesting;

  const onClickButton = async () => {
    await sendRequest({
      userRegistrationId: userRegistrationId,
      userName: form.values.userName,
    });
  };

  return {
    form,
    isButtonLoading,
    onClickButton,
  };
};

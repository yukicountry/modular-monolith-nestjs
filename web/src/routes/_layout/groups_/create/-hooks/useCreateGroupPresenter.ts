import { useForm } from "@mantine/form";
import { CreateGroupFormValues } from "../-types";
import { useCallback } from "react";
import { useSubmit } from "@/shared/hooks/useSubmit";
import { useNavigate } from "@tanstack/react-router";
import { convertValidationErrorToFormErrors } from "@/shared/utils/errors";

export const useCreateGroupPresenter = () => {
  const navigate = useNavigate();

  const form = useForm<CreateGroupFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const submit = useSubmit({
    path: "/api/groups",
    httpMethod: "post",
    onSuccess(response) {
      navigate({ to: "/groups/$groupId", params: { groupId: response.groupId } });
    },
    onBadRequestError(error) {
      alert(error.message);
    },
    onValidationError(error) {
      form.setErrors(convertValidationErrorToFormErrors(error));
    },
  });

  const onClickCreateGroup = useCallback(() => {
    submit.sendRequest(form.values);
  }, [form.values, submit]);

  return {
    form,
    onClickCreateGroup,
  };
};

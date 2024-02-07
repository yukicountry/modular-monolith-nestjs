import { theme } from "@/styles/theme";
import { Center, Box, Title, Paper, TextInput, Button } from "@mantine/core";
import { FC, MouseEventHandler } from "react";
import { createUserStyle as style } from "./CreateUserPresenter.css";
import { UseFormReturnType } from "@mantine/form";
import { CreateUserFormValues } from "../../-types";

type CreateUserPresenterParams = {
  form?: UseFormReturnType<CreateUserFormValues>;
  onClickButton?: MouseEventHandler<HTMLButtonElement>;
  isButtonLoading?: boolean;
};

export const CreateUserPresenter: FC<CreateUserPresenterParams> = ({
  form,
  onClickButton,
  isButtonLoading,
}) => {
  return (
    <Center component="main" className={style.wrapper}>
      <Box w={420}>
        <Title ta="center">プロフィール</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="ユーザ名"
            placeholder="Username"
            required
            {...form?.getInputProps("userName")}
          />
          <Button
            fullWidth
            mt="xl"
            color={theme.primaryColor}
            loading={isButtonLoading}
            onClick={onClickButton}
          >
            利用を開始する
          </Button>
        </Paper>
      </Box>
    </Center>
  );
};

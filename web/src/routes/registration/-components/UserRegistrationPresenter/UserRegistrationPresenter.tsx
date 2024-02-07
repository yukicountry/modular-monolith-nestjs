import { theme } from "@/styles/theme";
import { Box, Button, Center, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { FC, MouseEventHandler } from "react";
import { userRegistrationStyle as style } from "./UserRegistrationPresenter.css";
import { UseFormReturnType } from "@mantine/form";
import { UserRegistrationFormValues } from "../../-types";
import { Link } from "@tanstack/react-router";

type UserRegistrationParams = {
  form?: UseFormReturnType<UserRegistrationFormValues>;
  onClickRegister?: MouseEventHandler<HTMLButtonElement>;
  isButtonLoading?: boolean;
};

/**
 * 新規登録画面
 */
export const UserRegistrationPresenter: FC<UserRegistrationParams> = ({
  form,
  onClickRegister,
  isButtonLoading,
}) => {
  return (
    <Center component="main" className={style.wrapper}>
      <Box w={420}>
        <Title ta="center">新規登録</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="メールアドレス"
            placeholder="sample@example.com"
            required
            type="email"
            {...form?.getInputProps("email")}
          />
          <PasswordInput
            label="パスワード"
            placeholder="Your password"
            required
            mt="md"
            type="password"
            autoComplete="new-password"
            {...form?.getInputProps("password")}
          />
          <PasswordInput
            placeholder="Your password"
            required
            mt="md"
            type="password"
            autoComplete="new-password"
            {...form?.getInputProps("passwordConfirmation")}
          />
          <Button
            fullWidth
            mt="xl"
            color={theme.primaryColor}
            onClick={onClickRegister}
            loading={isButtonLoading}
          >
            登録
          </Button>
        </Paper>
        <Text mt="lg">
          <Link to="/login">← ログイン</Link>
        </Text>
      </Box>
    </Center>
  );
};

import { FC, MouseEventHandler } from "react";
import { Box, Button, Center, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { loginStyle as style } from "./LoginPresenter.css";
import { theme } from "@/styles/theme";
import { UseFormReturnType } from "@mantine/form";
import { Link } from "@tanstack/react-router";
import { LoginFormValues } from "../../-types";

type LoginProps = {
  form?: UseFormReturnType<LoginFormValues>;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  isButtonLoading?: boolean;
};

export const LoginPresenter: FC<LoginProps> = ({ form, onClickLogin, isButtonLoading }) => {
  return (
    <Center component="main" className={style.wrapper}>
      <Box w={420}>
        <Title ta="center">ログイン</Title>
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
            autoComplete="password"
            {...form?.getInputProps("password")}
          />
          <Button
            fullWidth
            mt="xl"
            color={theme.primaryColor}
            onClick={onClickLogin}
            loading={isButtonLoading}
          >
            ログイン
          </Button>
        </Paper>
        <Box component="p" ta="end" mt="lg">
          <Link to="/registration">新規登録 →</Link>
        </Box>
      </Box>
    </Center>
  );
};

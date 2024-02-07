import { theme } from "@/styles/theme";
import { Button, Center, LoadingOverlay, Paper, Stack, Tabs, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC, MouseEventHandler } from "react";
import { AccountSettingsFormValues } from "../../-types";
import { MyPageTabs } from "../../../-types";

type AccountSettingsPresenterParams = {
  isLoading?: boolean;
  form?: UseFormReturnType<AccountSettingsFormValues>;
  onClickSave?: MouseEventHandler<HTMLButtonElement>;
};

export const AccountSettingsPresenter: FC<AccountSettingsPresenterParams> = ({
  isLoading,
  form,
  onClickSave,
}) => {
  return (
    <Tabs.Panel value={MyPageTabs.AccountSettings} display="block" pos="relative">
      <Paper withBorder shadow="sm" p="xl" radius="md" mt="md">
        <Stack gap="lg">
          <TextInput label="ユーザ名" required {...form?.getInputProps("userName")} />
          <TextInput label="メールアドレス" disabled {...form?.getInputProps("email")} />
          <TextInput label="パスワード" disabled value="********" />
        </Stack>
        <Center mt="xl">
          <Button w={200} color={theme.primaryColor} onClick={onClickSave}>
            保存する
          </Button>
        </Center>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </Paper>
    </Tabs.Panel>
  );
};

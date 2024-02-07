import { theme } from "@/styles/theme";
import { Container, Title, Paper, TextInput, Textarea, Center, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC, MouseEventHandler } from "react";
import { CreateGroupFormValues } from "../../-types";

type CreateGroupProps = {
  form?: UseFormReturnType<CreateGroupFormValues>;
  onClickCreateGroup?: MouseEventHandler<HTMLButtonElement>;
};

export const CreateGroupPresenter: FC<CreateGroupProps> = ({ form, onClickCreateGroup }) => {
  return (
    <Container size="lg" py={60}>
      <Title order={2} ta="center">
        グループを作成する
      </Title>
      <Paper withBorder shadow="sm" p="xl" radius="md" mt="md">
        <TextInput label="グループ名" required {...form?.getInputProps("name")} />
        <Textarea
          label="詳細"
          required
          autosize
          minRows={3}
          mt="lg"
          {...form?.getInputProps("description")}
        />
        <Center mt="xl">
          <Button w={200} color={theme.primaryColor} onClick={onClickCreateGroup}>
            グループ作成
          </Button>
        </Center>
      </Paper>
    </Container>
  );
};

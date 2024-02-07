import { theme } from "@/styles/theme";
import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  Radio,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FC } from "react";

interface CreateEventProps {
  //
}

export const CreateEventPresenter: FC<CreateEventProps> = () => {
  return (
    <Container size="lg" py={60}>
      <Title order={2} ta="center">
        イベントを作成する
      </Title>
      <Paper withBorder shadow="sm" p="xl" radius="md" mt="md">
        <TextInput label="イベント名" required />
        <Group grow={true} mt="lg">
          <DatePickerInput label="開始日時" clearable required />
          <DatePickerInput label="終了日時" clearable required />
        </Group>
        <Radio.Group label="公開設定" mt="lg" required>
          <Group>
            <Radio label="一般公開" variant="outline" />
            <Radio label="フォロワーのみ" variant="outline" />
            <Radio label="非公開" variant="outline" />
          </Group>
        </Radio.Group>
        <Textarea label="詳細" required autosize minRows={5} mt="lg" />
        <Center mt="xl">
          <Button w={200} color={theme.primaryColor}>
            作成
          </Button>
        </Center>
      </Paper>
    </Container>
  );
};

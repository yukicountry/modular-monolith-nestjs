import { Avatar, Button, Container, Group, Paper, Text, Title } from "@mantine/core";
import { FC } from "react";

export const EventDetailPresenter: FC = () => {
  return (
    <Container component="main" py={40} size="lg">
      <Title order={2} ta="center">
        イベント名
      </Title>
      <Group mt={40} align="start" wrap="nowrap" gap="lg">
        <Paper p={20} flex={1} withBorder shadow="sm" radius="md">
          <Text>2024年2月14日</Text>
          <Text>サンプルグループ</Text>
          <Text>説明が入ります。説明が入ります。説明が入ります。</Text>
        </Paper>
        <div>
          <Paper p={20} w={300} withBorder shadow="sm" radius="md">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius={60}
              size={60}
              mx="auto"
            />
            <Text ta="center" fz="lg" fw={500} mt="sm">
              <a href="/groups/1">グループ名</a>
            </Text>
            <Button variant="default" fullWidth mt="md">
              フォロー
            </Button>
          </Paper>
        </div>
      </Group>
    </Container>
  );
};

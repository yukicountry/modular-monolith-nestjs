import { Paper, Avatar, Button, Text } from "@mantine/core";
import { FC } from "react";

interface GroupListCardProps {
  //
}

export const GroupListCard: FC<GroupListCardProps> = () => {
  return (
    <Paper p={20} withBorder shadow="sm" radius="md">
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
  );
};

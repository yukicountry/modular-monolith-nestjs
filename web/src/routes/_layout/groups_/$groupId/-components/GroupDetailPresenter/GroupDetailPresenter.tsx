import { Container, Title, Paper } from "@mantine/core";
import { FC } from "react";

interface GroupDetailProps {
  //
}

export const GroupDetailPresenter: FC<GroupDetailProps> = () => {
  return (
    <Container size="lg" py={60}>
      <Title order={2} ta="center">
        グループ名
      </Title>
      <Paper withBorder shadow="sm" p="xl" radius="md" mt="md">
        TODO
      </Paper>
    </Container>
  );
};

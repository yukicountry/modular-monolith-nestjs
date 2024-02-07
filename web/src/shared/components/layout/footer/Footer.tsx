import { Container, Group, Stack, Text } from "@mantine/core";
import { footerStyle as style } from "./Footer.css";

export function Footer() {
  return (
    <footer className={style.wrapper}>
      <Container>
        <Group align="start">
          <Stack w={150}>
            <Text fw="bold">Products</Text>
          </Stack>
          <Stack w={150}>
            <Text fw="bold">Resources</Text>
          </Stack>
          <Stack w={150}>
            <Text fw="bold">Help</Text>
          </Stack>
          <Stack w={150} gap="xs">
            <Text fw="bold">About</Text>
            <Text c="dimmed" size="sm">
              About Us
            </Text>
            <Text c="dimmed" size="sm">
              Careers
            </Text>
          </Stack>
        </Group>
      </Container>
    </footer>
  );
}

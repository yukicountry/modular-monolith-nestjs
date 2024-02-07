import { ActionIcon, TextInput, rem } from "@mantine/core";
import { FC } from "react";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { theme } from "@/styles/theme";

export const EventSearchForm: FC = () => {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search questions"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
    />
  );
};

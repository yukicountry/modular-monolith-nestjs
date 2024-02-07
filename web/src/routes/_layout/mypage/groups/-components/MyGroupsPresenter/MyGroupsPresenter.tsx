import { GroupListCard } from "@/features/event/components";
import { theme } from "@/styles/theme";
import { Tabs, Group, Button, Grid } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { MyPageTabs } from "../../../-types";

export const MyGroupsPresenter: FC = () => {
  return (
    <Tabs.Panel value={MyPageTabs.MyGroups}>
      <Group mt="lg">
        <Button color={theme.primaryColor} component="a" href="/groups/create">
          <IconPlus />
        </Button>
      </Group>
      <Grid mt="lg" gutter="xl">
        {Array(2)
          .fill(0)
          .map(() => (
            <Grid.Col span={3}>
              <GroupListCard />
            </Grid.Col>
          ))}
      </Grid>
    </Tabs.Panel>
  );
};

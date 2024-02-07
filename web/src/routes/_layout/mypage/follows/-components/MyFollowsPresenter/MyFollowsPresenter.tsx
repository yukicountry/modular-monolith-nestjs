import { GroupListCard } from "@/features/event/components";
import { Tabs, Grid } from "@mantine/core";
import { FC } from "react";
import { MyPageTabs } from "../../../-types";

export const MyFollowsPresenter: FC = () => {
  return (
    <Tabs.Panel value={MyPageTabs.MyFollows} display="block">
      <Grid mt="xl" gutter="xl">
        {Array(3)
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

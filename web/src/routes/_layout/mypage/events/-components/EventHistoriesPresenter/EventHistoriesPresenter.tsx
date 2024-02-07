import { EventListCard } from "@/features/event/components";
import { Tabs, Title, Grid } from "@mantine/core";
import { MyPageTabs } from "../../../-types";

export const EventHistoriesPresenter = () => {
  return (
    <Tabs.Panel value={MyPageTabs.EventHistories} display="block">
      <Title order={3} mt="lg">
        参加予定のイベント
      </Title>
      <Grid gutter="lg" mt="lg">
        {Array(2)
          .fill(0)
          .map(() => (
            <Grid.Col span={6}>
              <EventListCard />
            </Grid.Col>
          ))}
      </Grid>
      <Title order={3} mt="xl">
        過去のイベント
      </Title>
      <Grid gutter="lg" mt="lg">
        {Array(5)
          .fill(0)
          .map(() => (
            <Grid.Col span={6}>
              <EventListCard />
            </Grid.Col>
          ))}
      </Grid>
    </Tabs.Panel>
  );
};

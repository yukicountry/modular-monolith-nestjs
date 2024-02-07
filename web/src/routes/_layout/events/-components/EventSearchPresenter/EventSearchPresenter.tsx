import { EventListCard } from "@/features/event/components/EventListCard/EventListCard";
import { EventSearchForm } from "@/features/event/components/EventSearchForm/EventSearchForm";
import { theme } from "@/styles/theme";
import { Center, Container, Grid, Pagination } from "@mantine/core";
import { FC } from "react";
import { eventSearchStyle as style } from "./EventSearchPresenter.css";

type EventSearchParams = {
  //
};

export const EventSearchPresenter: FC<EventSearchParams> = () => {
  return (
    <main className={style.content}>
      <Container>
        <EventSearchForm />
        <Grid gutter={{ base: "xl" }} className={style.eventList}>
          {Array(5)
            .fill(0)
            .map(() => (
              <Grid.Col span={6}>
                <EventListCard />
              </Grid.Col>
            ))}
        </Grid>
        <Center className={style.pagination}>
          <Pagination
            total={10}
            color={theme.primaryColor}
            size="lg"
            radius="xl"
            withEdges={true}
          />
        </Center>
      </Container>
    </main>
  );
};

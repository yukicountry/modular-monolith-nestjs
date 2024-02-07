import { theme } from "@/styles/theme";
import { Container, Title, Tabs } from "@mantine/core";
import { IconCalendarEvent, IconSettings, IconStar, IconUserHexagon } from "@tabler/icons-react";
import { Link, Outlet } from "@tanstack/react-router";
import { FC } from "react";
import { MyPageTabs } from "../../-types";

type MyPageProps = {
  currentTab?: MyPageTabs;
};

export const MyPagePresenter: FC<MyPageProps> = ({ currentTab = MyPageTabs.EventHistories }) => {
  return (
    <Container py={60}>
      <Title order={2} ta="center">
        山田 太郎さん マイページ
      </Title>
      <Tabs defaultValue={currentTab} mt="xl" color={theme.primaryColor}>
        <Tabs.List>
          <Link to="/mypage/events">
            <Tabs.Tab value={MyPageTabs.EventHistories} leftSection={<IconCalendarEvent />}>
              イベント履歴
            </Tabs.Tab>
          </Link>
          <Link to="/mypage/follows">
            <Tabs.Tab value={MyPageTabs.MyFollows} leftSection={<IconStar />}>
              マイフォロー
            </Tabs.Tab>
          </Link>
          <Link to="/mypage/groups">
            <Tabs.Tab value={MyPageTabs.MyGroups} leftSection={<IconUserHexagon />}>
              マイグループ
            </Tabs.Tab>
          </Link>
          <Link to="/mypage/account">
            <Tabs.Tab value={MyPageTabs.AccountSettings} leftSection={<IconSettings />}>
              アカウント管理
            </Tabs.Tab>
          </Link>
        </Tabs.List>
        <Outlet />
      </Tabs>
    </Container>
  );
};

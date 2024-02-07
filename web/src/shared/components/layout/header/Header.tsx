import { theme, themeVars } from "@/styles/theme";
import { Button, Flex, Group, Menu, UnstyledButton } from "@mantine/core";
import { ComponentPropsWithoutRef, FC, MouseEventHandler } from "react";
import { Link } from "@tanstack/react-router";

export type HeaderProps = {
  isAuthenticated?: boolean;
  onClickLogout?: MouseEventHandler<HTMLButtonElement>;
} & ComponentPropsWithoutRef<"header">;

export const Header: FC<HeaderProps> = ({ isAuthenticated, onClickLogout, ...rest }) => {
  return (
    <Flex component="header" h={60} px={20} bg={themeVars.colors.white} align="center" {...rest}>
      <Link to="/events">EventHub</Link>
      <Group ml="auto">
        {isAuthenticated ? (
          <Menu>
            <Menu.Target>
              <Button color={theme.primaryColor}>Menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Link to="/mypage">
                <Menu.Item>マイページ</Menu.Item>
              </Link>
              <Menu.Divider />
              <Link to="/groups/create">
                <Menu.Item>グループ作成</Menu.Item>
              </Link>
              <Link to="/events/create">
                <Menu.Item>イベント作成</Menu.Item>
              </Link>
              <Menu.Divider />
              <UnstyledButton onClick={onClickLogout}>
                <Menu.Item>ログアウト</Menu.Item>
              </UnstyledButton>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            <Link to="/registration">新規登録</Link>
            <Link to="/login">ログイン</Link>
          </>
        )}
      </Group>
    </Flex>
  );
};

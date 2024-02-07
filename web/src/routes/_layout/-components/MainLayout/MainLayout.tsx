import { FC, MouseEventHandler } from "react";
import { mainLayoutStyle as style } from "./MainLayout.css";
import { Footer } from "@/shared/components/layout/footer/Footer";
import { Header } from "@/shared/components/layout/header/Header";
import { Box } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";

type MainLayoutProps = {
  isAuthenticated?: boolean;
  onClickLogout?: MouseEventHandler<HTMLButtonElement>;
};

export const MainLayout: FC<MainLayoutProps> = ({ isAuthenticated, onClickLogout }) => {
  return (
    <Box className={style.wrapper}>
      <Header isAuthenticated={isAuthenticated} onClickLogout={onClickLogout} />
      <div className={style.main}>
        <Outlet />
      </div>
      <Footer />
    </Box>
  );
};

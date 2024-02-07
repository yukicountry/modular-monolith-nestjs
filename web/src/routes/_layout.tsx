import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "./_layout/-components";
import { useLayout } from "./_layout/-hooks";

const Layout = () => {
  return <MainLayout {...useLayout()} />;
};

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

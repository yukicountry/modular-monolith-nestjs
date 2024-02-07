import { createLazyFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { AccountSettingsPresenter } from "./-components";
import { useAccountSettingsPresenter } from "./-hooks";

const AccountSettingsContainer: FC = () => (
  <AccountSettingsPresenter {...useAccountSettingsPresenter()} />
);

export const Route = createLazyFileRoute("/_layout/mypage/account")({
  component: AccountSettingsContainer,
});

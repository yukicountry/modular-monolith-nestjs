import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { UserRegistrationPresenter } from "./-components";
import { useUserRegistrationPresenter } from "./-hooks";

const UserRegistrationContainer: FC = () => {
  return <UserRegistrationPresenter {...useUserRegistrationPresenter()} />;
};

export const Route = createFileRoute("/registration")({
  component: UserRegistrationContainer,
});

import { FC } from "react";
import { LoginPresenter } from "./-components";
import { createFileRoute } from "@tanstack/react-router";
import { useLoginPresenter } from "./-hooks";

const LoginContainer: FC = () => {
  return <LoginPresenter {...useLoginPresenter()} />;
};

export const Route = createFileRoute("/login")({
  component: LoginContainer,
});

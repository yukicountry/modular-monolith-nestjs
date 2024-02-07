import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { CreateUserPresenter } from "./-components";
import { useCreateUserPresenter } from "./-hooks";

const CreateUserContainer: FC = () => {
  const { id } = Route.useSearch();

  return <CreateUserPresenter {...useCreateUserPresenter({ userRegistrationId: id })} />;
};

export const Route = createFileRoute("/create")({
  component: CreateUserContainer,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: (search.id as string) || "",
    };
  },
});

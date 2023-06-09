"use client";
import { PointSelector, UsernameForm, CreateSessionButton } from "@/app/components";
import { Text, Title } from "@mantine/core";
import { useAppContext } from "@/app/hooks";

const Wizard = () => {
  const { username, sessionId } = useAppContext();

  if (!username) {
    return <UsernameForm />;
  }

  return <CreateSessionButton />;
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title size={40}>Pointz</Title>
      <Wizard />
    </main>
  );
}

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Group } from "@mantine/core";
import { createSession } from "@/app/utils";
import { useAppContext } from "@/app/hooks";
import { useRouter } from "next/navigation";

export const CreateSessionButton = () => {
  const { setSessionId } = useAppContext();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createSession,
    onSuccess: ({ sessionKey }) => {
      setSessionId(sessionKey);

      router.push(`/session/${sessionKey}`);
    },
  });

  return (
    <Group position="center" mt="md">
      <Button onClick={() => mutate()}>Create Story Point Session</Button>
    </Group>
  );
};

"use client";
import React, { useEffect } from "react";
import { PointCard, PointSelector, UsernameForm } from "@/app/components";
import { Divider, Group, Loader, Space, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteStoryPoint, retrieveSessionData, sendStoryPoints } from "@/app/utils";
import { useAppContext, usePageUnload } from "@/app/hooks";

export default function Session({ params }: any) {
  const { sessionId } = params;
  const { setStoryPoints, username } = useAppContext();

  const { data, isLoading } = useQuery(
    ["session", sessionId],
    () => retrieveSessionData(sessionId),
    {
      enabled: !!sessionId,
      cacheTime: 0,
      refetchInterval: 2000,
    }
  );

  const { mutate, isLoading: isSettingStoryPoint } = useMutation({
    mutationFn: sendStoryPoints,
    onSuccess: ({ storyPoints }) => {
      if (storyPoints === 0) {
        return;
      }

      notifications.show({
        title: "Updated Story Points",
        message: `Your story point estimation has been updated to ${storyPoints}`,
      });
    },
  });

    const { mutate: deleteStoryPoints } = useMutation({
    mutationFn: deleteStoryPoint,
  });

  usePageUnload({
    onUnload: () => {
      deleteStoryPoints({
        sessionKey: sessionId,
        username,
      });
    }
  })

  useEffect(() => {
    const hasEstimated = Object.keys(data || {}).includes(username);

    if (hasEstimated && !isLoading) {
      setStoryPoints(data[username]);
    }

    if (!hasEstimated && !isLoading) {
      mutate({ storyPoints: 0, sessionKey: sessionId, username });
    }
  }, [data, mutate, sessionId, username, isLoading]);

  if (!username) {
    return <UsernameForm />;
  }

  return (
    <>
      <Group position="apart">
        <Title size={30} weight={500}>
          Team Estimations
        </Title>
        <Title size={20} weight={400}>
          Username: {username}
        </Title>
      </Group>
      <Space h="xl" />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          Object.entries(data || {})
            .sort(([usernameA], [usernameB]) => usernameA.localeCompare(usernameB))
            .map(([key, value]) => {
              const isMe = username === key;

              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text size="lg" weight={500} color={isMe ? "indigo" : "black"}>
                    {key}
                  </Text>
                  <PointCard storyPoint={value as number} />
                </div>
              );
            })
        )}
      </div>
      <Space h="lg" />
      <Divider />
      <Space h="lg" />
      <Text size="lg" weight={500}>
        Select a story point estimation
      </Text>
      <PointSelector
        onSelect={(storyPoints) => {
          setStoryPoints(storyPoints);
          mutate({ storyPoints, sessionKey: sessionId, username });
        }}
      />
    </>
  );
}

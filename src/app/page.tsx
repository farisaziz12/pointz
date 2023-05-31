"use client";
import Image from "next/image";
import { PointSelector } from "@/app/components/PointSelector";
import { Text, Title } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [storyPoints, setStoryPoints] = useState("0");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title size={40}>Pointz</Title>

      <Text size="lg" weight={500}>
        Select a story point to begin
      </Text>

      <Text>You selected:</Text>

      <div className="flex items-center justify-center">
        <Text>{storyPoints}</Text>
      </div>
      <PointSelector onSelect={setStoryPoints} />
    </main>
  );
}

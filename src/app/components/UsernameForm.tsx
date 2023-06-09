import React from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAppContext } from "../hooks";

export const UsernameForm = () => {
  const { setUsername } = useAppContext();

  const form = useForm({
    initialValues: {
      username: "",
    },

    validate: {
      username: (value) =>
        /^\S+$/.test(value) ? null : "username cannot have any spaces",
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(({ username }) => setUsername(username))}>
        <TextInput
          withAsterisk
          label="Please enter a username"
          placeholder="jognsmith123"
          {...form.getInputProps("username")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

import {
  Box,
  DefaultProps,
  MantineNumberSize,
  Selectors,
  createStyles
} from "@mantine/core";
import React from "react";

// Create styles for the PointCard
export interface PointCardStylesParams {
  radius?: MantineNumberSize;
}

export const useStyles = createStyles(
  (theme, { radius }: PointCardStylesParams) => ({
    root: {
      cursor: "pointer",
      borderRadius: theme.fn.radius(radius),
      transition: "transform 0.3s",
      boxShadow: "3px 3px 10px 3px #eaeaea",
      backgroundColor: theme.colors.blue[3],
      width: "100px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px",
      ":hover": {
        transform: "scale(1.05)"
      }
    },
    point: {
      color: "white",
      fontSize: theme.fontSizes.xl,
      fontWeight: "bold",
      textAlign: "center"
    }
  })
);

type PointCardStylesNames = Selectors<typeof useStyles>;

interface PointCardProps
  extends DefaultProps<PointCardStylesNames, PointCardStylesParams> {
  storyPoint: string;
  onSelect: (point: string) => void;
}

export const PointCard: React.FC<PointCardProps> = ({
  storyPoint,
  onSelect,
  ...others
}) => {
  const { classes, cx } = useStyles({}, { name: "PointCard", ...others });

  const handleClick = () => {
    onSelect(storyPoint);
  };

  return (
    <Box className={cx(classes.root)} onClick={handleClick} {...others}>
      <div className={classes.point}>{storyPoint}</div>
    </Box>
  );
};

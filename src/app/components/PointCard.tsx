import {
  createStyles,
  MantineNumberSize,
  Box,
  DefaultProps,
  Selectors,
} from "@mantine/core";
import React from "react";
// Create styles for the PointCard
export interface PointCardStylesParams {
  radius?: MantineNumberSize;
  isSelected?: boolean;
}

export const useStyles = createStyles(
  (theme, { radius, isSelected }: PointCardStylesParams) => ({
    root: {
      cursor: "pointer",
      borderRadius: theme.fn.radius(radius),
      transition: "transform 0.3s",
      border: `1px solid ${theme.colors.gray[4]}`,
      backgroundColor: isSelected ? theme.colors.indigo[6] : theme.colors.blue[3],
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
  storyPoint: number;
  isSelected?: boolean;
  onSelect?: (point: number) => void;
}

export const PointCard: React.FC<PointCardProps> = ({
  storyPoint,
  onSelect,
  isSelected = false,
  ...others
}) => {
  const { classes, cx } = useStyles({ isSelected }, { name: "PointCard", ...others });

  const handleClick = () => {
    if (!onSelect) return;

    onSelect(storyPoint);
  };

  return (
    <Box className={cx(classes.root)} onClick={handleClick} {...others}>
      <div className={classes.point}>{storyPoint ? storyPoint : "?"}</div>
    </Box>
  );
};

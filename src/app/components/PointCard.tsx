import { createStyles, MantineNumberSize, Box, DefaultProps, Selectors, MantineProvider, useComponentDefaultProps } from '@mantine/core';
import React from 'react';

// Create styles for the PointCard
export interface PointCardStylesParams {
  radius?: MantineNumberSize;
}

export const useStyles = createStyles((theme, { radius }: PointCardStylesParams) => ({
  root: {
    cursor: 'pointer',
    borderRadius: theme.fn.radius(radius),
    transition: 'transform 0.3s',
    border: `1px solid ${theme.colors.gray[4]}`,
    backgroundColor: theme.colors.blue[0],
    width: '100px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  point: { 
    fontSize: theme.fontSizes.xl,
    textAlign: 'center',
  },
}));

type PointCardStylesNames = Selectors<typeof useStyles>;

interface PointCardProps extends DefaultProps<PointCardStylesNames, PointCardStylesParams> {
  storyPoint: string;
  onSelect: (point: string) => void;
}

export const PointCard: React.FC<PointCardProps> = ({ storyPoint, onSelect, ...others }) => {
  const { classes, cx } = useStyles({}, { name: 'PointCard', ...others });

  const handleClick = () => {
    onSelect(storyPoint);
  }

  return (
    <Box className={cx(classes.root)} onClick={handleClick} {...others}>
      <div className={classes.point}>{storyPoint}</div>
    </Box>
  );
}

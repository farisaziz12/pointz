import { PointCard } from '@/app/components/PointCard';
import React from 'react';
import { useAppContext } from '@/app/hooks';

interface PointSelectorProps {
  onSelect: (point: number) => void;
}

export const PointSelector: React.FC<PointSelectorProps> = ({ onSelect }) => {
  const { storyPoints } = useAppContext();

  const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {fibonacciSequence.map((point) => (
        <PointCard key={point} storyPoint={point} onSelect={onSelect} isSelected={storyPoints === point} />
      ))}
    </div>
  );
}

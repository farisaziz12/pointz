import { PointCard } from '@/app/components/PointCard';
import React from 'react';

interface PointSelectorProps {
  onSelect: (point: string) => void;
}

export const PointSelector: React.FC<PointSelectorProps> = ({ onSelect }) => {
  const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {fibonacciSequence.map((point) => (
        <PointCard key={point} storyPoint={point.toString()} onSelect={onSelect} />
      ))}
    </div>
  );
}

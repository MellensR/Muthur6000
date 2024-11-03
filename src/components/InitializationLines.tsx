import React, { useEffect, useState } from 'react';
import { AudioManager } from '../utils/AudioManager';

interface Line {
  id: number;
  width: number;
  position: { x: number; y: number };
  direction: 'left' | 'right' | 'top' | 'bottom';
  duration: number;
  color: string;
  thickness: number;
}

const InitializationLines: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<Line[]>([]);
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    const totalDuration = 2000;
    const linesCount = 25;
    const baseInterval = totalDuration / linesCount;
    const colors = ['#22c55e', '#16a34a', '#15803d'];
    
    let timeoutIds: NodeJS.Timeout[] = [];
    
    const generateLine = (id: number): Line => ({
      id,
      width: 20 + Math.random() * 200,
      position: {
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100)
      },
      direction: ['left', 'right', 'top', 'bottom'][Math.floor(Math.random() * 4)] as Line['direction'],
      duration: 300 + Math.random() * 400,
      color: colors[Math.floor(Math.random() * colors.length)],
      thickness: 1 + Math.random() * 2
    });

    const playRandomSound = () => {
      const soundType = Math.random();
      if (soundType < 0.4) {
        audioManager.playResponseChar();
      } else if (soundType < 0.7) {
        audioManager.playKeystroke();
      } else {
        audioManager.playResponseBeep();
      }
    };

    const addLine = (id: number) => {
      setLines(prev => [...prev, generateLine(id)]);
      playRandomSound();
      
      const removeTimeout = setTimeout(() => {
        setLines(prev => prev.filter(line => line.id !== id));
        if (Math.random() > 0.7) {
          playRandomSound();
        }
      }, 500 + Math.random() * 300);
      
      timeoutIds.push(removeTimeout);
    };

    for (let i = 0; i < linesCount; i++) {
      const randomDelay = Math.random() * 200 - 100;
      const timeout = setTimeout(() => {
        addLine(i);
      }, i * baseInterval + randomDelay);
      
      timeoutIds.push(timeout);
    }

    audioManager.playProcessingHum();

    const completeTimeout = setTimeout(() => {
      audioManager.stopProcessingHum();
      audioManager.playResponseBeep();
      onComplete();
    }, totalDuration + 500);
    
    timeoutIds.push(completeTimeout);

    return () => {
      timeoutIds.forEach(clearTimeout);
      audioManager.stopProcessingHum();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black/90">
      {lines.map(line => {
        const style = {
          width: `${line.width}px`,
          height: `${line.thickness}px`,
          left: `${line.position.x}px`,
          top: `${line.position.y}px`,
          position: 'absolute' as const,
          backgroundColor: line.color,
          opacity: 0,
          transform: 'scale(0)',
          boxShadow: `0 0 8px ${line.color}`,
          animation: `
            ${line.direction === 'left' || line.direction === 'right' ? 'slideHorizontal' : 'slideVertical'} 
            ${line.duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards,
            flicker ${line.duration / 3}ms ease-in-out infinite
          `
        };

        return <div key={line.id} style={style} className="initialization-line" />;
      })}
    </div>
  );
};

export default InitializationLines;
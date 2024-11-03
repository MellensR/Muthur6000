import React from 'react';

const Cursor: React.FC = () => {
  return (
    <span className="inline-block w-3 h-5 -mb-1 ml-0.5 bg-green-500 animate-[blink_1s_steps(2)_infinite]" />
  );
};

export default Cursor;
// IndividualChatbox.tsx

import React from 'react';

interface IndividualChatboxProps {
  id: number;
  messages: string[];
  onClose: () => void;
  position: number; // Add position prop
}

const IndividualChatbox: React.FC<IndividualChatboxProps> = ({
  id,
  messages,
  onClose,
  position,
}) => {
  const right = `calc(0px + ${position * 260}px + ${position * 1}rem)`; // Adjust the offset based on the position

  return (
    <div
      className='fixed bottom-0 right-0 z-50 w-64 h-96 bg-gray-100 p-4 rounded-md shadow-md'
      style={{ right }}
    >
      <h2 className='text-lg font-semibold mb-4'>Individual Chat</h2>
      <button
        onClick={onClose}
        className='bg-red-500 text-white px-2 py-1 rounded-md mb-4'
      >
        Close
      </button>
      <div className='messages'>
        {messages.map((message, index) => (
          <div
            key={index}
            className='bg-white text-black px-2 py-1 rounded-md mb-1'
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualChatbox;

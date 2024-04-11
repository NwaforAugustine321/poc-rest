// GeneralChatbox.tsx

import React from 'react';

interface Profile {
  id: number;
  name: string;
}

interface GeneralChatboxProps {
  profiles: Profile[];
  onProfileClick: (profileId: number) => void;
  onClose: () => void;
}

const GeneralChatbox: React.FC<GeneralChatboxProps> = ({
  profiles,
  onProfileClick,
  onClose,
}) => {
  return (
    <div className='fixed bottom-0 right-0 z-50 w-64 h-96 bg-gray-100 p-4 rounded-md shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>General Chat</h2>
      <button
        onClick={onClose}
        className='bg-red-500 text-white px-2 py-1 rounded-md mb-4'
      >
        Close
      </button>
      <ul>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            onClick={() => onProfileClick(profile.id)}
            className='cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md mb-1'
          >
            {profile.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralChatbox;

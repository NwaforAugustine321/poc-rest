'use client';

import { EVENTS } from '@/constant';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenteeRequest from './mentor/MenteeRequest';
import { useSocket } from '@/context/socket.context';
import GeneralChatbox from '@/shared/chats/GeneralChatbox';
import IndividualChatbox from '@/shared/chats/IndividualChatbox';

interface Profile {
  id: number;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [request, setRequest] = useState<any[]>([]);
  const { onEvent, isSocketConnected } = useSocket();
  const [individualChats, setIndividualChats] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
  ]);

  const handleProfileClick = (profileId: number) => {
    const profile = profiles.find((profile) => profile.id === profileId);
    if (profile && !individualChats.find((chat) => chat.id === profileId)) {
      setIndividualChats([...individualChats, profile]);
    }
  };

  const handleCloseIndividualChat = (id: number) => {
    setIndividualChats(individualChats.filter((profile) => profile.id !== id));
  };

  const handleCloseGeneralChat = () => {
    // Close the general chat
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {};

  useEffect(() => {
    onEvent({
      event: EVENTS.REQUEST_DATA,
      handler: (response: any[]): void => {
        console.log(response);
        setRequest(response);
      },
    });
  }, [isSocketConnected]);

  return (
    <main className='w-full flex justify-center flex-col items-center h-full'>
      <h1 className='text-black'>Dashboard</h1>
      <MenteeRequest requests={request} onRefresh={onRefresh} />
      <button onClick={handleLogout} className='text-black'>
        logout
      </button>
      <GeneralChatbox
        profiles={profiles}
        onProfileClick={handleProfileClick}
        onClose={handleCloseGeneralChat}
      />
      {individualChats.map((profile, index) => (
        <IndividualChatbox
          key={profile.id}
          id={profile.id}
          messages={[profile.name]}
          onClose={() => handleCloseIndividualChat(profile.id)}
          position={index + 1} // Pass the position to the IndividualChatbox component
        />
      ))}
    </main>
  );
}

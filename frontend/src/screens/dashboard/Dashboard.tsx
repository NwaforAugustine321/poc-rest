'use client';

import { useAppSelector } from '@/hooks/storeshooks';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { AuthState } from '@/interfaces/auth.interface';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { logout } = useAuth();
  const { getMusic, getSubscription } = useApi();
  const [songs, setSongs] = useState([]);
  const [subscribedSongs, setSubscribedSongs] = useState([]);
  const { name } = useAppSelector((state: RootState): AuthState => state.auth);

  const handleGetMusic = async () => {
    try {
      const res = await getMusic();
      setSongs(res);
    } catch (error) {
      setSongs([]);
    }
  };

  const handleSubscribedMusic = async () => {
    try {
      const res = await getSubscription();
      setSubscribedSongs(res);
    } catch (error) {
      setSubscribedSongs([]);
    }
  };

   useEffect(() => {
     handleGetMusic();
   }, []);

   return (
     <main className='w-full flex justify-center flex-col items-center h-full'>
       <h1 className='text-black mb-[1rem]'>Dashboard</h1>
       <section className='w-full flex justify-center flex-row gap-[2rem]'>
         <div>
           <h1 className='text-black mb-[1rem]'>User</h1>
           <h1 className='text-black mb-[1rem]'>{name}</h1>
           <button
             onClick={logout}
             className='text-black border-[1px]  border-lime-400 p-[1rem]'
           >
             Log out
           </button>
         </div>
         <div>
           <h1 className='text-black mb-[1rem]'>Songs</h1>
           {songs.map((song: any) => {
             return (
               <section className='mb-[3rem]'>
                 <section className='flex gap-[0.5rem] items-center'>
                   <div>
                     <h1 className='text-black mb-[1rem]'>
                       Artist : {song?.artist}
                     </h1>
                     <h1 className='text-black mb-[1rem]'>
                       Title : {song?.title}
                     </h1>
                     <h1 className='text-black mb-[1rem]'>
                       Year : {song?.year}
                     </h1>
                   </div>
                   <Image
                     className='h-[50px] w-[50px]'
                     alt='artist-image'
                     height={10}
                     width={50}
                     src={song?.music_url ?? ''}
                   />
                 </section>
                 <button
                   onClick={logout}
                   className='text-black border-[1px]  border-lime-400 p-[0.4rem] w-[200px]'
                 >
                   subscribe
                 </button>
               </section>
             );
           })}
         </div>
         <div>
           <h1 className='text-black mb-[1rem]'>Query</h1>
         </div>
       </section>
     </main>
   );
}

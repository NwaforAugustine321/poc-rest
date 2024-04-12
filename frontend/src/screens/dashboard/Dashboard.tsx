'use client';

import { useAppSelector } from '@/hooks/storeshooks';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { AuthState, IQuery } from '@/interfaces/auth.interface';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { logout } = useAuth();
  const { getMusic, getSubscription, handleSubscribe, handleUnSubscribe } =
    useApi();
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState<IQuery>({
    title: '',
    artist: '',
    year: '',
  });
  const [subscribedSongs, setSubscribedSongs] = useState([]);
  const { name } = useAppSelector((state: RootState): AuthState => state.auth);

  const subscribe = async (id: string) => {
    await handleSubscribe(id);
    await handleSubscribedMusic();
    try {
    } catch (error: any) {
      if (error.status && error.status === 'ERROR') {
        alert(error?.errors?.message);
      }
    }
  };

  const unsubscribe = async (id: string) => {
    await handleUnSubscribe(id);
    await handleSubscribedMusic();
    try {
    } catch (error: any) {
      if (error.status && error.status === 'ERROR') {
        alert(error?.errors?.message);
      }
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

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setQuery((prev: any): IQuery => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleQuery = async () => {
    try {
      const res = await getMusic(query);
      setSongs(res);
    } catch (error) {
      setSongs([]);
    }
  };

  useEffect(() => {
    handleSubscribedMusic();
  }, []);

  return (
    <main className='w-full flex justify-center flex-col items-center h-full'>
      <h1 className='text-black mb-[2rem]'>Dashboard</h1>
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

        <section className='w-[400px] flex flex-col items-center'>
          {subscribedSongs.length === 0 ? (
            <div className='text-black'>
              <h1>No subscription found....</h1>
            </div>
          ) : (
            subscribedSongs.map((song: any) => {
              return (
                <section key={song?.musicId} className='mb-[3rem]'>
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
                    onClick={() => {
                      unsubscribe(song?.musicId);
                    }}
                    className='text-black border-[1px]  border-lime-400 p-[0.4rem] w-[200px]'
                  >
                    remove
                  </button>
                </section>
              );
            })
          )}
        </section>

        <div>
          <h1 className='text-black mb-[1rem]'>Query</h1>

          <input
            onChange={handleInputChange}
            name='title'
            placeholder='title'
            className='w-[400px] text-black block mb-[1rem] border-[1px]  border-lime-400'
          />

          <input
            onChange={handleInputChange}
            name='artist'
            placeholder='artist'
            className='w-[400px] text-black  block mb-[1rem] border-[1px]  border-lime-400'
          />

          <input
            onChange={handleInputChange}
            name='year'
            placeholder='year'
            className='w-[400px] text-black  block mb-[1rem] border-[1px]  border-lime-400'
          />

          <button
            className='text-black border-[1px]  border-lime-400 p-[1rem]'
            onClick={handleQuery}
          >
            Query
          </button>

          <div className='w-[400px] flex flex-col items-center'>
            <h1 className='text-black mb-[1rem]'>Songs</h1>
            {songs.length === 0 ? (
              <div className='text-black'>
                <h1>No song found....</h1>
              </div>
            ) : (
              songs.map((song: any, index: number) => {
                return (
                  <section key={index} className='mb-[3rem]'>
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
                      onClick={() => {
                        subscribe(song?.musicId);
                      }}
                      className='text-black border-[1px]  border-lime-400 p-[0.4rem] w-[200px]'
                    >
                      subscribe
                    </button>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';
import { useEffect, useState } from 'react';
import {
  registerServiceWorker,
  requestNotificationPermission,
} from '@/services/worker/worker.service';
import { Howl } from 'howler';
import { useSocket } from '@/context/socket.context';
import { EVENTS } from '@/constant';
import NotificationModal from '@/shared/modals/NotificationModal';

export default function ServiceWorkerProvider({ children }: any) {
  const { onEvent } = useSocket();
  const [openNotification, setOpenNotification] = useState(false);

  function playNotificationSound() {
    var sound = new Howl({
      src: ['/notification.mp3'],
      html5: true,
    });
    sound.play();
  }

  function showNotification(title: string, body: string) {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(title, { body });
      playNotificationSound();
    }
  }

  const initServiceWorker = async (): Promise<void> => {
    try {
      await registerServiceWorker();
      await requestNotificationPermission();
    } catch (error) {}
  };

  useEffect(() => {
    initServiceWorker();
    onEvent({
      event: EVENTS.POST_REQUEST,
      handler: (data: any) => {
        setOpenNotification(true);
        showNotification(data?.topic ?? '', data?.description ?? '');
      },
    });
  }, []);

  return (
    <>
      {children}
      <NotificationModal
        content='hello'
        onClose={() => setOpenNotification(false)}
        showModal={openNotification}
      />
    </>
  );
}

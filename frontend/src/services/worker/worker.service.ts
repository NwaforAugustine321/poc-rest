'use client';

// export const checkPermission = () => {
//   try {
//     if (!('serviceWorker' in navigator)) {
//       throw new Error('No Service Worker support!');
//     }
//     if (!('PushManager' in window)) {
//       throw new Error('No Push API Support!');
//     }
//   } catch (error) {
//     alert(error);
//   }
// };

let swRegistration: any = null;

export const registerServiceWorker = async () => {
  if (Notification.permission === 'granted') {
    swRegistration = await navigator.serviceWorker.register('service.js', {
      scope: '/',
    });
    return swRegistration;
  }
};

export const requestNotificationPermission = async () => {
  try {
    await window.Notification.requestPermission();
  } catch (error) {}
};

export const showLocalNotification = (title: string, body: any) => {
  // const options = {
  //   body: '<String>',
  //   icon: '<URL String>',
  //   image: '<URL String>',
  //   badge: '<URL String>',
  //   vibrate: '<Array of Integers>',
  //   sound: '<URL String>',
  // };
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  };
  if (swRegistration) {
    swRegistration.showNotification(title, options);
  }
};

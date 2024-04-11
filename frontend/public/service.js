const config = {
  publicKey:
    'BCA9A0MK4T6wLYgP8h8qQRInnUKwHXcccapAa8g4tv3xqZBCG3FMgUh4yL30ApZMCqSHHjg0kRUYqP7rgyeUbSo',
  privateKey: 'RQMBcifhI9MFCP8IwFmV1LRXuDcyMCyxIEkB_vc9Hms',
};

const saveSubscription = async (subscription) => {
  const SERVER_URL = 'http://localhost:4000/save-subscription';
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

const showLocalNotification = (title, body) => {
  try {
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
    self.registration.showNotification(title, options);
  } catch (error) {
    console.log(error, 'cant send');
  }
};

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(config.publicKey);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    await saveSubscription(subscription);
    console.log(subscription);
  } catch (err) {
    console.log('Error', err);
  }
});

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification('Yolo', event.data.text());
  } else {
    console.log('Push event but no data');
  }
});

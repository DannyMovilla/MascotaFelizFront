importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDISEbgMB4hLu4sgw9JyjYyz2uvcMYxS9g",
  authDomain: "storagemascotafeliz.firebaseapp.com",
  projectId: "storagemascotafeliz",
  storageBucket: "storagemascotafeliz.appspot.com",
  messagingSenderId: "1003557675944",
  appId: "1:1003557675944:web:c323cbf23ed6b37ee3f39d",
  measurementId: "G-4X9QDGQKBW",
});
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });
}

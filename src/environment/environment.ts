import { FirebaseOptions } from 'firebase/app';
import { YConfig } from 'angular-yandex-maps-v3';

interface Environment {
  production: boolean;
  firebaseConfig: FirebaseOptions;
  YConfig: YConfig;
}

export const environment: Environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'FIREBASE_API_KEY',
    authDomain: 'waynote-1d1d5.firebaseapp.com',
    databaseURL:
      'https://waynote-1d1d5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'waynote-1d1d5',
    storageBucket: 'waynote-1d1d5.firebasestorage.app',
    messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
    appId: 'FIREBASE_APP_ID',
    measurementId: 'FIREBASE_MEASUREMENT_ID',
  },
  YConfig: {
    apikey: 'YMAP_API_KEY',
    lang: 'ru_RU',
  },
};

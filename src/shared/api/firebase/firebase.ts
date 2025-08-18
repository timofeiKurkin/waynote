import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FirebaseOptions } from '@firebase/app-types';

const firebaseConfig: FirebaseOptions = {};

export const firebaseApp = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

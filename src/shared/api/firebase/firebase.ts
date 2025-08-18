import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../../environment/environment';

export const firebaseApp = initializeApp(environment.firebaseConfig);
// export const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  login_hint: 'user@example.com',
});

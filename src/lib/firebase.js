import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { writable } from 'svelte/store';

const firebaseConfig = {
	apiKey: 'AIzaSyCT-gt8UfVX_-IYvXlFaqpt_Hfrv6XhElc',
	authDomain: 'svelte-chat-43ef0.firebaseapp.com',
	projectId: 'svelte-chat-43ef0',
	storageBucket: 'svelte-chat-43ef0.appspot.com',
	messagingSenderId: '482103767977',
	appId: '1:482103767977:web:54463ef325abec24ea8ab8'
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInGoogle = () => {
	signInWithPopup(auth, provider);
};

export const user = writable(null);

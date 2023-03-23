import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword   } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpqaEm4YY_xwAaUE-zK_ESDU0lOnF8jls",
    authDomain: "pplacd-chat.firebaseapp.com",
    projectId: "pplacd-chat",
    storageBucket: "pplacd-chat.appspot.com",
    messagingSenderId: "303069983606",
    appId: "1:303069983606:web:c764275897d30a8b170057",
    measurementId: "G-C4ZVETL2WZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function logInWithCredentials(){
    const auth = getAuth()
    try {
       const response = await signInWithEmailAndPassword(auth, "testemail@gmail.com", "testpassword")
       console.log("response" , response)
        
       return { uid: response.user.uid, displayName: response.user.email };
    } catch (error) {
        console.log(error)
    }

}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages , logInWithCredentials };

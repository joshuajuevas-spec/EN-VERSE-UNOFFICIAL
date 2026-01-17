'use client';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// Helper function to create a user profile document in Firestore
const createUserProfileDocument = async (user: any, additionalData: any) => {
  if (!user) return;
  const userRef = doc(getFirestore(user.app), 'users', user.uid);
  
  const { displayName, email, photoURL } = user;
  const createdAt = serverTimestamp();

  try {
    // a set with merge `true` will create the doc if it doesn't exist, and merge the data if it does
    await setDoc(userRef, {
      displayName: additionalData.displayName || displayName,
      email,
      photoURL: photoURL || `https://picsum.photos/seed/${email}/200`,
      createdAt,
      ...additionalData,
    }, { merge: true });
  } catch (error) {
    console.error('Error creating user document', error);
  }
};


// Email and Password Sign Up
export const signUpWithEmail = async (auth: Auth, email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with the display name
    if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
    }
    // Create the user profile document in Firestore
    await createUserProfileDocument(userCredential.user, { displayName });
    return userCredential;
  } catch (error) {
    console.error("Error signing up with email and password", error);
    throw error;
  }
};

// Email and Password Sign In
export const signInWithEmail = async (auth: Auth, email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with email and password", error);
    throw error;
  }
};

// Google Sign In
export const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    // If it's a new user, create a profile document
    const additionalUserInfo = getAdditionalUserInfo(userCredential);
    if (additionalUserInfo?.isNewUser) {
        await createUserProfileDocument(userCredential.user, {});
    }
    return userCredential;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};


// Sign Out
export const signOutUser = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

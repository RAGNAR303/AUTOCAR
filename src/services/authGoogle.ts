import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConnection";

const provider = new GoogleAuthProvider()

export async function loginInGoogle() {
    try {
        const result =  await signInWithPopup(auth , provider)
        return result.user
        
    }catch (error){
    console.log("Não foi possivel efetuar o login" + error)
     throw error
    }
}
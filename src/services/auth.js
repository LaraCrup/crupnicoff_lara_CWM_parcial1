import supabase from "./supabase";
import { addUserProfile, getUserProfileByPK, updateUserProfile } from "./profile.js";

let user = {
    id: null,
    email: null,
    display_name: null,
    bio: null,
}
let observers = [];

loadCurrentUser();

async function loadCurrentUser(){
    const {data} = await supabase.auth.getUser();
    if(!data?.user){
        return null;
    }
    updateUser({
        id: data.user.id,
        email: data.user.email, 
    });
    loadCurrentUserProfile();
}

async function loadCurrentUserProfile(){
    try {
        const profile = await getUserProfileByPK(user.id);
        updateUser({
            ...profile,
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario', error);
        throw error;
    }

}

export async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.log('Error al registrarse:', error);
        throw error;
    }

    try {
        await addUserProfile({
            id: data.user.id,
            email,
        });
    } catch (error) {
        console.error('Error al crear el perfil del usuario:', error);
    }

    //Actualizamos los datos del usuario y notificamos a los observers
    updateUser({
        id: data.user.id,
        email: data.user.email, 
    });
    return data.user;
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.log('Error al hacer log in:', error);
        throw error;
    }

    updateUser({
        id: data.user.id,
        email: data.user.email, 
    });

    loadCurrentUserProfile();

    return data.user;
}

export async function logout() {
    supabase.auth.signOut();
    updateUser({
        id: null,
        email: null, 
    });
}

export async function subscribeToAuth(callback) {
    observers.push(callback);
    notify(callback)
}

function notify(callback) {
    callback({ ...user });
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}

function updateUser(data) {
    user = {
        ...user,
        ...data
    }
    notifyAll();
}

export async function updateAuthProfile(data){
    try {
        await updateUserProfile(user.id, {
            ...data
        });
        updateUser(data);
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario autenticado', error);
        throw error;
        
    }
}
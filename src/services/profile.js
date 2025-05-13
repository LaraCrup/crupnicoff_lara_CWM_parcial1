import supabase from "./supabase";

export async function addUserProfile(data) {
    const { error } = await supabase
        .from('profiles')
        .insert({
            ...data
        });
    if (error) {
        throw new Error('Error al guardar el perfil:'.error);
    }
}

export async function getUserProfileByPK(id) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id);
    if (error) {
        console.error('Error al guardar el perfil:', error);
        throw new Error('Error al guardar el perfil:'.error);
    }
    return data[0];
}

export async function updateUserProfile(id, data) {
    const { error } = await supabase
        .from('profiles')
        .update({
            ...data
        })
        .eq('id', id);
    if (error) {
        console.error('Error al editar el perfil:', error);
        throw new Error('Error al editar el perfil:'.error);
    }
}
import supabase from "./supabase.js";

export async function saveHabitDocument(data) {
    const { error } = await supabase
        .from('habit_updates')
        .insert({
            habit_id: data.habitId,
            user_id: data.userId,
            content: data.content,
        });

    if (error) {
        console.error('Error saving habit document:', error);
        throw error;
    }
    
    return { success: true };
}

export async function getAllHabitUpdates() {
    const { data, error } = await supabase
        .from('habit_updates')
        .select(`
            *,
            habits (
                title,
                goal_quantity,
                goal_unit,
                frequency
            ),
            profiles (
                display_name
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching habit updates:', error);
        throw error;
    }
    
    return data;
}

export async function getHabitUpdatesByUserId(userId) {
    const { data, error } = await supabase
        .from('habit_updates')
        .select(`
            *,
            habits (
                title,
                goal_quantity,
                goal_unit,
                frequency
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user habit updates:', error);
        throw error;
    }
    
    return data;
}

export async function saveCommentsPost(data) {
    const { error } = await supabase
        .from('comments')
        .insert({
            post_id: data.post_id,
            user_id: data.user_id,
            content: data.content,
        });

    if (error) {
        console.error('Error saving comment:', error);
        throw error;
    }
    
    return { success: true };
}

export async function getComments(postId) {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles:user_id (
                display_name
            )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
    return data;
}

async function getCommentWithProfile(commentId) {
    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            profiles:user_id (
                display_name
            )
        `)
        .eq('id', commentId)
        .single();

    if (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
    return data;
}

export async function suscribeToPostComments(callback){
    const chatChannel = supabase.channel('comments');
    chatChannel.on('postgres_changes', {
        schema: 'public',
        event: 'INSERT',
        table: 'comments',
    }, async (data) => {
        const commentWithProfile = await getCommentWithProfile(data.new.id);
        callback(commentWithProfile);
    }).subscribe();
}
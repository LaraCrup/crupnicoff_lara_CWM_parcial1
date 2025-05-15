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

export function subscribeToHabitUpdates(callback) {
    supabase
        .channel('habit_updates_channel')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'habit_updates'
            },
            async () => {
                const updates = await getAllHabitUpdates();
                callback(updates);
            }
        )
        .subscribe();
}

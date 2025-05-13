import supabase from "./supabase.js";  

export async function getMyHabits(user_id) {
    const { data, error } = await supabase.from('habits')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })  
        .limit(10);
    if (error) {
        console.error('Error fetching habits:', error); 
        throw error;
    }
    return data;
}

export async function saveNewHabit(data) {
    const { error } = await supabase
        .from('habits')
        .insert({
            title: data.habit.title,
            goal_quantity: data.habit.goal_quantity,
            goal_unit: data.habit.goal_unit,
            frequency: data.habit.frequency,
            user_id: data.user_id,
        });

    if (error) {
        console.error('Error saving habit:', error);
        throw error;
    }
    
    return { success: true };
}

export async function deleteHabit(habitId) {
    const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

    if (error) {
        console.error('Error deleting habit:', error);
        throw error;
    }
    
    return { success: true };
}

export async function updateHabit(habitId, data) {
    const { error } = await supabase
        .from('habits')
        .update({
            title: data.title,
            goal_quantity: data.goal_quantity,
            goal_unit: data.goal_unit,
            frequency: data.frequency
        })
        .eq('id', habitId);

    if (error) {
        console.error('Error updating habit:', error);
        throw error;
    }
    
    return { success: true };
}

export async function getHabitById(habitId) {
    const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('id', habitId)
        .single();

    if (error) {
        console.error('Error fetching habit:', error);
        throw error;
    }

    return data;
}
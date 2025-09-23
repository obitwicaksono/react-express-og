const supabase = require('../config/database');

const Users = {
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if (error) throw error;
    return data;
  },

  getUserById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  createUser: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    if (error) throw error;
    return data[0];
  },

  updateUser: async (id, userData) => {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  deleteUser: async (id) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

module.exports = Users;
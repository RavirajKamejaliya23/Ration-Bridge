// Mock authentication for development when Supabase is having issues
const mockUsers = [
  { 
    id: 'mock-1', 
    email: 'ansh@gmail.com', 
    password: 'abc123',
    full_name: 'Ansh Kumar',
    user_type: 'volunteer'
  },
  { 
    id: 'mock-2', 
    email: 'test@test.com', 
    password: 'test123',
    full_name: 'Test User',
    user_type: 'donor'
  }
];

const mockAuth = {
  async login(email, password) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return {
        success: true,
        user: { id: user.id, email: user.email, full_name: user.full_name, user_type: user.user_type },
        token: 'mock-token-' + user.id
      };
    }
    throw new Error('Invalid credentials');
  },

  async register(userData) {
    const newUser = {
      id: 'mock-' + Date.now(),
      email: userData.email,
      password: userData.password,
      full_name: userData.full_name,
      user_type: userData.user_type
    };
    mockUsers.push(newUser);
    return {
      success: true,
      user: { id: newUser.id, email: newUser.email, full_name: newUser.full_name, user_type: newUser.user_type },
      token: 'mock-token-' + newUser.id
    };
  }
};

module.exports = mockAuth;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Get a user (you can change the query)
    const user = await User.findOne().select('-password');
    
    if (!user) {
      console.log('No users found in database');
      process.exit(0);
    }

    console.log('📊 User Data:');
    console.log('─'.repeat(50));
    console.log('Username:', user.username);
    console.log('Email:', user.email);
    console.log('Avatar:', user.avatar || '(not set)');
    console.log('Bio:', user.bio || '(not set)');
    console.log('Location:', user.location || '(not set)');
    console.log('Website:', user.website || '(not set)');
    console.log('─'.repeat(50));
    
    if (user.avatar) {
      console.log('\n✓ Avatar URL exists:', user.avatar);
      console.log('  Full URL length:', user.avatar.length);
      console.log('  Starts with http:', user.avatar.startsWith('http'));
    } else {
      console.log('\n⚠ No avatar set for this user');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUser();

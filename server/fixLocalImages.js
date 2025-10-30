// Auto-migration script to fix old local image URLs
// This automatically clears old local URLs so users can re-upload through Cloudinary

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import models
import Post from './models/post.js';
import User from './models/user.js';

async function autoFixImages() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Fix posts with local image URLs
    const postsWithLocalImages = await Post.find({
      featuredImage: { $regex: /^(\/uploads\/|\/var\/task\/|http:\/\/localhost)/ }
    });

    console.log(`Found ${postsWithLocalImages.length} posts with local image URLs`);

    if (postsWithLocalImages.length > 0) {
      console.log('\nClearing old local image URLs from posts...');
      for (const post of postsWithLocalImages) {
        console.log(`  ✓ Clearing image for: "${post.title}"`);
        post.featuredImage = '';
        await post.save();
      }
      console.log(`\n✅ Cleared images from ${postsWithLocalImages.length} posts`);
    }

    // Fix users with local avatar URLs
    const usersWithLocalAvatars = await User.find({
      avatar: { $regex: /^(\/uploads\/|\/var\/task\/|http:\/\/localhost)/ }
    });

    console.log(`\nFound ${usersWithLocalAvatars.length} users with local avatar URLs`);

    if (usersWithLocalAvatars.length > 0) {
      console.log('\nSetting default avatars for users...');
      for (const user of usersWithLocalAvatars) {
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=4F46E5&color=fff&size=200`;
        console.log(`  ✓ Setting default avatar for: ${user.username}`);
        user.avatar = defaultAvatar;
        await user.save();
      }
      console.log(`\n✅ Updated avatars for ${usersWithLocalAvatars.length} users`);
    }

    if (postsWithLocalImages.length === 0 && usersWithLocalAvatars.length === 0) {
      console.log('\n✅ No migration needed! All images are already using valid URLs.');
    } else {
      console.log('\n' + '='.repeat(80));
      console.log('✅ MIGRATION COMPLETE!');
      console.log('='.repeat(80));
      console.log('\nNext steps:');
      console.log('1. Posts with cleared images can now have new images uploaded via Cloudinary');
      console.log('2. Users can update their avatars through the profile page');
      console.log('3. All new uploads will automatically go to Cloudinary');
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');

  } catch (error) {
    console.error('❌ Migration error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run migration
autoFixImages();

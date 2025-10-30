// Migration script to update old local image URLs to Cloudinary URLs
// This script identifies posts with local image URLs that no longer exist

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

async function migrateImages() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Find all posts with local image URLs
    const postsWithLocalImages = await Post.find({
      featuredImage: { $regex: /^(\/uploads\/|\/var\/task\/|http:\/\/localhost)/ }
    });

    console.log(`Found ${postsWithLocalImages.length} posts with local image URLs\n`);

    if (postsWithLocalImages.length === 0) {
      console.log('No posts need migration. All images are already using external URLs!');
      await mongoose.connection.close();
      return;
    }

    // Display posts that need fixing
    console.log('Posts that need updating:');
    console.log('=' .repeat(80));
    postsWithLocalImages.forEach((post, index) => {
      console.log(`${index + 1}. Title: ${post.title}`);
      console.log(`   Current Image: ${post.featuredImage}`);
      console.log(`   Post ID: ${post._id}`);
      console.log('-'.repeat(80));
    });

    console.log('\nOptions to fix:');
    console.log('1. Remove the featured images (set to empty string)');
    console.log('2. Set a default placeholder image');
    console.log('3. Manually update each post with a new Cloudinary URL\n');

    // Option 1: Clear featured images
    console.log('Would you like to clear these featured images? (You can re-upload later)');
    console.log('To proceed, uncomment the code below and run this script again.\n');

    // Uncomment below to clear featured images:
    /*
    for (const post of postsWithLocalImages) {
      post.featuredImage = '';
      await post.save();
      console.log(`Cleared image for: ${post.title}`);
    }
    console.log('\nMigration complete! Featured images have been cleared.');
    */

    // Option 2: Set a default placeholder
    // Uncomment below to set a placeholder image:
    /*
    const placeholderUrl = 'https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=Blog+Post';
    for (const post of postsWithLocalImages) {
      post.featuredImage = placeholderUrl;
      await post.save();
      console.log(`Set placeholder for: ${post.title}`);
    }
    console.log('\nMigration complete! Placeholder images have been set.');
    */

    // Check users with local avatar URLs
    const usersWithLocalAvatars = await User.find({
      avatar: { $regex: /^(\/uploads\/|\/var\/task\/|http:\/\/localhost)/ }
    });

    if (usersWithLocalAvatars.length > 0) {
      console.log(`\n\nFound ${usersWithLocalAvatars.length} users with local avatar URLs:`);
      console.log('=' .repeat(80));
      usersWithLocalAvatars.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}`);
        console.log(`   Current Avatar: ${user.avatar}`);
        console.log(`   User ID: ${user._id}`);
        console.log('-'.repeat(80));
      });

      // Uncomment below to clear user avatars:
      /*
      for (const user of usersWithLocalAvatars) {
        user.avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.username);
        await user.save();
        console.log(`Set default avatar for: ${user.username}`);
      }
      console.log('\nUser avatar migration complete!');
      */
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    console.log('\nTo apply changes, uncomment the relevant section in this script and run again.');

  } catch (error) {
    console.error('Migration error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run migration
migrateImages();

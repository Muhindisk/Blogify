import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const fixAvatarURLs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Get the base URL from environment or use default
    const baseURL = process.env.BASE_URL || 'http://localhost:5000';

    // Find all users with avatar URLs that don't start with http
    const users = await User.find({
      avatar: { $exists: true, $ne: null, $ne: '' }
    });

    console.log(`Found ${users.length} users with avatars\n`);

    let fixedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      if (user.avatar && !user.avatar.startsWith('http')) {
        const oldAvatar = user.avatar;
        // Convert relative path to absolute URL
        const newAvatar = `${baseURL}${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`;
        
        user.avatar = newAvatar;
        await user.save();
        
        console.log(`✓ Fixed: ${user.username}`);
        console.log(`  Old: ${oldAvatar}`);
        console.log(`  New: ${newAvatar}\n`);
        fixedCount++;
      } else {
        console.log(`⊘ Skipped: ${user.username} (already has full URL)`);
        skippedCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`  Fixed: ${fixedCount}`);
    console.log(`  Skipped: ${skippedCount}`);
    console.log(`  Total: ${users.length}`);

    console.log('\n✓ Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAvatarURLs();

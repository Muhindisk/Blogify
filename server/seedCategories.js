import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

// Load environment variables
dotenv.config();

// Default categories to seed
const defaultCategories = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Programming', slug: 'programming' },
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Mobile Development', slug: 'mobile-development' },
  { name: 'Data Science', slug: 'data-science' },
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Cloud Computing', slug: 'cloud-computing' },
  { name: 'Cybersecurity', slug: 'cybersecurity' },
  { name: 'UI/UX Design', slug: 'ui-ux-design' },
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Travel', slug: 'travel' },
  { name: 'Food', slug: 'food' },
  { name: 'Health & Fitness', slug: 'health-fitness' },
  { name: 'Business', slug: 'business' },
  { name: 'Finance', slug: 'finance' },
  { name: 'Education', slug: 'education' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'News', slug: 'news' }
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Check if categories already exist
    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ Database already has ${existingCount} categories.`);
      console.log('Do you want to:');
      console.log('  1. Skip seeding (keep existing)');
      console.log('  2. Add only missing categories');
      console.log('  3. Delete all and reseed');
      console.log('\nRun with argument: node seedCategories.js [skip|add|reset]');
      
      const arg = process.argv[2];
      
      if (!arg || arg === 'skip') {
        console.log('\n✓ Skipping seed. Existing categories preserved.');
        process.exit(0);
      } else if (arg === 'reset') {
        console.log('\n⚠ Deleting all existing categories...');
        await Category.deleteMany({});
        console.log('✓ Existing categories deleted');
      }
    }

    // Insert categories
    console.log('\n📦 Seeding categories...');
    let addedCount = 0;
    let skippedCount = 0;

    for (const category of defaultCategories) {
      try {
        const existing = await Category.findOne({ slug: category.slug });
        if (existing) {
          console.log(`  ⊘ Skipped: ${category.name} (already exists)`);
          skippedCount++;
        } else {
          await Category.create(category);
          console.log(`  ✓ Added: ${category.name}`);
          addedCount++;
        }
      } catch (err) {
        console.log(`  ✗ Failed: ${category.name} - ${err.message}`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`  Added: ${addedCount}`);
    console.log(`  Skipped: ${skippedCount}`);
    console.log(`  Total in DB: ${await Category.countDocuments()}`);
    
    console.log('\n✓ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();

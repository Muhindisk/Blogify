// Post.js - Mongoose model for blog posts

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    featuredImage: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    excerpt: {
      type: String,
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }],
    tags: [String],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Create slug from title before saving
PostSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

// Virtual for post URL
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug || this._id}`;
});

// Method to add a comment
PostSchema.methods.addComment = function (userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

// Method to increment view count
PostSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};

// Method to toggle like
PostSchema.methods.toggleLike = function (userId) {
  // Initialize likes array if it doesn't exist
  if (!this.likes) {
    this.likes = [];
  }
  
  const userIdString = userId.toString();
  const likeIndex = this.likes.findIndex(id => id.toString() === userIdString);
  
  if (likeIndex === -1) {
    // User hasn't liked, add like
    this.likes.push(userId);
  } else {
    // User has liked, remove like
    this.likes.splice(likeIndex, 1);
  }
  
  return this.save();
};

// Method to check if user has liked
PostSchema.methods.isLikedBy = function (userId) {
  if (!this.likes || !Array.isArray(this.likes)) {
    return false;
  }
  return this.likes.some(id => id.toString() === userId.toString());
};

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 
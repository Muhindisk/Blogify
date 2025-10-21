# Blogify Server

A robust Node.js/Express backend API for the Blogify blogging platform. Built with Express 5, MongoDB/Mongoose, JWT authentication, and comprehensive features for managing blog posts, users, comments, and more.

## 🚀 Features

### Core Features
- **RESTful API**: Well-structured REST API endpoints
- **User Authentication**: JWT-based authentication and authorization
- **Blog Post Management**: CRUD operations for blog posts
- **User Management**: User registration, login, profile management
- **Category System**: Dynamic category management
- **Comment System**: Nested comments with replies
- **File Upload**: Image upload with Multer (avatars, featured images)
- **Search & Filter**: Search posts by title/content, filter by category
- **Pagination**: Efficient pagination for large datasets

### Social Features
- **Follow System**: Users can follow/unfollow each other
- **Notifications**: Real-time notifications for likes, comments, follows
- **Like System**: Like posts and comments
- **Comment Counts**: Track comment counts per post

### Security Features
- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **CORS**: Configured Cross-Origin Resource Sharing
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Admin and user roles

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: v6.0 or higher (local or Atlas)

## 🛠️ Installation

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   Create a `.env` file in the server directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**:
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogify?retryWrites=true&w=majority
   ```

5. **Seed the database** (optional but recommended):
   ```bash
   # Seed categories
   npm run seed:categories
   
   # Reset and reseed categories
   npm run seed:categories:reset
   ```

6. **Start the server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

7. **Verify the server is running**:
   Navigate to `http://localhost:5000` - you should see a welcome message.

## 📦 Dependencies

### Core Dependencies
- **express** (^5.1.0): Web framework
- **mongoose** (^8.19.1): MongoDB ODM
- **bcryptjs** (^3.0.2): Password hashing
- **jsonwebtoken** (^9.0.2): JWT authentication
- **cors** (^2.8.5): Cross-Origin Resource Sharing
- **dotenv** (^17.2.3): Environment variable management
- **multer** (^2.0.2): File upload handling
- **express-validator** (^7.2.1): Request validation
- **axios** (^1.12.2): HTTP client

### Dev Dependencies
- **nodemon** (^3.1.10): Auto-restart during development

## 📁 Project Structure

```
server/
├── controllers/        # Route controllers
│   ├── authController.js          # Authentication logic
│   ├── categoryController.js      # Category management
│   ├── commentController.js       # Comment operations
│   ├── contactController.js       # Contact form handling
│   ├── postController.js          # Blog post CRUD
│   ├── userController.js          # User management
│   └── validationMiddleware.js    # Input validation
├── middleware/         # Custom middleware
│   └── authMiddleware.js          # JWT verification
├── models/            # Mongoose schemas
│   ├── Category.js               # Category schema
│   ├── Comment.js                # Comment schema
│   ├── Contact.js                # Contact form schema
│   ├── Post.js                   # Blog post schema
│   └── User.js                   # User schema
├── routes/            # API routes
│   ├── auth.js                   # Auth routes
│   ├── categories.js             # Category routes
│   ├── comments.js               # Comment routes
│   ├── contact.js                # Contact routes
│   ├── posts.js                  # Post routes
│   └── users.js                  # User routes
├── uploads/           # Uploaded files directory
├── .env               # Environment variables (create this)
├── .env.example       # Example environment file
├── .gitignore         # Git ignore rules
├── checkUser.js       # User verification script
├── fixAvatarURLs.js   # Avatar URL migration script
├── seedCategories.js  # Category seeding script
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String (URL),
  bio: String,
  followers: [ObjectId],
  following: [ObjectId],
  notifications: [{
    type: String,
    message: String,
    link: String,
    read: Boolean,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: 'User', required),
  featuredImage: String (URL),
  categories: [ObjectId] (ref: 'Category'),
  tags: [String],
  status: String (enum: ['draft', 'published'], default: 'draft'),
  likes: [ObjectId] (ref: 'User'),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  content: String (required),
  author: ObjectId (ref: 'User', required),
  post: ObjectId (ref: 'Post', required),
  parentComment: ObjectId (ref: 'Comment'), // For nested replies
  replies: [ObjectId] (ref: 'Comment'),
  likes: [ObjectId] (ref: 'User'),
  isEdited: Boolean (default: false),
  editedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  status: String (enum: ['pending', 'read', 'replied'], default: 'pending'),
  replyMessage: String,
  repliedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛣️ API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/:id` | Get user by ID | No |
| PUT | `/:id` | Update user profile | Yes (Owner) |
| POST | `/:id/follow` | Follow/unfollow user | Yes |
| POST | `/:id/avatar` | Upload avatar | Yes (Owner) |
| GET | `/:id/posts` | Get user's posts | No |
| GET | `/:id/followers` | Get user's followers | No |
| GET | `/:id/following` | Get user's following | No |

### Post Routes (`/api/posts`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all posts (paginated) | No |
| GET | `/:id` | Get single post | No |
| POST | `/` | Create new post | Yes |
| PUT | `/:id` | Update post | Yes (Author/Admin) |
| DELETE | `/:id` | Delete post | Yes (Author/Admin) |
| POST | `/:id/like` | Toggle like on post | Yes |
| POST | `/upload` | Upload featured image | Yes |

### Comment Routes (`/api/comments`, `/api/posts/:postId/comments`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/:postId/comments` | Get post comments | No |
| POST | `/posts/:postId/comments` | Create comment/reply | Yes |
| PUT | `/comments/:id` | Update comment | Yes (Author) |
| DELETE | `/comments/:id` | Delete comment | Yes (Author) |
| POST | `/comments/:id/like` | Toggle like on comment | Yes |

### Category Routes (`/api/categories`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all categories | No |
| GET | `/:id` | Get single category | No |
| POST | `/` | Create category | Yes (Admin) |
| PUT | `/:id` | Update category | Yes (Admin) |
| DELETE | `/:id` | Delete category | Yes (Admin) |

### Notification Routes (`/api/notifications`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user notifications | Yes |
| PUT | `/read` | Mark all as read | Yes |
| DELETE | `/:id` | Delete notification | Yes |

### Contact Routes (`/api/contact`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Submit contact form | No |
| GET | `/` | Get all contacts | Yes (Admin) |
| PUT | `/:id` | Update contact status | Yes (Admin) |

## 🔐 Authentication & Authorization

### JWT Authentication
The server uses JSON Web Tokens for authentication:

```javascript
// Generate token on login/register
const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);
```

### Protected Routes
Use the `protect` middleware:

```javascript
import { protect } from '../middleware/authMiddleware.js';

router.post('/posts', protect, createPost);
```

### Authorization Headers
Client must include token in requests:
```
Authorization: Bearer <token>
```

### User Roles
- **user**: Can create posts, comments, like, follow
- **admin**: Full access including category management, user management

## 📝 Request Validation

Using express-validator for input validation:

```javascript
// Example: Post creation validation
export const validatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 50 }).withMessage('Content must be at least 50 characters')
];
```

## 📤 File Upload

### Configuration
- **Storage**: Local filesystem (`/uploads` directory)
- **Max File Size**: 5MB
- **Allowed Types**: Images (JPEG, PNG, GIF, WebP)
- **URL Format**: `http://localhost:5000/uploads/filename.ext`

### Upload Endpoints
- Avatar upload: `POST /api/users/:id/avatar`
- Post image upload: `POST /api/posts/upload`

### Multer Configuration
```javascript
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});
```

## 🔔 Notification System

Notifications are stored in the User model and created automatically:

### Notification Types
- **like**: User liked your post
- **comment**: User commented on your post
- **follow**: User followed you
- **reply**: User replied to your comment

### Creating Notifications
```javascript
await User.findByIdAndUpdate(postAuthorId, {
  $push: {
    notifications: {
      type: 'comment',
      message: `${user.username} commented on your post`,
      link: `/posts/${postId}`,
      read: false,
      createdAt: new Date()
    }
  }
});
```

## 🧪 Available Scripts

### Development
```bash
npm run dev
```
Starts the server with nodemon (auto-restart on changes)

### Production
```bash
npm start
```
Starts the server in production mode

### Seed Categories
```bash
npm run seed:categories
```
Adds 20 default categories to the database

### Reset & Seed Categories
```bash
npm run seed:categories:reset
```
Removes all categories and seeds fresh ones

## 🛠️ Utility Scripts

### Check User Data
```bash
node checkUser.js
```
Displays user information for debugging

### Fix Avatar URLs
```bash
node fixAvatarURLs.js
```
Migrates relative avatar URLs to absolute URLs

### Seed Categories
```bash
node seedCategories.js [reset]
```
Seeds default categories (optional reset flag)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB connection failed**
   ```bash
   # Check if MongoDB is running
   mongo --version
   mongod --version
   
   # Start MongoDB service
   # Windows: net start MongoDB
   # Mac: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   ```

2. **Port already in use**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

3. **JWT authentication errors**
   - Verify JWT_SECRET in .env
   - Check token expiration
   - Ensure token is sent in Authorization header

4. **File upload errors**
   - Check uploads directory exists and has write permissions
   - Verify file size is under 5MB
   - Ensure file type is an image

5. **CORS errors**
   - Check CORS configuration in server.js
   - Verify frontend URL is allowed
   - Check request headers

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit .env file
   - Use strong JWT_SECRET
   - Change default passwords

2. **Password Security**
   - Bcrypt with salt rounds: 10
   - Never log passwords
   - Minimum password length: 6 characters

3. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database operations
   - Use express-validator

4. **Error Handling**
   - Don't expose stack traces in production
   - Log errors for debugging
   - Return generic error messages to users

5. **Rate Limiting** (Recommended)
   ```bash
   npm install express-rate-limit
   ```

6. **Helmet** (Recommended)
   ```bash
   npm install helmet
   ```

## 🚀 Deployment

### Prepare for Production

1. **Update environment variables**:
   ```env
   NODE_ENV=production
   MONGODB_URI=<production-mongodb-uri>
   JWT_SECRET=<strong-secret-key>
   PORT=5000
   ```

2. **Set secure cookies** (if using):
   ```javascript
   res.cookie('token', token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'strict'
   });
   ```

### Deploy to Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login and create app**:
   ```bash
   heroku login
   heroku create blogify-api
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=<uri>
   heroku config:set JWT_SECRET=<secret>
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### Deploy to Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize**:
   ```bash
   railway login
   railway init
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

### Deploy to Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### MongoDB Atlas Setup

1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Update MONGODB_URI in .env

## 📊 Monitoring & Logging

### Recommended Tools
- **Morgan**: HTTP request logger
- **Winston**: Advanced logging
- **PM2**: Process management
- **New Relic**: Performance monitoring

### Example Morgan Setup
```javascript
import morgan from 'morgan';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
```

## 🧪 Testing (Recommended)

### Setup Jest & Supertest
```bash
npm install --save-dev jest supertest
```

### Example Test
```javascript
import request from 'supertest';
import app from '../server.js';

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

## 📄 API Documentation

### Using Postman
Import the following endpoints into Postman for testing:

1. Set base URL: `http://localhost:5000/api`
2. Add Authorization header with Bearer token
3. Test all endpoints

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create new collection
3. Add requests with examples

### Generate Swagger Docs (Optional)
```bash
npm install swagger-jsdoc swagger-ui-express
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the client README for frontend issues
- Open an issue in the repository

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 📜 License

This project is part of the MERN Stack Integration assignment.

---

**Happy Coding! 🚀**

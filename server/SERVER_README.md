# Blog Application Server

A RESTful API server for the MERN blog application built with Node.js, Express, and MongoDB.

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 📝 **Post Management** - CRUD operations for blog posts
- 🏷️ **Categories & Tags** - Organize content effectively
- 👤 **User Management** - User registration and profile management
- 🔍 **Search & Filter** - Search posts by title/content, filter by category
- 📄 **Pagination** - Efficient data pagination
- ✅ **Validation** - Request validation with express-validator
- 🛡️ **Security** - Password hashing with bcryptjs

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/posts` | Get all posts (with pagination) | Public |
| GET | `/api/posts/:id` | Get single post | Public |
| POST | `/api/posts` | Create new post | Private |
| PUT | `/api/posts/:id` | Update post | Private |
| DELETE | `/api/posts/:id` | Delete post | Private |

### Categories

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/categories` | Get all categories | Public |
| POST | `/api/categories` | Create category | Private/Admin |

## Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my first post...",
  "featuredImage": "https://example.com/image.jpg",
  "categories": ["507f1f77bcf86cd799439011"],
  "tags": ["javascript", "nodejs"],
  "status": "published"
}
```

### Get Posts (with pagination and search)
```http
GET /api/posts?page=1&limit=10&search=javascript
```

**Response:**
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Blog Post",
      "content": "Post content...",
      "author": {
        "_id": "507f191e810c19729de860ea",
        "username": "john_doe"
      },
      "categories": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Technology"
        }
      ],
      "tags": ["javascript", "nodejs"],
      "createdAt": "2025-10-20T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalPosts": 45,
    "limit": 10
  }
}
```

## Project Structure

```
server/
├── controllers/        # Request handlers
│   └── postController.js
├── middleware/         # Custom middleware
│   ├── authMiddleware.js
│   └── validationMiddleware.js
├── models/            # Mongoose models
│   ├── Category.js
│   ├── post.js
│   └── user.js
├── routes/            # API routes
│   ├── auth.js
│   ├── categories.js
│   └── posts.js
├── .env               # Environment variables
├── .env.example       # Example environment file
├── package.json
└── server.js          # Entry point
```

## Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin']),
  avatar: String,
  timestamps: true
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  featuredImage: String,
  slug: String (unique),
  excerpt: String,
  author: ObjectId (ref: 'User'),
  categories: [ObjectId] (ref: 'Category'),
  tags: [String],
  status: String (enum: ['draft', 'published']),
  viewCount: Number,
  timestamps: true
}
```

### Category Model
```javascript
{
  name: String (required, unique),
  slug: String (unique, auto-generated),
  timestamps: true
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for 30 days.

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | Required |
| JWT_SECRET | Secret key for JWT | Required |
| NODE_ENV | Environment (development/production) | development |

## Security Best Practices

- Passwords are hashed using bcryptjs with salt rounds of 12
- JWT tokens include expiration
- MongoDB connection uses environment variables
- CORS is enabled for cross-origin requests
- Request validation on all POST/PUT endpoints

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity to MongoDB Atlas (if using cloud)

### Authentication Errors
- Verify JWT_SECRET is set in .env
- Check token format in Authorization header
- Ensure token hasn't expired

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

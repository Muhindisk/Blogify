# Blogify Client

A modern, feature-rich React-based frontend for the Blogify blogging platform. Built with React 19, Vite, and Tailwind CSS, offering a seamless user experience with dark mode support, real-time notifications, and social features.

## 🚀 Features

### Core Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Write and format blog posts with ease
- **Image Upload**: Upload featured images for blog posts and profile avatars
- **Category System**: Organize posts by categories with filtering
- **Tag Support**: Add tags to posts for better discoverability
- **Search Functionality**: Search posts by title and content
- **Pagination**: Navigate through posts efficiently

### Social Features
- **User Profiles**: View and edit user profiles
- **Follow System**: Follow/unfollow other users
- **Notifications**: Real-time notifications for likes, comments, and follows
- **Comments**: Nested comment system with replies
- **Like System**: Like posts and comments
- **Comment Counter**: View comment counts on post cards

### UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first design that works on all devices
- **Collapsible Sidebar**: Easy navigation with collapsible left sidebar
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Password Visibility Toggle**: Show/hide password while typing
- **Avatar Fallbacks**: Gradient backgrounds when no profile picture

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Backend Server**: The server must be running (see server README)

## 🛠️ Installation

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** (if needed):
   
   Create a `.env` file in the client directory if you need to customize the API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Dependencies

### Core Dependencies
- **react** (^19.1.1): UI library
- **react-dom** (^19.1.1): React DOM rendering
- **react-router-dom** (^7.9.4): Client-side routing
- **axios** (^1.12.2): HTTP client for API requests
- **tailwindcss** (^3.4.18): Utility-first CSS framework

### Dev Dependencies
- **vite** (^7.1.7): Fast build tool and dev server
- **@vitejs/plugin-react** (^5.0.4): React plugin for Vite
- **eslint** (^9.36.0): Code linting
- **autoprefixer** (^10.4.21): PostCSS plugin for vendor prefixes
- **postcss** (^8.5.6): CSS transformations

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   │   ├── Comments.jsx        # Comment system
│   │   ├── Footer.jsx          # Site footer
│   │   ├── ImageUpload.jsx     # Image upload component
│   │   ├── Navbar.jsx          # Top navigation
│   │   ├── ScrollToTop.jsx     # Scroll utility
│   │   └── Sidebar.jsx         # Left sidebar navigation
│   ├── context/        # React Context providers
│   │   └── AppContext.jsx      # Global state management
│   ├── hooks/          # Custom React hooks
│   │   └── useApi.js           # API request hook
│   ├── pages/          # Page components
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact form
│   │   ├── CookiePolicy.jsx    # Cookie policy
│   │   ├── CreatePost.jsx      # Create new post
│   │   ├── Disclaimer.jsx      # Disclaimer page
│   │   ├── EditPost.jsx        # Edit existing post
│   │   ├── EditProfile.jsx     # Edit user profile
│   │   ├── Home.jsx            # Home page with posts
│   │   ├── Login.jsx           # Login page
│   │   ├── Notifications.jsx   # Notifications page
│   │   ├── PostDetail.jsx      # Single post view
│   │   ├── PrivacyPolicy.jsx   # Privacy policy
│   │   ├── Register.jsx        # Registration page
│   │   ├── TermsOfService.jsx  # Terms of service
│   │   └── UserProfile.jsx     # User profile view
│   ├── services/       # API services
│   │   └── api.js              # Axios configuration
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎨 Components Overview

### Core Components

#### Navbar
- Site-wide navigation
- User menu with profile and notifications
- Dark mode toggle
- Responsive mobile menu

#### Sidebar
- Left navigation panel
- Links to all major pages
- Collapsible functionality
- Category links

#### Footer
- Site information
- Popular categories
- Legal links (Privacy, Terms, etc.)
- Social media links

#### Comments
- Nested comment system
- Reply to comments
- Edit/delete own comments
- Like comments
- Author avatars

#### ImageUpload
- Drag-and-drop image upload
- File size validation (max 5MB)
- Image preview
- Cropping support

### Page Components

#### Home
- Post listing with pagination
- Category filtering
- Search functionality
- Like and comment counters
- Featured images

#### PostDetail
- Full post content
- Author information
- Like button
- Comment section
- Edit/delete for authors

#### CreatePost/EditPost
- Rich text editor
- Image upload
- Category selection
- Tag input
- Draft/publish options

#### UserProfile
- User information
- Follow/unfollow button
- User's posts
- Follower/following counts

#### Login/Register
- Form validation
- Password visibility toggle
- Error handling
- Auto-redirect if logged in

#### Notifications
- Real-time notification feed
- Mark as read functionality
- Notification types: likes, comments, follows
- Time stamps

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### Tailwind Configuration (`tailwind.config.js`)
- Custom color palette with primary colors
- Dark mode support (class-based)
- Extended spacing and typography
- Responsive breakpoints

### API Configuration (`src/services/api.js`)
- Axios instance with base URL
- Request interceptors for auth tokens
- Response interceptors for error handling
- Token refresh logic

## 🎯 State Management

The app uses React Context API for global state management:

### AppContext
- **User State**: Current logged-in user information
- **Authentication**: Login/logout functionality
- **Theme**: Dark mode toggle
- **Notifications**: Notification management
- **Sidebar**: Sidebar collapse state

### Actions
- `LOGIN`: Set user after successful login
- `LOGOUT`: Clear user data
- `UPDATE_USER`: Update user profile
- `ADD_NOTIFICATION`: Add new notification
- `MARK_NOTIFICATIONS_READ`: Mark notifications as read
- `TOGGLE_SIDEBAR`: Toggle sidebar visibility
- `TOGGLE_DARK_MODE`: Toggle dark mode

## 🔐 Authentication Flow

1. User submits login credentials
2. Frontend sends request to `/api/auth/login`
3. Server validates and returns JWT token
4. Token stored in localStorage
5. Token included in Authorization header for protected routes
6. User data stored in Context
7. Protected routes check for valid token

## 🌐 API Integration

The client communicates with the backend API:

### Base URL
```javascript
const API_URL = 'http://localhost:5000/api'
```

### Endpoints Used
- **Auth**: `/auth/login`, `/auth/register`, `/auth/me`
- **Posts**: `/posts`, `/posts/:id`, `/posts/:id/like`
- **Users**: `/users/:id`, `/users/:id/follow`, `/users/:id/avatar`
- **Comments**: `/posts/:postId/comments`, `/comments/:id`
- **Categories**: `/categories`
- **Notifications**: `/notifications`
- **Contact**: `/contact`

### Request Interceptors
```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configurations:

- **Color Scheme**: Primary colors for branding
- **Dark Mode**: Automatic dark mode support
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and loading states

### Custom Styles
Additional custom CSS in `index.css`:
- Global resets
- Custom scrollbar
- Typography improvements
- Animation utilities

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

Features:
- Mobile-friendly navigation
- Responsive grid layouts
- Touch-friendly buttons
- Optimized images

## 🧪 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload at `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview
```bash
npm run preview
```
Preview the production build locally

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in vite.config.js or kill the process
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

2. **API connection errors**
   - Ensure backend server is running on port 5000
   - Check CORS configuration on backend
   - Verify API_URL in api.js

3. **Module not found errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build errors**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

5. **Authentication issues**
   - Clear localStorage
   - Check token expiration
   - Verify JWT_SECRET matches backend

## 🔒 Security Considerations

- JWT tokens stored in localStorage
- XSS protection with React's built-in escaping
- CSRF protection via tokens
- Input validation on forms
- Sanitized user-generated content
- Secure password handling (not stored on client)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables if needed

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Environment Variables for Production
```env
VITE_API_URL=https://your-api-domain.com
```

## 📄 License

This project is part of the MERN Stack Integration assignment.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the server README for backend issues
- Open an issue in the repository

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

**Happy Coding! 🚀**

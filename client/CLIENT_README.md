# Blog Application Client

A modern, responsive blog application built with React, Vite, and Tailwind CSS.

## Features

- 🎨 **Modern UI** - Polished interface with Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Authentication** - User login and registration
- ✍️ **Post Management** - Create, read, update, and delete blog posts
- 🏷️ **Categories & Tags** - Organize content effectively
- 🔍 **Search** - Find posts quickly
- 📄 **Pagination** - Browse through posts efficiently
- 🖼️ **Featured Images** - Visual appeal for blog posts

## Tech Stack

- **React 19** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   └── Navbar.jsx
│   ├── context/        # React context for state management
│   │   └── AppContext.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useApi.js
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   └── PostDetail.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Styling with Tailwind CSS

This project uses Tailwind CSS for styling. Key features:

### Custom Colors
- Primary blue palette (`primary-50` to `primary-900`)
- Consistent with modern design principles

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### Common Patterns

**Button Styles:**
```jsx
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
  Click Me
</button>
```

**Form Input:**
```jsx
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
```

**Card:**
```jsx
<div className="bg-white rounded-xl shadow-lg p-8">
  Content here
</div>
```

## Features Overview

### Authentication
- User registration with validation
- Secure login/logout
- JWT token management
- Protected routes

### Post Management
- Rich text content editor
- Featured image support
- Draft and publish options
- Category selection
- Tag management

### Home Page
- Grid layout for posts
- Search functionality
- Pagination controls
- Loading states
- Empty states

### Post Detail
- Full post view
- Edit/delete actions (for authorized users)
- Category and tag display
- Author information

## API Integration

The app communicates with the backend API through:
- Centralized axios instance
- Request/response interceptors
- Token-based authentication
- Error handling

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: `http://localhost:5000/api`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

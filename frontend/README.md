# Marketplace Frontend - React Assessment

A comprehensive React application built for the Marketplace Backend API, featuring authentication, product browsing, shopping cart, and order management.

## Features

### Core Features (Required)
- **Authentication**
  - Login with JWT token storage
  - Protected routes
  - Logout functionality
  - Auto-redirect based on auth status

- **Products**
  - View all products with pagination
  - Product detail pages with full information
  - Category filtering
  - Product images and ratings display

- **Shopping Cart**
  - Add items to cart
  - Update quantities
  - Remove items
  - Cart persistence with localStorage
  - Real-time cart count in navbar
  - Backend synchronization when authenticated

### Advanced Features (Optional - All Implemented!)
- **Search & Filtering**
  - Real-time product search
  - Category filtering
  - Multiple sort options (name, price, rating)
  - Active filter display with easy removal

- **User Profile**
  - View account information
  - Account statistics
  - Profile management interface

- **Order History**
  - View past orders
  - Order status tracking
  - Detailed order information

- **Dark Mode**
  - Full dark mode support using Tailwind CSS
  - System preference detection
  - Manual toggle with persistence
  - Smooth transitions

- **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimizations
  - Touch-friendly interfaces

- **Enhanced UX**
  - Loading states for all async operations
  - Error handling with retry options
  - Success/error toast messages
  - Optimistic UI updates
  - Skeleton screens

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management (Auth, Cart, Theme)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx      # Reusable error display
│   │   ├── LoadingSpinner.jsx    # Loading states
│   │   ├── Navbar.jsx             # Main navigation
│   │   ├── ProductCard.jsx        # Product grid item
│   │   └── ProtectedRoute.jsx    # Route guard
│   ├── context/
│   │   ├── AuthContext.jsx        # Authentication state
│   │   ├── CartContext.jsx        # Shopping cart state
│   │   └── ThemeContext.jsx       # Dark mode state
│   ├── pages/
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Login.jsx              # Authentication
│   │   ├── Orders.jsx             # Order history
│   │   ├── ProductDetail.jsx      # Single product view
│   │   ├── Products.jsx           # Product listing
│   │   └── Profile.jsx            # User profile
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # App entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Test Credentials
```
Email: john.doe@example.com
Password: password123
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design Decisions

### State Management
- **Context API** chosen for simplicity and built-in React support
- Three separate contexts for separation of concerns:
  - `AuthContext`: User authentication and session
  - `CartContext`: Shopping cart with localStorage sync
  - `ThemeContext`: Dark mode preferences

### API Layer
- Centralized API service with axios
- Request interceptor adds JWT token automatically
- Response interceptor handles 401 errors globally
- Organized by feature (auth, products, cart, orders)

### Styling
- **Tailwind CSS** for rapid development and consistency
- Custom utility classes for common patterns
- Dark mode using Tailwind's `dark:` variant
- Responsive breakpoints (mobile-first)

### Performance
- Lazy loading ready (can be added with React.lazy)
- Image error handling with fallbacks
- Debounced search (can be added for large datasets)
- Optimistic UI updates for better perceived performance

## Security Features

- JWT token stored in localStorage
- Automatic token injection in requests
- Protected routes with authentication guards
- Automatic logout on token expiration
- HTTPS ready (configure in production)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## API Integration

The app integrates with these backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - List categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get order history
- `POST /api/orders` - Create order

### Reviews
- `GET /api/products/:id/reviews` - Get product reviews

## Code Quality

- Clean component structure
- Reusable utility functions
- Consistent naming conventions
- Error boundary support
- PropTypes ready (can be added)
- Comprehensive comments

## Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be in the `dist/` directory, ready to deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables
Create a `.env` file for different environments:
```env
VITE_API_URL=http://localhost:3000/api
```

## License

MIT

## Developer

Stephen Karpeles

---

**Note:** This project demonstrates best practices for React development including:
- Clean code architecture
- Proper state management
- Error handling
- User experience considerations
- Accessibility basics
- Performance optimization
- Responsive design

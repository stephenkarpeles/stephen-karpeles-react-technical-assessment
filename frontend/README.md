# Marketplace Frontend - React Assessment

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

## Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be in the `dist/` directory

### Environment Variables
Create a `.env` file for different environments:
```env
VITE_API_URL=http://localhost:3000/api
```

## Developer

Stephen Karpeles

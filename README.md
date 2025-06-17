# Audiophile E-commerce

A modern, responsive e-commerce website for high-end audio equipment. Built with Next.js, TypeScript, and Tailwind CSS, this application provides a seamless shopping experience for audiophiles looking for premium headphones, speakers, and earphones. This project was created as a challenge for the Software Development Pathway Assessment by [Azubi Africa](https://www.azubiafrica.org/). See the [Challenge](CHALLENGE.md) for more details.

## Features

- 🛍️ **Product Catalog**: Browse and search through a wide range of audio products
- 🛒 **Shopping Cart**: Add/remove items, update quantities, and proceed to checkout
- 🔍 **Product Details**: Detailed product pages with image galleries and specifications
- 🏷️ **Categories**: Filter products by category (headphones, speakers, earphones)
- 👤 **Admin Panel**: Manage products, and update inventory
- 🔐 **Authentication**: Admin authentication system
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- ⚡ **Fast & Optimized**: Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI Primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Animation**: Framer Motion

## Prerequisites

- Node.js 18.0.0 or later
- npm or pnpm (recommended)
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:francisJun/audiophile-ecommerce.git
cd audiophile-ecommerce
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm (recommended):

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add other environment variables as needed
```

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```bash
audiophile-ecommerce/
├── app/                    # App router pages and layouts
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── cart/               # Cart pages
│   ├── product/            # Product pages
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn/ui components
│   ├── cart-sidebar.tsx    # Shopping cart sidebar
│   └── ...
├── lib/                   # Utility functions and hooks
│   ├── cart-context.tsx    # Shopping cart context
│   └── ...
├── public/                # Static files
│   └── assets/             # Images and other assets
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── README.md              # This file
└── tailwind.config.js     # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` or `pnpm dev`: Start the development server
- `npm run build` or `pnpm build`: Build the application for production
- `npm start` or `pnpm start`: Start the production server
- `npm run lint` or `pnpm lint`: Run ESLint

## Admin Access

To access the admin dashboard:

1. Navigate to `/admin/login`
2. Use the following credentials (change these in production):
   - Username: admin
   - Password: password123

## Environment Variables

The following environment variables can be set in a `.env.local` file:

- `NEXT_PUBLIC_API_URL`: The base URL for API requests (default: `http://localhost:3000`)

## Data Storage

FOR SIMPLICITY THE DATA IS STORED IN A JSON FILE IN THE `data` FOLDER, YOU CAN CONNECT TO A DATABASE IF YOU WANT TO

- Products are stored in `data/products.json`
- Cart data is persisted in the browser's localStorage
- Admin authentication uses session storage

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ by [Francis Jun](https://github.com/francisJun)

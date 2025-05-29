# ArtLink - Art Marketplace Platform

ArtLink is a modern art marketplace platform built with Next.js, where artists can showcase and sell their artwork, accept commissions, and manage their business. The platform provides a seamless experience for artists, buyers, and art enthusiasts.

## Features

### For Artists
- **Artist Dashboard**
  - Comprehensive analytics and statistics
  - Revenue tracking and payment management
  - Order management with status updates
  - Commission request handling
  - Real-time notifications
  - Profile and portfolio management
  - Artwork verification status

- **Commission Management**
  - Custom commission settings
  - Price range configuration
  - Availability management
  - Commission request review
  - Client communication
  - Progress tracking
  - Terms and conditions setup

- **Payment System**
  - Total earnings overview
  - Available balance tracking
  - Pending payment management
  - Commission earnings
  - Withdrawal functionality
  - Transaction history

- **Artwork Management**
  - Multiple image upload (up to 5 images per artwork)
  - Detailed specifications:
    - Dimensions (width, height, depth)
    - Medium and materials
    - Category and style
    - Price and stock management
  - Image carousel for showcase
  - Artwork status tracking

### For Buyers
- **Browse & Purchase**
  - Advanced search and filter functionality
  - Detailed artwork views
  - Artist profiles and portfolios
  - Secure checkout process
  - Multiple payment methods

- **Commission Requests**
  - Submit custom artwork requests
  - Specify requirements and preferences
  - Set budgets and deadlines
  - Track commission progress
  - Direct communication with artists

- **User Features**
  - Order tracking and history
  - Multiple delivery addresses
  - Wishlist management
  - Profile customization
  - Payment method management

### Admin Features
- **User Management**
  - User verification
  - Role management
  - Activity monitoring
  - Profile verification

- **Content Management**
  - Artwork verification
  - Commission oversight
  - Order management
  - Payment processing

### Security & Authentication
- Multiple authentication methods
- Role-based access control (Admin, Artist, General)
- Secure payment processing
- Data encryption
- AWS S3 secure image storage

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Hook Form
- Zod Validation
- Real-time updates

### Backend
- PostgreSQL with Prisma ORM
- AWS S3 for image storage
- NextAuth.js for authentication
- RESTful API architecture
- Secure payment integration

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- AWS account with S3 bucket

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/artlink"

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# Optional: OAuth providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/artlink.git
cd artlink
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server
```bash
npm run dev
```

### AWS S3 Configuration

1. Create an S3 bucket with the following CORS configuration:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

2. Configure bucket permissions for public access if needed
3. Create an IAM user with appropriate S3 permissions

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── api/           # API routes
│   ├── (auth)/        # Authentication pages
│   └── (protected)/   # Protected routes
├── components/        # Reusable components
│   ├── dashboard/    # Dashboard components
│   ├── forms/        # Form components
│   ├── ui/           # UI components
│   └── upload/       # Upload components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
├── context/         # React context providers
├── schema/          # Data validation schemas
└── types/           # TypeScript definitions
```

## API Routes

### User Routes
- `/api/auth/*` - Authentication endpoints
- `/api/orders` - Order management
- `/api/products` - Product management
- `/api/commissions` - Commission system

### Artist Routes
- `/api/dashboard/*` - Dashboard data
- `/api/artist/*` - Artist-specific features
- `/api/commission-settings` - Commission configuration

### Admin Routes
- `/api/admin/users` - User management
- `/api/admin/orders` - Order oversight
- `/api/admin/artworks` - Artwork verification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [AWS S3](https://aws.amazon.com/s3/)
- [RazorPay](hhtps://razorpay.in)
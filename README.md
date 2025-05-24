# ArtLink - Art Marketplace Platform

ArtLink is a modern art marketplace platform built with Next.js, where artists can showcase and sell their artwork to art enthusiasts. The platform provides a seamless experience for both artists and buyers.

## Features

### For Artists
- **Artist Dashboard**
  - Profile management with verification status
  - Artwork management (add, edit, delete)
  - Sales tracking and analytics
  - Order management

### For Buyers
- **Browse Artworks**
  - Search and filter functionality
  - Detailed artwork views
  - Artist profiles
- **Shopping Features**
  - Shopping cart
  - Wishlist
  - Multiple delivery addresses
  - Order tracking

### Product Management
- Multiple image upload (up to 5 images per artwork)
- Detailed artwork specifications:
  - Dimensions (width, height, depth)
  - Medium
  - Category
  - Style
  - Price and stock management
- Image carousel for artwork showcase

### User Management
- Multiple authentication methods
- Role-based access (Admin, Artist, General)
- Profile verification system
- Location-based features

## Tech Stack

- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - React Hook Form
  - Zod Validation

- **Backend**
  - PostgreSQL with Prisma ORM
  - AWS S3 for image storage
  - NextAuth.js for authentication

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
├── app/                 # Next.js app router pages
├── components/         # Reusable components
│   ├── forms/         # Form components
│   ├── ui/            # UI components
│   └── upload/        # Upload components
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

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

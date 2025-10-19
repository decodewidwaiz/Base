# Backend API

This is the backend API for the project, built with Express.js and MongoDB.

## Deployment to Vercel

To deploy this backend to Vercel, follow these steps:

1. Push your code to a GitHub repository
2. Create a Vercel account and connect your GitHub repository
3. In Vercel project settings, set the following:
   - Build Command: `npm install`
   - Output Directory: ` `
   - Install Command: `npm install`
4. Add the following environment variables in Vercel:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `CLOUDINARY_URL` - Your Cloudinary URL
   - `CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `CLOUDINARY_URL` - Cloudinary URL for image uploads
- `CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Local Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the required environment variables
4. Run `npm start` to start the server

## API Endpoints

- `/user` - User related endpoints
  - POST `/user/register` - Register a new user
  - POST `/user/login` - Login user
  - POST `/user/logout` - Logout user
  - GET `/user/cart` - Get user's cart (protected)
  - POST `/user/address` - Add user address (protected)
  - POST `/user/addtocart/:productid` - Add product to cart (protected)
  - DELETE `/user/cart/:productid` - Remove product from cart (protected)

- `/product` - Product related endpoints
  - GET `/product/shop` - Get all products
  - GET `/product/product/:id` - Get product details
  - POST `/product/createproduct` - Create a new product (with image upload)
  - POST `/product/updateproduct/:id` - Update a product (with image upload)
  - POST `/product/deleteproduct/:id` - Delete a product

- `/owner` - Owner related endpoints
  - POST `/owner/register` - Register a new owner
  - POST `/owner/login` - Login owner
  - POST `/owner/logout` - Logout owner

## Notes for Vercel Deployment

1. The server is configured to work with Vercel's serverless environment
2. Database connections are managed to prevent multiple connections
3. CORS is configured to allow requests from frontend domains
4. File upload limits are set to 10MB
5. Error handling middleware is included
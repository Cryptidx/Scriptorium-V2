# Base image for the application
FROM node:18-bullseye

# Set working directory in the container
WORKDIR /app

# Copy the application code
COPY . .

# Step 1: Install npm packages in the `scriptorium` directory for production
RUN cd scriptorium && npm install --only=production

# Step 2: Update package lists and install SQLite3
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    rm -rf /var/lib/apt/lists/*

# Step 3: Prisma setup (generate and migrate)
RUN npx prisma generate && \
    npx prisma migrate deploy

# Step 4: Build the Next.js application for production
RUN cd scriptorium && npm run build

# Expose the port the Next.js app will use (default: 3000)
EXPOSE 3000

# Step 5: Start the application in production mode
CMD ["npm", "run", "start", "--prefix", "scriptorium"]
# Use the official Astro image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and lock file
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose port 4321 to access the app
EXPOSE 4321

# Command to run Astro in development mode
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "4321"]

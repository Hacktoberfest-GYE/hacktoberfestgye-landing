# Stage 1: Base image setup
FROM node:lts-alpine AS base

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory inside the container
WORKDIR /app

# Install corepack (includes pnpm) to enable pnpm usage
RUN corepack enable

# Copy package.json and lock file for dependency installation
COPY package.json pnpm-lock.yaml ./

# Stage 2: Dependencies (including devDependencies)
FROM base AS deps
# Rebuild the cache every time
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Build
FROM base AS build
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules
# Copy the rest of the application
COPY . .
# Build the project
RUN pnpm run build

# Stage 4: Final image for production
FROM node:lts-alpine AS final

# Set the working directory inside the container
WORKDIR /app

# Install corepack to use pnpm in final stage
RUN corepack enable

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules

# Copy the built files from build stage
COPY --from=build /app/dist /app/dist

# Expose the application port
EXPOSE 4321

# Command to run Astro in development mode
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "4321"]

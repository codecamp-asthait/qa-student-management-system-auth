FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files first for caching
COPY package.json package-lock.json* ./

# Build-time arguments
ARG NODE_ENV=production
ARG MONGO_URI_ARG
ARG JWT_SECRET_ARG
ARG AUTH_USERNAME_ARG=admin
ARG AUTH_PASSWORD=password123
ARG PORT_ARG=5171

# Environment variables
ENV NODE_ENV=${NODE_ENV}
ENV MONGO_URI=${MONGO_URI_ARG}
ENV JWT_SECRET=${JWT_SECRET_ARG}
ENV AUTH_USERNAME=${AUTH_USERNAME_ARG}
ENV AUTH_PASSWORD=${AUTH_PASSWORD}
ENV PORT=${PORT_ARG}

# Install dependencies
RUN npm ci --only=production || npm install --only=production

# Copy app source code
COPY . .

# Expose the port
EXPOSE ${PORT}

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the app
CMD ["node", "app.js"]
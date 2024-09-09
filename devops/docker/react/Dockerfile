FROM node:20-alpine

WORKDIR /app

# Install Vite CLI globally
RUN npm install -g vite

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build


COPY --from=build /app/dist .

# Install serve to serve the built files
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", ".", "-l", "5000"]
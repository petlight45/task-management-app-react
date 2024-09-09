FROM node:20

WORKDIR /app

# Install Vite CLI globally
RUN npm install -g vite

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port on which the app will run
EXPOSE 5000

# Command to run the application
CMD ["vite", "preview", "--host" ,"0.0.0.0", "--port", "5000"]
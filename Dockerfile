# Use an official Node.js runtime as a parent image
FROM node:lts-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy both package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js application
RUN npm run build

# Expose the port that the Vue.js app will run on
EXPOSE 8080

# Define the command to run your application
CMD ["npm", "run", "serve"]
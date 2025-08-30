# FROM node:18

# # Use the root app directory as the working directory
# WORKDIR /app

# # Copy all files into the container
# COPY . .

# # Install dependencies
# RUN npm install

# # Start using the script defined in package.json
# CMD ["node", "src/app.js"]

FROM node:22-alpine

# Switch back to the node user
USER node

ENV NODE_ENV production

# Create the /app directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json first and install dependencies
COPY package*.json /home/node/app/
USER root
RUN npm install

# Copy the rest of the application files
COPY . /home/node/app/

# Change ownership of the entire /home/node directory
RUN chown -R node:node /home/node
USER node

# Start the application
CMD ["node", "src/app.js"]
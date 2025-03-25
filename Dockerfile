FROM node:22

WORKDIR /usr/src/app

# Force install Yarn globally
RUN npm install -g yarn --force

# Copy package.json and yarn.lock (if it exists)
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application code
COPY . .

# Build the application
RUN yarn run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
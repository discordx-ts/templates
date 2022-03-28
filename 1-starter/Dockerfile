FROM node

# Create app directory
WORKDIR /app

# Move all files
COPY . .

# RUN npm install
RUN npm install

# Build project
RUN npm run build

# Start bot
CMD [ "node", "build/main.js" ]

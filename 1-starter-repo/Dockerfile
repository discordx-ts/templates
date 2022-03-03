FROM node

# Create app directory
WORKDIR /usr/src/app

# Move all files
COPY . /usr/src/app/

# RUN npm install
RUN npm install

# Build project
RUN npm run build

# Start bot
CMD [ "node", "build/main.js" ]

# mango

Application that can create charts from d3 and chart.js from an UI

# Common commands

node server.js - Launches node server for retrieving files
nodemon server.js - Launches node server for retrieving files, and updates without you having to restart the server every time
npm install - Installs all node_module dependencies to run react app
npm start - Launches react server to see webpages and use the application

# How to use dockerfile

## Node server - Example

docker build -t mango-server .
docker run -p 5000:5000 mango-server

## React client - Example

docker build -t mango-client .
docker run -p 3000:3000 mango-client

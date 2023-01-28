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

# Basic User guide for app

1. Create an account from the Account page
2. Use the Charts page to create your bar or line chart.
3. Save your chart to your account if you need to use it again
4. Save your chart on a file, use this file on your server to display the chart. Will need to have a <div id="chart"></div> section to load your Graphic
5. If your chart uses an available plugin, go to the account page and Save the Plugins File to your computer. Loading this on your page will ensure your graphic matches the one you created on the app.

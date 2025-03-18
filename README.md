# Till POS Device Bridge.
A webservice and a TCP Socket services which bridge transaction TILL cash machines with Card Payment POS terminals for wireless POS payment integration

### Author
# Kenneth I

### Tech

This project uses a number of open source projects to work properly:

* [node.js]
* [Express]
* [mysql2]
* [sequelize]
* [axio]
* [bcryptjs]
* [jsonwebtoken]
* [express-validator]
* [dotenv]
* [cors]
* [redis]
* [socket(net)]

### Getting Started

``` sh
# Clone this repo to your local machine using
git clone [Project Repo]

# Get into the directory
cd till_pos_bridge

# Make it your own
rm -rf .git && git init

# Coppy .env-example and create your own .env file
cp .env-example .env

# Edit .env file and add your mysql username, mysql password and db name
vi .env
# you can edit the file also via text editor

# Install dependencies
npm install

# Run the server locally
npm start

# Run the server locally in dev mode
npm run dev
```

**Enjoy :)**

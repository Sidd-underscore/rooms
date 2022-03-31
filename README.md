![Rooms](https://0e1f9eec-de26-4dd4-9528-d7962ca34963.id.repl.co/img/rooms.png)
# Welcome to Rooms
Rooms is the future of online collaboration

# Table of Contents

[What's in the box?](#What's-in-the-box?)

[Local Hosting](#Local-Hosting)

[Contributing](#Contributing)

[Try It!](#Try-It!)

# What's in the box?

- A Discord bot:
  -  the [commands](commands) folder
  -  the [handler](handler) folder
  -  half of [index.js](index.js)
  -  the [config.json](config.json) file
  -  the [deploy-commands.js](deploy-commands.js) file
- The actual appilcation
  -  the [public](public) folder
  -  the [views](views) folder
  -  the [package.json](package.json) file
  -  the [package-lock.json](package-lock.json) file
- Replit things
  -  the [.config](.config) folder
  -  the [.breakpoints](.breakpoints) file
  -  the [.replit](.replit) file
  -  the [replit.nix](replit.nix) file

# Local Hosting

## Requirements:
- [Node.js](https://nodejs.org) v16+
- A terminal 
  
To localhost the bot, please create a `.env` file or rename the [.env.example](.env.example) file to `.env` and fill out the bot's token. To find said bot's token, please go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and create a bot. Once the token is filled in, run `npm i` into the terminal. After all the packages install, simply run `node start` or `node index.js` to get started. 

**NOTE: If you don't want the website files and just the bot, please delete all the index.js code and run `node bot.js`**

To localhost Rooms (the app), just run `npm i` into the terminal. After all the packages install, simply run `node index.js` or `node start` in the console.

# Contributing

To contribute, simply edit content and create a pull request

# Try it!
[![Run on replit](https://repl-badge.jajoosam.repl.co/try.png)](https://replit.com/@cool-sidd/rooms)
# Microbialite Database Website

This website was a semester-long group project created for CISC 450 Database Design in collaboration with Dr. Hickson, a geology professor at the University of St. Thomas. The database was a vast, unorganized, collection of data gathered by Dr. Hickson and his team to study formations of Microbialites in Nevada. It was our job to normalize the data and create a user interface with which the data could be accessed by other researchers and where more data could be add or deleted. The website was designed to interact with the Microbialite Database. The user interface uses JavaScript. Node.js was used to create an API connecting the website to the sqlite3 database. Users are able to view, add, and delete data from the database.


## Application Setup
Notes: Download and install VSCode and node.js if you don't have them already installed

1. Clone project from GitHub into VSCode
2. Open the terminal with `Ctrl+~` and make sure you are in the Microbialites Website folder by runnig the command `cd Microbialite-Website`
3. Once in correct folder run `npm install` and by the end of the installation you should see a `node_modules` folder
4. You can now run `node app.js` and you should see `Server listening on port:___` in the terminal
5. The server is now active and you can access the website by going to your browser and entering "localhost:`port number given in terminal`"
6. Close the server by going back to the terminal and entering `Ctrl+C`


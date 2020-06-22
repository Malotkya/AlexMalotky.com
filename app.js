#! /usr/bin/env node

const express = require("express");
const helmet = require("helmet");
const fs = require("fs");

const app = express();

// Constants
const port = Number(process.argv[2]);
const defaultPort = 8080;
const publicDirectory = "./public";
const sourceDirectory = "./src"
const requests = [
    "get",
    "post",
    "all"
];

//Setting security using helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "https://*.googleapis.com", "https://fonts.gstatic.com"]
    }
}));

//Set up resources for app
app.use( "/", express.static(publicDirectory) );
app.set("views", publicDirectory + "/ejs");
app.set('view engine', 'ejs');

//Load servlets into app
let servletDirectory = sourceDirectory + "/controller"
let files = fs.readdirSync(servletDirectory);
files.forEach(file => {
    if( file.indexOf(".js") >= 0 ) {
        let servlet = require(servletDirectory + "/" + file);

        requests.forEach(httpRequest => {
            if( typeof servlet[httpRequest] === "function" ) {
                app[httpRequest](servlet.path, servlet[httpRequest]);
                console.log(`${httpRequest} has been loaded for ${file} at location ${servlet.path}`);
            }
        });
    }
});

//Launch app
if( isNaN(port) ) {
    app.listen(defaultPort, () => console.log(`\nApplication is listening on port: ${defaultPort}!`) );
} else {
    app.listen(port, () => console.log(`\nApplication is listening on port: ${port}!`) );
}

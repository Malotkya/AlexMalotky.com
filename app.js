#! /usr/bin/env node

const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const bodyParser = require("body-parser");
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
        defaultSrc: ["'self'",
                     "https://*.googleapis.com",
                     "https://fonts.gstatic.com",
                     "cdnjs.cloudflare.com",
                     "maxcdn.bootstrapcdn.com"
                 ]
    }
}));

//Set up resources for app
app.use( "/", express.static(publicDirectory) );
app.set("views", publicDirectory + "/ejs");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( session({
    secret:'supercalifragilisticexpialidocious',
    resave: false,
    saveUninitialized: false
}) );

//Load servlets into app
let controllerDirectory = sourceDirectory + "/controller"
let files = fs.readdirSync(controllerDirectory);
files.forEach(file => {
    if( file.indexOf(".js") >= 0 ) {
        let controller = require(controllerDirectory + "/" + file);

        requests.forEach(httpRequest => {
            if( typeof controller[httpRequest] === "function" ) {
                app[httpRequest](controller.path, controller[httpRequest]);
                console.log(`${httpRequest} has been loaded for ${file} at location ${controller.path}`);
            }
        });
    }
});

//Error Handeling
app.use((req, res) => res.status(400).render('error', {
    message:"404: the page you where looking for was not found!",
    title:"404 Error"
}) );

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', {
        message:JSON.stringify(error),
        title:"500 Internal Error"
    });
} );

//Launch app
if( isNaN(port) ) {
    app.listen(defaultPort, () => console.log(`\nApplication is listening on port: ${defaultPort}!`) );
} else {
    app.listen(port, () => console.log(`\nApplication is listening on port: ${port}!`) );
}

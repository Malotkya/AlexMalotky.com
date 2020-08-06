const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();

// Constants
const publicDirectory = __dirname + "/public";
const sourceDirectory = __dirname + "/src"

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( session({
    secret:'supercalifragilisticexpialidocious',
    resave: false,
    saveUninitialized: false
}) );

//Load routers into app
let routerDirectory = sourceDirectory + "/router"
let files = fs.readdirSync(routerDirectory);
files.forEach(file => {
    let router = require(routerDirectory + "/" + file);
    if(router) {
        if(typeof router.path === "string")
            app.use(router.path, router);
    }
});

//Error Handeling
app.use((req, res) => res.status(400).render('error', {
    message:"404: the page you where looking for was not found!",
    title:"404 Error"
}) );

app.use((err, req, res, next) => {
    console.error(error);

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        title:"500 Internal Error",
        error: req.app.get('env') === 'development' ? err : {}
    });
} );

module.exports = app;

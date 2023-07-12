import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import fs from "fs";
import http from "http";
import https from "https";

const app = express();
dotenv.config();

app.set("views", "./views");
app.set("view engine", "njk");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(cookieParser());

nunjucks.configure("views", {
	autoescape: true,
	express: app
});
	
app.get("/", (req, res) => {
	return res.render("index");
});

app.get("*", (req, res) => {
	return res.render("error");
});

var httpServer;
var httpsServer;
if(process.env.NODE_ENV === "development"){
	httpServer = http.createServer(app);
}
else{
	if(fs.existsSync("src/cert/privkey.pem")){
		var privateKey  = fs.readFileSync("src/cert/privkey.pem", "utf8");
		var certificate = fs.readFileSync("src/cert/cert.pem", "utf8");
		var credentials = {key: privateKey, cert: certificate};
		httpsServer = https.createServer(credentials, app);
	}
	else{
		console.log("Certificate not found, falling back to HTTP");
	}
	httpServer = http.createServer(app);
}
httpServer.listen(process.env.HTTP_PORT, () => {
	console.log(`Http server is running on http://localhost:${process.env.HTTP_PORT}`);
});
if(httpsServer){
	httpsServer.listen(process.env.HTTPS_PORT, () => {
		console.log(`Https server is running on port: ${process.env.HTTPS_PORT}`);
	});
}
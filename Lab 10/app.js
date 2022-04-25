//require
const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const port = 3000;

app.use('/public', static);
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(
	session({
		name: 'AuthCookie',
		secret: 'some secret string!',
		resave: false,
		saveUninitialized: true,
	})
);

app.use((req,res,next)=>{
	let date = new Date().toUTCString();
	let method = req.method;
	let route= req.originalUrl
	let user = req.session.user? "Authenticated User" : "Non-Authenticated User";
	console.log(`[${date}]: ${method} ${route} (${user})`)
	next()
})

app.use('/private', (req, res, next) => {

	if (!req.session.user) {
		return 	res.redirect('/accessDenied')
	
	} else {
		next();
	}
});


configRoutes(app);
app.listen(port, () => {
	console.log(`Your server is running on port ${port}`);
});

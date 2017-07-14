const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

var application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded());
application.use(session({
        secret: 'mySecretCode',
        resave: false,
        saveUninitialized: true
}));    

var users = [{ 
    email: 'test@test.com', 
    username: 'test_username',
    password: 'test' 
  }];

application.get('/', function(request, response) {
        console.log(request.session.isAuthenticated);

  if (request.session.isAuthenticated === true){
    response.render('index', {username: username});  

  }else{
    response.redirect('/login');
  }
});

application.get('/login', function(request, response){
  response.render('login');
})
application.post('/login', function(request, response){
    var username = request.body.username;
   
    var user = users.find(user => 
      { return user.email === request.body.email && user.password === request.body.password })
   
    if (!user) {
        response.redirect('/login');
    } else {
        request.session.isAuthenticated = true;
        request.session.username = user.username; 

        response.render('index', {user: user});
    }
});









// application.post('/signup', (request, response)=>{

// var user = {
//   email: request.body.email,
//   password: request.body.password
// }
//     users.push(user);
//     response.redirect('/');

// }
// )
application.listen(3000);


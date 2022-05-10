const express = require('express');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
require('dotenv').config();
const path = require('path');
const Pessoas = require('./pessoas.js');
const connectToDatabase = require('./database.js');
// const fs = require('fs');

connectToDatabase();

const app = express();



app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, 'temp')
}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(session({ secret: '8j5y98jhnbujnbljbunfsjnrt9uhnitjgjgnb', cookie: { maxAge: 60000 }}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/', function(req, res){
    res.render('login');
});


var admin = 'Jonathas';
var senha = '20182293325';

app.post('/',(req, res) => {
    
    if(req.body.passin == senha && req.body.userin == admin){
        req.session.admin = admin;
        res.render('dashboard',{admin:admin});
    }else{
        res.render('login')
    }

})

app.post('/dashboard',(req,res)=>{
    Pessoas.find().sort({'_id': -1}).exec(function(err,postsPessoas){
        postsPessoas = postsPessoas.map(function(val){
            return {
                nome: val.nome,
                cpf: val.cpf,
                idade: val.idade,
            }
        })
        res.render('/dashboard',{admin:admin,posts:postsPessoas});
    })
})

app.get('/dashboard',(req,res)=>{
    
    if(req.session.admin){
        Pessoas.find().sort({'_id': -1}).exec(function(err,postsPessoas){
            postsPessoas = postsPessoas.map(function(val){
                return {
                    nome: val.nome,
                    cpf: val.cpf,
                    idade: val.idade,
                }
            })
            res.render('/dashboard',{admin:admin,posts:postsPessoas});
        })
    }else{
    res.render('login');
    }
})

app.listen(3000, function(){
    console.log('Servidor rodando');
});
const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }).then(function(){
        console.log('Banco de dados conectado com sucesso');
    }).catch(function(err){
        console.log(err.message)
    });
}

module.exports = connectToDatabase;
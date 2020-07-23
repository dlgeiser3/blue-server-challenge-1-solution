const Sequelize = require('sequelize');

const sequelize = new Sequelize('blue-server-challenge', 'postgres', '*YOUR PASSWORD HERE*', {
  host: 'localhost',
  dialect: 'postgres',
})

sequelize.authenticate()
  .then(
    function(){
      console.log('Connected to blue-server-challenge postgres database!')
    }, 
    function(err){
      console.log(err);
    }
  )

  module.exports = sequelize;

const  mysql = require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'onlineauction'
})
conn.connect(function(err) {
    if (err) throw err;
    console.log('Connected Successfully...')
});

module.exports=conn
var express = require('express');
var router = express.Router();
let conn = require('../connection')

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('response with an admin resource ');
});

router.get('/category', function(req, res, next) {
  res.render('categories');
});

router.post('/insertc', function(req, res, next) {
  console.log(req.body);
  let cat_name = req.body.cat_name;
  let desc = req.body.cat_desc;
  let Query ="insert into `categories` (`cat_name`,`cat_desc`) values ('"+cat_name+"','"+desc+"')";
  conn.query(Query,function (err){
    if (err) throw err;
    res.send("Data Inserted");
  })
});

router.get('/getdata', function(req, res, next) {
  var Query = "select * from categories";
  conn.query(Query,function (err,rows){
    if (err) throw err;
    // console.log(rows);
    res.send(rows);
  })
});

router.get('/deletecat',(req,res)=>{
  var cat_id = req.query.cat_id;
  var Query = `delete from categories where cat_id="${cat_id}"`;
  conn.query(Query,function (err){
    if (err) throw err;
    res.send('Row Deleted')
  })
});


router.post("/updateCat", (req, res) => {
  console.log(req.body);
  var cat_name = req.body.cat_name;
  var cat_desc = req.body.cat_desc;

  var Query = `update categories set  cat_desc="${cat_desc}" where cat_name="${cat_name}"`;
  conn.query(Query, (error) => {
    if (error) throw error;
    res.send("Data Updated.");
  })
});


//=======ADMIN=======


router.get('/adminview', function(req, res, next) {
  res.render('admin');
});

router.post('/insert-admin-data',(req, res, next)=> {
  // console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let pno = req.body.pno;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  if (password != confirm_password) {
    res.send("notsame");
  }else{
    let CheckUser = `SELECT * FROM admin WHERE username="${username}"`;
    conn.query(CheckUser,(err,data)=>{
      if (err) throw err;
      if(data.length > 0){
        res.send('exist');
      }else{
        let Query ="insert into `admin` (`username`,`email`,`pno`,`password`) values ('"+username+"','"+email+"','"+pno+"','"+password+"')";
        conn.query(Query,function (err){
          if (err) throw err;
          res.send("Data Inserted");
        });
      }
    });
  }
});


router.get('/delete',(req,res)=>{
  var username = req.query.username;
  var Query = `delete from admin where username="${username}"`;
  conn.query(Query,function (err){
    if (err) throw err;
    res.send('Row Deleted')
  })
});


module.exports = router;

const express = require('express');
const router = express.Router();
const conn = require('../connection')
const session = require('express-session')
const {response} = require("express");


/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('response with an admin resource ');
});

// router.get('/category', function(req, res, next) {
//   res.render('categories');
// });


router.get('/categories', function (req, res) {
  if (session.useradmin !== undefined)
    res.render('categories', {name: session.useradmin})
  else
    res.redirect('/admin/adminlogin')
})



router.post('/insertc', function(req, res, next) {
  // console.log(req.body);
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
  if(session.useradmin!==undefined){
    res.render('admin');
  }
  else{
    res.redirect('/adminlogin')
  }
});


router.post('/insert-admin-data',(req, res, next)=> {
  // console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let pno = req.body.pno;
  let password = req.body.password;

  if (password === '_,%^&*') {
    res.send("NotAllowed");
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
          res.send("Inserted");
        });
      }
    });
  }
});
router.get('/get-admin-data', function(req, res, next) {
  var Query = "select * from admin";
  conn.query(Query,function (err,rows){
    if (err) throw err;
    // console.log(rows);
    res.send(rows);
  })
});

router.get('/delete',(req,res)=>{
  let username = req.query.username;
  let Query = `delete from admin where username="${username}"`;
  conn.query(Query,function (err){
    if (err) throw err;
    res.send('Row Deleted')
  })
});




// pending product code

router.get('/pending',(req, res)=>{
  if(session.useradmin!==undefined){
    res.render('pendingproducts');
  }
  else{
    res.redirect('/adminlogin');
  }
})

router.get('/pending-data',(req, res)=>{
  let Query = `select * from  user_products where status='pending' `;
  // console.log(Query);
  conn.query(Query, function (err,rows) {
    if (err) throw err;
    res.send(rows);
  });

})

router.post("/updateStatus", (req, res) => {
  let p_id = req.body.p_id;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let status = req.body.status;

  let Query = `update user_products set  start_date="${start_date}",end_date="${end_date}", status="Active" where p_id="${p_id}"`;
  // console.log(Query)
  conn.query(Query, (error) => {
    if (error) throw error;
    res.send("Status Updated.");
  })
});

router.post("/lockWinner", (req, res) => {
  let p_id = req.body.p_id;
  let winner_email = req.body.winner_email;
  let winner_pid = req.body.winner_pid;
  let product_amount = req.body.product_amount;

  let InsertQ = "insert into `winners` (`winner_email`,`winner_pid`,`product_amount`) values ('"+winner_email+"','"+winner_pid+"','"+product_amount+"')";
  console.log(InsertQ)
  conn.query(InsertQ,function (err){
    if (err) {
      res.send("Error");
    }else{
      let Query = `update user_products set status="Closed" where p_id="${p_id}"`;
      conn.query(Query, (error) => {
        if (error) throw error;
        res.send("Winner Locked.");
      })
    }
  });
});




router.get('/winners', (req, res) => {
  if (session.useradmin !== undefined)
    res.render('winners');
  else
    res.redirect('/adminlogin')

});

router.get('/bidClosed', function (req, res) {

  let Query = `select * from bid inner join user_products on bid.p_id = user_products.p_id`;
  conn.query(Query, function (err, rows) {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send('No Winner Data Found')
    }

  })
});


module.exports = router;

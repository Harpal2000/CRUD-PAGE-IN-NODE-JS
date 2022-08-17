var express = require('express');
const conn = require("../connection");
const session = require('express-session')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('homePage');
});

router.get('/usersignup', (req, res) => {
    res.render('usersignup');
});

router.get('/user_login', function(req, res, next) {
    res.render('userlogin');
});
router.post('/checkuser', function(req, res, next) {
let email = req.body.email;
let password = req.body.password;
let Query="select * from usersignup where email='"+email+"' and password='"+password+"'";
conn.query(Query,function (err,row){
    if(err) throw err;
    if(row.length>0){
        session.username= email;
        res.send('loggedin')
    }
    else{
        res.send('error')
    }
})
});


router.post('/insertuser', (req, res) => {
    // console.log(req.body);
    let fullname = req.body.fullname;
    let fathername = req.body.fathername;
    let photo = req.files.photo;
    var realpath = "public/userphotos/" + photo.name;
    var dbpath = "userphotos/" + photo.name;
    let email = req.body.email;
    let phone_no = req.body.phone_no;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    console.log(photo);

    if (password != confirm_password) {
        res.send("notsame");
    } else {
        photo.mv(realpath, function (err) {
            if (err) throw err;
        })
        let CheckUser = `SELECT * FROM usersignup WHERE email="${email}"`;
        conn.query(CheckUser, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                res.send('exist');
            } else {
                let Query = "insert into usersignup (email,fullname,password,fathername,photo,phone_no,confirm_password) values ('" + email + "','" + fullname + "','" + password + "','" + fathername + "','" + dbpath + "','" + phone_no + "','" + confirm_password + "')";
                // console.log(Query);
                conn.query(Query, function (err) {
                    if (err) throw err;
                    res.send("Data Inserted");
                });
            }
        });
    }
});

router.get('/get-user-data', function(req, res, next) {
    var Query = "select * from usersignup";
    conn.query(Query,function (err,rows){
        if (err) throw err;
        // console.log(rows);
        res.send(rows);
    })
});



router.get('/adminlogin', function(req, res, next) {
    res.render('adminlogin');
});

router.post('/checkadmin', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let Query="select * from admin where username='"+username+"' and password='"+password+"'";
    conn.query(Query,function (err,row){
        if(err) throw err;
        if(row.length > 0){
            session.useradmin = username;
            res.send('login')
        }
        else{
            res.send('error')
        }
    })
});






// practice code for photo container


module.exports = router;

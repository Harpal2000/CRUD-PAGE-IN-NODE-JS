var express = require('express');
const conn = require("../connection");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/usersignup', (req, res) => {
    res.render('usersignup');
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
                console.log(Query);
                conn.query(Query, function (err) {
                    if (err) throw err;
                    res.send("Data Inserted");
                });
            }
        });
    }
});

module.exports = router;

var express = require('express');
const conn = require("../connection");
var router = express.Router();
const session = require('express-session')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/user-products', function (req, res, next) {
    res.render('userproducts');
});

router.post('/insert-user-product', (req, res) => {
    // console.log(req.body);
    let id = req.body.id;
    let name = req.body.name;
    let category = req.body.category;
    let image = req.files.image;
    let realpath = "public/userproductphotos/" + image.name;
    let dbpath = "userproductphotos/" + image.name;
    let user_email = req.body.user_email;
    let price = req.body.price;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;
    let status = req.body.status;


    console.log(image);

    if (price > 100000) {
        res.send("enter less value");
    } else {
        image.mv(realpath, function (err) {
            if (err) throw err;
        })
        let CheckUser = `SELECT * FROM user_products WHERE id="${id}"`;
        conn.query(CheckUser, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                res.send('exist');
            } else {
                let Query = "insert into user_products (name,category,price,description,image,user_email) values ('" + name + "','" + category + "','" + price + "','" + description + "','" + dbpath + "','" + user_email + "')";
                console.log(Query);
                conn.query(Query, function (err) {
                    if (err) throw err;
                    res.send("Data Inserted");
                });
            }
        });
    }
});

router.get('/get-catid-data', function (req, res, next) {
    var Query = "select cat_id from categories";
    conn.query(Query, function (err, rows) {
        if (err) throw err;
        // console.log(rows);
        res.send(rows);
    })
});


router.get('/userhome', function (req, res) {
    if (session.username !== undefined)
        res.render('userhome', {name: session.username})
    else
        res.redirect('/user_login')
})


// practice code













module.exports = router;

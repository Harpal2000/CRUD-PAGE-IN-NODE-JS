var express = require('express');
const conn = require("../connection");
var router = express.Router();
const session = require('express-session')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/user-products', function (req, res, next) {
    if (session.username !== undefined)
        res.render('userproducts')
    else
        res.redirect('/user_login')
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
                let Query = "insert into user_products (name,category,price,description,image,user_email) values ('" + name + "','" + category + "','" + price + "','" + description + "','" + dbpath + "','" + session.username + "')";
                console.log(Query);
                conn.query(Query, function (err) {
                    if (err) throw err;
                    res.send("Data Inserted");
                });
            }
        });
    }
});

router.get('/get-catName-data', function (req, res, next) {
    var Query = "select cat_name,cat_id from categories";
    conn.query(Query, function (err, rows) {
        if (err) throw err;
        // console.log(rows);
        res.send(rows);
    })
});


router.get('/userhome', function (req, res) {
    if (session.username !== undefined)
        res.render('userhome', {username: session.username})
    else
        res.redirect('/user_login')
})
 router.get('/logout',function (req,res){
     session.username = undefined;
     res.send('logout')
 })


//Add Bid code
router.get('/add-bid', (req, res) => {
    if (session.username !== undefined)
        res.render('bid');
    else
        res.redirect('/user_login')

});

router.get('/photoview', function(req, res, next) {
    var Query = "select * from user_products";
    conn.query(Query,function (err,rows){
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    })
});
router.post('/insertBid',(req,res)=> {
    let amount = req.body.amount;
    let p_id = req.body.p_id;
    let user_email = req.body.user_email;
    let curr_date = req.body.curr_date;
    let price = req.body.price;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;

    let c_date = new Date();


    let CheckDate = `select start_date from user_products where start_date between start_date and end_date`;
    console.log(CheckDate);
    conn.query(CheckDate, function (err) {
        if (err) throw err;
    });
    let CheckD = `select end_date from user_products `;
    console.log(CheckD);
    conn.query(CheckD, function (err) {
        if (err) throw err;
    });

    if (amount > 0) {
        let CheckPrice = `select price from user_products where p_id="${p_id}"`;
        console.log(CheckPrice);
        console.log(amount);
        conn.query(CheckPrice, function (err) {
            if (err) throw err;
            if(amount < CheckPrice){
                res.send("Low Bid Value")
            }
        });

    } else if (c_date < CheckDate || c_date > CheckD) {
        res.send('Enter valid Date')

    }else if(p_id > 0){
        let CheckId = `SELECT * FROM user_products WHERE p_id="${p_id}"`;
        console.log(CheckId);
        conn.query(CheckId, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                let updateBid = `update bid set amount="${amount}" where p_id="${p_id}"`;
                conn.query(updateBid, function (err) {
                    if (err) throw err;
                    res.send("Bid Updated");
                });
            }
        })
    } else {
        let InsertBid = "insert into bid (p_id,user_email,amount,curr_date) values ('" +p_id+ "','" +session.username+ "','" +amount+ "','" +c_date+ "')";
        console.log(InsertBid);
        conn.query(InsertBid, function (err) {
            if (err) throw err;
            res.send("Bid Inserted");
        });

    }
});
















module.exports = router;

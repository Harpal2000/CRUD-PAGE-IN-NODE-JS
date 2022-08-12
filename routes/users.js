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
    let p_id = req.body.p_id;
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
    if (price > 100000000) {
        res.send("enter less value");
    } else {
        image.mv(realpath, function (err) {
            if (err) throw err;
        })
        let CheckUser = `SELECT * FROM user_products WHERE p_id="${p_id}"`;
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
            res.send(rows)
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

router.get('/photoview', function(req, res) {
    var Query = "select * from user_products where user_email !='"+ session.username+"'";
    console.log(Query);
    conn.query(Query,function (err,rows){
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    })
});
router.post('/insertBid',(req,res)=> {
    let amount = req.body.amount;
    let p_id = req.body.p_id;
    let u_email = req.body.u_email;
    let curr_date = req.body.curr_date;
    let price = req.body.price;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;

    let c_date = new Date();
    let day=c_date.getDate();
    let mon=c_date.getMonth();
    let year=c_date.getFullYear();
    let today_date=year+"-"+mon+"-"+day;

    // let CheckDate = `select start_date from user_products where p_id = "${p_id}"`;
    // console.log(CheckDate);
    // conn.query(CheckDate, function (err,value) {
    //     if (err) throw err;
    //     console.log(value[0]);
    // });

    if (amount > 0 ) {
        let CheckPrice = `select price,end_date from user_products where p_id="${p_id}"`;
        console.log(CheckPrice);
        console.log(amount);
        conn.query(CheckPrice, function (err, rows) {
            console.log(rows[0]);
            if (err) throw err;
            if (err) {
                res.send("Error");
            } else {
                if (amount > rows[0]) {
                    console.log("High Bid Value")
                if (today_date === rows[0].end_date){
                    console.log("Inavlid Date")
                }




                }
            }
        });
    } else if (amount > 0) {
        let CheckD = `select end_date from user_products where p_id = "${p_id}"`;
        console.log(CheckD);
        conn.query(CheckD, function (err,data) {
            if (err) throw err;
            if(today_date === data[0]) {
                console.log("Bid closed")
            }
            });
    }else {
        let InsertBid = "insert into bid (p_id,u_email,amount,curr_date) values ('" +p_id+ "','" +session.username+ "','" +amount+ "','" +today_date+ "')";
        console.log(InsertBid);
        conn.query(InsertBid, function (err) {
            if (err) throw err;
            res.send("Bid Inserted");
        });

    }
});
















module.exports = router;

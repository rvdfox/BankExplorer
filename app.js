var express = require('express'),
    app = express(),
    db = require('./models'),
    bank = global.db.bank,
    branch = global.db.branch,
    Sequelize = require('sequelize');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    // res.setDateHeader("Expires", 0); // Proxies.
    // Pass to next layer of middleware
    next();
});


app.get('/byifsc',function(req,res){
    var data = req.query;
    // res.status(200).send('recieved '+data.ifsc);
    if(!data.ifsc)
    {
        res.status(500).send({success:false,message:'IFSC code not shared'});
        return;
    }
    branch.findOne({
        where:{
            ifsc:data.ifsc
        },
        raw:true,
        include:[
            {
                model:bank,
                attributes:['name']
            }
        ]
    }).then(function(detail){
        if(detail)
        {
            res.status(200).send({success:true,values:detail});
        }
        else
        {
            res.status(500).send({success:false,error:'Invalid IFSC code or Not added in DB'});
        }
    })
})

app.get('/details',function(req,res){
    var data = req.query;
    if(!data.bank || !data.city)
    {
        res.status(500).send({success:false,message:'Bank name or city is missing'});
        return;
    }
    branch.findAll({
        where:{
            city:data.city
        },
        raw:true,
        include:[
            {
                model:bank,
                where:{
                    name:data.bank
                }
            }
        ]
    }).then(function(list){
        res.status(200).send({success:true,values:list});
    })

})

app.get('/banks',function(req,res){
    // res.status(200).send('To send bank list');
    global.db.bank.findAll({
        }).then(function(banks){
            res.status(200).send(banks);
        })
})

app.get('/branches',function(req,res){
    global.db.branch.findAll({
    }).then(function(branches){
        res.status(200).send(branches);
    })
});

app.get('/',function(req,res){
    res.status(200).send('[ server running ] Incorrect Path or unauthrized method');
})


module.exports = app;
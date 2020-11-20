const express = require('express'),
app = express(),
morgan = require('morgan'),
mongoose = require('mongoose'),
User = require('./models/user'),
Book = require('./models/book'),
ReadingLog = require('./models/readingLog'),
bodyParser = require('body-parser'),
PORT = process.env.PORT || 8080;
require('dotenv/config');

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(() =>{
    console.log("Connected to the Mongo Server");
})
.catch((err) =>{
    console.log(err);
})

app.get('/',(req,res) =>{
    res.render('index');
})

app.get('/totalDur/:id',(req,res) =>{    
    let sum = 0;
    ReadingLog.find({user:req.params.id})
    .then(logs =>{
        for(var i=0;i<logs.length;i+=2){
            sum += (logs[i+1].timeStamp - logs[i].timeStamp);
        }
        console.log(sum);
        let hrs = Math.round(sum/(1000*60*60));
        let mins = Math.round(sum/(1000*60));
        let secs = Math.round(sum/(1000));
        if(secs < 60){
            sum = `Total Duration is ${secs} secs`;
        } else if(mins < 60){
            sum = `Total Duration is ${mins} mins`;
        } else {
            sum = `Total Duration is ${hrs} hrs`;
        }
        res.send(sum);
    })
    .catch(err =>{
        console.log(err);
    })
})

app.get('/totalUsers/:id',(req,res) =>{
    Book.find({_id:req.params.id})
    .then(books =>{
        
    })
    .catch(err =>{
        console.log(err);
    })
})

app.post('/addUser',(req,res) =>{
    User.create({username:req.body.username})
    .then(user =>{
        console.log(`Created User: ${user}`);
    })
    .catch(err =>{
        console.log(err);
    })
    res.redirect('/');
});

app.post('/addBook',(req,res) =>{
    Book.create({
        name:req.body.bookName,
        author:req.body.author
    })
    .then(book =>{
        console.log(`Created Book ${book}`);
    })
    .catch(err =>{
        console.log(err);
    })
    res.redirect('/');
})

app.post('/openBook',(req,res) =>{
    User.findOne({username:req.body.username})
    .then(user =>{
        Book.findOne({name:req.body.bookName})
            .then(book =>{
                ReadingLog.create({
                    user,
                    event_type:"start",
                    book,
                    timeStamp:Date.now()
                })
            .catch(err =>{
                console.log(err);
            });
        })        
    })
    .catch(err =>{
        console.log(err);
    })
    res.redirect('/');
})

app.post('/closeBook',(req,res) =>{
    User.findOne({username:req.body.username2})
    .then(user =>{
        Book.findOne({name:req.body.bookName})
        .then(book =>{
                ReadingLog.create({
                    user,
                    event_type:"end",
                    book,
                    timeStamp:Date.now()
                })
            .catch(err =>{
                console.log(err);
            });
        })        
    })
    .catch(err =>{
        console.log(err);
    })
    res.redirect('/');
})

app.listen(PORT,() => console.log(`Server Listening At Port ${PORT}`))
    // Import Expree and assign it to var app
    var express = require('express');
    const { nanoid } = require('nanoid');
    var app = express();
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }));
    // middleware static
    app.use(express.static('public'));
    app.set('view engine','ejs');
    app.listen(3000);

    app.get('/', function(req, res){
        res.render('home');
    });

    var validUrl = require('valid-url');

    const formidable = require('formidable');
    let contacts = new Map()
    contacts.set('abc','https:/www.google.com');

    app.get('/:username',(req,res,next)=>{
        console.log("Rerouting url at " +req.params.username);
        if(contacts.has(req.params.username)) res.redirect(contacts.get(req.params.username));
        else next();
    });


    app.post('/getUrl', async function(req,res){
        // IMPORTANT : form variable should be locally defined inside post
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if(typeof validUrl.isWebUri(fields.url) == 'undefined'){
                res.sendStatus(409);
            }
            else{
                let id = nanoid(6);
                while(contacts.has(id)) id=nanoid(6);
                contacts.set(id,fields.url);
                console.log(id);
                res.send(id);
            }
        });        
    });

    // Must be at the bottom in csase bo url matches
    app.use((req,res)=>{
        res.sendStatus(404);
    });




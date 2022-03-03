import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './Model/user';
import getRawBody from 'raw-body';
import listing from './Model/listing';
import upload from './multer';
import fs from 'fs';
import picture from './Model/picture';
import multer from 'multer';

const app = express();

app.use('/static', express.static('photos'))

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nekretnjine');

const conn = mongoose.connection;
conn.once('open', ()=>
{
    console.log('Mongo open');
});

const router = express.Router();

router.route('/login').post((req, res) =>
{
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({'username' : username, 'password' : password}, (err, user) =>
    {
        if(err) console.log(err);
        else 
            res.json(user);
    })
});

const middleware = upload.array('avatar', 10);

router.use('/photo', middleware);
router.route('/photo').post((req, res) =>
{
    let path = process.cwd();
    let photos = fs.readdirSync(`${path}/photos/`+req.body.username);
    
    listing.collection.updateOne({"description" : req.body.username}, {$set : {"paths" : photos}});
    console.log("paths added")
    res.status(200).json({'status' : 'ok'});


   
});


router.route('/register').post((req, res) =>
{
    let username = req.body.username;
    let mail = req.body.mail;

    if(req.body.password !== req.body.confpassword)
    {
        console.log('Passwords dont match!');
        res.status(200).json({'user' : 'Passwords dont match!'});
        return;

    }
    else
    {   
        user.findOne({'username' : username}, (err, exists)=>
        {
            if(err) console.log(err);
            else if(exists != null)
                {
                    console.log('Username is already taken!');
                    res.status(200).json({'user' : 'Username is already taken!'});
                    return;
                }
                else
                {
                    user.findOne({'mail' : mail}, (err, exists)=>
                    {
                        if(err) console.log(err);
                        else if(exists != null)
                        {
                            console.log('Email is already taken!');
                            res.status(200).json({'user' : 'Email is already taken!'});
                            return;
                        }
                        else
                        {
                            const dataUser =
                            {
                                name : req.body.name,
                                surname : req.body.surname,
                                username : req.body.username,
                                password : req.body.password,
                                mail : req.body.mail,
                                city : req.body.city,
                                country : req.body.country,
                                type : req.body.type,
                                status : req.body.stat,
                                image : req.body.image
                            }
                            console.log(req.body.stat);
                            let newUser = new user(dataUser);
                             newUser.save().then(newUser =>
                                {
                                    console.log('User registered');
                                    res.status(200).json({'user' : 'ok'});
                                 }).catch(err =>
                                    {
                                          console.log('error');
                                          res.status(400).json({'user' : 'error'});
                                    });
                        }
                    });
                }
         });
    }
   
    
});

router.route('/getAllUsers').get((req, res)=>
{
    user.find({}, (err, allUsers)=>
    {
        if(err) console.log(err);
        else
        {  
            res.json(allUsers);
        }
    });
});

router.route('/getAllListings').get((req, res)=>
{
    listing.find({}, (err, allListings)=>
    {
        if(err) console.log(err);
        else
        {  console.log('ret listings');
            res.json(allListings);
        }
    });
});


router.route('/getNumOfHouses').get((req, res)=>
{
    let numOfHouses : number;
    const housesCount = async() =>
    {
        await listing.countDocuments({"type" : "house"}, (err, num) =>{numOfHouses = num})
    }
    console.log("get num of houses");

    housesCount().then(
        ok => {res.json(numOfHouses)}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )

});

router.route('/getNumOfApartments').get((req, res)=>
{

    let numOfApartments : number;
    const apartmentCount = async() =>
    {
        await listing.countDocuments({"type" : "apartment"}, (err, num)=> {numOfApartments = num})
    }
    console.log("get num of apartments");

    apartmentCount().then(
        ok => {res.json(numOfApartments)}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
   
});
router.route('/searchByPrice').post((req, res)=>
{
    listing.find({"price" : {$lte : req.body.price}}, (err, allListings)=>
    {
        if(err) console.log(err);
        else
        {  console.log('ret searched listings by city');
            res.json(allListings);
        }
    });
});

router.route('/searchByCityandPrice').post((req, res)=>
{
    listing.find({"city" : req.body.city, "price" : {$lte : req.body.price}}, (err, allListings)=>
    {
        if(err) console.log(err);
        else
        {  console.log('ret searched listings by city');
            res.json(allListings);
        }
    });
});

router.route('/searchByCity').post((req, res)=>
{

    listing.find({"city" : req.body.city}, (err, allListings)=>
    {
        if(err) console.log(err);
        else
        {  console.log('ret searched listings by city');
            res.json(allListings);
        }
    });
});


router.route('/getPromotedListings').get((req, res)=>
{
    listing.find({"promoted" : "1"}, (err, allListings)=>
    {
        if(err) console.log(err);
        else
        {  console.log('ret promoted listings');
            res.json(allListings);
        }
    });
});

router.route('/approveUser').post((req, res)=>
{
    const approvedUser = async() =>
    {
        console.log(req.body.username);
        await user.updateOne({"username": req.body.username}, { $set: { "status": "1" }})
    }

    approvedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

});

router.route('/approveListing').post((req, res)=>
{
    const approvedListing = async() =>
    {
        await listing.updateOne({"description": req.body.id}, { $set: { "status": "1" }})
    }

    approvedListing().then(
        ok => {res.status(200).json({'listing' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
});

router.route('/declineListing').post((req, res)=>
{
    const declineListing = async() =>
    {
        await listing.deleteOne({"description": req.body.id});
    }

    declineListing().then(
        ok => {res.status(200).json({'listing' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
});

router.route('/deleteListing').post((req, res)=>
{
    const deleteListing = async() =>
    {
        await listing.deleteOne({"description": req.body.id});
    }

    deleteListing().then(
        ok => {res.status(200).json({'listing' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
});

router.route('/promoteListing').post((req, res)=>
{  
    const promoteListing = async() =>
    {
        await listing.updateOne({"description": req.body.id}, { $set: { "promoted": "1" }})
    }
    console.log("listing promoted");

    promoteListing().then(
        ok => {res.status(200).json({'listing' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
});

router.route('/upPromoteListing').post((req, res)=>
{  
    const upPromoteListing = async() =>
    {
        await listing.updateOne({"description": req.body.id}, { $set: { "promoted": "0" }})
    }
    console.log("listing unpromoted");

    upPromoteListing().then(
        ok => {res.status(200).json({'listing' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"listing": "no"})}
    )
});


router.route('/declineUser').post((req, res)=>
{
    const approvedUser = async() =>
    {
        console.log(req.body.username);
        await user.deleteOne({"username" : req.body.username});
    }

    approvedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

});

router.route('/changePhoto').post((req, res)=>
{
    const changePhoto = async() =>
    {
        console.log(req.body.username);
        await user.updateOne({"username" : req.body.username}, {$set : {"image" : req.body.img}});
    }

    changePhoto().then(
        ok => {res.status(200).json({'picture' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"picture": "no"})}
    )
});


router.route('/buyListing').post((req, res)=>
{
    const buyListing = async() =>
    {
        console.log(req.body.username, req.body.id);
        await listing.updateOne({"description" : req.body.id}, {$set : {"buyer" : req.body.username, "status" : "2"}});
    }

    buyListing().then(
        ok => {res.status(200).json({'bought' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"bought": "no"})}
    )
});


router.route('/getOneUser').post((req, res)=>
{
    let username = req.body.username;
    

    user.findOne({'username' : username}, (err, user) =>
    {
        if(err) console.log(err);
        else  
        {
            console.log(username);
            res.json(user);
        }
    
            
    })

});

router.route('/getPotentialBuyers').post((req, res)=>
{

});

router.route('/updateOneUser').post((req, res)=>
{
    const updatedUser = async() =>
    {
        console.log("Trying to update user");
        console.log(req.body.username);
        await user.updateOne({"username" : req.body.username}, {$set : {"name" : req.body.name, "surname" : req.body.surname, "mail" : req.body.mail, "city" : req.body.city, "country" : req.body.country}});
        console.log("Updated user");
    }

    updatedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )
});

router.route('/updatePassword').post((req, res)=>
{
    user.findOne({'username' : req.body.username, 'password' : req.body.oldpassword}, (err, exists)=>
        {
            if(err) console.log(err);
            else if(exists == null)
                {
                    console.log('Wrong password!');
                    res.status(200).json({'user' : 'notOldPassword'});
                    return;
                }
                else
                {
                    if(req.body.newpassword !== req.body.confpassword)
                    {
                        console.log('Passwords dont match!');
                        res.status(200).json({'user' : 'passwordsNotMatching'});
                        return;
                
                    }
                    else
                    {
                        const approvedUser = async() =>
                        {
                            console.log(req.body.username);
                            await user.updateOne({"username": req.body.username}, { $set: { "password": req.body.newpassword }})
                        }
                    
                        approvedUser().then(
                            ok => {res.status(200).json({'user' : 'ok'})}
                        ).catch(
                            err => { res.status(400).json({"user": "no"})}
                        )
                    }
                }
            });
});

router.route('/updateUser').post((req, res)=>
{
    const updatedUser = async() =>
    {
        console.log(req.body.username);
        await user.updateOne({"username" : req.body.username}, {$set : {"name" : req.body.name, "surname" : req.body.surname, "mail" : req.body.mail, "type" : req.body.type}});
        console.log("Updated user");
    }

    updatedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

});

router.route('/api/v1/product/upload_products_file').post((req, res)=>{
    getRawBody(req).then((buf) => {
        const fs = require('fs');
        fs.writeFile('new_products_add.txt', buf, function(err: any) {
            let data = fs.readFileSync('new_products_add.txt','utf8');
            var matches = data.match(/\{[^\}]*}/g);
            for (let i = 0; i<matches.length; i++) {
                let newListing = JSON.parse(matches[i]);
                const userData = 
                {

                    description : newListing.description,
                    city : newListing.city,
                    municipality : newListing.municipality,
                    address : newListing.address,
                    number : newListing.number,
                    type : newListing.type,
                    numoflevels : newListing.numoflevels,
                    level : newListing.level,
                    size : newListing.size,
                    numofrooms : newListing.numofrooms,
                    furnished : newListing.furnished,
                    price : newListing.price,
                    owner : newListing.owner,
                    status : newListing.status,
                    promoted : "0",
                    buyer : "",
                    paths : ""
                    
                }

                const addOneListing = async() =>
                {
                    console.log(req.body.username);
                    let addListing = new listing(userData);
                    addListing.save();
                }
            
                addOneListing().then(
                    ok => {res.status(200).json({'status' : 'ok'})}
                ).catch(
                    err => { res.status(400).json({"status": "no"})}
                )
            }
        });
    }).catch((err) => {
        console.log(err)
        res.statusCode = err.statusCode;
        res.end(err.message);
        return;
    });
});

router.route('/getMyListings').post((req, res)=>
{
    let username = req.body.username;

    listing.find({'owner' : username}, (err, listings) =>
    {
        if(err) console.log(err);
        else 
        {
            res.json(listings);
        }
    })
});


router.route('/getMyPurchases').post((req, res)=>
{
    let username = req.body.username;

    listing.find({'buyer' : username}, (err, listings) =>
    {
        if(err) console.log(err);
        else 
        {
            res.json(listings);
        }
    })
});


router.route('/getListing').post((req, res)=>
{
    let id = req.body.id;
    console.log(id);

    listing.findOne({'description' : id}, (err, listings) =>
    {
        if(err) console.log(err);
        else 
        {
            console.log("found")
            res.json(listings);
        }
    })
});

router.route('/wantToBuy').post((req, res)=>
{
    console.log(req.body.user);
    listing.collection.updateOne({"description" : req.body.id}, {$push : {"wantToBuy" : req.body.user}});
    console.log("want to buy done")
    res.status(200).json({'status' : 'ok'});

});

router.route('/addNewListing').post((req, res)=>
{
    const dataListing =
    {
        description : req.body.description,
        city : req.body.city,
        municipality : req.body.municipality,
        address : req.body.address,
        number : req.body.number,
        type : req.body.type,
        numoflevels : req.body.numoflevels,
        level : req.body.level,
        size : req.body.size,
        numofrooms : req.body.numofrooms,
        furnished : req.body.furnished,
        price : req.body.price,
        owner : req.body.username,
        status : req.body.status,
        promoted : req.body.promoted,
        buyer : req.body.buyer
    }
    console.log(req.body.username);
    let newListing = new listing(dataListing);
    newListing.save().then(newListing =>
        {
            console.log('Listing added');
            res.status(200).json({'listing' : 'ok'});
         }).catch(err =>
            {
                  console.log('error');
                  res.status(400).json({'listing' : 'error'});
            });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
const mongoose = require('mongoose');
const UserModel = require('./UserSchema');
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


var jwt = require('jsonwebtoken');
const ddeJWTcode = 'shingeki#no#Kyojin';
const Port = 6012;
const mongoURI = "mongodb://0.0.0.0:27017/DDEUss";

const app = express()
const cros = require('cors')
app.use(cros())
app.use(express.json())


mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, (error) => {

    if (error) {
        console.log(`Fail to Connect With MongoDB, ERROR:${error}`);
    }
    else {
        console.log("Successfully Connected With MongoDB");
    }
})

app.listen(Port, () => {
    console.log(`Server is started : ${Port}`)
})


app.post("/dde/signUp", [

    body('mobile').isLength({ min: 10, max: 10 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),

], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const pwdsalt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(req.body.password, pwdsalt);
    UserModel.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashpwd,
        ddeAadhar: null,
        ddeAddress: null,
    })

    try {

        let ddeuser = await UserModel.findOne({ email: req.body.email, mobile: req.body.mobile });
        if (ddeuser) {
            success = false
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        else {
            success = true;
            res.json({ success })
            console.log(" Successfully SignUp by User");
        }
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})








app.post("/dde/signIn", [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body

    try {

        let ddeuser = await UserModel.findOne({ email: email });
        if (!ddeuser) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        else {

            const pwdCompare = await bcrypt.compare(password, ddeuser.password);
            if (!pwdCompare) {
                success = false
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })            
            }

            else {

                const Userdata = {
                    id: ddeuser.id
                }
                //console.log(Userdata)
                const ddeauthToken = jwt.sign(Userdata, ddeJWTcode);
                success = true;
                
                res.json({ success, ddeauthToken})
                console.log(" Successfully SignIn by User");
                //console.log("DDEauthToken: ",ddeauthToken)
               
            }
        }
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





app.post("/dde/ddeVerify", [
    
    body('ddeAadhar').isLength({ min: 12, max: 12 }),
    body('email').isEmail(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        let ddeuser = await UserModel.findOne({ email: req.body.email });
        if (ddeuser) {
            await UserModel.updateOne({ email: req.body.email }, {
                ddeAadhar: req.body.ddeAadhar,
                ddeAddress: req.body.ddeAddress,
            });
            res.status(200).send("User updated successfully");
            
        } 
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



const ddefetchuser = (req, res, next) => {

    const token = req.header('Authorization');
    //console.log(token)

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, ddeJWTcode);
        req.user = data;
        //console.log("Verified User and Decoded JWT, Decoded: ",req.user)
        next();
    }

    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}



app.post('/dde/user', ddefetchuser, async (req, res) => {
    try {
        const ddeUserId = req.user.id;
        const ddeUserData = await UserModel.findById(ddeUserId).select("-password")
        res.json(ddeUserData)
        console.log("Successfully fetch Userdata from MongoDB")
        //console.log("UserData: ",ddeUserData)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/dde/adminSignIn", [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body

    try {
        if(email === "admin0001@gmail.com" && password === "admin0001"){
            const AdminData = {
                email: email
            }
            const ddeadminToken = jwt.sign(AdminData, ddeJWTcode);
            success = true;
            res.json({ success, ddeadminToken})
        }
        

    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Define the voting entry schema
const votingSchema = new mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    candidates: [{
        name: String,
        image: String,
        address: String,
        voteCount: Number,
    }],
});
const VotingModel = mongoose.model('ddevoting', votingSchema);



app.post('/dde/voters', async (req, res) => {
    const { name, start, end, candidates } = req.body;
  
    try {
        const newEntry = new VotingModel({ name, start, end, candidates });
        await newEntry.save();
        res.status(201).send('Voting entry created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create voting entry');
    }
});

  
app.get('/dde/votersData', async (req, res) => {
    try {
      const votingData = await VotingModel.find();
      res.send(votingData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});
  
  
  
  
  
  
  


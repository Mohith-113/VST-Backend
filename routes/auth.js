
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../model/Schema');
const jwt = require('jsonwebtoken');
const {Addmve}  = require('../model/SchemaAddNve');

//register route
router.post("/register", async (req, res) => {
    let { name, username, email, password } = req.body;
    //check the user already exist with this email
    const takenEmail = await User.findOne({ username: username });
    if (takenEmail) {
        return res.status(405).json("username already exists");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password,
        });
        await newUser.save();
        return res.json("user account created sucessfully");
    }
});

//login user
router.post("/Login", async (req, res) => {
    try {
        const { username, password } = req.body;
        //confirm the user is register or not
        const userexist = await User.findOne({ username: username });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, 'newsecreate', { expiresIn: 360000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, name: userexist.name });
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
        }
        );
    } catch (error) {
        return res.status(500).json("server error")
    }
});

//Admin login
router.post('/adminlogin', async(req, res) => {
    const {username, password} = req.body;
    if(username === "VST-Project" && password === "VST-LSMYS") {
        return res.status(200).json('successful');
    }
    else {
        return res.status(405).json("user/password is incorrect");
    }
});

//add route
router.post("/add", async (req, res) => {
    let {  title, posterUrl, flexiUrl , description, videoUrl} = req.body;
    //check the user already exist with this email
    const takenEmail = await Addmve.findOne({ title: title });
    if (takenEmail) {
        return res.status(405).json("Movie already added");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            title,
            posterUrl,
            flexiUrl,
            description,
            videoUrl,
        });
        await newUser.save();
        return res.json("Movie added sucessfully");
    }
});


module.exports = router;

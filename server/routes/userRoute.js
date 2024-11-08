const express = require('express');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { getUserProfile, addUser, loginUser, editUser, deleteUser, updatePW, checkPassword, checkEmail, insertImg, getGameStats } = require('../models/userModel');

const router = express.Router();

const saltRounds = 10;

router.post('/register', async function (req, res, next) {
    console.log("Received request data:", req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dateString = req.body.dob;
    const gender = req.body.gender;
    console.log('DOB:', dateString);
    const formattedDOB = new Date(dateString).toISOString().split('T')[0];
    console.log('Formatted DOB:', formattedDOB);

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const createUser = await addUser(name, email, hashedPassword, formattedDOB, gender);
        console.log(createUser);
        return res.send(createUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    loginUser(email, password)
        .then(function (userLogin) {
            console.log(userLogin);
            return res.send(userLogin);
        })
        .catch(function (error) {
            console.error(error);
        });
});

router.get('/profile', async function (req, res, next) {
    const uid = req.headers.uid;

    if (uid) {
        getUserProfile(uid)
            .then(function (userProfile) {
                const userData = userProfile.rows[0];
                return res.status(200).json(userData);
            })
            .catch(function (error) {
                console.error(error)
            });
    } else {
        console.log('NO UID DUDE');
    }
});

router.delete('/deleteUser', async function (req, res, next) {
    const uid = req.headers.uid;
    deleteUser(uid)
        .then(function (deleteAcct) {
            console.log(deleteAcct);
            return res.send(deleteAcct);
        })
        .catch(function (error) {
            console.log(error);
        })
});

router.put('/editUser', async function (req, res, next) {
    const uid = req.headers.uid;
    const username = req.body.username;
    const email = req.body.email;

    try {
        const result = await editUser(uid, username, email);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updatePW', async function (req, res, next) {
    const uid = req.headers.uid;
    const newPassword = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const result = await updatePW(uid, hashedPassword);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/checkPassword', async function (req, res, next) {
    const uid = req.headers.uid;
    const password = req.body.password;
    try {
        console.log('Provided Password:', password);

        const user = await getUserProfile(uid);
        const hashedPassword = user.rows[0].password;
        // console.log('Hashed Password from DB:', hashedPassword);

        // comparing passwords
        const checkPasswordResult = await bcrypt.compare(password, hashedPassword);

        // console.log('Password Check Result:', checkPasswordResult);

        if (checkPasswordResult) {
            return res.send({ success: true, message: 'Password is correct' });
        } else {
            return res.send({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/checkEmail', async function (req, res, next) {
    const email = req.body.email;
    checkEmail(email)
        .then(function (result) {
            console.log(result);
            return res.send(result);
        })
        .catch(function (error) {
            console.error(error)
        })
});

router.post('/insertImgID', async function (req, res, next) {
    const uid = req.headers.uid;
    const image_path = req.body.image_path;
console.log("imgpath " + image_path);
    try {
        const result = await insertImg(uid, image_path);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/statistics', async function (req, res, next) {
    const gameId = req.query.gameId;
    const uid = req.headers.uid;
  
    console.log(parseInt(gameId));
    try {
      const gameStats = await getGameStats(uid, parseInt(gameId));
      console.log(gameStats);
      return res.status(200).json(gameStats);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
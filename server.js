const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./DB/connection");
const bcrypt = require("bcrypt");
const userModel = require("./Schema/tranction");
const RagisterSchema = require("./Schema/Ragister");
const jwt = require("jsonwebtoken");
const SERVER_KEY = "newWebToken"
const PORT = 5000 || process.env.PORT

const app = express()

app.use(bodyParser.json())
connectDb()

app.get("/get-txn/:id", (req, res) => {

    let { id } = req.params
    console.log(id)

    txnModel.findOne({ _id: id })
        .then(result => {
            res.send({ status: "OK", data: result })
        }).catch(err => {
            console.log(err)
        })
})


app.get("/pagination", (req, res) => {

    let filter = {
        address: "indore"
    }

    let projection = {
        userName: 1,
        _id: 0
    }

    userModel.find(filter, projection)
        .then(data => {
            res.send({ status: "Ok", users: data })
        }).catch(err => {
            console.log(err)
        })

})


app.post("/ragister-user", async (req, res) => {

    const { userName, email, password, confirmPassword } = req.body

    try {
        let data = await RagisterSchema.findOne({ userName })
        if (data) {

            const { _id } = data
            const token = jwt.sign({ _id }, SERVER_KEY);

            res.send({ status: "Find", msg: "User Already exist", tokenKey: token })

        } else if (password === confirmPassword) {

            let hash = await bcrypt.hash(password, 8)
            let ragister = await RagisterSchema.create({ userName, email, password: hash })
            res.send({ status: "OK", key: ragister })

        } else {
            res.send({ status: "Error", msg: "Second Password in Wrong" })
        }
    } catch (err) {
        res.send({ status: "ERROR", ERROR: err })
    }



    // RagisterSchema.findOne({ userName })
    //     .then(data => {
    //         if (data) {
    //             res.send({ status: "Find", msg: "User Already exist" })
    //         } else {
    //             bcrypt.hash(password, 8, (err, hash) => {
    //                 if (!err) {
    //                     RagisterSchema.create({ userName, email, password: hash })
    //                         .then((result) => {
    //                             res.send({ status: "OK", userInfo: result })
    //                         }).catch((err) => {
    //                             console.log(err)
    //                         })
    //                 } else {
    //                     console.log("Password is not store an HASH form in Database")
    //                 }
    //             })
    //         }
    //     }).catch(err => {
    //         console.log("something went wronf", err)
    //     })
})


app.listen(PORT, () => {
    console.log("server is running")
})

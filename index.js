import dotenv from "dotenv"
import connectDB from "./database/dbconnect.js";
import {app} from './app.js'
import userRouter from "./route/userRouter.js";
import tutorRouter from "./route/tutorRouter.js";
import NGO from "./models/ngo.models.js";
import ngosRouter from "./route/ngo'sRoute.js";
dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use('/user',userRouter);
app.use('/tutor',tutorRouter);
app.use('/',ngosRouter);










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/
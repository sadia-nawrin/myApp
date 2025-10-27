import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();
if(process.env.NODE_ENV === "production") job.start();

// middleware
app.use(cors());
app.use(rateLimiter);
app.use(express.json());


// our custom simple middleware
// app.use((req,res, next) => {
//     console.log("hey we hit a reg", req.method);
//     next ();
// })


const PORT = process.env.PORT || 5001


app.get("/api/health", (req,res) =>{
    res.status(200).json({status:"ok"});
})
// step 1



// app.get("/", (req,res) => {
//     res.send("It's working");
// });


app.use("/api/transactions",transactionsRoute);






// console.log("my port:",process.env.PORT);

initDB().then(()=>{
    app.listen(PORT, () =>{
    console.log("server is running on PORT:", PORT)
});
});




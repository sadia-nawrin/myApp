import express from "express"
import {createTransaction, deleteTransaction, getSummary, getTransactionByUserId} from "../controller/transactionsController.js";




const router = express.Router()


router.post("/",createTransaction);

router.get("/:userId",getTransactionByUserId);

router.delete("/:id",deleteTransaction );

router.get("/summary/:userId",getSummary);



export default router;
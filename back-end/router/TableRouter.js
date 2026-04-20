import express from "express"
import { addTable,getTables,deleteTable,updateTable, getTotalTable } from "../controller/TableController.js"

const router = express.Router()

router.post("/add",addTable)
router.get("/get/:id",getTables)
router.delete("/delete/:id",deleteTable)
router.put("/update/:id",updateTable)
router.get("/total/:id", getTotalTable)

export default router
import { Router } from "express";
import { getAccountDetails, getBankList, withdraw } from "src/controllers/withdrawer";

const withdrawRouter = Router()

withdrawRouter.get('/bank-list', getBankList)
withdrawRouter.get('/account-details', getAccountDetails)
withdrawRouter.post('/withdraw', withdraw)

export default withdrawRouter
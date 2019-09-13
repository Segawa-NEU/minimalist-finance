const createAPIRouter = require('./createAPIRouter.js')
const { Earning, Expense, EarningCategory, ExpenseCategory } = require('../models')
const express = require('express')
const router = express.Router()

router.use('/earning', createAPIRouter(Earning, ['id', 'category_id', 'name', 'amount', 'date']))
router.use('/expense', createAPIRouter(Expense, ['id', 'category_id', 'name', 'amount', 'date']))
router.use('/earningCategory', createAPIRouter(EarningCategory, ['id', 'name', 'color']))
router.use('/expenseCategory', createAPIRouter(ExpenseCategory, ['id', 'name', 'color']))

module.exports = router

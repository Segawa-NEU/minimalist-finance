import earningCategoryResourceValidator from './earningCategoryResourceValidator.js'
import expenseCategoryResourceValidator from './expenseCategoryResourceValidator.js'
import earningResourceValidator from './earningResourceValidator'
import expenseResourceValidator from './expenseResourceValidator'
export default {
  earningCategory: earningCategoryResourceValidator,
  expenseCategory: expenseCategoryResourceValidator,
  earning: earningResourceValidator,
  expense: expenseResourceValidator
}

const express = require('express')
const router = express.Router()
const {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pageController')

router.get('/', getPages)
router.get('/:slug', getPage)
router.post('/', createPage)
router.put('/:id', updatePage)
router.delete('/:id', deletePage)

module.exports = router
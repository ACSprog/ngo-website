const Page = require('../models/Page')

// Get all pages
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find()
    res.json(pages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single page
exports.getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug })
    if (!page) return res.status(404).json({ message: 'Page not found' })
    res.json(page)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create page
exports.createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body)
    res.status(201).json(page)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update page
exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(page)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete page
exports.deletePage = async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id)
    res.json({ message: 'Page deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
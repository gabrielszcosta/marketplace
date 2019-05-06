const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const ads = await Ad.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        sort: '-createdAt'
      }
    )
    res.json(ads)
  }
  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    res.json(ad)
  }

  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    res.json(ad)
  }

  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    res.send()
  }
}

module.exports = new AdController()

module.exports = function (model, attributes) {
  const express = require('express')
  const router = express.Router()

  router.use(express.json())

  router.get('/', function (req, res, next) {
    model.findAll(
      {
        where: { user_id: req.user.id },
        attributes: attributes
      }
    ).then((data) => {
      res.json(data)
      return res
    }).catch((error) => {
      console.error(error)
      res.status(500).send({ error: 'failed to fetch data' })
      return res
    })
  })

  router.post('/', function (req, res, next) {
    model.create({
      ...req.body,
      ...{ user_id: req.user.id }
    }).then((data) => {
      res.json(data)
      return res
    }).catch((error) => {
      console.error(error)
      res.status(500).send({ error: 'failed insert data' })
      return res
    })
  })

  router.put('/', function (req, res, next) {
    model.findByPk(req.body.id, {
      attributes: attributes
    }).then((data) => {
      data.update(req.body).then((updated) => {
        res.json(updated)
        return res
      }).catch((error) => {
        console.error(error)
        res.status(500).send({ error: 'failed to update entry' })
        return res
      })
    }).catch((error) => {
      console.log(error)
      res.status(400).send({ error: 'entry does not exists' })
      return res
    })
  })

  router.delete('/', function (req, res, next) {
    model.findByPk(req.query.id).then((data) => {
      data.destroy()
    }).then(() => {
      res.status(200).send({ message: 'successfully deleted' })
      return res
    }).catch((error) => {
      console.log(error)
      res.status(400).send({ error: 'entry does not exists' })
      return res
    })
  })

  return router
}

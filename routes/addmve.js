const router = require('express').Router();
const Addmve = require('../model/SchemaAddNve');

router.get('/', async (req, res) => {
  try {
    const movies = await Addmve.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Addmve.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

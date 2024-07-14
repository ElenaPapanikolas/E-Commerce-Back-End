const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tag_data = await Tag.findAll({
      // associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(tag_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag_data = await Tag.findByPk(req.params.id, {
      // associated Product data
      include: [{ model: Product }],
    });
    
    if (!tag_data) {
      res.status(404).json({message: 'No tag data found with that id!' });
      return;
    }
    
    res.status(200).json(tag_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag_data = await Tag.create(req.body);
    res.status(200).json(tag_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag){
      return res.status(404).json({ message: 'No tag found, please try again.'});
    }

    tag.tag_name = tag_name;
    await tag.save(); 

    return res.status(200).json(tag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag_data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag_data) {
      return res.status(404).json({ message: 'No tag found, please try again.' });
    }
    res.status(200).json(tag_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

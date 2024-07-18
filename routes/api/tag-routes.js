// Importing
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET request to find all tags
router.get('/', async (req, res) => {
  
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

// GET request for find a single tag by id
router.get('/:id', async (req, res) => {
  
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

// POST request to create a new tag
router.post('/', async (req, res) => {
  
  try {
    const tag_data = await Tag.create(req.body);
    res.status(200).json(tag_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT request to update a tags name by id
router.put('/:id', async (req, res) => {
  
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

// DELETE request to delete a tag buy its id
router.delete('/:id', async (req, res) => {
  
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

// Exporting
module.exports = router;

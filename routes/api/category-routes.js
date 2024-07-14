const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const category_data = await Category.findAll({
      // associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category_data = await Category.findByPk(req.params.id, {
      // associated Products
      include: [{ model: Product }],
    });
    
    if (!category_data) {
      res.status(404).json({message: 'No category data found with that id!' });
      return;
    }
    
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category_data = await Category.create(req.body);
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category){
      return res.status(404).json({ message: 'No category found, please try again.'});
    }

    category.category_name = category_name;
    await category.save(); 

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category_data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category_data) {
      return res.status(404).json({ message: 'No category found, please try again.' });
    }
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

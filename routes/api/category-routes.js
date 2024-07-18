// Importing 
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET request to find all categories
router.get('/', async (req, res) => {
  
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

// GET request to find one category by id
router.get('/:id', async (req, res) => {
  
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

// POST request to create a new category
router.post('/', async (req, res) => {
  
  try {
    const category_data = await Category.create(req.body);
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUt request to update a category by id
router.put('/:id', async (req, res) => {
  
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

// DELETE request to delete a category by id
router.delete('/:id', async (req, res) => {
  
  try { // Find category to delete
    const category_data = await Category.findByPk(req.params.id);
    if (!category_data) {
      return res.status(404).json({ message: 'No category found, please try again.' });
    }
    // Find all products in category to delete
    const products = await Product.findAll({ where: {category_id: req.params.id }});

    await Product.destroy({ where: { category_id: req.params.id }});

    await Category.destroy({ where: { id: req.params.id }});

    res.status(200).json({ message: 'Category and associated products have been successfully deleted.'});
  } catch (err) {
    res.status(500).json(err);
  }

});

// Exporting
module.exports = router;

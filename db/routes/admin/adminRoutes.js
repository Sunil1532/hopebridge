import express from 'express';
import Child from '../../models/Child.js';

const router = express.Router();

// Get all children (for admin)
router.get('/', async (req, res) => {
  try {
    const children = await Child.find().sort({ createdAt: -1 });
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new child (admin)
router.post('/', async (req, res) => {
  const { name, age, status } = req.body;
  if (!name || age == null) {
    return res.status(400).json({ message: 'Name and age are required' });
  }
  try {
    const newChild = new Child({ name, age, status });
    await newChild.save();
    res.status(201).json(newChild);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update child by ID (admin)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, status } = req.body;
  if (!name || age == null) {
    return res.status(400).json({ message: 'Name and age are required' });
  }
  try {
    const updatedChild = await Child.findByIdAndUpdate(
      id,
      { name, age, status },
      { new: true }
    );
    if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
    res.json(updatedChild);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete child by ID (admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChild = await Child.findByIdAndDelete(id);
    if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
    res.json({ message: 'Child deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

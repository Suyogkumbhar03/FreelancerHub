import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/talent
// @desc    Get all vetted freelancers
router.get('/', async (req, res) => {
  try {
    const { search, specialization, maxRate } = req.query;
    let query = { role: 'freelancer' };

    if (specialization) {
      query.title = { $regex: specialization, $options: 'i' };
    }

    if (maxRate) {
      query.hourlyRate = { $lte: Number(maxRate) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const freelancers = await User.find(query).select('-password');
    res.json(freelancers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

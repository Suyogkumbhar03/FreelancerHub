import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET, protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user (Clean profile defaults for new freelancers)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, title, bio, hourlyRate, skills, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      title: title || (role === 'freelancer' ? 'Junior Fullstack Developer' : 'Project Manager'),
      bio: bio || (role === 'freelancer' ? 'New freelancer eager to deliver high quality work.' : 'Hiring talented freelancers for top projects.'),
      hourlyRate: hourlyRate || 40,
      skills: skills || (role === 'freelancer' ? ['React', 'JavaScript', 'HTML/CSS'] : []),
      companyName: companyName || (role === 'client' ? `${name}'s Company` : ''),
      totalEarned: '$0.00',
      totalSpent: '$0.00',
      reviewsCount: 0,
      rating: 5.0,
      successScore: 100,
      activeProjects: 0,
      completedProjects: 0
    });

    const token = generateToken(newUser);
    const userResp = newUser.toObject();
    delete userResp.password;

    res.status(201).json({ token, user: userResp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const userResp = user.toObject();
    delete userResp.password;

    res.json({ token, user: userResp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/auth/demo
// @desc    1-Click Demo Login as Pratik (freelancer) or Suyog (client)
router.post('/demo', async (req, res) => {
  try {
    const { role } = req.body;
    const targetEmail = role === 'client' ? 'suyog@freelancehub.com' : 'pratik@freelancehub.com';

    let user = await User.findOne({ email: targetEmail });
    if (!user) {
      if (role === 'client') {
        user = await User.create({
          name: 'Suyog',
          email: 'suyog@freelancehub.com',
          password: 'password123',
          role: 'client',
          companyName: 'Suyog Tech Ventures',
          title: 'Founder & CEO',
          location: 'Pune, India',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
          totalSpent: '$4,500.00'
        });
      } else {
        user = await User.create({
          name: 'Pratik',
          email: 'pratik@freelancehub.com',
          password: 'password123',
          role: 'freelancer',
          title: 'Fullstack Web Developer',
          hourlyRate: 50,
          skills: ['React', 'Node.js', 'Express', 'MongoDB'],
          location: 'Mumbai, India',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          totalEarned: '$0.00',
          reviewsCount: 0,
          rating: 5.0,
          successScore: 100
        });
      }
    }

    const token = generateToken(user);
    const userResp = user.toObject();
    delete userResp.password;

    res.json({ token, user: userResp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

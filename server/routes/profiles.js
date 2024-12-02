import express from 'express';
import Profile from '../models/Profile.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all profiles (with optional type filter)
router.get('/', async (req, res) => {
  try {
    const query = req.query.type ? { profileType: req.query.type } : {};
    const profiles = await Profile.find(query).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new profile (protected)
router.post('/', auth, async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update profile (protected)
router.patch('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete profile (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
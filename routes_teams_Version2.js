const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { leagueId, teamName, city, primaryColor, secondaryColor } = req.body;
    
    const team = new Team({
      leagueId,
      userId: req.user.id,
      teamName,
      city,
      primaryColor,
      secondaryColor,
    });

    await team.save();
    res.status(201).json({ message: 'Team created', team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('players')
      .populate('userId');
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/add-player', authMiddleware, async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { players: playerId } },
      { new: true }
    );
    res.json({ message: 'Player added', team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/league/:leagueId', async (req, res) => {
  try {
    const teams = await Team.find({ leagueId: req.params.leagueId });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
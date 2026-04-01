const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { leagueId, homeTeamId, awayTeamId, gameDate } = req.body;
    
    const game = new Game({
      leagueId,
      homeTeam: homeTeamId,
      awayTeam: awayTeamId,
      gameDate,
    });

    await game.save();
    res.status(201).json({ message: 'Game created', game });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('homeTeam')
      .populate('awayTeam');
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/simulate', authMiddleware, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('homeTeam')
      .populate('awayTeam');
    
    if (!game) return res.status(404).json({ message: 'Game not found' });

    game.homeScore = Math.floor(Math.random() * 40) + 90;
    game.awayScore = Math.floor(Math.random() * 40) + 90;
    game.status = 'finished';

    await game.save();
    res.json({ message: 'Game simulated', game });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
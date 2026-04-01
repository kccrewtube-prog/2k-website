const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  leagueName: { type: String, required: true },
  description: String,
  commissionerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  discordServerId: String,
  discordChannelId: String,
  
  season: { type: Number, default: 1 },
  maxTeams: { type: Number, default: 12 },
  maxPlayersPerTeam: { type: Number, default: 15 },
  
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  
  status: { type: String, enum: ['setup', 'active', 'playoffs', 'finished'], default: 'setup' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('League', leagueSchema);
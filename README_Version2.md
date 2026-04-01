# NBA 2K26 Simulation League

A fully-featured NBA 2K26 simulation league platform with Discord integration, allowing players to create custom characters, compete in simulated games, and manage teams across a complete league ecosystem.

## 🎮 Features

✅ **Player Management**
- Create custom players with 10+ skill attributes (Speed, Strength, Shooting, Defense, Passing, Stamina, Dribbling, Rebounding, Clutch, Consistency)
- Track detailed season and career statistics
- Real-time attribute updates and progression

✅ **League Management**
- Create and manage multiple simulation leagues
- Support for up to 12 teams per league
- Roster management and player draft system
- Configurable league settings and rules

✅ **Game Simulation**
- Realistic game simulation engine
- Detailed box score tracking with player statistics
- Season standings and record management
- Head-to-head matchups

✅ **Discord Integration**
- Link Discord accounts to player profiles
- Receive game notifications and league updates
- Manage teams and players via Discord commands
- Live game updates and alerts

✅ **Authentication & Security**
- Secure user authentication with JWT tokens
- Password hashing with bcryptjs
- Protected API routes with middleware

## 🚀 Quick Start

### Prerequisites
- Node.js 14 or higher
- MongoDB Atlas account (free at mongodb.com)
- Discord Bot Token

### Installation

1. **Extract the files**
```bash
unzip nba-2k26-simulation-league.zip
cd nba-2k26-simulation-league
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file** (copy from .env.example and fill in values)
```bash
cp .env.example .env
```

4. **Update .env with your credentials**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nba2k26
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_SERVER_ID=your_discord_server_id_here
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

5. **Start the server**
```bash
npm start
```

Server runs on `http://localhost:5000`

## 📋 Project Structure

```
nba-2k26-simulation-league/
├── server.js                 # Main Express application
├── package.json             # Node.js dependencies
├── .env.example            # Environment variables template
├── models/                 # Database models
│   ├── User.js            # User authentication
│   ├── Player.js          # Player stats & attributes
│   ├── Team.js            # Team management
│   ├── League.js          # League configuration
│   └── Game.js            # Game simulation
├── routes/                # API route handlers
│   ├── auth.js           # Authentication endpoints
│   ├── players.js        # Player CRUD operations
│   ├── teams.js          # Team management
│   ├── leagues.js        # League management
│   └── games.js          # Game simulation
├── middleware/           # Custom middleware
│   └── auth.js          # JWT authentication
├── discord/             # Discord bot integration
│   └── bot.js          # Discord client setup
└── README.md           # This file
```

## 🔗 API Reference

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user account |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/profile` | Get authenticated user profile |
| POST | `/api/auth/link-discord` | Link Discord account to profile |

### Player Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/players` | Create new player |
| GET | `/api/players/:id` | Get player details & stats |
| PUT | `/api/players/:id/attributes` | Update player attributes |
| GET | `/api/players/user/:userId` | Get all player's players |

### Team Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/teams` | Create new team |
| GET | `/api/teams/:id` | Get team details |
| PUT | `/api/teams/:id/add-player` | Add player to team roster |
| GET | `/api/teams/league/:leagueId` | Get all teams in league |

### League Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leagues` | Create new league |
| GET | `/api/leagues/:id` | Get league details |
| GET | `/api/leagues` | Get all available leagues |
| PUT | `/api/leagues/:id/status` | Update league status |

### Game Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/games` | Schedule new game |
| GET | `/api/games/:id` | Get game details |
| POST | `/api/games/:id/simulate` | Simulate game and generate scores |

## 🎮 Player Attributes

Each player has 10 attributes rated from 0-99:

| Attribute | Description |
|-----------|-------------|
| **Speed** | Player movement and acceleration |
| **Strength** | Physical power and contact defense |
| **Shooting** | Offensive accuracy and range |
| **Defense** | Defensive capability and perimeter defense |
| **Passing** | Ball handling and assist ability |
| **Stamina** | Endurance and fatigue resistance |
| **Dribbling** | Ball control and movement efficiency |
| **Rebounding** | Ability to grab rebounds |
| **Clutch** | Performance under pressure |
| **Consistency** | Game-to-game reliability |

## 📊 Tracked Statistics

### Season Statistics
- Games Played
- Points Scored
- Rebounds
- Assists
- Steals
- Blocks
- Turnovers
- Field Goal Percentage

### Career Statistics
- Total Games Played
- Career Points
- Career Rebounds
- Career Assists

## 🤖 Discord Integration

### Features
- Link Discord account to game account
- Receive game notifications
- Check player statistics
- League announcements
- Live game updates

### Setup
1. Get Discord Bot Token from Discord Developer Portal
2. Add bot to your Discord server
3. Link your Discord account via `/api/auth/link-discord`

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `DISCORD_BOT_TOKEN` | Yes | Discord bot authentication token |
| `DISCORD_SERVER_ID` | Yes | Discord server ID for notifications |
| `JWT_SECRET` | Yes | Secret key for JWT token signing |
| `PORT` | No | Server port (default: 5000) |

## 🛠️ Example Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "email": "player@example.com",
    "password": "securepassword123"
  }'
```

### Create Player
```bash
curl -X POST http://localhost:5000/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "leagueId": "64f123abc",
    "firstName": "LeBron",
    "lastName": "Custom",
    "position": "SF",
    "jersey": 23,
    "attributes": {
      "speed": 95,
      "strength": 90,
      "shooting": 88
    }
  }'
```

### Create League
```bash
curl -X POST http://localhost:5000/api/leagues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "leagueName": "Elite 2K26 League",
    "description": "Competitive simulation league",
    "discordServerId": "123456789"
  }'
```

### Simulate Game
```bash
curl -X POST http://localhost:5000/api/games/64f123abc/simulate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📚 Next Steps

- [ ] Create Discord slash commands for gameplay
- [ ] Build React/Vue frontend dashboard
- [ ] Implement advanced game simulation engine
- [ ] Add WebSocket for live game updates
- [ ] Create playoff tournament system
- [ ] Add player trading system
- [ ] Implement achievement/rewards system
- [ ] Deploy to production (Heroku, AWS, etc.)

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions
- Test connection string in MongoDB Compass

### Discord Bot Not Working
- Verify `DISCORD_BOT_TOKEN` is correct
- Check bot has required permissions in server
- Ensure bot intents are enabled in Discord Developer Portal
- Check Discord server ID matches `DISCORD_SERVER_ID`

### Port Already in Use
- Change `PORT` in .env file
- Or kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

### JWT Token Invalid
- Ensure `JWT_SECRET` is set and consistent
- Check token hasn't expired (7 day expiration)
- Verify token format: `Authorization: Bearer <token>`

## 📄 License

MIT License - Free to use and modify

## 🎯 Support

For issues, questions, or contributions, please refer to the documentation or contact the development team.

---

**Happy gaming! Create your custom NBA 2K26 players and dominate your simulation league! 🏀**
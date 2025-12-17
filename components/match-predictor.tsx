"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Target, Activity, Zap, Shield, Users } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Premier League teams with their stats
const teams = [
  {
    id: "man-city",
    name: "Manchester City",
    logo: "🔵",
    color: "#6CABDD",
    stats: {
      goals: 2.8,
      assists: 2.4,
      aerialDuels: 12.5,
      ballHolding: 68,
      dribbling: 18.2,
      shotsPerGame: 16.8,
      influence: 88,
      rating: 7.45,
    },
    topPlayers: [
      { name: "Erling Haaland", goals: 28, assists: 5, rating: 8.2 },
      { name: "Kevin De Bruyne", goals: 7, assists: 18, rating: 7.9 },
      { name: "Phil Foden", goals: 11, assists: 9, rating: 7.6 },
    ],
  },
  {
    id: "arsenal",
    name: "Arsenal",
    logo: "🔴",
    color: "#EF0107",
    stats: {
      goals: 2.6,
      assists: 2.2,
      aerialDuels: 13.8,
      ballHolding: 62,
      dribbling: 16.5,
      shotsPerGame: 15.2,
      influence: 85,
      rating: 7.38,
    },
    topPlayers: [
      { name: "Bukayo Saka", goals: 14, assists: 11, rating: 7.8 },
      { name: "Martin Ødegaard", goals: 8, assists: 10, rating: 7.7 },
      { name: "Gabriel Jesus", goals: 11, assists: 8, rating: 7.4 },
    ],
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "🔴",
    color: "#C8102E",
    stats: {
      goals: 2.7,
      assists: 2.3,
      aerialDuels: 11.2,
      ballHolding: 59,
      dribbling: 17.8,
      shotsPerGame: 16.5,
      influence: 87,
      rating: 7.42,
    },
    topPlayers: [
      { name: "Mohamed Salah", goals: 18, assists: 12, rating: 8.1 },
      { name: "Luis Díaz", goals: 13, assists: 5, rating: 7.5 },
      { name: "Darwin Núñez", goals: 11, assists: 8, rating: 7.3 },
    ],
  },
  {
    id: "man-utd",
    name: "Manchester United",
    logo: "🔴",
    color: "#DA291C",
    stats: {
      goals: 2.1,
      assists: 1.8,
      aerialDuels: 13.5,
      ballHolding: 55,
      dribbling: 14.2,
      shotsPerGame: 13.8,
      influence: 76,
      rating: 7.05,
    },
    topPlayers: [
      { name: "Bruno Fernandes", goals: 10, assists: 8, rating: 7.4 },
      { name: "Marcus Rashford", goals: 15, assists: 5, rating: 7.3 },
      { name: "Casemiro", goals: 5, assists: 5, rating: 7.1 },
    ],
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "🔵",
    color: "#034694",
    stats: {
      goals: 2.3,
      assists: 2.0,
      aerialDuels: 12.8,
      ballHolding: 58,
      dribbling: 15.6,
      shotsPerGame: 14.5,
      influence: 79,
      rating: 7.15,
    },
    topPlayers: [
      { name: "Cole Palmer", goals: 22, assists: 11, rating: 7.9 },
      { name: "Nicolas Jackson", goals: 14, assists: 5, rating: 7.2 },
      { name: "Raheem Sterling", goals: 8, assists: 4, rating: 7.0 },
    ],
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logo: "⚪",
    color: "#132257",
    stats: {
      goals: 2.4,
      assists: 2.1,
      aerialDuels: 11.5,
      ballHolding: 54,
      dribbling: 16.8,
      shotsPerGame: 15.8,
      influence: 80,
      rating: 7.22,
    },
    topPlayers: [
      { name: "Son Heung-min", goals: 17, assists: 9, rating: 7.7 },
      { name: "James Maddison", goals: 4, assists: 9, rating: 7.3 },
      { name: "Dejan Kulusevski", goals: 8, assists: 8, rating: 7.2 },
    ],
  },
  {
    id: "newcastle",
    name: "Newcastle United",
    logo: "⚫",
    color: "#241F20",
    stats: {
      goals: 2.2,
      assists: 1.9,
      aerialDuels: 14.2,
      ballHolding: 52,
      dribbling: 13.8,
      shotsPerGame: 13.5,
      influence: 78,
      rating: 7.18,
    },
    topPlayers: [
      { name: "Alexander Isak", goals: 21, assists: 2, rating: 7.6 },
      { name: "Anthony Gordon", goals: 11, assists: 10, rating: 7.4 },
      { name: "Bruno Guimarães", goals: 7, assists: 8, rating: 7.3 },
    ],
  },
  {
    id: "aston-villa",
    name: "Aston Villa",
    logo: "🦁",
    color: "#670E36",
    stats: {
      goals: 2.3,
      assists: 2.0,
      aerialDuels: 13.2,
      ballHolding: 53,
      dribbling: 14.5,
      shotsPerGame: 14.2,
      influence: 77,
      rating: 7.12,
    },
    topPlayers: [
      { name: "Ollie Watkins", goals: 19, assists: 13, rating: 7.7 },
      { name: "Moussa Diaby", goals: 9, assists: 9, rating: 7.2 },
      { name: "Douglas Luiz", goals: 9, assists: 5, rating: 7.1 },
    ],
  },
  {
    id: "brighton",
    name: "Brighton",
    logo: "🔵",
    color: "#0057B8",
    stats: {
      goals: 2.0,
      assists: 1.8,
      aerialDuels: 10.5,
      ballHolding: 56,
      dribbling: 15.2,
      shotsPerGame: 13.0,
      influence: 74,
      rating: 7.02,
    },
    topPlayers: [
      { name: "Kaoru Mitoma", goals: 7, assists: 7, rating: 7.3 },
      { name: "Evan Ferguson", goals: 10, assists: 1, rating: 7.1 },
      { name: "Pascal Groß", goals: 5, assists: 8, rating: 7.2 },
    ],
  },
  {
    id: "west-ham",
    name: "West Ham United",
    logo: "⚒️",
    color: "#7A263A",
    stats: {
      goals: 1.9,
      assists: 1.6,
      aerialDuels: 15.8,
      ballHolding: 48,
      dribbling: 12.5,
      shotsPerGame: 12.8,
      influence: 71,
      rating: 6.95,
    },
    topPlayers: [
      { name: "Jarrod Bowen", goals: 16, assists: 6, rating: 7.4 },
      { name: "Lucas Paquetá", goals: 4, assists: 7, rating: 7.0 },
      { name: "Mohammed Kudus", goals: 8, assists: 5, rating: 7.1 },
    ],
  },
  {
    id: "wolves",
    name: "Wolverhampton",
    logo: "🟠",
    color: "#FDB913",
    stats: {
      goals: 1.6,
      assists: 1.4,
      aerialDuels: 14.5,
      ballHolding: 46,
      dribbling: 11.8,
      shotsPerGame: 11.5,
      influence: 68,
      rating: 6.82,
    },
    topPlayers: [
      { name: "Hwang Hee-chan", goals: 12, assists: 4, rating: 7.0 },
      { name: "Pedro Neto", goals: 3, assists: 9, rating: 6.9 },
      { name: "Matheus Cunha", goals: 10, assists: 5, rating: 7.1 },
    ],
  },
  {
    id: "brentford",
    name: "Brentford",
    logo: "🐝",
    color: "#E30613",
    stats: {
      goals: 1.9,
      assists: 1.7,
      aerialDuels: 16.2,
      ballHolding: 44,
      dribbling: 11.2,
      shotsPerGame: 12.2,
      influence: 70,
      rating: 6.88,
    },
    topPlayers: [
      { name: "Ivan Toney", goals: 20, assists: 4, rating: 7.5 },
      { name: "Bryan Mbeumo", goals: 8, assists: 7, rating: 7.1 },
      { name: "Yoane Wissa", goals: 12, assists: 3, rating: 6.9 },
    ],
  },
  {
    id: "fulham",
    name: "Fulham",
    logo: "⚪",
    color: "#000000",
    stats: {
      goals: 1.8,
      assists: 1.6,
      aerialDuels: 12.8,
      ballHolding: 50,
      dribbling: 13.5,
      shotsPerGame: 11.8,
      influence: 69,
      rating: 6.9,
    },
    topPlayers: [
      { name: "Rodrigo Muniz", goals: 13, assists: 2, rating: 7.0 },
      { name: "Willian", goals: 3, assists: 8, rating: 6.9 },
      { name: "Andreas Pereira", goals: 3, assists: 6, rating: 6.8 },
    ],
  },
  {
    id: "bournemouth",
    name: "Bournemouth",
    logo: "🍒",
    color: "#DA291C",
    stats: {
      goals: 1.7,
      assists: 1.5,
      aerialDuels: 13.5,
      ballHolding: 45,
      dribbling: 12.0,
      shotsPerGame: 11.0,
      influence: 67,
      rating: 6.75,
    },
    topPlayers: [
      { name: "Dominic Solanke", goals: 19, assists: 3, rating: 7.3 },
      { name: "Antoine Semenyo", goals: 8, assists: 2, rating: 6.8 },
      { name: "Marcus Tavernier", goals: 6, assists: 7, rating: 6.9 },
    ],
  },
  {
    id: "crystal-palace",
    name: "Crystal Palace",
    logo: "🦅",
    color: "#1B458F",
    stats: {
      goals: 1.5,
      assists: 1.3,
      aerialDuels: 14.8,
      ballHolding: 43,
      dribbling: 11.5,
      shotsPerGame: 10.5,
      influence: 65,
      rating: 6.7,
    },
    topPlayers: [
      { name: "Eberechi Eze", goals: 11, assists: 4, rating: 7.2 },
      { name: "Michael Olise", goals: 10, assists: 6, rating: 7.1 },
      { name: "Jean-Philippe Mateta", goals: 16, assists: 2, rating: 7.0 },
    ],
  },
  {
    id: "everton",
    name: "Everton",
    logo: "🔵",
    color: "#003399",
    stats: {
      goals: 1.4,
      assists: 1.2,
      aerialDuels: 15.5,
      ballHolding: 42,
      dribbling: 10.8,
      shotsPerGame: 10.2,
      influence: 64,
      rating: 6.65,
    },
    topPlayers: [
      { name: "Dominic Calvert-Lewin", goals: 7, assists: 2, rating: 6.8 },
      { name: "Dwight McNeil", goals: 3, assists: 7, rating: 6.7 },
      { name: "Abdoulaye Doucouré", goals: 6, assists: 2, rating: 6.7 },
    ],
  },
  {
    id: "nottingham-forest",
    name: "Nottingham Forest",
    logo: "🌳",
    color: "#DD0000",
    stats: {
      goals: 1.6,
      assists: 1.4,
      aerialDuels: 16.5,
      ballHolding: 41,
      dribbling: 10.5,
      shotsPerGame: 10.8,
      influence: 66,
      rating: 6.72,
    },
    topPlayers: [
      { name: "Chris Wood", goals: 14, assists: 1, rating: 7.0 },
      { name: "Anthony Elanga", goals: 5, assists: 10, rating: 6.9 },
      { name: "Morgan Gibbs-White", goals: 5, assists: 10, rating: 7.1 },
    ],
  },
  {
    id: "burnley",
    name: "Burnley",
    logo: "🟣",
    color: "#6C1D45",
    stats: {
      goals: 1.3,
      assists: 1.1,
      aerialDuels: 17.2,
      ballHolding: 38,
      dribbling: 9.5,
      shotsPerGame: 9.5,
      influence: 61,
      rating: 6.55,
    },
    topPlayers: [
      { name: "Lyle Foster", goals: 5, assists: 1, rating: 6.6 },
      { name: "Wilson Odobert", goals: 3, assists: 2, rating: 6.5 },
      { name: "Zeki Amdouni", goals: 4, assists: 1, rating: 6.4 },
    ],
  },
  {
    id: "leeds",
    name: "Leeds United",
    logo: "⚪",
    color: "#FFCD00",
    stats: {
      goals: 1.8,
      assists: 1.6,
      aerialDuels: 12.2,
      ballHolding: 54,
      dribbling: 13.8,
      shotsPerGame: 12.5,
      influence: 72,
      rating: 6.92,
    },
    topPlayers: [
      { name: "Crysencio Summerville", goals: 14, assists: 9, rating: 7.3 },
      { name: "Georginio Rutter", goals: 6, assists: 15, rating: 7.1 },
      { name: "Joel Piroe", goals: 13, assists: 2, rating: 6.9 },
    ],
  },
  {
    id: "swansea",
    name: "Swansea City",
    logo: "🦢",
    color: "#121212",
    stats: {
      goals: 1.5,
      assists: 1.3,
      aerialDuels: 11.8,
      ballHolding: 52,
      dribbling: 12.8,
      shotsPerGame: 11.2,
      influence: 68,
      rating: 6.78,
    },
    topPlayers: [
      { name: "Jerry Yates", goals: 8, assists: 2, rating: 6.8 },
      { name: "Jamal Lowe", goals: 7, assists: 5, rating: 6.7 },
      { name: "Matt Grimes", goals: 2, assists: 7, rating: 6.9 },
    ],
  },
]

export function MatchPredictor() {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")
  const [prediction, setPrediction] = useState<any>(null)

  const selectedHomeTeam = teams.find((t) => t.id === homeTeam)
  const selectedAwayTeam = teams.find((t) => t.id === awayTeam)

  const calculatePrediction = () => {
    if (!selectedHomeTeam || !selectedAwayTeam) return

    // Calculate team strength scores
    const homeScore =
      selectedHomeTeam.stats.goals * 15 +
      selectedHomeTeam.stats.assists * 10 +
      selectedHomeTeam.stats.influence * 0.8 +
      selectedHomeTeam.stats.rating * 8 +
      selectedHomeTeam.stats.shotsPerGame * 2 +
      20 // Home advantage

    const awayScore =
      selectedAwayTeam.stats.goals * 15 +
      selectedAwayTeam.stats.assists * 10 +
      selectedAwayTeam.stats.influence * 0.8 +
      selectedAwayTeam.stats.rating * 8 +
      selectedAwayTeam.stats.shotsPerGame * 2

    const totalScore = homeScore + awayScore
    const homeWinProb = (homeScore / totalScore) * 100
    const awayWinProb = (awayScore / totalScore) * 100
    const drawProb = 100 - homeWinProb - awayWinProb + 15 // Adjust for draw probability

    // Normalize probabilities
    const total = homeWinProb + awayWinProb + drawProb
    const normalizedHome = (homeWinProb / total) * 100
    const normalizedAway = (awayWinProb / total) * 100
    const normalizedDraw = (drawProb / total) * 100

    setPrediction({
      homeWin: normalizedHome,
      awayWin: normalizedAway,
      draw: normalizedDraw,
      predictedScore: `${Math.round(selectedHomeTeam.stats.goals)}-${Math.round(selectedAwayTeam.stats.goals)}`,
      confidence: Math.max(normalizedHome, normalizedAway, normalizedDraw),
    })
  }

  const comparisonData = useMemo(() => {
    if (!selectedHomeTeam || !selectedAwayTeam) return []

    return [
      {
        metric: "Goals",
        home: selectedHomeTeam.stats.goals,
        away: selectedAwayTeam.stats.goals,
      },
      {
        metric: "Assists",
        home: selectedHomeTeam.stats.assists,
        away: selectedAwayTeam.stats.assists,
      },
      {
        metric: "Aerial Duels",
        home: selectedHomeTeam.stats.aerialDuels,
        away: selectedAwayTeam.stats.aerialDuels,
      },
      {
        metric: "Dribbling",
        home: selectedHomeTeam.stats.dribbling,
        away: selectedAwayTeam.stats.dribbling,
      },
      {
        metric: "Shots/Game",
        home: selectedHomeTeam.stats.shotsPerGame,
        away: selectedAwayTeam.stats.shotsPerGame,
      },
    ]
  }, [selectedHomeTeam, selectedAwayTeam])

  const radarData = useMemo(() => {
    if (!selectedHomeTeam || !selectedAwayTeam) return []

    return [
      {
        metric: "Goals",
        home: selectedHomeTeam.stats.goals * 10,
        away: selectedAwayTeam.stats.goals * 10,
        fullMark: 30,
      },
      {
        metric: "Ball Hold",
        home: selectedHomeTeam.stats.ballHolding,
        away: selectedAwayTeam.stats.ballHolding,
        fullMark: 100,
      },
      {
        metric: "Dribbling",
        home: selectedHomeTeam.stats.dribbling * 4,
        away: selectedAwayTeam.stats.dribbling * 4,
        fullMark: 100,
      },
      {
        metric: "Influence",
        home: selectedHomeTeam.stats.influence,
        away: selectedAwayTeam.stats.influence,
        fullMark: 100,
      },
      {
        metric: "Rating",
        home: selectedHomeTeam.stats.rating * 12,
        away: selectedAwayTeam.stats.rating * 12,
        fullMark: 100,
      },
    ]
  }, [selectedHomeTeam, selectedAwayTeam])

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Premier League Predictor</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          AI-powered match predictions using real-time player statistics and advanced analytics
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Team Selection */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Select Teams</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Home Team</label>
              <Select value={homeTeam} onValueChange={setHomeTeam}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter((t) => t.id !== awayTeam)
                    .map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{team.logo}</span>
                          {team.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-muted-foreground">VS</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Away Team</label>
              <Select value={awayTeam} onValueChange={setAwayTeam}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  {teams
                    .filter((t) => t.id !== homeTeam)
                    .map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{team.logo}</span>
                          {team.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculatePrediction} disabled={!homeTeam || !awayTeam} className="w-full mt-6" size="lg">
            <Activity className="mr-2 h-5 w-5" />
            Generate Prediction
          </Button>
        </Card>

        {/* Prediction Results */}
        {prediction && selectedHomeTeam && selectedAwayTeam && (
          <>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Match Prediction</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">{selectedHomeTeam.logo}</div>
                  <div className="font-semibold">{selectedHomeTeam.name}</div>
                  <div className="text-4xl font-bold text-primary">{prediction.homeWin.toFixed(1)}%</div>
                  <Progress value={prediction.homeWin} className="h-3" />
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Draw: {prediction.draw.toFixed(1)}%
                  </Badge>
                  <div className="text-sm text-muted-foreground">Predicted Score</div>
                  <div className="text-3xl font-bold">{prediction.predictedScore}</div>
                  <Badge className="text-sm">{prediction.confidence.toFixed(0)}% Confidence</Badge>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">{selectedAwayTeam.logo}</div>
                  <div className="font-semibold">{selectedAwayTeam.name}</div>
                  <div className="text-4xl font-bold text-secondary">{prediction.awayWin.toFixed(1)}%</div>
                  <Progress value={prediction.awayWin} className="h-3" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>Prediction based on 8+ statistical factors including player form</span>
              </div>
            </Card>

            {/* Detailed Analytics */}
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">Team Stats</TabsTrigger>
                <TabsTrigger value="players">Top Players</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Home Team Stats */}
                  <Card className="p-6 bg-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-3xl">{selectedHomeTeam.logo}</div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedHomeTeam.name}</h3>
                        <Badge variant="secondary">Home</Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <StatRow label="Goals per Game" value={selectedHomeTeam.stats.goals} max={3} />
                      <StatRow label="Assists per Game" value={selectedHomeTeam.stats.assists} max={3} />
                      <StatRow label="Aerial Duels Won" value={selectedHomeTeam.stats.aerialDuels} max={20} />
                      <StatRow label="Ball Holding %" value={selectedHomeTeam.stats.ballHolding} max={100} />
                      <StatRow label="Dribbles per Game" value={selectedHomeTeam.stats.dribbling} max={25} />
                      <StatRow label="Shots per Game" value={selectedHomeTeam.stats.shotsPerGame} max={20} />
                      <StatRow label="Team Influence" value={selectedHomeTeam.stats.influence} max={100} />
                      <StatRow label="Team Rating" value={selectedHomeTeam.stats.rating} max={10} />
                    </div>
                  </Card>

                  {/* Away Team Stats */}
                  <Card className="p-6 bg-card">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-3xl">{selectedAwayTeam.logo}</div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedAwayTeam.name}</h3>
                        <Badge variant="outline">Away</Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <StatRow label="Goals per Game" value={selectedAwayTeam.stats.goals} max={3} />
                      <StatRow label="Assists per Game" value={selectedAwayTeam.stats.assists} max={3} />
                      <StatRow label="Aerial Duels Won" value={selectedAwayTeam.stats.aerialDuels} max={20} />
                      <StatRow label="Ball Holding %" value={selectedAwayTeam.stats.ballHolding} max={100} />
                      <StatRow label="Dribbles per Game" value={selectedAwayTeam.stats.dribbling} max={25} />
                      <StatRow label="Shots per Game" value={selectedAwayTeam.stats.shotsPerGame} max={20} />
                      <StatRow label="Team Influence" value={selectedAwayTeam.stats.influence} max={100} />
                      <StatRow label="Team Rating" value={selectedAwayTeam.stats.rating} max={10} />
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="players" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Home Team Players */}
                  <Card className="p-6 bg-card">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">{selectedHomeTeam.name} - Key Players</h3>
                    </div>

                    <div className="space-y-4">
                      {selectedHomeTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg">
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.goals}G · {player.assists}A
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-lg">
                            {player.rating}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Away Team Players */}
                  <Card className="p-6 bg-card">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="h-5 w-5 text-secondary" />
                      <h3 className="font-bold">{selectedAwayTeam.name} - Key Players</h3>
                    </div>

                    <div className="space-y-4">
                      {selectedAwayTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg">
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.goals}G · {player.assists}A
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-lg">
                            {player.rating}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <Card className="p-6 bg-card">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Head-to-Head Statistics</h3>
                  </div>

                  <div className="space-y-8">
                    {/* Radar Chart */}
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))" }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name={selectedHomeTeam.name}
                            dataKey="home"
                            stroke={selectedHomeTeam.color}
                            fill={selectedHomeTeam.color}
                            fillOpacity={0.3}
                          />
                          <Radar
                            name={selectedAwayTeam.name}
                            dataKey="away"
                            stroke={selectedAwayTeam.color}
                            fill={selectedAwayTeam.color}
                            fillOpacity={0.3}
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bar Comparison */}
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))" }} />
                          <YAxis tick={{ fill: "hsl(var(--foreground))" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--popover))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "var(--radius)",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="home" fill={selectedHomeTeam.color} name={selectedHomeTeam.name} />
                          <Bar dataKey="away" fill={selectedAwayTeam.color} name={selectedAwayTeam.name} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

function StatRow({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value.toFixed(1)}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

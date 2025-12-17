"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Target, Activity, Zap, Shield, Users, History } from "lucide-react"
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

const headToHeadRecords: Record<string, Record<string, { wins: number; draws: number; losses: number }>> = {
  "man-city": {
    arsenal: { wins: 3, draws: 0, losses: 1 },
    liverpool: { wins: 2, draws: 1, losses: 1 },
    "man-utd": { wins: 3, draws: 1, losses: 0 },
    chelsea: { wins: 3, draws: 0, losses: 1 },
    tottenham: { wins: 3, draws: 0, losses: 1 },
    newcastle: { wins: 3, draws: 1, losses: 0 },
  },
  arsenal: {
    "man-city": { wins: 1, draws: 0, losses: 3 },
    liverpool: { wins: 1, draws: 1, losses: 2 },
    "man-utd": { wins: 3, draws: 0, losses: 1 },
    chelsea: { wins: 2, draws: 1, losses: 1 },
    tottenham: { wins: 2, draws: 1, losses: 1 },
  },
  liverpool: {
    "man-city": { wins: 1, draws: 1, losses: 2 },
    arsenal: { wins: 2, draws: 1, losses: 1 },
    "man-utd": { wins: 4, draws: 0, losses: 0 },
    chelsea: { wins: 2, draws: 1, losses: 1 },
    tottenham: { wins: 3, draws: 0, losses: 1 },
    newcastle: { wins: 2, draws: 1, losses: 1 },
  },
  "man-utd": {
    "man-city": { wins: 0, draws: 1, losses: 3 },
    arsenal: { wins: 1, draws: 0, losses: 3 },
    liverpool: { wins: 0, draws: 0, losses: 4 },
    chelsea: { wins: 2, draws: 1, losses: 1 },
    tottenham: { wins: 1, draws: 2, losses: 1 },
  },
  chelsea: {
    "man-city": { wins: 1, draws: 0, losses: 3 },
    arsenal: { wins: 1, draws: 1, losses: 2 },
    liverpool: { wins: 1, draws: 1, losses: 2 },
    "man-utd": { wins: 1, draws: 1, losses: 2 },
    tottenham: { wins: 2, draws: 0, losses: 2 },
  },
  tottenham: {
    "man-city": { wins: 1, draws: 0, losses: 3 },
    arsenal: { wins: 1, draws: 1, losses: 2 },
    liverpool: { wins: 1, draws: 0, losses: 3 },
    "man-utd": { wins: 1, draws: 2, losses: 1 },
    chelsea: { wins: 2, draws: 0, losses: 2 },
  },
}

const teams = [
  {
    id: "man-city",
    name: "Manchester City",
    logo: "🔵",
    color: "#6CABDD",
    stats: {
      goals: 2.5,
      assists: 2.3,
      aerialDuels: 12.8,
      ballHolding: 66,
      dribbling: 17.5,
      shotsPerGame: 16.2,
      influence: 86,
      rating: 7.38,
    },
    topPlayers: [
      { name: "Erling Haaland", goals: 22, assists: 4, rating: 8.1 },
      { name: "Phil Foden", goals: 8, assists: 6, rating: 7.5 },
      { name: "Bernardo Silva", goals: 6, assists: 9, rating: 7.4 },
    ],
  },
  {
    id: "arsenal",
    name: "Arsenal",
    logo: "🔴",
    color: "#EF0107",
    stats: {
      goals: 2.4,
      assists: 2.1,
      aerialDuels: 13.2,
      ballHolding: 61,
      dribbling: 16.8,
      shotsPerGame: 14.8,
      influence: 84,
      rating: 7.32,
    },
    topPlayers: [
      { name: "Bukayo Saka", goals: 12, assists: 10, rating: 7.9 },
      { name: "Kai Havertz", goals: 10, assists: 6, rating: 7.4 },
      { name: "Martin Ødegaard", goals: 6, assists: 8, rating: 7.6 },
    ],
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "🔴",
    color: "#C8102E",
    stats: {
      goals: 2.8,
      assists: 2.5,
      aerialDuels: 11.5,
      ballHolding: 60,
      dribbling: 18.2,
      shotsPerGame: 17.2,
      influence: 89,
      rating: 7.52,
    },
    topPlayers: [
      { name: "Mohamed Salah", goals: 29, assists: 18, rating: 8.4 },
      { name: "Luis Díaz", goals: 15, assists: 7, rating: 7.7 },
      { name: "Cody Gakpo", goals: 12, assists: 9, rating: 7.5 },
    ],
  },
  {
    id: "man-utd",
    name: "Manchester United",
    logo: "🔴",
    color: "#DA291C",
    stats: {
      goals: 1.9,
      assists: 1.7,
      aerialDuels: 13.8,
      ballHolding: 53,
      dribbling: 13.5,
      shotsPerGame: 13.2,
      influence: 74,
      rating: 6.95,
    },
    topPlayers: [
      { name: "Bruno Fernandes", goals: 8, assists: 10, rating: 7.3 },
      { name: "Marcus Rashford", goals: 11, assists: 4, rating: 7.0 },
      { name: "Rasmus Højlund", goals: 13, assists: 2, rating: 7.1 },
    ],
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "🔵",
    color: "#034694",
    stats: {
      goals: 2.2,
      assists: 1.9,
      aerialDuels: 12.5,
      ballHolding: 57,
      dribbling: 16.2,
      shotsPerGame: 14.8,
      influence: 80,
      rating: 7.22,
    },
    topPlayers: [
      { name: "Cole Palmer", goals: 18, assists: 12, rating: 8.0 },
      { name: "Nicolas Jackson", goals: 12, assists: 4, rating: 7.2 },
      { name: "Pedro Neto", goals: 5, assists: 7, rating: 7.1 },
    ],
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logo: "⚪",
    color: "#132257",
    stats: {
      goals: 2.3,
      assists: 2.0,
      aerialDuels: 12.2,
      ballHolding: 55,
      dribbling: 17.2,
      shotsPerGame: 15.5,
      influence: 81,
      rating: 7.25,
    },
    topPlayers: [
      { name: "Son Heung-min", goals: 14, assists: 8, rating: 7.6 },
      { name: "Dominic Solanke", goals: 9, assists: 3, rating: 7.2 },
      { name: "Dejan Kulusevski", goals: 7, assists: 9, rating: 7.3 },
    ],
  },
  {
    id: "newcastle",
    name: "Newcastle United",
    logo: "⚫",
    color: "#241F20",
    stats: {
      goals: 2.4,
      assists: 2.0,
      aerialDuels: 14.5,
      ballHolding: 54,
      dribbling: 14.8,
      shotsPerGame: 14.2,
      influence: 82,
      rating: 7.28,
    },
    topPlayers: [
      { name: "Alexander Isak", goals: 23, assists: 3, rating: 7.9 },
      { name: "Anthony Gordon", goals: 9, assists: 12, rating: 7.5 },
      { name: "Bruno Guimarães", goals: 6, assists: 7, rating: 7.4 },
    ],
  },
  {
    id: "aston-villa",
    name: "Aston Villa",
    logo: "🦁",
    color: "#670E36",
    stats: {
      goals: 2.1,
      assists: 1.8,
      aerialDuels: 13.5,
      ballHolding: 52,
      dribbling: 14.2,
      shotsPerGame: 13.8,
      influence: 77,
      rating: 7.08,
    },
    topPlayers: [
      { name: "Ollie Watkins", goals: 16, assists: 8, rating: 7.5 },
      { name: "Morgan Rogers", goals: 7, assists: 10, rating: 7.2 },
      { name: "Jhon Durán", goals: 11, assists: 2, rating: 7.0 },
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
      aerialDuels: 10.8,
      ballHolding: 58,
      dribbling: 15.8,
      shotsPerGame: 13.5,
      influence: 75,
      rating: 7.12,
    },
    topPlayers: [
      { name: "Kaoru Mitoma", goals: 8, assists: 6, rating: 7.4 },
      { name: "Georginio Rutter", goals: 7, assists: 9, rating: 7.2 },
      { name: "João Pedro", goals: 9, assists: 4, rating: 7.3 },
    ],
  },
  {
    id: "west-ham",
    name: "West Ham United",
    logo: "⚒️",
    color: "#7A263A",
    stats: {
      goals: 1.7,
      assists: 1.5,
      aerialDuels: 15.2,
      ballHolding: 47,
      dribbling: 12.2,
      shotsPerGame: 12.5,
      influence: 70,
      rating: 6.88,
    },
    topPlayers: [
      { name: "Jarrod Bowen", goals: 12, assists: 5, rating: 7.2 },
      { name: "Lucas Paquetá", goals: 3, assists: 6, rating: 6.9 },
      { name: "Mohammed Kudus", goals: 8, assists: 4, rating: 7.0 },
    ],
  },
  {
    id: "wolves",
    name: "Wolverhampton",
    logo: "🟠",
    color: "#FDB913",
    stats: {
      goals: 1.5,
      assists: 1.3,
      aerialDuels: 14.2,
      ballHolding: 44,
      dribbling: 11.5,
      shotsPerGame: 11.2,
      influence: 66,
      rating: 6.75,
    },
    topPlayers: [
      { name: "Matheus Cunha", goals: 14, assists: 6, rating: 7.3 },
      { name: "Hwang Hee-chan", goals: 9, assists: 3, rating: 6.9 },
      { name: "Jørgen Strand Larsen", goals: 7, assists: 2, rating: 6.8 },
    ],
  },
  {
    id: "brentford",
    name: "Brentford",
    logo: "🐝",
    color: "#E30613",
    stats: {
      goals: 2.1,
      assists: 1.8,
      aerialDuels: 16.5,
      ballHolding: 45,
      dribbling: 11.8,
      shotsPerGame: 12.8,
      influence: 73,
      rating: 7.02,
    },
    topPlayers: [
      { name: "Bryan Mbeumo", goals: 20, assists: 8, rating: 7.8 },
      { name: "Yoane Wissa", goals: 11, assists: 4, rating: 7.1 },
      { name: "Mikkel Damsgaard", goals: 4, assists: 10, rating: 6.9 },
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
      aerialDuels: 13.2,
      ballHolding: 51,
      dribbling: 13.8,
      shotsPerGame: 12.2,
      influence: 71,
      rating: 6.95,
    },
    topPlayers: [
      { name: "Rodrigo Muniz", goals: 11, assists: 2, rating: 7.1 },
      { name: "Emile Smith Rowe", goals: 7, assists: 8, rating: 7.0 },
      { name: "Antonee Robinson", goals: 1, assists: 10, rating: 7.2 },
    ],
  },
  {
    id: "bournemouth",
    name: "Bournemouth",
    logo: "🍒",
    color: "#DA291C",
    stats: {
      goals: 1.8,
      assists: 1.6,
      aerialDuels: 13.8,
      ballHolding: 46,
      dribbling: 12.5,
      shotsPerGame: 11.8,
      influence: 69,
      rating: 6.85,
    },
    topPlayers: [
      { name: "Evanilson", goals: 8, assists: 2, rating: 6.9 },
      { name: "Antoine Semenyo", goals: 10, assists: 3, rating: 7.0 },
      { name: "Justin Kluivert", goals: 7, assists: 6, rating: 6.8 },
    ],
  },
  {
    id: "crystal-palace",
    name: "Crystal Palace",
    logo: "🦅",
    color: "#1B458F",
    stats: {
      goals: 1.6,
      assists: 1.4,
      aerialDuels: 14.5,
      ballHolding: 44,
      dribbling: 12.0,
      shotsPerGame: 10.8,
      influence: 67,
      rating: 6.78,
    },
    topPlayers: [
      { name: "Eberechi Eze", goals: 9, assists: 5, rating: 7.1 },
      { name: "Jean-Philippe Mateta", goals: 12, assists: 3, rating: 6.9 },
      { name: "Eddie Nketiah", goals: 6, assists: 2, rating: 6.7 },
    ],
  },
  {
    id: "everton",
    name: "Everton",
    logo: "🔵",
    color: "#003399",
    stats: {
      goals: 1.3,
      assists: 1.1,
      aerialDuels: 15.8,
      ballHolding: 41,
      dribbling: 10.5,
      shotsPerGame: 10.0,
      influence: 63,
      rating: 6.58,
    },
    topPlayers: [
      { name: "Iliman Ndiaye", goals: 6, assists: 4, rating: 6.8 },
      { name: "Dominic Calvert-Lewin", goals: 5, assists: 1, rating: 6.6 },
      { name: "Dwight McNeil", goals: 2, assists: 6, rating: 6.7 },
    ],
  },
  {
    id: "nottingham-forest",
    name: "Nottingham Forest",
    logo: "🌳",
    color: "#DD0000",
    stats: {
      goals: 1.9,
      assists: 1.7,
      aerialDuels: 16.8,
      ballHolding: 42,
      dribbling: 11.2,
      shotsPerGame: 11.5,
      influence: 72,
      rating: 6.95,
    },
    topPlayers: [
      { name: "Chris Wood", goals: 20, assists: 2, rating: 7.4 },
      { name: "Anthony Elanga", goals: 5, assists: 11, rating: 7.0 },
      { name: "Morgan Gibbs-White", goals: 6, assists: 8, rating: 7.1 },
    ],
  },
  {
    id: "burnley",
    name: "Burnley",
    logo: "🟣",
    color: "#6C1D45",
    stats: {
      goals: 1.2,
      assists: 1.0,
      aerialDuels: 17.5,
      ballHolding: 37,
      dribbling: 9.2,
      shotsPerGame: 9.2,
      influence: 59,
      rating: 6.45,
    },
    topPlayers: [
      { name: "Lyle Foster", goals: 4, assists: 1, rating: 6.5 },
      { name: "Zeki Amdouni", goals: 3, assists: 1, rating: 6.3 },
      { name: "Josh Brownhill", goals: 2, assists: 2, rating: 6.4 },
    ],
  },
  {
    id: "leeds",
    name: "Leeds United",
    logo: "⚪",
    color: "#FFCD00",
    stats: {
      goals: 1.7,
      assists: 1.5,
      aerialDuels: 12.5,
      ballHolding: 53,
      dribbling: 13.5,
      shotsPerGame: 12.2,
      influence: 70,
      rating: 6.85,
    },
    topPlayers: [
      { name: "Wilfried Gnonto", goals: 8, assists: 5, rating: 7.0 },
      { name: "Joel Piroe", goals: 10, assists: 2, rating: 6.8 },
      { name: "Crysencio Summerville", goals: 6, assists: 7, rating: 6.9 },
    ],
  },
  {
    id: "swansea",
    name: "Swansea City",
    logo: "🦢",
    color: "#121212",
    stats: {
      goals: 1.4,
      assists: 1.2,
      aerialDuels: 11.5,
      ballHolding: 51,
      dribbling: 12.5,
      shotsPerGame: 10.8,
      influence: 65,
      rating: 6.68,
    },
    topPlayers: [
      { name: "Jerry Yates", goals: 7, assists: 2, rating: 6.7 },
      { name: "Jamal Lowe", goals: 5, assists: 4, rating: 6.6 },
      { name: "Matt Grimes", goals: 2, assists: 6, rating: 6.8 },
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

    // Get head-to-head record
    const h2h = headToHeadRecords[homeTeam]?.[awayTeam] || { wins: 0, draws: 0, losses: 0 }
    const totalH2H = h2h.wins + h2h.draws + h2h.losses || 1
    const h2hAdvantage = ((h2h.wins - h2h.losses) / totalH2H) * 15 // H2H contributes up to 15 points

    // Calculate team strength scores with head-to-head factor
    const homeScore =
      selectedHomeTeam.stats.goals * 15 +
      selectedHomeTeam.stats.assists * 10 +
      selectedHomeTeam.stats.influence * 0.8 +
      selectedHomeTeam.stats.rating * 8 +
      selectedHomeTeam.stats.shotsPerGame * 2 +
      h2hAdvantage +
      20 // Home advantage

    const awayScore =
      selectedAwayTeam.stats.goals * 15 +
      selectedAwayTeam.stats.assists * 10 +
      selectedAwayTeam.stats.influence * 0.8 +
      selectedAwayTeam.stats.rating * 8 +
      selectedAwayTeam.stats.shotsPerGame * 2 -
      h2hAdvantage

    const totalScore = homeScore + awayScore
    const homeWinProb = (homeScore / totalScore) * 100
    const awayWinProb = (awayScore / totalScore) * 100
    const drawProb = 100 - homeWinProb - awayWinProb + 15

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
      h2h,
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
          AI-powered match predictions using 2024-25 season statistics and historical data
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
                Powered by real-time player statistics and advanced analytics
              </div>
            </Card>

            {prediction.h2h && (prediction.h2h.wins > 0 || prediction.h2h.draws > 0 || prediction.h2h.losses > 0) && (
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center gap-2 mb-6">
                  <History className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Head-to-Head Record (Last 2 Years)</h2>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{prediction.h2h.wins}</div>
                    <div className="text-sm text-muted-foreground">{selectedHomeTeam.name} Wins</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{prediction.h2h.draws}</div>
                    <div className="text-sm text-muted-foreground">Draws</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-secondary">{prediction.h2h.losses}</div>
                    <div className="text-sm text-muted-foreground">{selectedAwayTeam.name} Wins</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Statistics Comparison */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="players">Top Players</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Team Strength Radar</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Radar
                        name={selectedHomeTeam.name}
                        dataKey="home"
                        stroke={selectedHomeTeam.color}
                        fill={selectedHomeTeam.color}
                        fillOpacity={0.4}
                      />
                      <Radar
                        name={selectedAwayTeam.name}
                        dataKey="away"
                        stroke={selectedAwayTeam.color}
                        fill={selectedAwayTeam.color}
                        fillOpacity={0.4}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Statistical Comparison</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))" }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="home"
                        name={selectedHomeTeam.name}
                        fill={selectedHomeTeam.color}
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="away"
                        name={selectedAwayTeam.name}
                        fill={selectedAwayTeam.color}
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>

              <TabsContent value="players" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{selectedHomeTeam.logo}</span>
                      <h3 className="text-lg font-bold">{selectedHomeTeam.name}</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedHomeTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.goals}G · {player.assists}A
                            </div>
                          </div>
                          <Badge variant="secondary">{player.rating}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{selectedAwayTeam.logo}</span>
                      <h3 className="text-lg font-bold">{selectedAwayTeam.name}</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedAwayTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.goals}G · {player.assists}A
                            </div>
                          </div>
                          <Badge variant="secondary">{player.rating}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          All rights reserved for SanaTech Solutions © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

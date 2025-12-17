"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Target, Shield, Calendar, Video, Star } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  goals: {
    label: "Goals",
    color: "#FF0000",
  },
  "ball-hold": {
    label: "Ball Hold",
    color: "#00FF00",
  },
  dribbling: {
    label: "Dribbling",
    color: "#0000FF",
  },
  influence: {
    label: "Influence",
    color: "#FFFF00",
  },
  rating: {
    label: "Rating",
    color: "#FF00FF",
  },
}

const teams = [
  {
    id: "arsenal",
    name: "Arsenal",
    logo: "🔴",
    color: "#EF0107",
    position: 1,
    points: 36,
    played: 16,
    stats: {
      goals: 1.88,
      assists: 1.75,
      aerialDuels: 13.2,
      ballHolding: 62,
      dribbling: 16.8,
      shotsPerGame: 14.8,
      influence: 87,
      rating: 7.45,
    },
    topPlayers: [
      { name: "Bukayo Saka", goals: 8, assists: 7, rating: 7.9 },
      { name: "Kai Havertz", goals: 7, assists: 5, rating: 7.5 },
      { name: "Martin Ødegaard", goals: 5, assists: 8, rating: 7.7 },
    ],
  },
  {
    id: "man-city",
    name: "Manchester City",
    logo: "🔵",
    color: "#6CABDD",
    position: 2,
    points: 34,
    played: 16,
    stats: {
      goals: 2.38,
      assists: 2.25,
      aerialDuels: 12.8,
      ballHolding: 68,
      dribbling: 17.5,
      shotsPerGame: 17.2,
      influence: 89,
      rating: 7.52,
    },
    topPlayers: [
      { name: "Erling Haaland", goals: 17, assists: 3, rating: 8.3 },
      { name: "Phil Foden", goals: 7, assists: 8, rating: 7.7 },
      { name: "Bernardo Silva", goals: 5, assists: 7, rating: 7.5 },
    ],
  },
  {
    id: "aston-villa",
    name: "Aston Villa",
    logo: "🦁",
    color: "#670E36",
    position: 3,
    points: 33,
    played: 16,
    stats: {
      goals: 1.56,
      assists: 1.44,
      aerialDuels: 13.5,
      ballHolding: 54,
      dribbling: 14.2,
      shotsPerGame: 13.8,
      influence: 79,
      rating: 7.18,
    },
    topPlayers: [
      { name: "Ollie Watkins", goals: 9, assists: 5, rating: 7.5 },
      { name: "Morgan Rogers", goals: 6, assists: 6, rating: 7.3 },
      { name: "Jhon Durán", goals: 7, assists: 2, rating: 7.1 },
    ],
  },
  {
    id: "chelsea",
    name: "Chelsea",
    logo: "🔵",
    color: "#034694",
    position: 4,
    points: 28,
    played: 16,
    stats: {
      goals: 1.69,
      assists: 1.56,
      aerialDuels: 12.5,
      ballHolding: 58,
      dribbling: 16.2,
      shotsPerGame: 15.2,
      influence: 80,
      rating: 7.28,
    },
    topPlayers: [
      { name: "Cole Palmer", goals: 10, assists: 7, rating: 8.0 },
      { name: "Nicolas Jackson", goals: 8, assists: 3, rating: 7.3 },
      { name: "Pedro Neto", goals: 4, assists: 5, rating: 7.2 },
    ],
  },
  {
    id: "crystal-palace",
    name: "Crystal Palace",
    logo: "🦅",
    color: "#1B458F",
    position: 5,
    points: 26,
    played: 16,
    stats: {
      goals: 1.25,
      assists: 1.13,
      aerialDuels: 14.2,
      ballHolding: 48,
      dribbling: 13.8,
      shotsPerGame: 12.5,
      influence: 74,
      rating: 7.05,
    },
    topPlayers: [
      { name: "Jean-Philippe Mateta", goals: 8, assists: 2, rating: 7.4 },
      { name: "Hugo Ekitike", goals: 8, assists: 3, rating: 7.3 },
      { name: "Eberechi Eze", goals: 3, assists: 5, rating: 7.1 },
    ],
  },
  {
    id: "man-utd",
    name: "Manchester United",
    logo: "🔴",
    color: "#DA291C",
    position: 6,
    points: 26,
    played: 16,
    stats: {
      goals: 1.88,
      assists: 1.75,
      aerialDuels: 13.8,
      ballHolding: 54,
      dribbling: 13.5,
      shotsPerGame: 13.8,
      influence: 76,
      rating: 7.08,
    },
    topPlayers: [
      { name: "Bruno Fernandes", goals: 6, assists: 8, rating: 7.4 },
      { name: "Marcus Rashford", goals: 7, assists: 3, rating: 7.1 },
      { name: "Rasmus Højlund", goals: 8, assists: 2, rating: 7.2 },
    ],
  },
  {
    id: "liverpool",
    name: "Liverpool",
    logo: "🔴",
    color: "#C8102E",
    position: 7,
    points: 26,
    played: 16,
    stats: {
      goals: 1.63,
      assists: 1.5,
      aerialDuels: 11.5,
      ballHolding: 59,
      dribbling: 17.2,
      shotsPerGame: 15.5,
      influence: 78,
      rating: 7.22,
    },
    topPlayers: [
      { name: "Mohamed Salah", goals: 11, assists: 8, rating: 7.8 },
      { name: "Luis Díaz", goals: 7, assists: 4, rating: 7.4 },
      { name: "Cody Gakpo", goals: 5, assists: 5, rating: 7.3 },
    ],
  },
  {
    id: "sunderland",
    name: "Sunderland",
    logo: "🔴",
    color: "#EB172B",
    position: 8,
    points: 26,
    played: 16,
    stats: {
      goals: 1.19,
      assists: 1.06,
      aerialDuels: 12.8,
      ballHolding: 50,
      dribbling: 14.5,
      shotsPerGame: 12.8,
      influence: 73,
      rating: 7.02,
    },
    topPlayers: [
      { name: "Ross Stewart", goals: 6, assists: 2, rating: 7.2 },
      { name: "Jack Clarke", goals: 5, assists: 4, rating: 7.0 },
      { name: "Patrick Roberts", goals: 4, assists: 3, rating: 6.9 },
    ],
  },
  {
    id: "everton",
    name: "Everton",
    logo: "🔵",
    color: "#003399",
    position: 9,
    points: 24,
    played: 16,
    stats: {
      goals: 1.13,
      assists: 1.0,
      aerialDuels: 15.5,
      ballHolding: 46,
      dribbling: 12.2,
      shotsPerGame: 11.8,
      influence: 71,
      rating: 6.95,
    },
    topPlayers: [
      { name: "Dominic Calvert-Lewin", goals: 6, assists: 1, rating: 7.1 },
      { name: "Abdoulaye Doucouré", goals: 4, assists: 3, rating: 6.9 },
      { name: "Dwight McNeil", goals: 3, assists: 4, rating: 6.8 },
    ],
  },
  {
    id: "brighton",
    name: "Brighton",
    logo: "🔵",
    color: "#0057B8",
    position: 10,
    points: 23,
    played: 16,
    stats: {
      goals: 1.56,
      assists: 1.44,
      aerialDuels: 10.8,
      ballHolding: 57,
      dribbling: 15.8,
      shotsPerGame: 13.5,
      influence: 75,
      rating: 7.15,
    },
    topPlayers: [
      { name: "Danny Welbeck", goals: 9, assists: 3, rating: 7.5 },
      { name: "Kaoru Mitoma", goals: 5, assists: 4, rating: 7.2 },
      { name: "Georginio Rutter", goals: 4, assists: 6, rating: 7.1 },
    ],
  },
  {
    id: "tottenham",
    name: "Tottenham",
    logo: "⚪",
    color: "#132257",
    position: 11,
    points: 22,
    played: 16,
    stats: {
      goals: 1.56,
      assists: 1.44,
      aerialDuels: 12.2,
      ballHolding: 54,
      dribbling: 16.5,
      shotsPerGame: 14.8,
      influence: 77,
      rating: 7.18,
    },
    topPlayers: [
      { name: "Son Heung-min", goals: 8, assists: 5, rating: 7.5 },
      { name: "Dominic Solanke", goals: 7, assists: 2, rating: 7.2 },
      { name: "Dejan Kulusevski", goals: 5, assists: 6, rating: 7.3 },
    ],
  },
  {
    id: "newcastle",
    name: "Newcastle United",
    logo: "⚫",
    color: "#241F20",
    position: 12,
    points: 22,
    played: 16,
    stats: {
      goals: 1.31,
      assists: 1.19,
      aerialDuels: 14.5,
      ballHolding: 52,
      dribbling: 14.8,
      shotsPerGame: 13.5,
      influence: 76,
      rating: 7.12,
    },
    topPlayers: [
      { name: "Alexander Isak", goals: 9, assists: 2, rating: 7.6 },
      { name: "Anthony Gordon", goals: 5, assists: 5, rating: 7.3 },
      { name: "Bruno Guimarães", goals: 3, assists: 4, rating: 7.2 },
    ],
  },
  {
    id: "bournemouth",
    name: "Bournemouth",
    logo: "🍒",
    color: "#DA291C",
    position: 13,
    points: 21,
    played: 16,
    stats: {
      goals: 1.56,
      assists: 1.44,
      aerialDuels: 13.2,
      ballHolding: 47,
      dribbling: 14.5,
      shotsPerGame: 13.2,
      influence: 72,
      rating: 7.0,
    },
    topPlayers: [
      { name: "Antoine Semenyo", goals: 7, assists: 3, rating: 7.2 },
      { name: "Evanilson", goals: 6, assists: 2, rating: 7.0 },
      { name: "Justin Kluivert", goals: 5, assists: 4, rating: 6.9 },
    ],
  },
  {
    id: "fulham",
    name: "Fulham",
    logo: "⚪",
    color: "#000000",
    position: 14,
    points: 20,
    played: 16,
    stats: {
      goals: 1.44,
      assists: 1.31,
      aerialDuels: 13.8,
      ballHolding: 51,
      dribbling: 13.8,
      shotsPerGame: 12.8,
      influence: 73,
      rating: 7.05,
    },
    topPlayers: [
      { name: "Raúl Jiménez", goals: 7, assists: 3, rating: 7.2 },
      { name: "Emile Smith Rowe", goals: 5, assists: 5, rating: 7.1 },
      { name: "Alex Iwobi", goals: 4, assists: 4, rating: 6.9 },
    ],
  },
  {
    id: "brentford",
    name: "Brentford",
    logo: "🐝",
    color: "#D20000",
    position: 15,
    points: 20,
    played: 16,
    stats: {
      goals: 1.38,
      assists: 1.25,
      aerialDuels: 14.8,
      ballHolding: 44,
      dribbling: 12.5,
      shotsPerGame: 13.5,
      influence: 72,
      rating: 7.02,
    },
    topPlayers: [
      { name: "Igor Thiago", goals: 11, assists: 2, rating: 7.6 },
      { name: "Kevin Schade", goals: 5, assists: 3, rating: 7.1 },
      { name: "Fabio Carvalho", goals: 4, assists: 4, rating: 7.0 },
    ],
  },
  {
    id: "nottingham-forest",
    name: "Nottingham Forest",
    logo: "🌲",
    color: "#DD0000",
    position: 16,
    points: 18,
    played: 16,
    stats: {
      goals: 1.06,
      assists: 0.94,
      aerialDuels: 15.2,
      ballHolding: 42,
      dribbling: 11.8,
      shotsPerGame: 11.5,
      influence: 68,
      rating: 6.88,
    },
    topPlayers: [
      { name: "Chris Wood", goals: 6, assists: 1, rating: 7.1 },
      { name: "Anthony Elanga", goals: 4, assists: 3, rating: 6.9 },
      { name: "Morgan Gibbs-White", goals: 3, assists: 4, rating: 6.8 },
    ],
  },
  {
    id: "leeds",
    name: "Leeds United",
    logo: "⚪",
    color: "#FFCD00",
    position: 17,
    points: 16,
    played: 16,
    stats: {
      goals: 1.25,
      assists: 1.13,
      aerialDuels: 12.5,
      ballHolding: 53,
      dribbling: 13.2,
      shotsPerGame: 12.2,
      influence: 70,
      rating: 6.92,
    },
    topPlayers: [
      { name: "Patrick Bamford", goals: 6, assists: 2, rating: 7.0 },
      { name: "Crysencio Summerville", goals: 5, assists: 4, rating: 7.1 },
      { name: "Georginio Rutter", goals: 4, assists: 3, rating: 6.8 },
    ],
  },
  {
    id: "west-ham",
    name: "West Ham United",
    logo: "⚒️",
    color: "#7A263A",
    position: 18,
    points: 13,
    played: 16,
    stats: {
      goals: 1.19,
      assists: 1.06,
      aerialDuels: 15.2,
      ballHolding: 47,
      dribbling: 12.2,
      shotsPerGame: 11.8,
      influence: 67,
      rating: 6.82,
    },
    topPlayers: [
      { name: "Jarrod Bowen", goals: 6, assists: 3, rating: 7.0 },
      { name: "Lucas Paquetá", goals: 3, assists: 4, rating: 6.8 },
      { name: "Mohammed Kudus", goals: 4, assists: 2, rating: 6.9 },
    ],
  },
  {
    id: "burnley",
    name: "Burnley",
    logo: "🔵",
    color: "#6C1D45",
    position: 19,
    points: 10,
    played: 16,
    stats: {
      goals: 1.13,
      assists: 1.0,
      aerialDuels: 14.8,
      ballHolding: 43,
      dribbling: 11.2,
      shotsPerGame: 10.8,
      influence: 64,
      rating: 6.72,
    },
    topPlayers: [
      { name: "Lyle Foster", goals: 5, assists: 1, rating: 6.8 },
      { name: "Zeki Amdouni", goals: 4, assists: 2, rating: 6.7 },
      { name: "Jacob Bruun Larsen", goals: 3, assists: 2, rating: 6.6 },
    ],
  },
  {
    id: "wolves",
    name: "Wolverhampton",
    logo: "🟠",
    color: "#FDB913",
    position: 20,
    points: 2,
    played: 16,
    stats: {
      goals: 0.56,
      assists: 0.5,
      aerialDuels: 14.2,
      ballHolding: 42,
      dribbling: 11.0,
      shotsPerGame: 9.8,
      influence: 58,
      rating: 6.45,
    },
    topPlayers: [
      { name: "Matheus Cunha", goals: 3, assists: 2, rating: 6.7 },
      { name: "Hwang Hee-chan", goals: 2, assists: 1, rating: 6.5 },
      { name: "Pablo Sarabia", goals: 2, assists: 1, rating: 6.4 },
    ],
  },
]

const headToHeadRecords: Record<
  string,
  Record<
    string,
    {
      wins: number
      draws: number
      losses: number
      recentMatches: {
        date: string
        score: string
        result: "W" | "D" | "L"
        venue: string
        starPlayer: string
        highlightUrl?: string
        keyMoments: string[]
      }[]
    }
  >
> = {
  "man-city": {
    arsenal: {
      wins: 3,
      draws: 1,
      losses: 1,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (2 goals)",
          highlightUrl: "https://www.youtube.com/watch?v=example1",
          keyMoments: ["Haaland 12'", "Haaland 67'", "Saka 85'"],
        },
        {
          date: "Sep 2025",
          score: "0-0",
          result: "D",
          venue: "Away",
          starPlayer: "Ederson (8 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example2",
          keyMoments: ["Ederson save 34'", "Raya save 76'", "VAR check 88'"],
        },
        {
          date: "Apr 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Ødegaard (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example3",
          keyMoments: ["Jesus 15'", "Foden 23'", "Martinelli 56'", "Saka 78'"],
        },
        {
          date: "Nov 2024",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "De Bruyne (3A)",
          highlightUrl: "https://www.youtube.com/watch?v=example4",
          keyMoments: ["Haaland 8'", "Álvarez 22'", "Foden 45+2'", "White 73'", "Haaland 89'"],
        },
        {
          date: "Aug 2024",
          score: "1-0",
          result: "W",
          venue: "Away",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example5",
          keyMoments: ["Haaland 76' (pen)", "Rodri tackle 89'"],
        },
      ],
    },
    liverpool: {
      wins: 2,
      draws: 2,
      losses: 1,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "Salah (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example6",
          keyMoments: ["Foden 27'", "Salah 52'", "Alisson save 83'"],
        },
        {
          date: "Jul 2025",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example7",
          keyMoments: ["Haaland 12'", "Haaland 23'", "Díaz 30'", "Álvarez 67'", "Haaland 78'"],
        },
        {
          date: "Mar 2025",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "van Dijk (clean sheet)",
          highlightUrl: "https://www.youtube.com/watch?v=example8",
          keyMoments: ["Gakpo 61'", "van Dijk clearance 89'"],
        },
        {
          date: "Dec 2024",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "Foden (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example9",
          keyMoments: ["Foden 73'", "Ederson save 90+4'"],
        },
        {
          date: "Oct 2024",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "De Bruyne (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example10",
          keyMoments: ["Núñez 45'", "Haaland 68'"],
        },
      ],
    },
    chelsea: {
      wins: 4,
      draws: 0,
      losses: 1,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example11",
          keyMoments: ["Haaland 12'", "Foden 45+1'", "Ederson save 67'"],
        },
        {
          date: "Jun 2025",
          score: "1-0",
          result: "W",
          venue: "Away",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example12",
          keyMoments: ["Álvarez 34'", "Rodri interception 78'"],
        },
        {
          date: "Feb 2025",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "De Bruyne (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example13",
          keyMoments: ["Haaland 70'", "Akanji block 88'"],
        },
        {
          date: "Nov 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Palmer (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example14",
          keyMoments: ["Palmer 63' (pen)", "Silva red card 78'"],
        },
        {
          date: "Aug 2024",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example15",
          keyMoments: ["Haaland 18'", "Jackson 29'", "Álvarez 56'", "Haaland 72'"],
        },
      ],
    },
    "man-utd": {
      wins: 4,
      draws: 0,
      losses: 1,
      recentMatches: [
        {
          date: "Sep 2025",
          score: "3-0",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example16",
          keyMoments: ["Foden 8'", "Haaland 34'", "Haaland 67'"],
        },
        {
          date: "May 2025",
          score: "3-1",
          result: "W",
          venue: "Away",
          starPlayer: "De Bruyne (2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example17",
          keyMoments: ["Rashford 23'", "Haaland 45'", "Álvarez 67'", "Foden 78'"],
        },
        {
          date: "Jan 2025",
          score: "6-3",
          result: "W",
          venue: "Home",
          starPlayer: "Haaland (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example18",
          keyMoments: [
            "Martial 8'",
            "Foden 12'",
            "Haaland 23', 34', 67'",
            "Fernandes 45+1', 78'",
            "Álvarez 56'",
            "Grealish 89'",
          ],
        },
        {
          date: "Oct 2024",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Rashford (2G)",
          highlightUrl: "https://www.youtube.com/watch?v=example19",
          keyMoments: ["Rashford 23'", "Grealish 56'", "Rashford 82'"],
        },
        {
          date: "Jul 2024",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Foden (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example20",
          keyMoments: ["Haaland 12' (pen)", "Höjlund 34'", "Álvarez 67'"],
        },
      ],
    },
  },
  arsenal: {
    "man-city": {
      wins: 1,
      draws: 1,
      losses: 3,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (2 goals)",
          highlightUrl: "https://www.youtube.com/watch?v=example21",
          keyMoments: ["Haaland 12'", "Haaland 67'", "Saka 85'"],
        },
        {
          date: "Sep 2025",
          score: "0-0",
          result: "D",
          venue: "Home",
          starPlayer: "Raya (7 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example22",
          keyMoments: ["Ederson save 34'", "Raya save 76'", "VAR check 88'"],
        },
        {
          date: "Apr 2025",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Ødegaard (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example23",
          keyMoments: ["Jesus 15'", "Foden 23'", "Martinelli 56'", "Saka 78'"],
        },
        {
          date: "Nov 2024",
          score: "1-4",
          result: "L",
          venue: "Away",
          starPlayer: "De Bruyne (3A)",
          highlightUrl: "https://www.youtube.com/watch?v=example24",
          keyMoments: ["Haaland 8'", "Álvarez 22'", "Foden 45+2'", "White 73'", "Haaland 89'"],
        },
        {
          date: "Aug 2024",
          score: "0-1",
          result: "L",
          venue: "Home",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example25",
          keyMoments: ["Haaland 76' (pen)", "Rodri tackle 89'"],
        },
      ],
    },
    liverpool: {
      wins: 2,
      draws: 2,
      losses: 1,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "2-2",
          result: "D",
          venue: "Home",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example26",
          keyMoments: ["Saka 12'", "Salah 34'", "Martinelli 67'", "Núñez 78'"],
        },
        {
          date: "Jun 2025",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "Ødegaard (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example27",
          keyMoments: ["Jesus 23'", "Martinelli 67'", "Raya save 89'"],
        },
        {
          date: "Feb 2025",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Jesus (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example28",
          keyMoments: ["Jesus 12', 56'", "Jota 34'", "Martinelli 78'"],
        },
        {
          date: "Dec 2024",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example29",
          keyMoments: ["Salah 45+1'", "Gakpo 67'"],
        },
        {
          date: "Sep 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Saka (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example30",
          keyMoments: ["Saka 23'", "Martinelli 67'"],
        },
      ],
    },
    chelsea: {
      wins: 3,
      draws: 2,
      losses: 0,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "5-0",
          result: "W",
          venue: "Home",
          starPlayer: "Saka (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example31",
          keyMoments: ["Saka 12', 45+2'", "Havertz 34'", "Jesus 67'", "Ødegaard 89'"],
        },
        {
          date: "Aug 2025",
          score: "2-2",
          result: "D",
          venue: "Away",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example32",
          keyMoments: ["Palmer 12'", "Saka 23'", "Martinelli 67'", "Jackson 78'"],
        },
        {
          date: "Apr 2025",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Jesus (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example33",
          keyMoments: ["Jesus 12', 67'", "Palmer 34' (pen)", "Martinelli 89'"],
        },
        {
          date: "Jan 2025",
          score: "2-2",
          result: "D",
          venue: "Away",
          starPlayer: "Havertz (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example34",
          keyMoments: ["Havertz 23'", "Jackson 34'", "Saka 56'", "Palmer 78'"],
        },
        {
          date: "Oct 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Ødegaard (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example35",
          keyMoments: ["Ødegaard 23'", "Martinelli 67'"],
        },
      ],
    },
    "aston-villa": {
      wins: 2,
      draws: 1,
      losses: 2,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Watkins (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example36",
          keyMoments: ["Jesus 23'", "Watkins 45', 78'"],
        },
        {
          date: "Aug 2025",
          score: "5-0",
          result: "W",
          venue: "Home",
          starPlayer: "Saka (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example37",
          keyMoments: ["Havertz 8'", "Saka 23'", "Jesus 45+1'", "Martinelli 67', 89'"],
        },
        {
          date: "May 2025",
          score: "0-0",
          result: "D",
          venue: "Away",
          starPlayer: "Raya (6 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example38",
          keyMoments: ["Raya save 34', 67'", "Martinez save 78'"],
        },
        {
          date: "Feb 2025",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "Ødegaard (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example39",
          keyMoments: ["Jesus 67'", "Gabriel clearance 89'"],
        },
        {
          date: "Nov 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Watkins (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example40",
          keyMoments: ["Watkins 56'", "Martinez save 90+4'"],
        },
      ],
    },
  },
  liverpool: {
    "man-city": {
      wins: 1,
      draws: 2,
      losses: 2,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "1-1",
          result: "D",
          venue: "Home",
          starPlayer: "Salah (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example41",
          keyMoments: ["Foden 27'", "Salah 52'", "Alisson save 83'"],
        },
        {
          date: "Jul 2025",
          score: "1-4",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example42",
          keyMoments: ["Haaland 12'", "Haaland 23'", "Díaz 30'", "Álvarez 67'", "Haaland 78'"],
        },
        {
          date: "Mar 2025",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "van Dijk (clean sheet)",
          highlightUrl: "https://www.youtube.com/watch?v=example43",
          keyMoments: ["Gakpo 61'", "van Dijk clearance 89'"],
        },
        {
          date: "Dec 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Foden (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example44",
          keyMoments: ["Foden 73'", "Ederson save 90+4'"],
        },
        {
          date: "Oct 2024",
          score: "1-1",
          result: "D",
          venue: "Home",
          starPlayer: "De Bruyne (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example45",
          keyMoments: ["Núñez 45'", "Haaland 68'"],
        },
      ],
    },
    arsenal: {
      wins: 1,
      draws: 2,
      losses: 2,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "2-2",
          result: "D",
          venue: "Away",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example46",
          keyMoments: ["Saka 12'", "Salah 34'", "Martinelli 67'", "Núñez 78'"],
        },
        {
          date: "Jun 2025",
          score: "1-1",
          result: "D",
          venue: "Home",
          starPlayer: "Díaz (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example47",
          keyMoments: ["Jesus 23'", "Díaz 67'", "Alisson save 89'"],
        },
        {
          date: "Feb 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Jesus (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example48",
          keyMoments: ["Jesus 12', 56'", "Jota 34'", "Martinelli 78'"],
        },
        {
          date: "Dec 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example49",
          keyMoments: ["Salah 45+1'", "Gakpo 67'"],
        },
        {
          date: "Sep 2024",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Saka (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example50",
          keyMoments: ["Saka 23'", "Martinelli 67'"],
        },
      ],
    },
    chelsea: {
      wins: 3,
      draws: 1,
      losses: 1,
      recentMatches: [
        {
          date: "Sep 2025",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "Salah (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example51",
          keyMoments: ["Salah 12', 67'", "Jackson 23'", "Gakpo 45+1'", "Núñez 78'"],
        },
        {
          date: "Jun 2025",
          score: "0-0",
          result: "D",
          venue: "Away",
          starPlayer: "Alisson (9 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example52",
          keyMoments: ["Alisson save 34', 56', 78'", "Sánchez save 67'"],
        },
        {
          date: "Mar 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Jota (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example53",
          keyMoments: ["Palmer 23' (pen)", "Jota 56', 78'"],
        },
        {
          date: "Jan 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example54",
          keyMoments: ["Palmer 12'", "Díaz 34'", "Jackson 67'"],
        },
        {
          date: "Oct 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example55",
          keyMoments: ["Salah 23'", "Gakpo 67'"],
        },
      ],
    },
    "man-utd": {
      wins: 4,
      draws: 0,
      losses: 1,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "3-0",
          result: "W",
          venue: "Home",
          starPlayer: "Salah (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example56",
          keyMoments: ["Díaz 12'", "Salah 34'", "Núñez 67'"],
        },
        {
          date: "Jul 2025",
          score: "7-0",
          result: "W",
          venue: "Away",
          starPlayer: "Núñez (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example57",
          keyMoments: ["Gakpo 12', 45+2'", "Núñez 23', 67'", "Salah 34', 78'", "Firmino 89'"],
        },
        {
          date: "Mar 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Salah (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example58",
          keyMoments: ["Rashford 23'", "Jota 56'", "Salah 78'"],
        },
        {
          date: "Dec 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Rashford (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example59",
          keyMoments: ["Rashford 82'", "de Gea save 90+3'"],
        },
        {
          date: "Sep 2024",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Jota (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example60",
          keyMoments: ["Fernandes 12' (pen)", "Jota 45', 78'"],
        },
      ],
    },
  },
  chelsea: {
    "man-city": {
      wins: 1,
      draws: 0,
      losses: 4,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example61",
          keyMoments: ["Haaland 12'", "Foden 45+1'", "Sánchez save 67'"],
        },
        {
          date: "Jun 2025",
          score: "0-1",
          result: "L",
          venue: "Home",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example62",
          keyMoments: ["Álvarez 34'", "Rodri interception 78'"],
        },
        {
          date: "Feb 2025",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "De Bruyne (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example63",
          keyMoments: ["Haaland 70'", "Akanji block 88'"],
        },
        {
          date: "Nov 2024",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "Palmer (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example64",
          keyMoments: ["Palmer 63' (pen)", "Silva red card 78'"],
        },
        {
          date: "Aug 2024",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example65",
          keyMoments: ["Haaland 18'", "Jackson 29'", "Álvarez 56'", "Haaland 72'"],
        },
      ],
    },
    arsenal: {
      wins: 0,
      draws: 2,
      losses: 3,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "0-5",
          result: "L",
          venue: "Away",
          starPlayer: "Saka (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example66",
          keyMoments: ["Saka 12', 45+2'", "Havertz 34'", "Jesus 67'", "Ødegaard 89'"],
        },
        {
          date: "Aug 2025",
          score: "2-2",
          result: "D",
          venue: "Home",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example67",
          keyMoments: ["Palmer 12'", "Saka 23'", "Martinelli 67'", "Jackson 78'"],
        },
        {
          date: "Apr 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Jesus (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example68",
          keyMoments: ["Jesus 12', 67'", "Palmer 34' (pen)", "Martinelli 89'"],
        },
        {
          date: "Jan 2025",
          score: "2-2",
          result: "D",
          venue: "Home",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example69",
          keyMoments: ["Havertz 23'", "Jackson 34'", "Saka 56'", "Palmer 78'"],
        },
        {
          date: "Oct 2024",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Ødegaard (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example70",
          keyMoments: ["Ødegaard 23'", "Martinelli 67'"],
        },
      ],
    },
    liverpool: {
      wins: 1,
      draws: 1,
      losses: 3,
      recentMatches: [
        {
          date: "Sep 2025",
          score: "1-4",
          result: "L",
          venue: "Away",
          starPlayer: "Salah (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example71",
          keyMoments: ["Jackson 23'", "Salah 12', 67'", "Gakpo 45+1'", "Núñez 78'"],
        },
        {
          date: "Jun 2025",
          score: "0-0",
          result: "D",
          venue: "Home",
          starPlayer: "Sánchez (8 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example72",
          keyMoments: ["Alisson save 34', 56', 78'", "Sánchez save 67'"],
        },
        {
          date: "Mar 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Jota (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example73",
          keyMoments: ["Palmer 23' (pen)", "Jota 56', 78'"],
        },
        {
          date: "Jan 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example74",
          keyMoments: ["Palmer 12'", "Díaz 34'", "Jackson 67'"],
        },
        {
          date: "Oct 2024",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Salah (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example75",
          keyMoments: ["Salah 23'", "Gakpo 67'"],
        },
      ],
    },
    tottenham: {
      wins: 2,
      draws: 1,
      losses: 2,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "Palmer (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example76",
          keyMoments: ["Palmer 12', 56'", "Son 23'", "Jackson 45+1'", "Madueke 78'"],
        },
        {
          date: "Aug 2025",
          score: "2-2",
          result: "D",
          venue: "Away",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example77",
          keyMoments: ["Palmer 12'", "Son 34'", "Jackson 67'", "Richarlison 89'"],
        },
        {
          date: "Apr 2025",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example78",
          keyMoments: ["Son 34'", "Richarlison 78'"],
        },
        {
          date: "Jan 2025",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example79",
          keyMoments: ["Palmer 23'", "Jackson 67'"],
        },
        {
          date: "Oct 2024",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Kane (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example80",
          keyMoments: ["Kane 12', 78'", "Sterling 45'", "Son 89'"],
        },
      ],
    },
  },
  "man-utd": {
    "man-city": {
      wins: 1,
      draws: 0,
      losses: 4,
      recentMatches: [
        {
          date: "Sep 2025",
          score: "0-3",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example81",
          keyMoments: ["Foden 8'", "Haaland 34'", "Haaland 67'"],
        },
        {
          date: "May 2025",
          score: "1-3",
          result: "L",
          venue: "Home",
          starPlayer: "De Bruyne (2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example82",
          keyMoments: ["Rashford 23'", "Haaland 45'", "Álvarez 67'", "Foden 78'"],
        },
        {
          date: "Jan 2025",
          score: "3-6",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example83",
          keyMoments: [
            "Martial 8'",
            "Foden 12'",
            "Haaland 23', 34', 67'",
            "Fernandes 45+1', 78'",
            "Álvarez 56'",
            "Grealish 89'",
          ],
        },
        {
          date: "Oct 2024",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Rashford (2G)",
          highlightUrl: "https://www.youtube.com/watch?v=example84",
          keyMoments: ["Rashford 23'", "Grealish 56'", "Rashford 82'"],
        },
        {
          date: "Jul 2024",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Foden (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example85",
          keyMoments: ["Haaland 12' (pen)", "Höjlund 34'", "Álvarez 67'"],
        },
      ],
    },
    liverpool: {
      wins: 1,
      draws: 0,
      losses: 4,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "0-3",
          result: "L",
          venue: "Away",
          starPlayer: "Salah (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example86",
          keyMoments: ["Díaz 12'", "Salah 34'", "Núñez 67'"],
        },
        {
          date: "Jul 2025",
          score: "0-7",
          result: "L",
          venue: "Home",
          starPlayer: "Núñez (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example87",
          keyMoments: ["Gakpo 12', 45+2'", "Núñez 23', 67'", "Salah 34', 78'", "Firmino 89'"],
        },
        {
          date: "Mar 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Salah (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example88",
          keyMoments: ["Rashford 23'", "Jota 56'", "Salah 78'"],
        },
        {
          date: "Dec 2024",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "Rashford (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example89",
          keyMoments: ["Rashford 82'", "de Gea save 90+3'"],
        },
        {
          date: "Sep 2024",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Jota (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example90",
          keyMoments: ["Fernandes 12' (pen)", "Jota 45', 78'"],
        },
      ],
    },
    chelsea: {
      wins: 2,
      draws: 0,
      losses: 3,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Fernandes (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example91",
          keyMoments: ["Fernandes 23'", "Palmer 45' (pen)", "Rashford 78'"],
        },
        {
          date: "Sep 2025",
          score: "1-4",
          result: "L",
          venue: "Away",
          starPlayer: "Palmer (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example92",
          keyMoments: ["Höjlund 12'", "Palmer 23', 56', 78'", "Jackson 89'"],
        },
        {
          date: "May 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Rashford (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example93",
          keyMoments: ["Rashford 34'", "Sterling 56'", "Fernandes 78' (pen)"],
        },
        {
          date: "Feb 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Jackson (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example94",
          keyMoments: ["Jackson 12', 67'", "Fernandes 45' (pen)", "Palmer 78'"],
        },
        {
          date: "Nov 2024",
          score: "0-1",
          result: "L",
          venue: "Home",
          starPlayer: "Enzo (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example95",
          keyMoments: ["Sterling 67'", "Casemiro red card 78'"],
        },
      ],
    },
    bournemouth: {
      wins: 3,
      draws: 1,
      losses: 1,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "2-2",
          result: "D",
          venue: "Away",
          starPlayer: "Solanke (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example96",
          keyMoments: ["Rashford 12'", "Solanke 23', 78'", "Höjlund 67'"],
        },
        {
          date: "Jul 2025",
          score: "3-0",
          result: "W",
          venue: "Home",
          starPlayer: "Rashford (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example97",
          keyMoments: ["Rashford 12'", "Höjlund 45'", "Fernandes 78' (pen)"],
        },
        {
          date: "Apr 2025",
          score: "1-0",
          result: "W",
          venue: "Away",
          starPlayer: "Fernandes (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example98",
          keyMoments: ["Fernandes 67' (pen)", "de Gea save 89'"],
        },
        {
          date: "Jan 2025",
          score: "0-3",
          result: "L",
          venue: "Away",
          starPlayer: "Solanke (hat-trick)",
          highlightUrl: "https://www.youtube.com/watch?v=example99",
          keyMoments: ["Solanke 23', 56', 78'"],
        },
        {
          date: "Oct 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Martial (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example100",
          keyMoments: ["Martial 34'", "Rashford 67'"],
        },
      ],
    },
  },
  tottenham: {
    chelsea: {
      wins: 2,
      draws: 1,
      losses: 2,
      recentMatches: [
        {
          date: "Nov 2025",
          score: "1-4",
          result: "L",
          venue: "Away",
          starPlayer: "Palmer (2G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example101",
          keyMoments: ["Palmer 12', 56'", "Son 23'", "Jackson 45+1'", "Madueke 78'"],
        },
        {
          date: "Aug 2025",
          score: "2-2",
          result: "D",
          venue: "Home",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example102",
          keyMoments: ["Palmer 12'", "Son 34'", "Jackson 67'", "Richarlison 89'"],
        },
        {
          date: "Apr 2025",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example103",
          keyMoments: ["Son 34'", "Richarlison 78'"],
        },
        {
          date: "Jan 2025",
          score: "0-2",
          result: "L",
          venue: "Away",
          starPlayer: "Palmer (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example104",
          keyMoments: ["Palmer 23'", "Jackson 67'"],
        },
        {
          date: "Oct 2024",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Kane (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example105",
          keyMoments: ["Kane 12', 78'", "Sterling 45'", "Son 89'"],
        },
      ],
    },
    "crystal-palace": {
      wins: 3,
      draws: 1,
      losses: 1,
      recentMatches: [
        {
          date: "Oct 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example106",
          keyMoments: ["Mateta 12'", "Son 34'", "Richarlison 78'"],
        },
        {
          date: "Jun 2025",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "Eze (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example107",
          keyMoments: ["Eze 23'", "Son 67'"],
        },
        {
          date: "Mar 2025",
          score: "3-1",
          result: "W",
          venue: "Home",
          starPlayer: "Kane (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example108",
          keyMoments: ["Kane 12', 67'", "Olise 34'", "Son 78'"],
        },
        {
          date: "Dec 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Mateta (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example109",
          keyMoments: ["Mateta 78'", "Guaita save 90+3'"],
        },
        {
          date: "Sep 2024",
          score: "2-0",
          result: "W",
          venue: "Home",
          starPlayer: "Son (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example110",
          keyMoments: ["Son 23'", "Richarlison 67'"],
        },
      ],
    },
  },
  "aston-villa": {
    arsenal: {
      wins: 3,
      draws: 1,
      losses: 2,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Watkins (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example111",
          keyMoments: ["Jesus 23'", "Watkins 45', 78'"],
        },
        {
          date: "Aug 2025",
          score: "5-0",
          result: "W",
          venue: "Home",
          starPlayer: "Saka (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example112",
          keyMoments: ["Havertz 8'", "Saka 23'", "Jesus 45+1'", "Martinelli 67', 89'"],
        },
        {
          date: "May 2025",
          score: "0-0",
          result: "D",
          venue: "Away",
          starPlayer: "Raya (6 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example113",
          keyMoments: ["Raya save 34', 67'", "Martinez save 78'"],
        },
        {
          date: "Feb 2025",
          score: "1-0",
          result: "W",
          venue: "Home",
          starPlayer: "Ødegaard (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example114",
          keyMoments: ["Jesus 67'", "Gabriel clearance 89'"],
        },
        {
          date: "Nov 2024",
          score: "0-1",
          result: "L",
          venue: "Away",
          starPlayer: "Watkins (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example115",
          keyMoments: ["Watkins 56'", "Martinez save 90+4'"],
        },
      ],
    },
  },
  brighton: {
    "man-city": {
      wins: 1,
      draws: 1,
      losses: 4,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (2 goals)",
          highlightUrl: "https://www.youtube.com/watch?v=example116",
          keyMoments: ["Haaland 12'", "Haaland 67'", "Saka 85'"],
        },
        {
          date: "Sep 2025",
          score: "0-0",
          result: "D",
          venue: "Home",
          starPlayer: "Ederson (8 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example117",
          keyMoments: ["Ederson save 34'", "Raya save 76'", "VAR check 88'"],
        },
        {
          date: "Apr 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Ødegaard (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example118",
          keyMoments: ["Jesus 15'", "Foden 23'", "Martinelli 56'", "Saka 78'"],
        },
        {
          date: "Nov 2024",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "De Bruyne (3A)",
          highlightUrl: "https://www.youtube.com/watch?v=example119",
          keyMoments: ["Haaland 8'", "Álvarez 22'", "Foden 45+2'", "White 73'", "Haaland 89'"],
        },
        {
          date: "Aug 2024",
          score: "1-0",
          result: "W",
          venue: "Away",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example120",
          keyMoments: ["Haaland 76' (pen)", "Rodri tackle 89'"],
        },
      ],
    },
  },
  newcastle: {
    "man-city": {
      wins: 1,
      draws: 1,
      losses: 4,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "1-2",
          result: "L",
          venue: "Away",
          starPlayer: "Haaland (2 goals)",
          highlightUrl: "https://www.youtube.com/watch?v=example121",
          keyMoments: ["Haaland 12'", "Haaland 67'", "Saka 85'"],
        },
        {
          date: "Sep 2025",
          score: "0-0",
          result: "D",
          venue: "Home",
          starPlayer: "Ederson (8 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example122",
          keyMoments: ["Ederson save 34'", "Raya save 76'", "VAR check 88'"],
        },
        {
          date: "Apr 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Ødegaard (1G, 2A)",
          highlightUrl: "https://www.youtube.com/watch?v=example123",
          keyMoments: ["Jesus 15'", "Foden 23'", "Martinelli 56'", "Saka 78'"],
        },
        {
          date: "Nov 2024",
          score: "4-1",
          result: "W",
          venue: "Home",
          starPlayer: "De Bruyne (3A)",
          highlightUrl: "https://www.youtube.com/watch?v=example124",
          keyMoments: ["Haaland 8'", "Álvarez 22'", "Foden 45+2'", "White 73'", "Haaland 89'"],
        },
        {
          date: "Aug 2024",
          score: "1-0",
          result: "W",
          venue: "Away",
          starPlayer: "Rodri (MOTM)",
          highlightUrl: "https://www.youtube.com/watch?v=example125",
          keyMoments: ["Haaland 76' (pen)", "Rodri tackle 89'"],
        },
      ],
    },
    "aston-villa": {
      wins: 2,
      draws: 2,
      losses: 2,
      recentMatches: [
        {
          date: "Dec 2025",
          score: "1-3",
          result: "L",
          venue: "Away",
          starPlayer: "Watkins (brace)",
          highlightUrl: "https://www.youtube.com/watch?v=example126",
          keyMoments: ["Jesus 23'", "Watkins 45', 78'"],
        },
        {
          date: "Aug 2025",
          score: "3-0",
          result: "W",
          venue: "Home",
          starPlayer: "Isak (1G, 1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example127",
          keyMoments: ["Isak 12'", "Gordon 45'", "Bruno G 78'"],
        },
        {
          date: "May 2025",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "Raya (6 saves)",
          highlightUrl: "https://www.youtube.com/watch?v=example128",
          keyMoments: ["Raya save 34', 67'", "Martinez save 78'"],
        },
        {
          date: "Feb 2025",
          score: "2-1",
          result: "W",
          venue: "Home",
          starPlayer: "Bruno G (1A)",
          highlightUrl: "https://www.youtube.com/watch?v=example129",
          keyMoments: ["Isak 67'", "Gordon 89'"],
        },
        {
          date: "Nov 2024",
          score: "1-1",
          result: "D",
          venue: "Away",
          starPlayer: "Watkins (1G)",
          highlightUrl: "https://www.youtube.com/watch?v=example130",
          keyMoments: ["Watkins 56'", "Pope save 90+4'"],
        },
      ],
    },
  },
}

const recentMatches = [
  { date: "Dec 15", home: "Manchester United", away: "Bournemouth", score: "4-4" },
  { date: "Dec 14", home: "Crystal Palace", away: "Tottenham", score: "0-3" },
  { date: "Dec 14", home: "Brentford", away: "Leeds United", score: "1-1" },
  { date: "Dec 6", home: "Aston Villa", away: "Arsenal", score: "2-1" },
  { date: "Dec 6", home: "Bournemouth", away: "Chelsea", score: "0-0" },
  { date: "Dec 6", home: "Everton", away: "Nottingham Forest", score: "3-0" },
]

const topScorers = [
  { rank: 1, player: "Erling Haaland", club: "Manchester City", goals: 17 },
  { rank: 2, player: "Igor Thiago", club: "Brentford", goals: 11 },
  { rank: 3, player: "Danny Welbeck", club: "Brighton", goals: 9 },
  { rank: 4, player: "Hugo Ekitike", club: "Crystal Palace", goals: 8 },
  { rank: 4, player: "Jean-Philippe Mateta", club: "Crystal Palace", goals: 8 },
  { rank: 6, player: "Phil Foden", club: "Manchester City", goals: 7 },
  { rank: 6, player: "Antoine Semenyo", club: "Bournemouth", goals: 7 },
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
    const h2h = headToHeadRecords[homeTeam]?.[awayTeam] || { wins: 0, draws: 0, losses: 0, recentMatches: [] }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-balance">Premier League Match Predictor</h1>
          </div>
          <p className="text-lg text-muted-foreground text-pretty">
            Predict match outcomes using real-time player statistics and AI analysis
          </p>
          <p className="text-sm text-muted-foreground">2025/26 Season • Matchweek 16</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Current Premier League Standings</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Top 10</h3>
              {teams.slice(0, 10).map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">{team.position}</span>
                    <span className="text-xl">{team.logo}</span>
                    <span className="font-medium">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">P: {team.played}</span>
                    <span className="font-bold text-primary">{team.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Bottom 10</h3>
              {teams.slice(10).map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">{team.position}</span>
                    <span className="text-xl">{team.logo}</span>
                    <span className="font-medium">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">P: {team.played}</span>
                    <span className="font-bold text-primary">{team.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Top Scorers 2025/26</h2>
            </div>
            <div className="space-y-3">
              {topScorers.map((scorer) => (
                <div
                  key={`${scorer.player}-${scorer.club}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary w-6">{scorer.rank}</span>
                    <div>
                      <div className="font-semibold">{scorer.player}</div>
                      <div className="text-sm text-muted-foreground">{scorer.club}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{scorer.goals}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Recent Match Results</h2>
            </div>
            <div className="space-y-3">
              {recentMatches.map((match, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-accent/30">
                  <div className="text-xs text-muted-foreground mb-2">{match.date}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{match.home}</span>
                    <span className="text-xl font-bold text-primary px-4">{match.score}</span>
                    <span className="font-medium text-right">{match.away}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Team Selection */}
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Home Team</label>
              <Select value={homeTeam} onValueChange={setHomeTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id} disabled={team.id === awayTeam}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{team.logo}</span>
                        <span>{team.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Away Team</label>
              <Select value={awayTeam} onValueChange={setAwayTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id} disabled={team.id === homeTeam}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{team.logo}</span>
                        <span>{team.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculatePrediction} disabled={!homeTeam || !awayTeam} className="mt-6 w-full" size="lg">
            <Target className="mr-2 h-5 w-5" />
            Generate Prediction
          </Button>
        </Card>

        {/* Prediction Results */}
        {prediction && selectedHomeTeam && selectedAwayTeam && (
          <div className="space-y-6">
            {/* Win Probability */}
            <Card className="p-6">
              <h3 className="mb-6 text-xl font-bold">Match Prediction</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2 text-center">
                  <div className="text-4xl font-bold" style={{ color: selectedHomeTeam.color }}>
                    {prediction.homeWin.toFixed(1)}%
                  </div>
                  <div className="text-2xl">{selectedHomeTeam.logo}</div>
                  <div className="font-semibold">{selectedHomeTeam.name} Win</div>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right, ${selectedHomeTeam.color} ${prediction.homeWin}%, transparent ${prediction.homeWin}%)`,
                    }}
                  />
                </div>

                <div className="space-y-2 text-center">
                  <div className="text-4xl font-bold text-muted-foreground">{prediction.draw.toFixed(1)}%</div>
                  <div className="text-2xl">🤝</div>
                  <div className="font-semibold">Draw</div>
                  <div
                    className="h-2 rounded-full bg-muted-foreground/30"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>

                <div className="space-y-2 text-center">
                  <div className="text-4xl font-bold" style={{ color: selectedAwayTeam.color }}>
                    {prediction.awayWin.toFixed(1)}%
                  </div>
                  <div className="text-2xl">{selectedAwayTeam.logo}</div>
                  <div className="font-semibold">{selectedAwayTeam.name} Win</div>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right, ${selectedAwayTeam.color} ${prediction.awayWin}%, transparent ${prediction.awayWin}%)`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-accent/50 p-4 text-center">
                <div className="text-sm text-muted-foreground">Predicted Score</div>
                <div className="text-3xl font-bold">{prediction.predictedScore}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Confidence: {prediction.confidence.toFixed(1)}%
                </div>
              </div>
            </Card>

            {prediction.h2h && prediction.h2h.recentMatches && prediction.h2h.recentMatches.length > 0 && (
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Head-to-Head Record (Last 5 Meetings)</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2 text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-3xl font-bold text-primary">{prediction.h2h.wins}</div>
                      <div className="text-sm text-muted-foreground">{selectedHomeTeam.name} Wins</div>
                    </div>
                    <div className="space-y-2 text-center p-4 rounded-lg bg-accent">
                      <div className="text-3xl font-bold text-muted-foreground">{prediction.h2h.draws}</div>
                      <div className="text-sm text-muted-foreground">Draws</div>
                    </div>
                    <div className="space-y-2 text-center p-4 rounded-lg bg-secondary/10">
                      <div className="text-3xl font-bold text-secondary">{prediction.h2h.losses}</div>
                      <div className="text-sm text-muted-foreground">{selectedAwayTeam.name} Wins</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground">Recent Fixtures & Highlights</h4>
                    <div className="space-y-3">
                      {prediction.h2h.recentMatches.map((match: any, idx: number) => {
                        const isWin = match.result === "W"
                        const isDraw = match.result === "D"
                        const isLoss = match.result === "L"
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-lg border-l-4 ${
                              isWin
                                ? "bg-primary/5 border-primary"
                                : isDraw
                                  ? "bg-accent border-muted-foreground"
                                  : "bg-secondary/5 border-secondary"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`px-3 py-1 rounded font-bold text-lg ${
                                    isWin
                                      ? "bg-primary text-primary-foreground"
                                      : isDraw
                                        ? "bg-accent text-foreground"
                                        : "bg-secondary text-secondary-foreground"
                                  }`}
                                >
                                  {match.score}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold">{match.date}</div>
                                  <div className="text-xs text-muted-foreground">{match.venue}</div>
                                </div>
                              </div>
                              {match.highlightUrl && (
                                <a
                                  href={match.highlightUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                  <Video className="h-3 w-3" />
                                  Watch Highlights
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">Star Player: {match.starPlayer}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-semibold text-muted-foreground">Key Moments:</div>
                              <div className="flex flex-wrap gap-2">
                                {match.keyMoments.map((moment: string, mIdx: number) => (
                                  <span
                                    key={mIdx}
                                    className="text-xs px-2 py-1 rounded bg-background border border-border"
                                  >
                                    {moment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Statistics Comparison */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Team Strength</TabsTrigger>
                <TabsTrigger value="players">Top Players</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Team Strength Radar</h3>
                  </div>
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="white" strokeWidth={1.5} />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: "white", fontSize: 14, fontWeight: 700 }} />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: "white", fontSize: 12, fontWeight: 600 }}
                          strokeWidth={2}
                          stroke="white"
                        />
                        <Radar
                          name={selectedHomeTeam.name}
                          dataKey="home"
                          stroke={selectedHomeTeam.color}
                          fill={selectedHomeTeam.color}
                          fillOpacity={0.5}
                          strokeWidth={3}
                        />
                        <Radar
                          name={selectedAwayTeam.name}
                          dataKey="away"
                          stroke={selectedAwayTeam.color}
                          fill={selectedAwayTeam.color}
                          fillOpacity={0.5}
                          strokeWidth={3}
                        />
                        <Legend wrapperStyle={{ fontSize: "14px", fontWeight: 600, color: "white" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Card>
              </TabsContent>

              <TabsContent value="players" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="text-2xl">{selectedHomeTeam.logo}</div>
                      <h3 className="font-bold" style={{ color: selectedHomeTeam.color }}>
                        {selectedHomeTeam.name}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {selectedHomeTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="rounded-lg bg-accent p-4">
                          <div className="mb-2 font-semibold">{player.name}</div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Goals: {player.goals}</span>
                            <span>Assists: {player.assists}</span>
                            <span>Rating: {player.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="text-2xl">{selectedAwayTeam.logo}</div>
                      <h3 className="font-bold" style={{ color: selectedAwayTeam.color }}>
                        {selectedAwayTeam.name}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {selectedAwayTeam.topPlayers.map((player, idx) => (
                        <div key={idx} className="rounded-lg bg-accent p-4">
                          <div className="mb-2 font-semibold">{player.name}</div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Goals: {player.goals}</span>
                            <span>Assists: {player.assists}</span>
                            <span>Rating: {player.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <footer className="text-center py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} All rights reserved for SanaTech Solutions</p>
        </footer>
      </div>
    </div>
  )
}

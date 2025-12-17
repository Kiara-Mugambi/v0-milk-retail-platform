"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Target, Shield, Calendar } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

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
      { name: "Bryan Mbeumo", goals: 6, assists: 4, rating: 7.3 },
      { name: "Yoane Wissa", goals: 4, assists: 3, rating: 6.9 },
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
  Record<string, { wins: number; draws: number; losses: number; recentMatches: string[] }>
> = {
  "man-city": {
    arsenal: { wins: 3, draws: 1, losses: 2, recentMatches: ["2-1 W", "0-0 D", "1-3 L", "4-1 W", "1-0 W", "0-1 L"] },
    liverpool: { wins: 2, draws: 2, losses: 2, recentMatches: ["1-1 D", "1-1 D", "4-1 W", "0-1 L", "1-0 W", "0-1 L"] },
    chelsea: { wins: 4, draws: 1, losses: 1, recentMatches: ["2-0 W", "1-1 D", "1-0 W", "4-4 D", "1-0 W", "0-1 L"] },
    "man-utd": { wins: 5, draws: 0, losses: 1, recentMatches: ["3-0 W", "3-1 W", "6-3 W", "2-1 W", "1-2 L", "2-1 W"] },
  },
  arsenal: {
    "man-city": { wins: 2, draws: 1, losses: 3, recentMatches: ["3-1 W", "0-0 D", "1-2 L", "1-4 L", "1-0 W", "0-1 L"] },
    liverpool: { wins: 2, draws: 2, losses: 2, recentMatches: ["2-2 D", "1-1 D", "3-1 W", "2-2 D", "0-2 L", "2-0 W"] },
    chelsea: { wins: 3, draws: 2, losses: 1, recentMatches: ["5-0 W", "2-2 D", "1-3 L", "3-1 W", "2-2 D", "2-0 W"] },
    "aston-villa": {
      wins: 2,
      draws: 1,
      losses: 3,
      recentMatches: ["1-2 L", "2-4 L", "5-0 W", "0-0 D", "1-0 W", "0-1 L"],
    },
  },
  liverpool: {
    "man-city": { wins: 2, draws: 2, losses: 2, recentMatches: ["1-1 D", "1-1 D", "1-4 L", "1-0 W", "0-1 L", "1-0 W"] },
    arsenal: { wins: 2, draws: 2, losses: 2, recentMatches: ["2-2 D", "1-1 D", "1-3 L", "2-2 D", "2-0 W", "0-2 L"] },
    chelsea: { wins: 3, draws: 2, losses: 1, recentMatches: ["4-1 W", "0-0 D", "2-1 W", "1-2 L", "0-0 D", "2-0 W"] },
    "man-utd": { wins: 4, draws: 1, losses: 1, recentMatches: ["3-0 W", "0-0 D", "7-0 W", "2-1 W", "0-1 L", "2-1 W"] },
  },
  chelsea: {
    "man-city": { wins: 1, draws: 1, losses: 4, recentMatches: ["0-2 L", "1-1 D", "0-1 L", "4-4 D", "0-1 L", "1-0 W"] },
    arsenal: { wins: 1, draws: 2, losses: 3, recentMatches: ["0-5 L", "2-2 D", "3-1 W", "1-3 L", "2-2 D", "0-2 L"] },
    liverpool: { wins: 1, draws: 2, losses: 3, recentMatches: ["1-4 L", "0-0 D", "1-2 L", "2-1 W", "0-0 D", "0-2 L"] },
    tottenham: { wins: 2, draws: 2, losses: 2, recentMatches: ["4-1 W", "2-2 D", "1-1 D", "0-2 L", "2-0 W", "1-3 L"] },
  },
  "man-utd": {
    "man-city": { wins: 1, draws: 0, losses: 5, recentMatches: ["0-3 L", "1-3 L", "3-6 L", "1-2 L", "2-1 W", "1-2 L"] },
    liverpool: { wins: 1, draws: 1, losses: 4, recentMatches: ["0-3 L", "0-0 D", "0-7 L", "1-2 L", "1-0 W", "1-2 L"] },
    chelsea: { wins: 2, draws: 1, losses: 3, recentMatches: ["1-1 D", "2-1 W", "1-4 L", "2-1 W", "1-3 L", "0-1 L"] },
    bournemouth: {
      wins: 3,
      draws: 2,
      losses: 1,
      recentMatches: ["4-4 D", "3-0 W", "1-0 W", "0-3 L", "2-2 D", "2-0 W"],
    },
  },
  tottenham: {
    chelsea: { wins: 2, draws: 2, losses: 2, recentMatches: ["1-4 L", "2-2 D", "1-1 D", "2-0 W", "0-2 L", "3-1 W"] },
    "crystal-palace": {
      wins: 4,
      draws: 1,
      losses: 1,
      recentMatches: ["3-0 W", "1-0 W", "4-1 W", "0-3 L", "1-1 D", "2-1 W"],
    },
    arsenal: { wins: 1, draws: 2, losses: 3, recentMatches: ["2-3 L", "2-2 D", "0-2 L", "3-3 D", "2-0 W", "1-3 L"] },
    liverpool: { wins: 2, draws: 1, losses: 3, recentMatches: ["1-4 L", "2-1 W", "3-6 L", "1-1 D", "2-1 W", "1-3 L"] },
  },
  "aston-villa": {
    arsenal: { wins: 3, draws: 1, losses: 2, recentMatches: ["2-1 W", "4-2 W", "0-5 L", "0-0 D", "0-1 L", "1-0 W"] },
    "man-city": { wins: 1, draws: 1, losses: 4, recentMatches: ["1-2 L", "1-1 D", "0-3 L", "1-0 W", "1-4 L", "0-2 L"] },
    chelsea: { wins: 2, draws: 2, losses: 2, recentMatches: ["2-2 D", "1-0 W", "0-3 L", "1-1 D", "2-0 W", "0-1 L"] },
    newcastle: { wins: 2, draws: 2, losses: 2, recentMatches: ["1-3 L", "3-0 W", "1-1 D", "2-1 W", "1-1 D", "0-2 L"] },
  },
  brighton: {
    "man-city": { wins: 1, draws: 1, losses: 4, recentMatches: ["1-2 L", "1-4 L", "1-1 D", "3-2 W", "0-3 L", "1-2 L"] },
    chelsea: { wins: 2, draws: 1, losses: 3, recentMatches: ["2-1 W", "1-2 L", "1-1 D", "1-3 L", "4-1 W", "0-1 L"] },
    tottenham: { wins: 2, draws: 2, losses: 2, recentMatches: ["3-2 W", "1-1 D", "0-2 L", "4-2 W", "2-2 D", "1-3 L"] },
    liverpool: { wins: 1, draws: 2, losses: 3, recentMatches: ["2-2 D", "0-3 L", "3-0 W", "1-1 D", "1-2 L", "0-2 L"] },
  },
  newcastle: {
    "man-city": { wins: 1, draws: 1, losses: 4, recentMatches: ["1-2 L", "3-3 D", "0-2 L", "1-0 W", "0-2 L", "1-3 L"] },
    "aston-villa": {
      wins: 2,
      draws: 2,
      losses: 2,
      recentMatches: ["3-1 W", "0-3 L", "1-1 D", "1-2 L", "1-1 D", "2-0 W"],
    },
    tottenham: { wins: 2, draws: 1, losses: 3, recentMatches: ["4-0 W", "1-2 L", "2-2 D", "1-6 L", "2-1 W", "0-1 L"] },
    chelsea: { wins: 1, draws: 2, losses: 3, recentMatches: ["1-1 D", "1-4 L", "0-2 L", "1-1 D", "1-0 W", "1-3 L"] },
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
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">Head-to-Head Record (Last 6 Meetings)</h3>
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

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Recent Fixtures</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {prediction.h2h.recentMatches.map((match: string, idx: number) => {
                      const isWin = match.includes(" W")
                      const isDraw = match.includes(" D")
                      const isLoss = match.includes(" L")
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-center font-semibold ${
                            isWin
                              ? "bg-primary/20 text-primary"
                              : isDraw
                                ? "bg-accent text-muted-foreground"
                                : "bg-secondary/20 text-secondary"
                          }`}
                        >
                          {match}
                        </div>
                      )
                    })}
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
                  <ResponsiveContainer width="100%" height={500}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" strokeWidth={2} />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: "hsl(var(--foreground))", fontSize: 14, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        strokeWidth={2}
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
                      <Legend wrapperStyle={{ fontSize: "14px", fontWeight: 600 }} />
                    </RadarChart>
                  </ResponsiveContainer>
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

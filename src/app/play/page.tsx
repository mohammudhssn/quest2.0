'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Trophy, Users, Heart, Search, Home } from 'lucide-react'
import PersonXClue from '@/components/clues/PersonXClue'
import ParentsClue from '@/components/clues/ParentsClue'
import Link from 'next/link'

type GameState = 'onboarding' | 'clue-selection' | 'playing' | 'playing-personx' | 'clue-complete'

export default function QuestGamePage() {
  const [gameState, setGameState] = useState<GameState>('onboarding')
  const [nickname, setNickname] = useState('')
  const [eventCode, setEventCode] = useState('')
  const [selectedClue, setSelectedClue] = useState<string | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [completedClues, setCompletedClues] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)

  // Show welcome overlay after login (only once)
  useEffect(() => {
    if (gameState === 'clue-selection' && !hasSeenWelcome) {
      setTimeout(() => {
        setShowWelcomeOverlay(true)
      }, 500)
    }
  }, [gameState, hasSeenWelcome])

  const handleStartQuest = () => {
    if (nickname.trim()) {
      setGameState('clue-selection')
    }
  }

  const handleClueComplete = (clueType: string, score: number) => {
    setTotalScore(prev => prev + score)
    setCompletedClues(prev => [...prev, clueType])
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
      setGameState('clue-complete')
    }, 2000)
  }

  const handleSelectClue = (clueType: string) => {
    setSelectedClue(clueType)
    if (clueType === 'parents') {
      setGameState('playing')
    } else if (clueType === 'personx') {
      setGameState('playing-personx')
    }
  }

  const handleBackToSelection = () => {
    setSelectedClue(null)
    setGameState('clue-selection')
  }

  const dismissWelcome = () => {
    setShowWelcomeOverlay(false)
    setHasSeenWelcome(true)
  }

  const renderCurrentState = () => {
    switch (gameState) {
      case 'onboarding':
        return (
          <Card className="quest-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-quest-coral to-quest-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold quest-gradient bg-clip-text text-transparent">
                Welcome to the Quest!
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Enter your details to join Sarah & Mike's wedding adventure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="nickname" className="text-slate-700 font-medium">Nickname</Label>
                <Input
                  id="nickname"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-quest-coral focus:ring-quest-coral text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="eventCode" className="text-slate-700 font-medium">Event Code (Optional)</Label>
                <Input
                  id="eventCode"
                  placeholder="Enter event code"
                  value={eventCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventCode(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-quest-purple focus:ring-quest-purple text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              
              <Button 
                onClick={handleStartQuest}
                disabled={!nickname.trim()}
                className="w-full h-12 bg-quest-coral hover:bg-quest-coral/90 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Start Quest
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )

      case 'clue-selection':
        return (
          <>
            {/* Welcome Scene-Setting Overlay - Shows Once */}
            {showWelcomeOverlay && (
              <div className="fixed inset-0 z-[60] pointer-events-none">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg pointer-events-auto">
                  <Card className="quest-card border-0 shadow-2xl bg-white/98 backdrop-blur-xl animate-scale-in">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-quest-coral via-quest-purple to-quest-yellow rounded-full flex items-center justify-center mb-4 shadow-xl">
                          <span className="text-white text-2xl">🎊</span>
                        </div>
                        <Badge className="bg-quest-coral text-white px-4 py-2 text-sm mb-4">
                          Quest Demo Experience
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                          <p className="font-bold text-blue-900 text-sm mb-2">🎪 Picture This Scene:</p>
                          <p className="text-sm text-blue-800 leading-relaxed">
                            Guests have just arrived at a beautiful wedding. They're scanning QR codes, curious and excited. 
                            The energy is building as they discover this isn't just another passive event - it's an adventure!
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                          <p className="font-bold text-green-900 text-sm mb-2">✨ The Quest Magic:</p>
                          <p className="text-sm text-green-800 leading-relaxed">
                            You're about to experience how Quest transforms strangers into teammates, 
                            creates unforgettable moments, and makes every guest an active participant in the celebration.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                          <p className="font-bold text-yellow-900 text-sm mb-2">💡 Demo Note:</p>
                          <p className="text-sm text-yellow-800 leading-relaxed">
                            This uses placeholder names and simplified scenarios, but imagine the possibilities for your real events!
                          </p>
                        </div>
                      </div>

                      <Button 
                        onClick={dismissWelcome}
                        className="bg-quest-coral hover:bg-quest-coral/90 text-white shadow-lg px-8 py-3 rounded-full"
                      >
                        Begin the Experience
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <Card className="quest-card border-0 shadow-2xl" data-tutorial-target="quest-header">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Trophy className="w-8 h-8 text-quest-yellow" />
                  <Badge variant="secondary" className="bg-quest-yellow-light text-quest-yellow px-4 py-2 text-lg font-semibold">
                    Score: {totalScore} points
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold quest-gradient bg-clip-text text-transparent">
                  Choose Your Adventure
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg">
                  Welcome {nickname}! Select a clue to begin your quest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    onClick={() => handleSelectClue('personx')}
                    className="h-auto p-6 bg-gradient-to-r from-quest-purple to-quest-yellow hover:from-quest-purple/90 hover:to-quest-yellow/90 text-white group transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    disabled={completedClues.includes('personx')}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Search className="w-6 h-6" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-lg">Mystery Guest</div>
                        <div className="text-sm text-yellow-100 opacity-90">Find the special person using clever clues</div>
                        <div className="text-xs text-yellow-200 mt-1">Difficulty: Easy • Reward: Up to 15 points</div>
                      </div>
                      {completedClues.includes('personx') ? (
                        <CheckCircle className="w-6 h-6 text-green-300" />
                      ) : (
                        <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleSelectClue('parents')}
                    className="h-auto p-6 bg-gradient-to-r from-quest-coral to-quest-purple hover:from-quest-coral/90 hover:to-quest-purple/90 text-white group transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    disabled={completedClues.includes('parents')}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold text-lg">Parents' Wisdom</div>
                        <div className="text-sm text-pink-100 opacity-90">Discover ancient proverbs from both families</div>
                        <div className="text-xs text-pink-200 mt-1">Difficulty: Medium • Reward: Up to 20 points</div>
                      </div>
                      {completedClues.includes('parents') ? (
                        <CheckCircle className="w-6 h-6 text-green-300" />
                      ) : (
                        <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )

      case 'playing':
        return (
          <ParentsClue 
            onComplete={(score) => handleClueComplete('parents', score)}
            onBack={handleBackToSelection}
          />
        )

      case 'playing-personx':
        return (
          <PersonXClue 
            onComplete={(score) => handleClueComplete('personx', score)}
            onBack={handleBackToSelection}
          />
        )

      case 'clue-complete':
        return (
          <Card className="quest-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-quest-yellow to-quest-coral rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold quest-gradient bg-clip-text text-transparent">
                Quest Complete! 🎉
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Congratulations {nickname}! You've experienced the Quest magic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-gradient-to-r from-quest-coral-light to-quest-purple-light p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Final Score</h3>
                <div className="text-4xl font-bold quest-gradient bg-clip-text text-transparent">
                  {totalScore} Points
                </div>
                <p className="text-slate-600 mt-2">Amazing work exploring the quest experience!</p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => {
                    setGameState('clue-selection')
                    setSelectedClue(null)
                  }}
                  className="w-full bg-quest-purple hover:bg-quest-purple/90 text-white rounded-full py-3 text-lg font-semibold"
                >
                  Try Another Clue
                </Button>
                
                <Link href="/landing">
                  <Button 
                    variant="outline"
                    className="w-full border-quest-coral text-quest-coral hover:bg-quest-coral hover:text-white rounded-full py-3 text-lg font-semibold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return <div className="text-white text-center">Loading...</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-quest-coral-light/20 via-quest-purple-light/20 to-quest-yellow-light/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3" data-tutorial-target="quest-header">
          <Link href="/landing">
            <h1 className="text-5xl font-bold quest-gradient bg-clip-text text-transparent mb-3 drop-shadow-lg hover:scale-105 transition-transform cursor-pointer">
              Quest
            </h1>
          </Link>
          <p className="text-gray-600 text-xl font-medium drop-shadow-md">The Wedding Edition</p>
        </div>

        {/* Success Animation Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-10 text-center shadow-2xl transform animate-bounce">
              <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
              <p className="text-2xl font-bold text-slate-800">Quest Complete! ✨</p>
              <p className="text-lg text-slate-600 mt-2">Great job, {nickname}!</p>
            </div>
          </div>
        )}

        {/* Current State */}
        {renderCurrentState()}

        {/* Back to Landing Button */}
        {gameState === 'clue-selection' && (
          <Link href="/landing">
            <Button 
              variant="outline"
              className="w-full bg-white/20 hover:bg-white/30 text-gray-700 border-white/30 hover:border-white/50 backdrop-blur-sm"
            >
              <Home className="w-4 h-4 mr-2" />
              ← Back to Landing Page
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

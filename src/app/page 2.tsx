'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Trophy, Users, Heart } from 'lucide-react'

type GameState = 'onboarding' | 'clue-selection' | 'playing' | 'clue-complete' | 'leaderboard'
type ClueStep = 
  | 'parent-choice' | 'parent-intro'
  | 'groom-father' | 'groom-father-correct' | 'groom-mother' | 'groom-mother-correct' | 'groom-proverb-text'
  | 'bride-father' | 'bride-father-correct' | 'bride-mother' | 'bride-mother-correct' | 'bride-proverb-text'
  | 'transition' | 'complete'

type ParentPath = 'groom' | 'bride'

interface MCQuestion {
  id: string
  text: string
  isCorrect: boolean
}

export default function QuestGame() {
  const [gameState, setGameState] = useState<GameState>('onboarding')
  const [nickname, setNickname] = useState('')
  const [eventCode, setEventCode] = useState('')
  const [score, setScore] = useState(0)
  
  // Clue progression
  const [clueStep, setClueStep] = useState<ClueStep>('parent-choice')
  const [chosenParentPath, setChosenParentPath] = useState<ParentPath | null>(null)
  const [completedPaths, setCompletedPaths] = useState<ParentPath[]>([])
  
  // Text input state
  const [textAnswer, setTextAnswer] = useState('')
  const [currentHints, setCurrentHints] = useState(0)
  const [totalHintsUsed, setTotalHintsUsed] = useState(0)

  // Animation states
  const [showSuccess, setShowSuccess] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const getShuffledMCQuestions = (step: ClueStep): MCQuestion[] => {
    let questions: MCQuestion[] = []
    
    switch (step) {
      case 'groom-father':
        questions = [
          { id: 'a', text: 'War hooy', isCorrect: false },
          { id: 'b', text: 'Maxaad Rabtaa?', isCorrect: false },
          { id: 'c', text: 'Nin iyo naagtii colna ma aha', isCorrect: true }
        ]
        break
      case 'groom-mother':
        questions = [
          { id: 'a', text: 'War hooy', isCorrect: false },
          { id: 'b', text: 'Maxaad Rabtaa?', isCorrect: false },
          { id: 'c', text: 'Nabadna ma aha', isCorrect: true }
        ]
        break
      case 'bride-father':
        questions = [
          { id: 'a', text: 'War hooy', isCorrect: false },
          { id: 'b', text: 'Maxaad Rabtaa?', isCorrect: false },
          { id: 'c', text: 'Kor Wayeel', isCorrect: true }
        ]
        break
      case 'bride-mother':
        questions = [
          { id: 'a', text: 'War hooy', isCorrect: false },
          { id: 'b', text: 'Maxaad Rabtaa?', isCorrect: false },
          { id: 'c', text: 'Waa wada-indho', isCorrect: true }
        ]
        break
    }
    
    return shuffleArray(questions)
  }

  const handleStartGame = () => {
    if (nickname.trim()) {
      setGameState('clue-selection')
    }
  }

  const handleStartParentsClue = () => {
    setGameState('playing')
    setScore(0)
    setClueStep('parent-choice')
    setCompletedPaths([])
    setTotalHintsUsed(0)
    setChosenParentPath(null)
  }

  const handleParentChoice = (path: ParentPath) => {
    setChosenParentPath(path)
    setClueStep('parent-intro')
  }

  const handleMCAnswer = (isCorrect: boolean, currentStep: ClueStep) => {
    if (isCorrect) {
      setScore(prev => prev + 1)
      setShowSuccess(true)
      
      // Move to success state
      setTimeout(() => {
        setShowSuccess(false)
        const successStep = `${currentStep}-correct` as ClueStep
        setClueStep(successStep)
      }, 1500)
    } else {
      // Just continue without penalty, but show feedback
      setTimeout(() => {
        // Stay on same question for retry
      }, 500)
    }
  }

  const handleTextSubmit = () => {
    const answer = textAnswer.toLowerCase().trim()
    let isCorrect = false
    
    if (clueStep === 'groom-proverb-text') {
      isCorrect = answer.includes('balance') || answer.includes('harmony') || answer.includes('patience')
    } else if (clueStep === 'bride-proverb-text') {
      isCorrect = answer.includes('wisdom')
    }

    if (isCorrect) {
      const pointsEarned = Math.max(1, 10 - currentHints)
      setScore(prev => prev + pointsEarned)
      setTextAnswer('')
      setCurrentHints(0)
      
      setCompletedPaths(prev => [...prev, chosenParentPath!])
      
      if (completedPaths.length === 0) {
        // First path complete, transition to second
        setClueStep('transition')
      } else {
        // Both paths complete
        setClueStep('complete')
      }
    } else {
      setCurrentHints(prev => prev + 1)
      setTotalHintsUsed(prev => prev + 1)
      
      if (currentHints >= 2) {
        setTextAnswer(clueStep === 'groom-proverb-text' ? 'Balance' : 'Wisdom')
      }
    }
  }

  const getHintText = () => {
    if (clueStep === 'groom-proverb-text') {
      const hints = [
        "Think about what keeps relationships stable...",
        "It's about finding the middle ground between extremes...",
        "The answer rhymes with 'valance'..."
      ]
      return hints[currentHints - 1] || ''
    } else if (clueStep === 'bride-proverb-text') {
      const hints = [
        "What do elders share with younger generations?",
        "It's something gained through experience...",
        "It starts with 'W' and ends with 'dom'..."
      ]
      return hints[currentHints - 1] || ''
    }
    return ''
  }

  const getProgressPercentage = () => {
    const totalSteps = 14 // Approximate total steps
    const stepMap: Record<ClueStep, number> = {
      'parent-choice': 1,
      'parent-intro': 2,
      'groom-father': 3,
      'groom-father-correct': 4,
      'groom-mother': 5,
      'groom-mother-correct': 6,
      'groom-proverb-text': 7,
      'bride-father': 8,
      'bride-father-correct': 9,
      'bride-mother': 10,
      'bride-mother-correct': 11,
      'bride-proverb-text': 12,
      'transition': 13,
      'complete': 14
    }
    
    const currentStepNumber = stepMap[clueStep] || 1
    return (currentStepNumber / totalSteps) * 100
  }

  const renderCurrentStep = () => {
    switch (clueStep) {
      case 'parent-choice':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Path
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Which set of parents would you like to speak with first?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => handleParentChoice('groom')}
                  className="group h-auto p-6 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-lg">Groom's Parents</div>
                      <div className="text-sm text-blue-100 opacity-90">Start with the groom's family wisdom</div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleParentChoice('bride')}
                  className="group h-auto p-6 bg-gradient-to-br from-pink-500 via-rose-600 to-pink-600 hover:from-pink-600 hover:via-rose-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-lg">Bride's Parents</div>
                      <div className="text-sm text-pink-100 opacity-90">Start with the bride's family wisdom</div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      // Additional cases would go here...
      default:
        return <div>Step not implemented yet</div>
    }
  }

  return (
    <div className="min-h-screen premium-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">Quest</h1>
          <p className="text-white/90 text-xl font-medium drop-shadow-md">The Wedding Edition</p>
        </div>

        {/* Success Animation Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-10 text-center shadow-2xl transform animate-pulse">
              <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
              <p className="text-2xl font-bold text-slate-800">Correct! ✨</p>
            </div>
          </div>
        )}

        {/* Onboarding State */}
        {gameState === 'onboarding' && (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Welcome!
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Enter your details to join the quest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="nickname" className="text-slate-700 font-medium">Nickname</Label>
                <Input
                  id="nickname"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-violet-400 focus:ring-violet-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="eventCode" className="text-slate-700 font-medium">Event Code (Optional)</Label>
                <Input
                  id="eventCode"
                  placeholder="Enter event code"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-violet-400 focus:ring-violet-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <Button 
                onClick={handleStartGame}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!nickname.trim()}
              >
                Start Quest
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Clue Selection */}
        {gameState === 'clue-selection' && (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Clue
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Welcome, {nickname}! Select a clue to begin your quest.
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button
                  onClick={handleStartParentsClue}
                  className="group w-full h-auto p-6 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <Users className="w-6 h-6" />
                        </div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">Clue 1: Parents</div>
                        <div className="text-sm text-purple-100 opacity-90">Discover ancient family wisdom</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>

                <Button
                  disabled
                  className="w-full h-auto p-6 bg-slate-100 text-slate-400 cursor-not-allowed shadow-md border border-slate-200"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-200 rounded-xl">
                        <div className="w-6 h-6 bg-slate-300 rounded"></div>
                        </div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">Clue 2: Person X</div>
                        <div className="text-sm">Complete Clue 1 to unlock</div>
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  disabled
                  className="w-full h-auto p-6 bg-slate-100 text-slate-400 cursor-not-allowed shadow-md border border-slate-200"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-200 rounded-xl">
                        <div className="w-6 h-6 bg-slate-300 rounded"></div>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">Clue 3: Couple Quiz</div>
                        <div className="text-sm">Complete Clue 2 to unlock</div>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            {/* Progress */}
            <Card className="premium-card border-0 shadow-xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">Parents Clue Progress</span>
                    <span className="text-slate-600 font-semibold">{Math.round(getProgressPercentage())}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={getProgressPercentage()} className="h-3 bg-slate-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-300" 
                         style={{ width: `${getProgressPercentage()}%` }} />
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-slate-600 font-medium">Current Score</span>
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 shadow-md">
                    {score} points
                  </Badge>
                </div>
                {totalHintsUsed > 0 && (
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">Hints Used</span>
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 shadow-md">
                      {totalHintsUsed} hints
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Step */}
            {renderCurrentStep()}
          </div>
        )}

        {/* Clue Complete */}
        {gameState === 'clue-complete' && (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Clue Complete! 🎉
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Ready for the next challenge?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 shadow-inner">
                <p className="text-emerald-800 text-center font-semibold text-lg">
                  Parents Clue: {score} points earned! ✨
                </p>
              </div>
                
                <Button 
                  onClick={() => setGameState('clue-selection')}
                className="w-full h-14 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                >
                <ArrowRight className="w-5 h-5 mr-3" />
                  Back to Clue Selection
                </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Users, Heart, Lightbulb } from 'lucide-react'

type ParentsStep = 
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

interface ParentsClueProps {
  onComplete: (score: number) => void
  onBack: () => void
}

export default function ParentsClue({ onComplete, onBack }: ParentsClueProps) {
  const [step, setStep] = useState<ParentsStep>('parent-choice')
  const [chosenParentPath, setChosenParentPath] = useState<ParentPath | null>(null)
  const [completedPaths, setCompletedPaths] = useState<ParentPath[]>([])
  const [score, setScore] = useState(0)
  
  // Text input state
  const [textAnswer, setTextAnswer] = useState('')
  const [currentHints, setCurrentHints] = useState(0)
  const [totalHintsUsed, setTotalHintsUsed] = useState(0)

  // Animation states
  const [showSuccess, setShowSuccess] = useState(false)

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const getShuffledMCQuestions = (step: ParentsStep): MCQuestion[] => {
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

  const handleParentChoice = (path: ParentPath) => {
    setChosenParentPath(path)
    setStep('parent-intro')
  }

  const handleMCAnswer = (isCorrect: boolean, currentStep: ParentsStep) => {
    if (isCorrect) {
      setScore(prev => prev + 1)
      setShowSuccess(true)
      
      // Move to success state
      setTimeout(() => {
        setShowSuccess(false)
        const successStep = `${currentStep}-correct` as ParentsStep
        setStep(successStep)
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
    
    if (step === 'groom-proverb-text') {
      isCorrect = answer.includes('balance') || answer.includes('harmony') || answer.includes('patience')
    } else if (step === 'bride-proverb-text') {
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
        setStep('transition')
      } else {
        // Both paths complete
        setStep('complete')
      }
    } else {
      setCurrentHints(prev => prev + 1)
      setTotalHintsUsed(prev => prev + 1)
      
      if (currentHints >= 2) {
        setTextAnswer(step === 'groom-proverb-text' ? 'Balance' : 'Wisdom')
      }
    }
  }

  const getHintText = () => {
    if (step === 'groom-proverb-text') {
      const hints = [
        "Think about what keeps relationships stable...",
        "It's about finding the middle ground between extremes...",
        "The answer rhymes with 'valance'..."
      ]
      return hints[currentHints - 1] || ''
    } else if (step === 'bride-proverb-text') {
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
    const totalSteps = 14
    const stepMap: Record<ParentsStep, number> = {
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
    
    const currentStepNumber = stepMap[step] || 1
    return (currentStepNumber / totalSteps) * 100
  }

  const renderCurrentStep = () => {
    switch (step) {
      case 'parent-choice':
        return (
          <Card className="quest-card border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold quest-gradient bg-clip-text text-transparent">👥 Choose Your Path</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Which set of parents would you like to speak with first?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={() => handleParentChoice('groom')}
                  className="h-auto p-4 bg-gradient-to-r from-quest-coral to-quest-purple hover:from-quest-coral/90 hover:to-quest-purple/90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Groom's Parents</div>
                      <div className="text-sm text-blue-100">Start with the groom's family wisdom</div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleParentChoice('bride')}
                  className="h-auto p-4 bg-gradient-to-r from-quest-purple to-quest-yellow hover:from-quest-purple/90 hover:to-quest-yellow/90 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">Bride's Parents</div>
                      <div className="text-sm text-pink-100">Start with the bride's family wisdom</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 'parent-intro':
        return (
          <Card className="gradient-card border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="gradient-text">
                {chosenParentPath === 'groom' ? '🤵 Groom\'s Parents' : '👰 Bride\'s Parents'}
              </CardTitle>
              <CardDescription>
                You've chosen to speak with the {chosenParentPath === 'groom' ? 'groom\'s' : 'bride\'s'} parents first.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <p className="text-gray-700 text-center">
                  Each parent holds half of an ancient proverb. Listen carefully to what they say, 
                  then piece together their wisdom.
                </p>
              </div>
              <Button 
                onClick={() => setStep(chosenParentPath === 'groom' ? 'groom-father' : 'bride-father')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Start Listening
              </Button>
            </CardContent>
          </Card>
        )

      case 'groom-father':
      case 'groom-mother':
      case 'bride-father':
      case 'bride-mother':
        const questions = getShuffledMCQuestions(step)
        const parentInfo = {
          'groom-father': { emoji: '🧔', title: 'Groom\'s Father', question: 'What did the groom\'s father say?' },
          'groom-mother': { emoji: '👩', title: 'Groom\'s Mother', question: 'What did the groom\'s mother say?' },
          'bride-father': { emoji: '👨', title: 'Bride\'s Father', question: 'What did the bride\'s father say?' },
          'bride-mother': { emoji: '👩‍🦳', title: 'Bride\'s Mother', question: 'What did the bride\'s mother say?' }
        }[step]!

        return (
          <Card className="gradient-card border-white/20">
            <CardHeader>
              <CardTitle className="gradient-text">{parentInfo.emoji} {parentInfo.title}</CardTitle>
              <CardDescription>{parentInfo.question}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
                <p className="text-sm text-yellow-800 text-center">
                  💡 Listen carefully and choose the correct quote
                </p>
              </div>
              
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <Button 
                    key={question.id}
                    variant="outline" 
                    className="w-full justify-start bg-white/50 hover:bg-white/70 text-left h-auto p-4 transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => handleMCAnswer(question.isCorrect, step)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{question.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'groom-father-correct':
      case 'groom-mother-correct':
      case 'bride-father-correct':
      case 'bride-mother-correct':
        const correctInfo = {
          'groom-father-correct': { emoji: '🧔', title: 'Groom\'s Father', next: 'groom-mother' },
          'groom-mother-correct': { emoji: '👩', title: 'Groom\'s Mother', next: 'groom-proverb-text' },
          'bride-father-correct': { emoji: '👨', title: 'Bride\'s Father', next: 'bride-mother' },
          'bride-mother-correct': { emoji: '👩‍🦳', title: 'Bride\'s Mother', next: 'bride-proverb-text' }
        }[step]!

        return (
          <Card className="gradient-card border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="gradient-text">Perfect! ✨</CardTitle>
              <CardDescription>
                You got the correct quote from the {correctInfo.title.toLowerCase()}!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 text-center font-medium">
                  +1 point earned! 🎉
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(correctInfo.next as ParentsStep)}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {correctInfo.next.includes('proverb') ? 'Complete the Proverb' : 'Continue to Next Parent'}
              </Button>
            </CardContent>
          </Card>
        )

      case 'groom-proverb-text':
        return (
          <Card className="gradient-card border-white/20">
            <CardHeader>
              <CardTitle className="gradient-text">🎉 Groom's Proverb Revealed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <p className="text-lg font-semibold text-purple-900 italic text-center">
                  "Nin iyo naagtii colna ma aha nabadna ma aha"
                </p>
                <p className="text-sm text-purple-700 mt-2 text-center">
                  Translation: "A husband and his wife live together neither at war nor at peace."
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="groom-text" className="text-base font-medium">
                  💭 Reflection Question (10 points):
                </Label>
                <p className="text-sm text-gray-600">
                  You've just heard a proverb that describes marriage as neither war nor peace. 
                  In one word, what does that teach you about healthy relationships?
                </p>
                
                {currentHints > 0 && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      💡 Hint {currentHints}/3: {getHintText()}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      (-1 point for using hint)
                    </p>
                  </div>
                )}
                
                <Input
                  id="groom-text"
                  placeholder="Enter your one-word answer..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  className="bg-white/10 border-white/20 text-gray-800"
                />
                
                <Button 
                  onClick={handleTextSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  disabled={!textAnswer.trim()}
                >
                  Submit Answer
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 'bride-proverb-text':
        return (
          <Card className="gradient-card border-white/20">
            <CardHeader>
              <CardTitle className="gradient-text">🎉 Bride's Proverb Revealed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                <p className="text-lg font-semibold text-pink-900 italic text-center">
                  "Kor waayeel waa wada-indho"
                </p>
                <p className="text-sm text-pink-700 mt-2 text-center">
                  Translation: "An elder has eyes everywhere."
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="bride-text" className="text-base font-medium">
                  💭 Reflection Question (10 points):
                </Label>
                <p className="text-sm text-gray-600">
                  What one word describes the gift that elders share even when they're not there?
                </p>
                
                {currentHints > 0 && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      💡 Hint {currentHints}/3: {getHintText()}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      (-1 point for using hint)
                    </p>
                  </div>
                )}
                
                <Input
                  id="bride-text"
                  placeholder="Enter your one-word answer..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  className="bg-white/10 border-white/20 text-gray-800"
                />
                
                <Button 
                  onClick={handleTextSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  disabled={!textAnswer.trim()}
                >
                  Submit Answer
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 'transition':
        const nextPath = chosenParentPath === 'groom' ? 'bride' : 'groom'
        return (
          <Card className="gradient-card border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="gradient-text">Halfway There! 🌟</CardTitle>
              <CardDescription>
                You've completed the {chosenParentPath === 'groom' ? 'groom\'s' : 'bride\'s'} family wisdom.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-center text-gray-700">
                  Now it's time to hear from the {nextPath === 'groom' ? 'groom\'s' : 'bride\'s'} parents 
                  and discover their ancient proverb too!
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  setChosenParentPath(nextPath)
                  setStep(nextPath === 'groom' ? 'groom-father' : 'bride-father')
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to {nextPath === 'groom' ? 'Groom\'s' : 'Bride\'s'} Parents
              </Button>
            </CardContent>
          </Card>
        )

      case 'complete':
        return (
          <Card className="gradient-card border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="gradient-text text-2xl">🎊 Parents Clue Complete!</CardTitle>
              <CardDescription>
                You've discovered both ancient proverbs!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm font-semibold text-purple-900">Groom's Proverb:</p>
                  <p className="text-sm text-purple-800 italic">
                    "Nin iyo naagtii colna ma aha nabadna ma aha"
                  </p>
                  <p className="text-xs text-purple-600">
                    A husband and his wife live together neither at war nor at peace.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <p className="text-sm font-semibold text-pink-900">Bride's Proverb:</p>
                  <p className="text-sm text-pink-800 italic">
                    "Kor waayeel waa wada-indho"
                  </p>
                  <p className="text-xs text-pink-600">
                    An elder has eyes everywhere.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Badge variant="default" className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg px-6 py-2">
                  Final Score: {score} points
                </Badge>
                {totalHintsUsed > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    ({totalHintsUsed} hints used)
                  </p>
                )}
              </div>
              
              <Button 
                onClick={() => onComplete(score)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Next Clue
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="gradient-card border-white/20">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Parents Clue Progress</span>
              <span className="text-gray-600">{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Score</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {score} points
            </Badge>
          </div>
          {totalHintsUsed > 0 && (
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-600">Hints Used</span>
              <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">
                {totalHintsUsed} hints
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-800">Correct! ✨</p>
          </div>
        </div>
      )}

      {/* Current Step */}
      {renderCurrentStep()}

      {/* Back Button */}
      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
      >
        ← Back to Clue Selection
      </Button>
    </div>
  )
}
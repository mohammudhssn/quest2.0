'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Search, Users, Eye, Lightbulb, Trophy } from 'lucide-react'
import ContextualTutorial from '@/components/ContextualTutorial'

type PersonXStep = 
  | 'introduction'
  | 'investigation' 
  | 'guest-list'
  | 'part1-hint'
  | 'part1-success'
  | 'role-investigation'
  | 'part2-hint'
  | 'part2-success'
  | 'complete'

interface PersonXClueProps {
  onComplete: (score: number) => void
  onBack: () => void
}

export default function PersonXClue({ onComplete, onBack }: PersonXClueProps) {
  const [step, setStep] = useState<PersonXStep>('introduction')
  const [part1Answer, setPart1Answer] = useState('')
  const [part2Answer, setPart2Answer] = useState('')
  const [part1Hints, setPart1Hints] = useState(0)
  const [part2Hints, setPart2Hints] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [tutorialEnabled, setTutorialEnabled] = useState(true)

  // Tutorial content mapped to quest steps
  const tutorialContent = [
    {
      questStep: 'introduction',
      target: 'clue-header',
      irlTitle: 'Setting the Scene',
      irlDescription: "Event planners choose a 'Person X' - someone special among the guests. The emcee announces the challenge and excitement fills the room as guests start looking around curiously, wondering who it could be.",
      actionTitle: 'Your Demo Mission',
      actionDescription: "In this clue, discover who Person X is. You'll experience the same detective work that creates collaboration and excitement at real events.",
      emotion: "✨ The energy is electric - guests are intrigued and ready to collaborate!",
      overlayNote: "In real events, guests wouldn't see a guest list immediately - they'd explore, ask questions, and deduce. This demo simplifies it to show the core experience."
    },
    {
      questStep: 'investigation',
      target: 'investigation-tools',
      irlTitle: 'Groups Form & Strategize',
      irlDescription: "Guests naturally cluster into teams, some checking seating charts, others approaching staff for hints, and many start mingling to gather information. The social energy is building!",
      actionTitle: 'Choose Your Approach',
      actionDescription: "Use these investigation tools just like real guests would. Each choice creates different collaborative moments.",
      emotion: "🤝 This is where strangers become teammates and connections form!",
      overlayNote: "Notice how Quest turns passive guests into active participants who work together."
    },
    {
      questStep: 'guest-list',
      target: 'guest-list-card',
      irlTitle: 'The Crowd Gathers',
      irlDescription: "Guests crowd around the guest list, pointing at names, discussing patterns, and having those 'aha!' moments. You can feel the collective problem-solving energy.",
      actionTitle: 'Scan for the Pattern',
      actionDescription: "Look carefully - one name breaks the pattern. This is the moment guests experience discovery together.",
      emotion: "🔍 The thrill of discovery - everyone's detective instincts are activated!",
      overlayNote: "See how a simple list becomes a collaborative puzzle that gets everyone talking?"
    },
    {
      questStep: 'complete',
      target: 'success-card',
      irlTitle: 'Victory Celebration',
      irlDescription: "Cheering erupts! High-fives, laughter, and pure joy fill the space. Teams celebrate their detective work and immediately start asking 'What's next?' The energy is infectious.",
      actionTitle: 'Quest Complete!',
      actionDescription: "Experience the satisfaction that real guests feel when they solve a challenge together.",
      emotion: "🎉 Pure celebration - this is the magic that makes events unforgettable!",
      overlayNote: "This celebratory energy carries forward, making guests excited for the next challenge and creating lasting positive memories."
    }
  ]

  const guestList = [
    "Ahmed Hassan", "Fatima Al-Zahra", "Omar Sheikh", "Sarah Johnson",
    "Bilicsan", // The answer - only first name!
    "Maya Patel", "David Chen", "Layla Ibrahim", "Marcus Williams", "Zara Mohamed"
  ]

  const calculateScore = () => {
    const part1Score = Math.max(1, 5 - part1Hints)
    const part2Score = Math.max(2, 10 - (part2Hints * 2))
    const bonus = (part1Hints === 0 && part2Hints === 0) ? 5 : 0
    return part1Score + part2Score + bonus
  }

  const handlePart1Submit = () => {
    const answer = part1Answer.toLowerCase().trim()
    if (answer.includes('bilicsan')) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setStep('part1-success')
      }, 1500)
    } else {
      setTimeout(() => setPart1Answer(''), 1000)
    }
  }

  const handlePart2Submit = () => {
    const answer = part2Answer.toLowerCase().trim()
    if (answer.includes('navigator') || answer.includes('pathfinder') || answer.includes('guide')) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setStep('part2-success')
      }, 1500)
    } else {
      setTimeout(() => setPart2Answer(''), 1000)
    }
  }

  const renderCurrentStep = () => {
    switch (step) {
      case 'introduction':
        return (
          <Card className="premium-card border-0 shadow-2xl" data-tutorial-target="clue-header">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The Mystery Guest 🕵️
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                A detective challenge awaits you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-2xl border border-indigo-100 shadow-inner">
                <p className="text-slate-700 text-center leading-relaxed">
                  Among today's guests is someone special - they're here to celebrate with us, 
                  but their story is unique. Can you discover who they are?
                </p>
              </div>
              
              <Button 
                onClick={() => setStep('investigation')}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
              >
                <Search className="w-5 h-5 mr-3" />
                Begin Investigation
              </Button>
            </CardContent>
          </Card>
        )

      case 'investigation':
        return (
          <Card className="premium-card border-0 shadow-2xl" data-tutorial-target="investigation-tools">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                Investigation Tools 🔍
              </CardTitle>
              <CardDescription className="text-slate-600 text-base text-center">
                Choose your approach to solve the mystery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => setStep('guest-list')}
                  className="group h-auto p-5 bg-white hover:bg-slate-50 text-left border border-slate-200 hover:border-indigo-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  data-tutorial-target="guest-list-button"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-lg">View Guest List</div>
                      <div className="text-sm text-slate-600">Check today's attendees</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
                
                <Button 
                  onClick={() => {
                    setPart1Hints(1)
                    setStep('part1-hint')
                  }}
                  className="group h-auto p-5 bg-white hover:bg-slate-50 text-left border border-slate-200 hover:border-amber-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-md">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-lg">Get a Hint</div>
                      <div className="text-sm text-slate-600">Need guidance? (-1 point)</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case 'guest-list':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
                Wedding Guest List 👥
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 max-h-64 overflow-y-auto shadow-inner" data-tutorial-target="guest-list-card">
                <div className="space-y-2">
                  {guestList.map((guest, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                        guest === 'Bilicsan' 
                          ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-slate-800 font-medium">{guest}</span>
                      {guest === 'Bilicsan' && (
                        <Eye className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="part1-answer" className="text-lg font-semibold text-slate-700">
                  Who is the mysterious guest? (5 points)
                </Label>
                
                <Input
                  id="part1-answer"
                  placeholder="Enter the guest's name..."
                  value={part1Answer}
                  onChange={(e) => setPart1Answer(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                  data-tutorial-target="answer-input"
                />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handlePart1Submit}
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!part1Answer.trim()}
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'part1-success':
        return (
          <Card className="premium-card border-0 shadow-2xl" data-tutorial-target="success-card">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Mystery Solved! 🌟
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                You found Bilicsan - the mysterious guest!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 shadow-inner">
                <p className="text-emerald-800 text-center font-semibold text-lg">
                  +{Math.max(1, 5 - part1Hints)} points earned! 🎉
                </p>
              </div>
              
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl px-8 py-3 shadow-lg">
                  Final Score: {Math.max(1, 5 - part1Hints)} points
                </Badge>
              </div>
              
              <Button 
                onClick={() => onComplete(Math.max(1, 5 - part1Hints))}
                className="w-full h-14 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
              >
                <ArrowRight className="w-5 h-5 mr-3" />
                Continue to Next Clue
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardContent className="p-6 text-center">
              <p className="text-slate-600">Step: {step}</p>
              <Button onClick={() => setStep('introduction')} className="mt-4">
                Back to Start
              </Button>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Contextual Tutorial Overlay */}
      <ContextualTutorial
        currentQuestStep={step}
        isEnabled={tutorialEnabled}
        onToggle={() => setTutorialEnabled(!tutorialEnabled)}
        tutorialContent={tutorialContent}
      />

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 text-center shadow-2xl transform animate-pulse">
            <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
            <p className="text-2xl font-bold text-slate-800">Correct! ✨</p>
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

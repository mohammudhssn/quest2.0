'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Search, Users, Eye, Lightbulb, Trophy } from 'lucide-react'
import CinematicTutorial, { useCinematicTutorial } from '@/components/CinematicTutorial'
import { useEffect } from 'react'

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

  // Tutorial steps for Person X clue
  const tutorialSteps = [
    {
      id: 'global-intro',
      target: 'body',
      irlTitle: 'Welcome to the Event',
      irlDescription: "Guests have just arrived at a wedding. They're scanning a QR code at the welcome sign to join the interactive quest.",
      actionTitle: 'Demo Introduction',
      actionDescription: "Welcome to Quest! This demo shows how events become live adventures. No real names are used here - everything is simulated for demonstration.",
      position: 'center' as const,
      spotlight: false
    },
    {
      id: 'person-x-intro',
      target: 'clue-header',
      irlTitle: 'Mystery Guest Announced',
      irlDescription: "The emcee announces there's a mystery guest hidden among everyone here. Guests start looking around curiously.",
      actionTitle: 'Your Mission',
      actionDescription: "In this clue, your goal is to figure out who Person X is. In real life, guests wouldn't be told about the guest list right away - they'd need to explore and deduce.",
      position: 'bottom' as const,
      spotlight: true
    },
    {
      id: 'investigation-tools',
      target: 'investigation-tools',
      irlTitle: 'Groups Start Strategizing',
      irlDescription: "Groups of guests start talking, checking the seating chart, or asking people around. Some approach staff for hints.",
      actionTitle: 'Choose Your Approach',
      actionDescription: "Use these investigation tools: either get a hint, or open the guest list. In a real event, guests would need to be more creative!",
      position: 'center' as const,
      spotlight: true
    },
    {
      id: 'guest-list-reveal',
      target: 'guest-list-card',
      irlTitle: 'Checking the Guest List',
      irlDescription: "Guests crowd around the printed guest list on a table or wall, scanning names and looking for patterns.",
      actionTitle: 'Scan for Clues',
      actionDescription: "Look carefully at the names. One of them breaks the pattern - Person X is listed without a last name. This is your key clue!",
      position: 'right' as const,
      spotlight: true
    },
    {
      id: 'answer-submission',
      target: 'answer-input',
      irlTitle: 'Team Decision Time',
      irlDescription: "One person whispers the name to their team, and after a quick discussion, they lock in their answer with confidence.",
      actionTitle: 'Submit Your Answer',
      actionDescription: "Type the answer (Person X) and submit. Notice how they stand out from all the other full names in the list.",
      position: 'top' as const,
      spotlight: true
    },
    {
      id: 'success-celebration',
      target: 'success-card',
      irlTitle: 'Victory Celebration',
      irlDescription: "Cheering, high-fives, and laughter fill the air. The team celebrates their detective work before moving on to the next challenge.",
      actionTitle: 'Quest Complete!',
      actionDescription: "Congrats! You've completed the clue. Click 'Continue to Next Clue' to keep your adventure going.",
      position: 'center' as const,
      spotlight: true
    }
  ]

  const tutorial = useCinematicTutorial(tutorialSteps)

  // Auto-start tutorial on component mount
  useEffect(() => {
    if (!tutorial.hasSeenIntro) {
      tutorial.startTutorial()
      tutorial.setHasSeenIntro(true)
    }
  }, [])

  // Mock guest list for visual clue
  const guestList = [
    "Ahmed Hassan",
    "Fatima Al-Zahra", 
    "Omar Sheikh",
    "Sarah Johnson",
    "Bilicsan", // The answer - only first name!
    "Maya Patel",
    "David Chen",
    "Layla Ibrahim",
    "Marcus Williams",
    "Zara Mohamed"
  ]

  const calculateScore = () => {
    // Part 1: 5 points minus hints used
    const part1Score = Math.max(1, 5 - part1Hints)
    
    // Part 2: 10 points minus 2 per hint used
    const part2Score = Math.max(2, 10 - (part2Hints * 2))
    
    // Bonus for completing without any hints
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
      // Show feedback but don't advance
      setTimeout(() => {
        setPart1Answer('')
      }, 1000)
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
      // Show feedback but don't advance
      setTimeout(() => {
        setPart2Answer('')
      }, 1000)
    }
  }

  const getPart1Hint = () => {
    const hints = [
      "Look through today's guest list carefully... someone stands out by having less information than others.",
      "Check how names are listed - most people have both first and last names shown.",
      "Find the person listed with only one name - no family name in sight."
    ]
    return hints[part1Hints - 1] || ''
  }

  const getPart2Hint = () => {
    const hints = [
      "When you ask Bilicsan about their role, listen for how they describe helping people today.",
      "Think about someone who helps others find their way or shows the path forward.",
      "The answer rhymes with 'aviator' or starts with 'path'..."
    ]
    return hints[part2Hints - 1] || ''
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
                  but their story is unique. Can you discover who they are and uncover their secret role?
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200 shadow-inner">
                <p className="text-sm text-amber-800 text-center font-medium">
                  🎯 <strong>Your Mission:</strong> Find the mysterious guest and discover their special purpose
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
                Use these clues to find the mysterious guest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 shadow-inner">
                <p className="text-blue-800 text-sm mb-3 font-semibold">
                  💡 Detective Tip: Look for someone who stands out from the crowd
                </p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Check the guest list, seating arrangements, or celebration details. 
                  Someone among today's attendees is different from the rest...
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => setStep('guest-list')}
                  className="group h-auto p-5 bg-white hover:bg-slate-50 text-left border border-slate-200 hover:border-indigo-300 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
                      <div className="text-sm text-slate-600">Need some guidance? (-1 point)</div>
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
              <CardDescription className="text-slate-600 text-base text-center">
                Today's celebration attendees
              </CardDescription>
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
                  
                  <Button 
                    onClick={() => {
                      setPart1Hints(prev => Math.min(prev + 1, 3))
                      setStep('part1-hint')
                    }}
                    className="h-12 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'part1-hint':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-center">
                Detective Hint 💡
              </CardTitle>
              <CardDescription className="text-slate-600 text-base text-center">
                Hint {part1Hints} of 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200 shadow-inner">
                <p className="text-amber-800 font-semibold mb-3 text-center">
                  🔍 Clue #{part1Hints}:
                </p>
                <p className="text-amber-700 leading-relaxed text-center">
                  {getPart1Hint()}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200 shadow-inner">
                <p className="text-red-700 text-sm text-center font-medium">
                  -1 point for using this hint
                </p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="hint-answer" className="text-lg font-semibold text-slate-700">
                  Your guess:
                </Label>
                
                <Input
                  id="hint-answer"
                  placeholder="Enter the guest's name..."
                  value={part1Answer}
                  onChange={(e) => setPart1Answer(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handlePart1Submit}
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!part1Answer.trim()}
                  >
                    Submit Answer
                  </Button>
                  
                  {part1Hints < 3 && (
                    <Button 
                      onClick={() => {
                        setPart1Hints(prev => prev + 1)
                      }}
                      className="h-12 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                    >
                      Next Hint
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => setStep('guest-list')}
                    className="h-12 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'part1-success':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Excellent Detective Work! 🎉
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
                {part1Hints > 0 && (
                  <p className="text-emerald-700 text-sm text-center mt-2">
                    ({part1Hints} hint{part1Hints > 1 ? 's' : ''} used)
                  </p>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 p-6 rounded-2xl border border-violet-100 shadow-inner">
                <p className="text-slate-700 text-center leading-relaxed">
                  Great work finding Bilicsan! But there's more to discover about this special guest. 
                  They have a unique role in today's celebration...
                </p>
              </div>
              
              <Button 
                onClick={() => setStep('role-investigation')}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
              >
                <ArrowRight className="w-5 h-5 mr-3" />
                Discover Their Secret Role
              </Button>
            </CardContent>
          </Card>
        )

      case 'role-investigation':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-2xl">
                🎭
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                The Secret Role 🎭
              </CardTitle>
              <CardDescription className="text-slate-600 text-base text-center">
                What makes Bilicsan so special today?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-200 shadow-inner">
                <p className="text-slate-700 text-center leading-relaxed">
                  Now that you've found Bilicsan, there's one more mystery to solve. 
                  When you speak with them, ask about their special job today. 
                  What unique role do they play in our celebration?
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200 shadow-inner">
                <p className="text-sm text-amber-800 text-center font-medium">
                  💭 <strong>Think about:</strong> Someone who helps guide others or shows the way
                </p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="part2-answer" className="text-lg font-semibold text-slate-700">
                  What is Bilicsan's special role? (10 points)
                </Label>
                
                <Input
                  id="part2-answer"
                  placeholder="Enter their role or job title..."
                  value={part2Answer}
                  onChange={(e) => setPart2Answer(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handlePart2Submit}
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!part2Answer.trim()}
                  >
                    Submit Answer
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setPart2Hints(1)
                      setStep('part2-hint')
                    }}
                    className="h-12 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'part2-hint':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-center">
                Role Hint 💡
              </CardTitle>
              <CardDescription className="text-slate-600 text-base text-center">
                Hint {part2Hints} of 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200 shadow-inner">
                <p className="text-amber-800 font-semibold mb-3 text-center">
                  🔍 Clue #{part2Hints}:
                </p>
                <p className="text-amber-700 leading-relaxed text-center">
                  {getPart2Hint()}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200 shadow-inner">
                <p className="text-red-700 text-sm text-center font-medium">
                  -2 points for using this hint
                </p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="hint2-answer" className="text-lg font-semibold text-slate-700">
                  Your guess:
                </Label>
                
                <Input
                  id="hint2-answer"
                  placeholder="Enter their role..."
                  value={part2Answer}
                  onChange={(e) => setPart2Answer(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-400 text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handlePart2Submit}
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!part2Answer.trim()}
                  >
                    Submit Answer
                  </Button>
                  
                  {part2Hints < 3 && (
                    <Button 
                      onClick={() => {
                        setPart2Hints(prev => prev + 1)
                      }}
                      className="h-12 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                    >
                      Next Hint
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => setStep('role-investigation')}
                    className="h-12 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'part2-success':
        return (
          <Card className="premium-card border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Mystery Solved! 🌟
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                You discovered Bilicsan's secret role!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 shadow-inner">
                <p className="text-emerald-800 text-center font-semibold text-lg">
                  +{Math.max(2, 10 - (part2Hints * 2))} points earned! 🎉
                </p>
                {part2Hints > 0 && (
                  <p className="text-emerald-700 text-sm text-center mt-2">
                    ({part2Hints} hint{part2Hints > 1 ? 's' : ''} used)
                  </p>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-200 shadow-inner">
                <p className="text-slate-700 text-center leading-relaxed">
                  Perfect! Bilicsan is our celebration navigator/pathfinder - helping guide everyone 
                  through this special day. Just like every journey needs someone to light the way!
                </p>
              </div>
              
              <Button 
                onClick={() => setStep('complete')}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
              >
                <ArrowRight className="w-5 h-5 mr-3" />
                See Final Results
              </Button>
            </CardContent>
          </Card>
        )

      case 'complete':
        const finalScore = calculateScore()
        const hasBonus = part1Hints === 0 && part2Hints === 0
        
        return (
          <Card className="premium-card border-0 shadow-2xl" data-tutorial-target="success-card">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Person X Complete! 🎊
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">
                Outstanding detective work!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 shadow-inner">
                <div className="text-center space-y-3">
                  <p className="text-slate-700 font-semibold">Investigation Summary:</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-emerald-700 font-medium">✅ Found Bilicsan: +{Math.max(1, 5 - part1Hints)} points</p>
                    <p className="text-emerald-700 font-medium">✅ Discovered role: +{Math.max(2, 10 - (part2Hints * 2))} points</p>
                    {hasBonus && (
                      <p className="text-amber-700 font-medium">🌟 No hints bonus: +5 points</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl px-8 py-3 shadow-lg">
                  Final Score: {finalScore} points
                </Badge>
                <p className="text-sm text-slate-500 mt-3">
                  Total hints used: {part1Hints + part2Hints}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 p-6 rounded-2xl border border-violet-100 shadow-inner">
                <p className="text-slate-700 text-center text-sm leading-relaxed">
                  🎉 You successfully uncovered the mystery of Bilicsan, our special celebration navigator! 
                  Every great event needs someone to help guide the way.
                </p>
              </div>
              
              <Button 
                onClick={() => onComplete(finalScore)}
                className="w-full h-14 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0"
              >
                <ArrowRight className="w-5 h-5 mr-3" />
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
      {/* Cinematic Tutorial Overlay */}
      <CinematicTutorial
        steps={tutorialSteps}
        currentStep={tutorial.currentStep}
        isActive={tutorial.isActive}
        onNext={tutorial.nextStep}
        onPrevious={tutorial.previousStep}
        onReplay={tutorial.replayStep}
        onSkip={tutorial.skipTutorial}
        onToggle={tutorial.toggleTutorial}
        onClose={tutorial.closeTutorial}
      />

      {/* Success Animation Overlay */}
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
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight, ArrowLeft, RotateCcw, SkipForward, Play, Pause } from 'lucide-react'

interface TutorialStep {
  id: string
  title: string
  target: string
  irlDescription: string
  doDescription: string
  overlayNote?: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

interface DemoTutorialProps {
  steps: TutorialStep[]
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
  onToggle: () => void
}

export default function DemoTutorial({ steps, isActive, onComplete, onSkip, onToggle }: DemoTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      setCurrentStep(0)
    } else {
      setIsVisible(false)
    }
  }, [isActive])

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReplay = () => {
    setCurrentStep(0)
  }

  if (!isVisible || !currentStepData) return null

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm">
        
        {/* Progress bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-80">
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-quest-coral h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-sm text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Demo mode toggle */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={onToggle}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            Demo Mode
          </Button>
        </div>

        {/* Tutorial card */}
        <div className={`absolute z-60 ${getPositionClasses(currentStepData.position)}`}>
          <Card className="quest-card border-0 shadow-2xl max-w-md">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-quest-coral text-white">
                  {currentStepData.title}
                </Badge>
                <Button
                  onClick={onSkip}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* IRL Context */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900 mb-1">🎪 In Real Life:</p>
                  <p className="text-sm text-blue-800">{currentStepData.irlDescription}</p>
                </div>

                {/* Demo Instructions */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900 mb-1">💻 In This Demo:</p>
                  <p className="text-sm text-green-800">{currentStepData.doDescription}</p>
                </div>

                {/* Overlay note if present */}
                {currentStepData.overlayNote && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-900 mb-1">💡 Note:</p>
                    <p className="text-sm text-yellow-800">{currentStepData.overlayNote}</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex space-x-2">
                  <Button
                    onClick={handleReplay}
                    variant="outline"
                    size="sm"
                    className="text-gray-600"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Replay
                  </Button>
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    size="sm"
                    className="text-gray-600"
                  >
                    <SkipForward className="w-4 h-4 mr-1" />
                    Skip Clue
                  </Button>
                </div>

                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      size="sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="bg-quest-coral hover:bg-quest-coral/90 text-white"
                    size="sm"
                  >
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spotlight effect for targeted elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This would be enhanced with actual element targeting */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        </div>
      </div>
    </>
  )
}

function getPositionClasses(position: string): string {
  switch (position) {
    case 'top':
      return 'top-20 left-1/2 transform -translate-x-1/2'
    case 'bottom':
      return 'bottom-20 left-1/2 transform -translate-x-1/2'
    case 'left':
      return 'left-8 top-1/2 transform -translate-y-1/2'
    case 'right':
      return 'right-8 top-1/2 transform -translate-y-1/2'
    case 'center':
    default:
      return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }
}

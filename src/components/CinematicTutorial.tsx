'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight, ArrowLeft, RotateCcw, SkipForward, Play, Pause, Eye, EyeOff } from 'lucide-react'

interface TutorialStep {
  id: string
  target: string
  irlTitle: string
  irlDescription: string
  actionTitle: string
  actionDescription: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  spotlight?: boolean
}

interface CinematicTutorialProps {
  steps: TutorialStep[]
  currentStep: number
  isActive: boolean
  onNext: () => void
  onPrevious: () => void
  onReplay: () => void
  onSkip: () => void
  onToggle: () => void
  onClose: () => void
}

export default function CinematicTutorial({
  steps,
  currentStep,
  isActive,
  onNext,
  onPrevious,
  onReplay,
  onSkip,
  onToggle,
  onClose
}: CinematicTutorialProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  // Find and highlight target element
  useEffect(() => {
    if (!isActive || !currentStepData) return

    const findTarget = () => {
      const element = document.querySelector(`[data-tutorial-target="${currentStepData.target}"]`) as HTMLElement
      if (element) {
        setTargetElement(element)
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        setTargetElement(null)
      }
    }

    // Small delay to ensure DOM is ready
    setTimeout(findTarget, 100)
  }, [isActive, currentStep, currentStepData])

  if (!isActive || !currentStepData) return null

  const getSpotlightStyle = () => {
    if (!targetElement || !currentStepData.spotlight) return {}

    const rect = targetElement.getBoundingClientRect()
    const padding = 20

    return {
      clipPath: `polygon(
        0% 0%, 
        0% 100%, 
        ${rect.left - padding}px 100%, 
        ${rect.left - padding}px ${rect.top - padding}px, 
        ${rect.right + padding}px ${rect.top - padding}px, 
        ${rect.right + padding}px ${rect.bottom + padding}px, 
        ${rect.left - padding}px ${rect.bottom + padding}px, 
        ${rect.left - padding}px 100%, 
        100% 100%, 
        100% 0%
      )`
    }
  }

  const getTutorialPosition = () => {
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }

    const rect = targetElement.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    switch (currentStepData.position) {
      case 'top':
        return {
          top: `${Math.max(20, rect.top - 20)}px`,
          left: '50%',
          transform: 'translate(-50%, -100%)'
        }
      case 'bottom':
        return {
          top: `${Math.min(windowHeight - 20, rect.bottom + 20)}px`,
          left: '50%',
          transform: 'translate(-50%, 0%)'
        }
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${Math.max(20, rect.left - 20)}px`,
          transform: 'translate(-100%, -50%)'
        }
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${Math.min(windowWidth - 20, rect.right + 20)}px`,
          transform: 'translate(0%, -50%)'
        }
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
    }
  }

  return (
    <>
      {/* Demo Mode Toggle - Always Visible */}
      <div className="fixed top-4 right-4 z-[60]">
        <Button
          onClick={onToggle}
          variant="outline"
          className="bg-black/20 backdrop-blur-md border-white/30 text-white hover:bg-black/30 shadow-2xl"
        >
          {isActive ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          Demo Mode
        </Button>
      </div>

      {/* Cinematic Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-auto"
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          ...getSpotlightStyle()
        }}
      >
        {/* Progress Bar */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-80 max-w-[90vw]">
          <div className="bg-white/20 rounded-full h-1 mb-3">
            <div 
              className="bg-quest-coral h-1 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-sm text-center font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Tutorial Card */}
        <div 
          className="absolute z-60 max-w-md w-[90vw]"
          style={getTutorialPosition()}
        >
          <Card className="quest-card border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-quest-coral text-white px-3 py-1">
                  Quest Demo
                </Badge>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* IRL Context */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">🎪</span>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">{currentStepData.irlTitle}</p>
                      <p className="text-sm text-blue-800 leading-relaxed">{currentStepData.irlDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Demo Action */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">💻</span>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 mb-1">{currentStepData.actionTitle}</p>
                      <p className="text-sm text-green-800 leading-relaxed">{currentStepData.actionDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                {/* Left Controls */}
                <div className="flex space-x-2">
                  <Button
                    onClick={onReplay}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 border-gray-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={onSkip}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 border-gray-300"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <Button
                      onClick={onPrevious}
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={onNext}
                    className="bg-quest-coral hover:bg-quest-coral/90 text-white shadow-lg"
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

        {/* Spotlight Ring Effect */}
        {targetElement && currentStepData.spotlight && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: targetElement.getBoundingClientRect().top - 10,
              left: targetElement.getBoundingClientRect().left - 10,
              width: targetElement.getBoundingClientRect().width + 20,
              height: targetElement.getBoundingClientRect().height + 20,
              border: '3px solid rgba(255, 107, 107, 0.8)',
              borderRadius: '12px',
              boxShadow: '0 0 30px rgba(255, 107, 107, 0.5)',
              animation: 'pulse 2s infinite'
            }}
          />
        )}
      </div>
    </>
  )
}

// Global Tutorial Manager Hook
export function useCinematicTutorial(steps: TutorialStep[]) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)

  const startTutorial = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const toggleTutorial = () => {
    setIsActive(!isActive)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsActive(false)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const replayStep = () => {
    // Replay current step - could add animation here
  }

  const skipTutorial = () => {
    setIsActive(false)
  }

  const closeTutorial = () => {
    setIsActive(false)
  }

  return {
    isActive,
    currentStep,
    hasSeenIntro,
    setHasSeenIntro,
    startTutorial,
    toggleTutorial,
    nextStep,
    previousStep,
    replayStep,
    skipTutorial,
    closeTutorial
  }
}

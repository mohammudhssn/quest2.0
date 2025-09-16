'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface TutorialContent {
  questStep: string
  target: string
  irlTitle: string
  irlDescription: string
  actionTitle: string
  actionDescription: string
  overlayNote?: string
  emotion: string
}

interface ContextualTutorialProps {
  currentQuestStep: string
  isEnabled: boolean
  onToggle: () => void
  tutorialContent: TutorialContent[]
}

export default function ContextualTutorial({ 
  currentQuestStep, 
  isEnabled, 
  onToggle, 
  tutorialContent 
}: ContextualTutorialProps) {
  const [currentOverlay, setCurrentOverlay] = useState<TutorialContent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasShownForStep, setHasShownForStep] = useState<Set<string>>(new Set())

  // Watch quest step and show appropriate overlay
  useEffect(() => {
    if (!isEnabled) return

    const overlay = tutorialContent.find(content => content.questStep === currentQuestStep)
    
    if (overlay && !hasShownForStep.has(currentQuestStep)) {
      setCurrentOverlay(overlay)
      setIsVisible(true)
      setHasShownForStep(prev => new Set([...prev, currentQuestStep]))
      
      // Auto-dismiss after 8 seconds for non-critical steps
      if (currentQuestStep !== 'introduction') {
        setTimeout(() => {
          setIsVisible(false)
        }, 8000)
      }
    }
  }, [currentQuestStep, isEnabled, tutorialContent, hasShownForStep])

  // Create spotlight effect
  useEffect(() => {
    if (!isVisible || !currentOverlay) return

    const targetElement = document.querySelector(`[data-tutorial-target="${currentOverlay.target}"]`)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      
      // Add spotlight ring
      targetElement.classList.add('tutorial-spotlight')
      
      return () => {
        targetElement.classList.remove('tutorial-spotlight')
      }
    }
  }, [isVisible, currentOverlay])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isEnabled) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={onToggle}
          variant="outline"
          className="bg-black/10 backdrop-blur-md border-white/30 text-gray-700 hover:bg-black/20 shadow-lg"
        >
          <Eye className="w-4 h-4 mr-2" />
          Demo Mode
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Demo Mode Toggle - Always Visible */}
      <div className="fixed top-4 right-4 z-[70]">
        <Button
          onClick={onToggle}
          variant="outline"
          className="bg-black/20 backdrop-blur-md border-white/30 text-white hover:bg-black/30 shadow-lg"
        >
          <EyeOff className="w-4 h-4 mr-2" />
          Demo Mode
        </Button>
      </div>

      {/* Contextual Overlay */}
      {isVisible && currentOverlay && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Dimmed background with spotlight cutout */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm tutorial-backdrop" />
          
          {/* Tutorial Card */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-lg pointer-events-auto">
            <Card className="quest-card border-0 shadow-2xl bg-white/98 backdrop-blur-xl animate-slide-up">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-quest-coral text-white px-3 py-1 text-sm">
                    Quest Demo
                  </Badge>
                  <Button
                    onClick={handleDismiss}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* IRL Context - The Magic */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🎪</span>
                    </div>
                    <div>
                      <p className="font-bold text-blue-900 text-sm mb-1">{currentOverlay.irlTitle}</p>
                      <p className="text-sm text-blue-800 leading-relaxed">{currentOverlay.irlDescription}</p>
                      <p className="text-xs text-blue-600 mt-2 italic font-medium">{currentOverlay.emotion}</p>
                    </div>
                  </div>
                </div>

                {/* Demo Action */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💻</span>
                    </div>
                    <div>
                      <p className="font-bold text-green-900 text-sm mb-1">{currentOverlay.actionTitle}</p>
                      <p className="text-sm text-green-800 leading-relaxed">{currentOverlay.actionDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Special Note */}
                {currentOverlay.overlayNote && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
                    <p className="text-xs text-yellow-800">
                      💡 <strong>Demo Note:</strong> {currentOverlay.overlayNote}
                    </p>
                  </div>
                )}

                {/* Continue Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleDismiss}
                    size="sm"
                    className="bg-quest-coral hover:bg-quest-coral/90 text-white shadow-lg"
                  >
                    Continue Quest
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

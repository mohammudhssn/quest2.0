'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, Heart, Trophy, Smartphone, CheckCircle, Star, Play } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: "📸",
      title: "Photo Challenges",
      description: "Capture memories with interactive photo tasks that bring guests together",
      color: "quest-coral",
      bgColor: "bg-quest-coral-light"
    },
    {
      icon: "🧠",
      title: "Trivia & Riddles", 
      description: "Test knowledge about the couple with fun, personalized questions",
      color: "quest-purple",
      bgColor: "bg-quest-purple-light"
    },
    {
      icon: "🔍",
      title: "Scavenger Hunts",
      description: "Hidden treasures and clues that explore the venue and create adventures",
      color: "quest-yellow",
      bgColor: "bg-quest-yellow-light"
    },
    {
      icon: "🎤",
      title: "Voice Messages",
      description: "Record heartfelt messages and memories for the happy couple",
      color: "quest-coral",
      bgColor: "bg-quest-coral-light"
    }
  ]

  const testimonials = [
    {
      name: "Sarah & Mike",
      event: "Wedding - 150 guests",
      quote: "Our guests are still talking about the quest! It made everyone interact and created the most amazing memories.",
      rating: 5
    },
    {
      name: "TechCorp Inc.",
      event: "Team Building - 80 people",
      quote: "Transformed our corporate event into something truly special. Engagement was through the roof!",
      rating: 5
    },
    {
      name: "Emma & James",
      event: "Wedding - 200 guests",
      quote: "The leaderboard had everyone competing in the most fun way. Best wedding entertainment ever!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-quest-coral-light/20 via-quest-purple-light/20 to-quest-yellow-light/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold quest-gradient bg-clip-text text-transparent">
                Quest
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-quest-coral transition-colors">Features</a>
              <a href="#demo" className="text-gray-700 hover:text-quest-purple transition-colors">Demo</a>
              <a href="#testimonials" className="text-gray-700 hover:text-quest-yellow transition-colors">Reviews</a>
              <Button className="bg-quest-coral hover:bg-quest-coral/90 text-white rounded-full px-6">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your Events Into 
              <span className="quest-gradient bg-clip-text text-transparent block mt-2">
                Interactive Quests
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Turn weddings and celebrations into engaging adventures with custom challenges, 
              real-time leaderboards, and unforgettable memories that bring everyone together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/play">
                <Button 
                  size="lg"
                  className="bg-quest-coral hover:bg-quest-coral/90 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Demo Quest
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="border-quest-purple text-quest-purple hover:bg-quest-purple hover:text-white rounded-full px-8 py-3 text-lg font-semibold transition-all"
              >
                Book a Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="quest-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl mb-4">💑</div>
                <h3 className="font-semibold text-lg mb-2">Perfect for Weddings</h3>
                <p className="text-gray-600">Create magical moments that guests will remember forever</p>
              </div>
              
              <div className="quest-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="font-semibold text-lg mb-2">Corporate Events</h3>
                <p className="text-gray-600">Build team connections through fun, interactive challenges</p>
              </div>
              
              <div className="quest-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="text-3xl mb-4">📱</div>
                <h3 className="font-semibold text-lg mb-2">Mobile-First</h3>
                <p className="text-gray-600">Easy QR code access, works on any device, no app required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the <span className="quest-gradient bg-clip-text text-transparent">Magic</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our interactive challenges bring guests together and create unforgettable moments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Feature Showcase */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Interactive Challenges</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {features.map((feature, index) => (
                  <Button
                    key={index}
                    variant={activeFeature === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFeature(index)}
                    className={`rounded-full ${
                      activeFeature === index 
                        ? `bg-${feature.color} text-white` 
                        : `border-${feature.color} text-${feature.color} hover:bg-${feature.color} hover:text-white`
                    }`}
                  >
                    {feature.icon} {feature.title.split(' ')[0]}
                  </Button>
                ))}
              </div>

              <div className="quest-card animate-scale-in">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${features[activeFeature].bgColor} mb-4`}>
                  <span className="text-2xl mr-2">{features[activeFeature].icon}</span>
                  <span className={`font-semibold text-${features[activeFeature].color}`}>
                    {features[activeFeature].title}
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h4>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {features[activeFeature].description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge className={`bg-${features[activeFeature].color} text-white`}>
                    Interactive & Fun
                  </Badge>
                  
                  <Link href="/play">
                    <Button className={`bg-${features[activeFeature].color} hover:bg-${features[activeFeature].color}/90 text-white rounded-full`}>
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Why Choose Quest?</h3>
              
              <div className="space-y-6">
                <div className="quest-card">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-quest-coral-light rounded-xl">
                      <Users className="w-6 h-6 text-quest-coral" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">500+ Events</h4>
                      <p className="text-gray-600">Successful celebrations worldwide</p>
                    </div>
                  </div>
                </div>

                <div className="quest-card">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-quest-purple-light rounded-xl">
                      <Trophy className="w-6 h-6 text-quest-purple" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">95% Satisfaction</h4>
                      <p className="text-gray-600">Guests love the interactive experience</p>
                    </div>
                  </div>
                </div>

                <div className="quest-card">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-quest-yellow-light rounded-xl">
                      <Smartphone className="w-6 h-6 text-quest-yellow" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">No App Required</h4>
                      <p className="text-gray-600">Works instantly on any device</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section id="demo" className="py-20 bg-gradient-to-r from-quest-coral via-quest-purple to-quest-yellow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Magic?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Try our interactive wedding quest demo and see how it transforms events into unforgettable adventures.
            </p>
            <Link href="/play">
              <Button 
                size="lg"
                className="bg-white text-quest-purple hover:bg-gray-100 rounded-full px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Demo Quest Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from real celebrations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="quest-card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-quest-yellow text-quest-yellow" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold quest-gradient bg-clip-text text-transparent mb-4">Quest</h3>
          <p className="text-gray-400 mb-8">Transform your events into interactive adventures</p>
          
          <Link href="/play">
            <Button className="bg-quest-coral hover:bg-quest-coral/90 text-white rounded-full px-8 py-3">
              Try Demo Quest
            </Button>
          </Link>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
            <p>&copy; 2024 Quest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

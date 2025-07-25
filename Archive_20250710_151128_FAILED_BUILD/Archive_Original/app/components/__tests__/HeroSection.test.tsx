import { render, screen, fireEvent } from '@testing-library/react'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders hero content correctly', () => {
    render(<HeroSection />)
    
    // Check main heading
    expect(screen.getByText('Transforming Human Potential into Business Reality')).toBeInTheDocument()
    
    // Check subheading
    expect(screen.getByText('AI-Driven Consulting for Visionary Leaders')).toBeInTheDocument()
    
    // Check description
    expect(screen.getByText(/Smart Factory is the premier AI and technology consulting partner/)).toBeInTheDocument()
    
    // Check CTA buttons
    expect(screen.getByText('Talk to a Smart Architect™')).toBeInTheDocument()
    expect(screen.getByText('Explore Our Services')).toBeInTheDocument()
  })

  it('handles smooth scrolling when CTA buttons are clicked', () => {
    render(<HeroSection />)
    
    // Test primary CTA
    const primaryCTA = screen.getByText('Talk to a Smart Architect™')
    fireEvent.click(primaryCTA)
    expect(window.scrollTo).toHaveBeenCalled()
    
    // Reset mock
    jest.clearAllMocks()
    
    // Test secondary CTA
    const secondaryCTA = screen.getByText('Explore Our Services')
    fireEvent.click(secondaryCTA)
    expect(window.scrollTo).toHaveBeenCalled()
  })

  it('adds visible class when scrolled into view', () => {
    render(<HeroSection />)
    
    const hero = screen.getByRole('banner')
    expect(hero).not.toHaveClass('visible')
    
    // Simulate intersection observer
    const observerCallback = (window as any).IntersectionObserver.mock.calls[0][0]
    observerCallback([{ isIntersecting: true, target: hero }])
    
    expect(hero).toHaveClass('visible')
  })
}) 
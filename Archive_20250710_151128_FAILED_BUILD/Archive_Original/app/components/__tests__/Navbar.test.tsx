import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders all navigation items', () => {
    render(<Navbar />)
    
    // Check if all navigation items are present
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('AI Accelerator')).toBeInTheDocument()
    expect(screen.getByText('Method')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    const navItems = screen.getByRole('list')
    
    // Menu should be closed initially
    expect(navItems).not.toHaveClass('open')
    
    // Click menu button
    fireEvent.click(menuButton)
    
    // Menu should be open
    expect(navItems).toHaveClass('open')
    
    // Click menu button again
    fireEvent.click(menuButton)
    
    // Menu should be closed
    expect(navItems).not.toHaveClass('open')
  })

  it('handles smooth scrolling when navigation items are clicked', () => {
    render(<Navbar />)
    
    const aboutLink = screen.getByText('About')
    fireEvent.click(aboutLink)
    
    // Check if scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled()
  })
}) 
describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display all main sections', () => {
    // Check if all main sections are present
    cy.get('section#hero').should('be.visible')
    cy.get('section#about').should('be.visible')
    cy.get('section#services').should('be.visible')
    cy.get('section#ai-accelerator').should('be.visible')
    cy.get('section#method').should('be.visible')
    cy.get('section#results').should('be.visible')
    cy.get('section#team').should('be.visible')
    cy.get('section#social').should('be.visible')
    cy.get('section#contact').should('be.visible')
  })

  it('should have working navigation', () => {
    // Test navigation links
    cy.get('nav a').each(($link) => {
      const href = $link.attr('href')
      if (href && href.startsWith('#')) {
        cy.wrap($link).click()
        cy.url().should('include', href)
        cy.get(href).should('be.visible')
      }
    })
  })

  it('should have responsive design', () => {
    // Test mobile view
    cy.viewport('iphone-6')
    cy.get('nav').should('be.visible')
    
    // Test tablet view
    cy.viewport('ipad-2')
    cy.get('nav').should('be.visible')
    
    // Test desktop view
    cy.viewport(1920, 1080)
    cy.get('nav').should('be.visible')
  })
}) 
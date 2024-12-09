describe('Portfolio app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  });

  it('About page can be opened', function () {
    cy.contains('Tietoa')
    cy.contains('Neljännen vuoden tieto- ja viestintätekniikan opiskelija. Kiinnostunut videopelien pelaamisesta sekä ohjelmoinnista 😊.')
  })

  it('Education page can be opened', function () {
    cy.get('#education').click()
    cy.contains('Tieto- ja viestintätekniikan opiskelija, insinööri')
    cy.contains('Tieto- ja viestintätekniikalla viitataan tietojen muokkaamiseen, tallentamiseen ja hakemiseen tietokoneiden ja digitaalisen viestinnän avulla.')
  })

  it('Github page can be opened', function () {
    cy.get('#github').click()
    cy.contains('Information and technology student. Mostly interested in JavaScript, Kotlin, Python and C# programming languages.')
    cy.contains('An open source portfolio made in React that uses TypeScript and MUI.')
  })

  it('Contact page can be opened', function () {
    cy.get('#contact').click()
    cy.get('#from_name').type('Test')
    cy.get('#from_email').type('Test')
    cy.get('#message').type('Test')
    cy.get('#message_button').click()
    cy.contains('Sähköpostiosoite ei kelpaa')
  })

  it('Link page can be opened', function () {
    cy.get('#links').click()
    cy.contains('Github')
    cy.contains('Sähköposti')
  })
});
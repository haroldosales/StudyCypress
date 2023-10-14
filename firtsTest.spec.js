/// <reference types="cypress" />



describe('Our first suite', () => {


  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    //by Tag Name
    cy.get('input')
    // by IDss
    cy.get('#inputEmail1')
    //by Class name
    cy.get('.input-full-width')

    //by attribute name
    cy.get('[placeholder]')
sas
    //by attrute name and value
    cy.get('[placeholder="Email"]')

    // by Class
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by tagName adn attrinute with value
    cy.get('input[placeholder="Email"]')

    //by two diferent attribute
    cy.get('[placeholder="Email"][type="email"]')

    //The most recommendded way by Cypress
    cy.get('[data-cy="imputEmail1"]')
  })

  it('secont test',() =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signButton"]')

    cy.contains("Sign in")
    cy.contains('[ng-reflect-status="warning"]','Sign in')

    cy.get('#inputEmail3')
          .parents('form')
          .find('button')
          .should('contain','Sign in')
          .parents('form').
          find('nb-checkbox').click()

    cy.contains('nb-card','Horizontal form').find('[type="email"]')


  })

  it('than and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

    //using jquery functions
    cy.contains('nb-card', 'Using the Grid').then( (firstForm) => {
      const labelEmail = firstForm.find('[for="inputEmail1"]').text()
      const labelPassword = firstForm.find('[for="inputPassword2"]').text()
      expect(labelEmail).to.equal('Email')
      expect(labelPassword).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then( (secondForm) => {
        const emailLabel = secondForm.find('[for="exampleInputEmail1"]').text()
      const passwordLabel = secondForm.find('[for="exampleInputPassword1"]').text()
      expect(emailLabel).to.equal('Email address')
      //using method cypress style
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')

      })

    })

  })


  //command invoke
  it('than and invokw methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address')
    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3 using invok
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card','Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        // .should('contains', 'checked')
        .then(classValue => {
          expect(classValue).to.contain('checked')
        })
  })

  it('assert property', () => {

    function selectDayFromCurrent(day){
      let date = new Date();
      date.setDate(date.getDate()+ day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('default',{month: 'short'})
      let dateaAsssert = futureMonth+' '+futureDay+', '+ date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAtribute => {

        if(!dateAtribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        }else{
          cy.get('nb-calendar-day-picker').contains(futureDay).click()

        }
    })
    return dateaAsssert
    }





    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.contains('nb-card','Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
     let dateaAsssert = selectDayFromCurrent(1)

      cy.wrap(input).invoke('prop', 'value').should('contains',dateaAsssert )
    })

  })

  it('raio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()


    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButton => {
        cy.wrap(radioButton).first().check({force: true}).should("be.checked")

        cy.wrap(radioButton).eq(1).check({force: true})

        cy.wrap(radioButton).first().should('not.be.checked')

        cy.wrap(radioButton).eq(2).should('be.disabled')
    })


  })

  it('checker button', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    /*
      usando o check ele mais utilizado por types box,que voce pode selection varios ou apenas 1
      usando click ele deixar desmarcado o button check mas no raio button , funcionaria tambem,
    */
    //cy.get('[type="checkbox"]').check({force: true})
    // cy.get('[type="checkbox"]').eq(0).clik({force: true})
    cy.get('[type="checkbox"]').eq(0).check({force: true})

  })

  it('list and dropwdown',() => {
    cy.visit('/')

    //seection type
    /*
    cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Dark').click()
    cy.get('nav nb-select').should('contain','Dark')
    cy.get('nb-layout-header nav').should('have.css','background-color', 'rgb(34, 43, 69)')
   */

    //2
    cy.get('nav nb-select').then(dropwdon => {
      cy.wrap(dropwdon).click()
      cy.get('.options-list nb-option ').each( (listItem, index) =>  {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark":"rgb(34, 43, 69)",
          "Cosmic":"rgb(50, 50, 89)",
          "Corporate":"rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropwdon).should('contain',itemText)
        cy.get('nb-layout-header nav').should('have.css','background-color', colors[itemText])
        if(index < 3)
        {
          cy.wrap(dropwdon).click()

        }

      })
    })

  } )

  it.only(' Web tables',() => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    cy.get('tbody').contains('tr','Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('180')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6 ).should('contain','180')
    })

    cy.get('thead').find(".nb-plus").click()
    cy.get('thead').contains('th','Actions').then(tableAdd => {
      cy.wrap(tableAdd).get('td').find('[placeholder="ID"]').type('01')
      cy.wrap(tableAdd).get('td').find('[placeholder="First Name"]').type('yrd')
      cy.wrap(tableAdd).get('td').find('[placeholder="Last Name"]').type('ds')
      cy.wrap(tableAdd).get('td').find('[placeholder="Username"]').type('saasasa')
      cy.wrap(tableAdd).get('td').find('[placeholder="E-mail"]').type('dd@ddd.com')
      cy.wrap(tableAdd).get('td').find('[placeholder="Age"]').type('18')
      cy.wrap(tableAdd).get('td').find('.ng2-smart-action-add-create').click()


    })
    cy.get('thead').find(".nb-plus").click()
    cy.get('thead').contains('th','Actions').then(tableAdd => {
      cy.wrap(tableAdd).get('td').find('[placeholder="ID"]').type('01')
      cy.wrap(tableAdd).get('td').find('[placeholder="First Name"]').type('yrd')
      cy.wrap(tableAdd).get('td').find('[placeholder="Last Name"]').type('ds')
      cy.wrap(tableAdd).get('td').find('[placeholder="Username"]').type('saasasa')
      cy.wrap(tableAdd).get('td').find('[placeholder="E-mail"]').type('dd@ddd.com')
      cy.wrap(tableAdd).get('td').find('[placeholder="Age"]').type('18')
      cy.wrap(tableAdd).get('td').find('.ng2-smart-action-add-cancel').click()


    })
  })


})



describe('Calendar visible', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=calendar--basic&viewMode=story',
    );
  });

  it('should load the storybook page', () => {
    cy.url().should('include', 'calendar--basic');
  });

  it('renders the calendar with the current month and year', () => {
    const currentMonth = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    cy.get('h2').contains(`${currentMonth}`);
  });

  it('include a date in the calendar', () => {
    cy.get('.day-button').contains('15');
  });

  it('changes months correctly', () => {
    cy.get('[data-cy="next-month-button"]').click();
    cy.get('h2').contains(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString(
        'en-US',
        { month: 'long', year: 'numeric' },
      ),
    );

    cy.get('[data-cy="prev-month-button"]').click();
    cy.get('h2').contains(
      new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    );
  });
});

describe('Calendar Holidays and Weekends Tests', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=calendar--calendar-with-holidays&args=isShowWeekDays:!true',
    );
  });

  it('should display holidays correctly', () => {
    cy.get('.day-button')
      .contains('11')
      .should('exist')
      .and('have.class', 'holiday');
  });

  it('should display weekends in a different color', () => {
    cy.get('.day-button')
      .contains('12')
      .should('exist')
      .and('have.class', 'weekday');

    cy.get('.day-button')
      .contains('12')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  });
});

describe('Calendar with datapicker', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=calendar--calendar-with-datepicker&viewMode=story',
    );
  });

  it('enters a date manually in the input field', () => {
    const date = '01122024';
    cy.get('input[placeholder="Choose Date"]').type(date);
    cy.get('input[placeholder="Choose Date"]').should(
      'have.value',
      '01/12/2024',
    );

    cy.get('h2').contains('December 2024');
    cy.get('.day-button')
      .filter('.selected')
      .should('have.length', 1)
      .should('have.text', '1');
  });

  it('clears the date when clear button is clicked', () => {
    const date = '01122024';
    cy.get('input[placeholder="Choose Date"]').type(date);
    cy.get('[data-cy="clear-button"]').click();

    cy.get('input[placeholder="Choose Date"]').should('have.value', '');
  });
});

describe('Calendar with todo list', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=calendar--calendar-with-todo-list&viewMode=story',
    );
    cy.get('.day-button').contains('15').click();
  });

  it('should add a new task', () => {
    const taskName = 'New Task';

    cy.get('input[placeholder="Write task"]').type(taskName);
    cy.get('button[type="submit"]').click();

    cy.get('.task-item').should('contain.text', taskName);
  });

  it('should remove a task', () => {
    const taskName = 'Task to Remove';

    cy.get('input[placeholder="Write task"]').type(taskName);
    cy.get('button[type="submit"]').click();
    cy.get('.task-item').should('contain.text', taskName);
    cy.get('[data-testid="delete-task-button"]').first().click();
    cy.get('.task-item').should('not.exist');
  });

  it('should not add an empty task', () => {
    cy.get('input[placeholder="Write task"]').clear();
    cy.get('button[type="submit"]').click();

    cy.get('.task-item').should('have.length', 0);
  });
});

describe('Calendar with range', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=calendar--calendar-with-range-picker&viewMode=story',
    );
    cy.get('.day-button').contains('15').click();
  });

  it('should select a start date and an end date', () => {
    const nowYear = new Date().getFullYear();
    const startDate = `01/10/${nowYear}`;
    const endDate = `10/10/${nowYear}`;

    cy.get('.day-button').contains('1').click();
    cy.get('.day-button').contains('10').click();

    cy.get('label')
      .contains('From:')
      .find('input')
      .should('have.value', startDate);
    cy.get('label').contains('To:').find('input').should('have.value', endDate);
  });

  it('should adjust the end date if it is set before the start date', () => {
    const nowYear = new Date().getFullYear();
    const startDate = `01/10/${nowYear}`;
    const endDate = `10/10/${nowYear}`;

    cy.get('.day-button').contains('10').click();
    cy.get('.day-button').contains('1').click();

    cy.get('label')
      .contains('From:')
      .find('input')
      .should('have.value', startDate);
    cy.get('label').contains('To:').find('input').should('have.value', endDate);
  });

  it('should clear the date range when clicking the Clear button', () => {
    cy.get('.day-button').contains('1').click();

    cy.get('.day-button').contains('10').click();

    cy.get('button').contains('Clear').click();
    cy.get('label').contains('From:').find('input').should('have.value', '');
    cy.get('label').contains('To:').find('input').should('have.value', '');
  });
});

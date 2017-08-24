import { ReservasTuristicasPage } from './app.po';

describe('reservas-turisticas App', () => {
  let page: ReservasTuristicasPage;

  beforeEach(() => {
    page = new ReservasTuristicasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should create a succeeded scheduled Lightning Talk', () => {
    page.navigateTo();
    
    expect(page.hasLTStatusMessage()).toBeFalsy();
    page.getScheduleLightningTalkButton().click();

    expect(page.getSucceededLightningTalkScheduling()).toEqual('Sua Lightning Talk foi agendada para o dia 01/01/2020 às 15:00');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

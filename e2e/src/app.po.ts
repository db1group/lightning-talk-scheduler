import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getScheduleLightningTalkButton(): ElementFinder {
    return element(by.css('button.scheduling-button'));
  }

  getSucceededLightningTalkScheduling(): Promise<string> {
    return element(by.id('lt-status-message')).getText() as Promise<string>;
  }

  hasLTStatusMessage(): Promise<boolean> {
    return element(by.id('lt-status-message')).isPresent() as Promise<boolean>;
  }
}

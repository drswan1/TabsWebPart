import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import styles from './TabsWebPart.module.scss';
import * as strings from 'TabsWebPartStrings';

export interface ITabsWebPartProps {
  description: string;
}

export default class TabsWebPart extends BaseClientSideWebPart<ITabsWebPartProps> {
  private tabsHashMap: { [key: string]: string } = {
    orientiert: "https://labplusacat.sharepoint.com/sites/StudentPlace/Orientiert/",
    informiert: "https://labplusacat.sharepoint.com/sites/StudentPlace/Informiert/",
    verbunden: "https://labplusacat.sharepoint.com/sites/StudentPlace/Verbunden/",
  };

  private setSelectedTab(tabKey: string): void {
    // Remove 'selected' class from all tabs
    Object.keys(this.tabsHashMap).forEach((key) => {
      const tabElement = this.domElement.querySelector(`[data-tab="${key}"]`);
      if (tabElement) {
        tabElement.classList.remove(styles.selected);
        tabElement.classList.add(styles.notSelected);
      }
    });

    // Add 'selected' class to the specified tab
    const selectedTabElement = this.domElement.querySelector(`[data-tab="${tabKey}"]`);
    if (selectedTabElement) {
      selectedTabElement.classList.remove(styles.notSelected);
      selectedTabElement.classList.add(styles.selected);
    }
  }

  private getCurrentTabKey(currentURL: string): string | undefined {
    // Find the key corresponding to the current URL
    return Object.keys(this.tabsHashMap).find((key: string) => this.tabsHashMap[key] === currentURL);
  }

  public render(): void {
    if (typeof window !== 'undefined') {
      const currentURL = window.location.href;

    // Find the key for the current URL
    const currentTabKey = this.getCurrentTabKey(currentURL);

    // Update the class name based on the current tab key
    if (currentTabKey) {
      this.setSelectedTab(currentTabKey);
    }

    // Render the HTML
    this.domElement.innerHTML = `
    <section class="${styles.tabs} ">
    <div class="${styles.container}">
      <!-- Add an ID to each div for easy selection in TypeScript/JavaScript -->
      <a href="${this.tabsHashMap.orientiert}" data-tab="orientiert" class="${currentTabKey === 'orientiert' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Orientiert.png')}" />
          <div> Orientiert </div>
        </div>
      </a>
      <a href="${this.tabsHashMap.informiert}" data-tab="informiert" class="${currentTabKey === 'informiert' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Informiert.svg')}" />
          <div> Informiert </div>
        </div>
      </a>
      <a href="${this.tabsHashMap.verbunden}" data-tab="verbunden" class="${currentTabKey === 'verbunden' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Verbunden.svg')}" /> 
          <div> Verbunden </div>
        </div>
      </a>
    </div>
  </section>`;
  }
}

 

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

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
    orientiert: "https://twhrg.sharepoint.com/Orientiert/SitePages/Home.aspx",
    informiert: "https://twhrg.sharepoint.com/Informiert/SitePages/Home.aspx",
    verbunden: "https://twhrg.sharepoint.com/Verbunden/SitePages/Home.aspx",
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

      

     

      
      <div class="${styles.marker}">
        <div id="${styles.left}"><a href="${this.tabsHashMap.orientiert}" data-tab="orientiert" class="${currentTabKey === 'orientiert' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Orientiert.png')}" />
          <div id="${styles.siteName}"> Orientiert </div>
        </div>
      </a></div>
        <div id="${styles.middle}"> <a href="${this.tabsHashMap.informiert}" data-tab="informiert" class="${currentTabKey === 'informiert' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Informiert.svg')}" />
          <div id="${styles.siteName}"> Informiert </div>
        </div>
      </a></div>
        <div id="${styles.right}"><a href="${this.tabsHashMap.verbunden}" data-tab="verbunden" class="${currentTabKey === 'verbunden' ? styles.selected : styles.notSelected}">
        <div class="${styles.content}">
          <img class="${styles.icons}" src="${require('./assets/Verbunden.svg')}" /> 
          <div id="${styles.siteName}"> Verbunden </div>
        </div>
      </a></div>
    </div>
  </div>
  </section>`;
  console.log(currentTabKey);

  const leftMarker = document.getElementById(styles.left);
  const middleMarker = document.getElementById(styles.middle);
  const rightMarker = document.getElementById(styles.right);

  if (currentTabKey === 'orientiert') {
    (leftMarker as HTMLElement).style.borderTop = "3px solid #c4c4c4";
    (leftMarker as HTMLElement).style.borderRadius = "32px";
    (leftMarker as HTMLElement).style.width = "calc(50%)";
    (leftMarker as HTMLElement).style.justifyContent = "center";
    

    (middleMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (middleMarker as HTMLElement).style.borderBottomLeftRadius = "32px";
    (middleMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (middleMarker as HTMLElement).style.width = "calc(50%)";
    (middleMarker as HTMLElement).style.justifyContent = "center";

    (rightMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (rightMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (rightMarker as HTMLElement).style.width = "calc(50%)";
    (rightMarker	 as HTMLElement).style.justifyContent = "center";
    console.log('orientiert');
  }

  if (currentTabKey === 'informiert') {
    (leftMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (leftMarker as HTMLElement).style.borderBottomRightRadius = "32px";
    (leftMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (leftMarker as HTMLElement).style.width = "calc(50%)";
    (leftMarker as HTMLElement).style.justifyContent = "center";

    (middleMarker as HTMLElement).style.borderTop = "3px solid #c4c4c4";
    (middleMarker as HTMLElement).style.borderRadius = "32px";
    (middleMarker as HTMLElement).style.width = "calc(50%)";
    (middleMarker as HTMLElement).style.justifyContent = "center";

    (rightMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (rightMarker as HTMLElement).style.borderBottomLeftRadius = "32px";
    (rightMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (rightMarker as HTMLElement).style.width = "calc(50%)";
    (rightMarker	 as HTMLElement).style.justifyContent = "center";
    console.log('informiert');
  }

  if (currentTabKey === 'verbunden') {
    (leftMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (leftMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (leftMarker as HTMLElement).style.width = "calc(50%)";
    (leftMarker as HTMLElement).style.justifyContent = "center";

    (middleMarker as HTMLElement).style.borderBottom = "2px solid #c4c4c4";
    (middleMarker as HTMLElement).style.borderBottomRightRadius = "32px";
    (middleMarker as HTMLElement).style.boxShadow = "0px 15px 36px -20px #e7e7e7";
    (middleMarker as HTMLElement).style.width = "calc(50%)";
    (middleMarker as HTMLElement).style.justifyContent = "center";

    (rightMarker as HTMLElement).style.borderTop = "3px solid #c4c4c4";
    (rightMarker as HTMLElement).style.borderRadius = "32px";
    (rightMarker as HTMLElement).style.width = "calc(50%)";
    (rightMarker	 as HTMLElement).style.justifyContent = "center";
    console.log('verbunden');
  }
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

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
  public render(): void {

    // Render the HTML
    this.domElement.innerHTML = `

    <section>
         <div class="${styles.container}">
        <input type="radio" id="${styles.orientiert}" name="option" value="orientiert">
        <label class="${styles.box}" for="orientiert">
        <a href="${'https://plusacat.sharepoint.com/sites/StudentPlace/Orientiert'}">
            <img class=${styles.logo} src="${require('./assets/Orientiert.png')}" alt="Orientiert">
            <h1>Orientiert</h1>
        </a>
        </label>
        
        <input type="radio" id="${styles.informiert}" name="option" value="informiert">
        <label class="${styles.box}" for="informiert">
          <a href="${'https://plusacat.sharepoint.com/sites/StudentPlace/Informiert'}">
            <img class=${styles.logo} src="${require('./assets/Informiert.svg')}" alt="Informiert">
            <h1>Informiert</h1>
          </a>
        </label>
        <input type="radio" id="${styles.verbunden}" name="option" value="verbunden">
        <label class="${styles.box}" for="verbunden">
          <a href="${'https://plusacat.sharepoint.com/sites/StudentPlace/Verbunden'}">
            <img class=${styles.logo} src="${require('./assets/Verbunden.svg')}" alt="Verbunden">
            <h1>Verbunden</h1>
          </a>
        </label>
    </div>
  </section>`;

this.checkRadioButton();
// this. cssSelector();
  }

  private checkRadioButton(): void {
    const OrientiertUrl = 'https://plusacat.sharepoint.com/sites/StudentPlace/Orientiert';
    const InformiertUrl = 'https://plusacat.sharepoint.com/sites/StudentPlace/Informiert';
    const VerbundenUrl = 'https://plusacat.sharepoint.com/sites/StudentPlace/Verbunden';

    if (window.location.href.includes(OrientiertUrl)) {
        const orientiertRadio = document.getElementById(styles.orientiert) as HTMLInputElement;
        if (orientiertRadio) {
            orientiertRadio.checked = true;
        }
    }

    if (window.location.href.includes(InformiertUrl)) {
        const informiertRadio = document.getElementById(styles.informiert) as HTMLInputElement;
        if (informiertRadio) {
            informiertRadio.checked = true;
        }
    }

    if (window.location.href.includes(VerbundenUrl)) {
        const verbundenRadio = document.getElementById(styles.verbunden) as HTMLInputElement;
        if (verbundenRadio) {
            verbundenRadio.checked = true;
        }
    }
}

// private cssSelector(): void {
//   document.querySelectorAll('input[type="radio"]').forEach((radio) => {
//       radio.addEventListener('change', () => {
//           const orientiertLabel = document.querySelector(`label[for="${styles.orientiert}"]`) as HTMLElement;
//           const informiertLabel = document.querySelector(`label[for="${styles.informiert}"]`) as HTMLElement;
//           const verbundenLabel = document.querySelector(`label[for="${styles.verbunden}"]`) as HTMLElement;

//           // Reset border radius
//           if (orientiertLabel) orientiertLabel.style.borderBottomRightRadius = '';
//           if (informiertLabel) {
//               informiertLabel.style.borderBottomLeftRadius = '';
//               informiertLabel.style.borderBottomRightRadius = '';
//           }
//           if (verbundenLabel) verbundenLabel.style.borderBottomLeftRadius = '';

//           if ((document.getElementById(styles.informiert) as HTMLInputElement).checked) {
//               if (orientiertLabel) orientiertLabel.style.borderBottomRightRadius = '26px';
//               if (verbundenLabel) verbundenLabel.style.borderBottomLeftRadius = '26px';
//           }
//           if ((document.getElementById(styles.verbunden) as HTMLInputElement).checked) {
//               if (informiertLabel) informiertLabel.style.borderBottomRightRadius = '26px';
//           }
//           if ((document.getElementById(styles.orientiert) as HTMLInputElement).checked) {
//               if (informiertLabel) informiertLabel.style.borderBottomLeftRadius = '26px';
//           }
//       });
//   });
// }

 

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

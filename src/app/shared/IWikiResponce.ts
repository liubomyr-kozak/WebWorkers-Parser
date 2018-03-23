import { IWikiLinks } from "./IWikiLinks";

export interface IWikiResponce {
  parse: {
    categories: any[],
    displaytitle: string,
    externallinks: string[],
    images: string[],
    iwlinks: any[],
    langlinks: any[],
    links: IWikiLinks [],
    pageid: number,
    parsewarnings: any[],
    properties: any[],
    revid: number,
    sections: any[],
    templates: any[],
    text: {
      '*': string
    },
    title: string,
  }
};
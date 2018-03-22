import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map'

import * as parseWorker from './parse-page.worker';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
// const PARAMS = new HttpParams({
//   fromObject: {
//     action: 'parse',
//     format: 'json',
//     origin: '*'
//   }
// });


// export interface WikiLinks {
//   '*': string,
//   exists: string,
//   ns: number
// }

// export interface WikiResponce {
//   parse: {
//     categories: any[],
//     displaytitle: string,
//     externallinks: string[],
//     images: string[],
//     iwlinks: any[],
//     langlinks: any[],
//     links: WikiLinks[],
//     pageid: number,
//     parsewarnings: any[],
//     properties: any[],
//     revid: number,
//     sections: any[],
//     templates: any[],
//     text: {
//       '*': string
//     },
//     title: string,
//   }
// };



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  links = [];
  private worker: Worker

  constructor(private http: HttpClient) {
    this.initWebWorker();
  }

  ngOnInit() {
    this.worker.postMessage({
      URL: this.createWikiLink('Europe')
    })
  }

  private createWikiLink(page) {
    return `${WIKI_URL}?origin=*&page=${page}&format=json&action=parse`;
  }
  private initWebWorker() {

    let blob = new Blob(['(this.onmessage=', parseWorker.worker.toString(), ')'], { type: "text/javascript" });
    this.worker = new Worker((<any>window).URL.createObjectURL(blob));

    this.worker.onmessage = (e) => {



      if (e.data.index >= 0) {
        this.links[e.data.index] = e.data.result.parse.links.map((link) => {
          if (link.ns == 0) {
            return {
              title: link['*'],
              ref: []
            }
          }
        })
      } else {
        this.links = e.data.result.parse.links.map((link) => {
          if (link.ns == 0) {
            return {
              title: link['*'],
              ref: []
            }
          }
        })

        this.links.forEach((link, index) => {

          // this.worker.postMessage({
          //   URL: this.createWikiLink(link.title),
          //   index
          // })
        })
      }
    };
  }
}


// this.http
//       .get(WIKI_URL, {
//         params: {
//           action: 'query',
//           format: 'json',
//           origin: '*',
//           titles: 'Europe'
//         }
//       })
//       .map((res) => {

//         const parser: DOMParser = new DOMParser();
//         const htmlDoc = parser.parseFromString(res.text(), "text/html");
//         const DomEl: NodeListOf<HTMLAnchorElement> = htmlDoc.getElementsByTagName('a')
//         let LinkUrl: {}[] = [];

//         for (let index = 0; index < DomEl.length; index++) {
//           LinkUrl.push({
//             link: DomEl[index].href,
//             text: DomEl[index].text
//           });
//         }

//         debugger

//       })
//       .subscribe((res) => {
//         // console.log(res)
//       });



// const parser: DOMParser = new DOMParser();
        // const htmlDoc = parser.parseFromString(response['parse'].text["*"], "text/html");
        // const DomEl: NodeListOf<HTMLAnchorElement> = htmlDoc.getElementsByTagName('a')
        // let LinkUrl: {}[] = [];

        // for (let index = 0; index < DomEl.length; index++) {
        //   LinkUrl.push({
        //     link: DomEl[index].href,
        //     text: DomEl[index].text
        //   });
        // }
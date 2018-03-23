import { Component, OnInit } from '@angular/core';
import "rxjs/Rx";
import 'rxjs/add/operator/debounceTime';

import * as parseWorker from './parse-page.worker';
import { FormControl } from '@angular/forms';

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


interface LinksList {
  title: string,
  ref: LinksList[],
  isRefHidden: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  links:LinksList[] = [];
  searchDeepValue:FormControl = new FormControl(50);

  private worker: Worker

  constructor() {
    this.initWebWorker();
  }

  ngOnInit() {
   
    this.worker.postMessage({
      URL: this.createWikiLink('Europe'),
      title: 'Europe'
    })

    this.searchDeepValue.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(newValue => {
        this.links.length = 0;
        // this.progressbar.valuePragrass = 0;
        // this.progressbar.compliteIndex = 0;
        this.worker.postMessage({
          URL: this.createWikiLink('Europe'),
          title: 'Europe'
        })
      });
  }

  private createWikiLink(page) {
    return `${WIKI_URL}?origin=*&page=${page}&format=json&action=parse`;
  }
  private initWebWorker() {

    let blob = new Blob(['(this.onmessage=', parseWorker.worker.toString(), ')'], { type: 'application/javascript; charset=utf-8' });
    this.worker = new Worker((<any>window).URL.createObjectURL(blob));


    this.worker.onmessage = (e) => {
      // this.progressbar.compliteLoad();

      if (!e.data.result.parse) {
        console.log(e.data.result.parse);
        return;
      }

      // this.progressbar.loaderElementName = e.data.result.parse.title;

      if (e.data.index >= 0) {
    
        // this.progressbar.valuePragrass = (this.progressbar.getComplitedLoadIndex() * 100) / this.links.length - 1;


        this.links[e.data.index].ref = e.data.result.parse.links
          .filter((refLink, ind) => refLink.ns == 0)
          .map(refLink => {
            return {
              title: refLink['*'],
              ref: [],
            }
          })

      } else {
        // this.progressbar.valuePragrass = 100;

        this.links = e.data.result.parse.links
          .filter((link, ind) => link.ns == 0 && ind < this.searchDeepValue.value)
          .map((link, ind, arr) => {
            return {
              title: link['*'],
              ref: [],
              isRefHidden: false
            }
          });

        this.links.forEach((link, index) => {
          setTimeout(() => {
            this.worker.postMessage({
              URL: this.createWikiLink(link.title),
              index,
              title: link.title
            })
          }, 0)
        })
      }
    };
  }

  toggleDropdown(list) {
    list.isRefHidden = !list.isRefHidden;
  }
}
import { Component, OnInit } from '@angular/core';
import "rxjs/Rx";
import 'rxjs/add/operator/debounceTime';


import { FormControl } from '@angular/forms';
import { WebWorkerService } from './shared/web-worker.service';
import { ProgressbarService } from './common/progressbar/progressbar.service';
import { ILinksList } from './ILinksList';


const WIKI_URL = 'https://en.wikipedia.org/w/api.php';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  links: ILinksList [] = [];
  searchDeepValue: FormControl = new FormControl(50);

  constructor(
    private worker: WebWorkerService,
    private progressbar: ProgressbarService
  ) {}

  ngOnInit() {
    this.worker.initWebWorker(this.webWorkerCallback.bind(this));
    this.runWebWorker('Europe')

    this.searchDeepValue.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(newValue => {
        this.links.length = 0;
        this.progressbar.init();
        this.runWebWorker('Europe')
      });
  }

  private createWikiLink(page) {
    return `${WIKI_URL}?origin=*&page=${page}&format=json&action=parse`;
  }

  private createLinkItem(title) {
    return {
      title: title,
      ref: [],
      isRefHidden: false
    }
  }

  runWebWorker(pageName) {
    this.worker.postMessage({
      URL: this.createWikiLink('Europe'),
      title: 'Europe'
    })
  }

  webWorkerCallback(workerEvent) {
    if (!workerEvent.data.result.parse) {

      this.progressbar.complite();
      // console.log(workerEvent.data.result);
      return;
    }
    if (workerEvent.data.index >= 0) {

      this.progressbar.emitProgress(workerEvent.data.result.parse.title);

      if(!this.links[workerEvent.data.index]){
        // Todo ned fix
        return 
      }

      this.links[workerEvent.data.index].ref = workerEvent.data.result.parse.links
        .filter((refLink, ind) => refLink.ns == 0)
        .map(refLink => this.createLinkItem(refLink['*']))

    } else {

      this.progressbar.complite();

      this.links = workerEvent.data.result.parse.links
        .filter((link, ind) => link.ns == 0 && ind < this.searchDeepValue.value)
        .map(link => this.createLinkItem(link['*']));

      this.progressbar.init(this.links.length - 1);

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
  }


  toggleDropdown(list) {
    list.isRefHidden = !list.isRefHidden;
  }
}
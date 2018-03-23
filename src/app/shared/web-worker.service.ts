import { Injectable } from '@angular/core';
import * as parseWorker from './parse-page.worker';

@Injectable()
export class WebWorkerService {
  private worker: Worker

  constructor() { }

  initWebWorker(eventFn) {
    let blob = new Blob(['(this.onmessage=', parseWorker.worker.toString(), ')'], { type: 'application/javascript; charset=utf-8' });
    this.worker = new Worker((<any>window).URL.createObjectURL(blob));

    this.worker.onmessage = eventFn
  }
  postMessage(data){
    this.worker.postMessage(data);
  }
}

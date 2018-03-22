import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map'


const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'parse',
    format: 'json',
    origin: '*'
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  private worker: Worker

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http
      .get(WIKI_URL, { params: PARAMS.set('page', 'Europe') })
      .subscribe((res) => {
        console.log(res)
      });

  }

  private initWebWorker() {
    this.worker = new Worker('GetLinks.webworker.js')

    this.worker.addEventListener('message', (e: MessageEvent) => {
      console.log(e);
    })
  }
}

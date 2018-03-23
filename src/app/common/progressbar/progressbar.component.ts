import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  progressbar: any = {};
  constructor() { 
    this.progressbar.compliteLoad = () => {
      this.progressbar.compliteIndex++;
    }
    this.progressbar.compliteIndex = 0;
    this.progressbar.getComplitedLoadIndex = () => {
      return this.progressbar.compliteIndex;
    }

  }

  ngOnInit() {
    this.progressbar.valuePragrass = 0;
  }

}

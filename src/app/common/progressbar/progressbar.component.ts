import { Component, OnInit } from '@angular/core';
import { ProgressbarService } from './progressbar.service';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})

export class ProgressbarComponent implements OnInit {
  progressbar: any = {};
  get isHidden(): boolean {
    return this.service.isHidden;
  }

  get title(): string {
    return this.service.title;
  }
  get value(): number {
    return this.service.value;
  }

  constructor(private service: ProgressbarService) {
  }

  ngOnInit() {

  }
}

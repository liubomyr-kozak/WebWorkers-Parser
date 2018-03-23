import { Injectable } from '@angular/core';

@Injectable()
export class ProgressbarService {

  isHidden: boolean = true;
  title: string = '';
  value: number = 100;

  currentIndex: number;
  lastIndex: number;

  isProgressInited:boolean  = false;
  constructor() {
  }

  hide() {
    this.isHidden = true;
  }

  show() {
    this.isHidden = false;
  }

  emitProgress(title){
    if(!this.isProgressInited) return 
    this.title = title;
    this.currentIndex++;

    this.updateProgress();
  }

  init(lastIndex?){
    this.isProgressInited = true;
    this.currentIndex = 0;
    this.lastIndex = lastIndex
    this.show();
  }
  
  complite(){
    this.currentIndex = 100;
    this.value = 100;
    this.title = 'Complite';
    this.isProgressInited  = false;
    this.hide()
  }

  updateProgress(){
    this.value = Math.round((this.currentIndex * 100) / this.lastIndex);

    if(this.currentIndex == this.lastIndex){
      this.complite();
    }
  }
}

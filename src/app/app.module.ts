import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProgressbarComponent } from './common/progressbar/progressbar.component';
import { WebWorkerService } from './shared/web-worker.service';
import { ProgressbarService } from './common/progressbar/progressbar.service';

@NgModule({
  declarations: [
    AppComponent,
    ProgressbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WebWorkerService, ProgressbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

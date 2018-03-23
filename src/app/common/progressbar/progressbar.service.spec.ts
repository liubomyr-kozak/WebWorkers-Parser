import { TestBed, inject } from '@angular/core/testing';

import { ProgressbarService } from './progressbar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressbarComponent } from './progressbar.component';

describe('ProgressbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProgressbarComponent
      ],
      providers: [ProgressbarService],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
  });

  it('should be created', inject([ProgressbarService], (service: ProgressbarService) => {
    expect(service).toBeTruthy();
  }));
});

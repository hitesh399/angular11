import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [FeedbackComponent, TestComponent],
  imports: [
  CommonModule,
    ReactiveFormsModule,
    FeedbackRoutingModule,
    SharedModule
  ],
  exports: [
    // FeedbackRoutingModule,
    // FeedbackComponent
  ],
})
export class FeedbackModule {}

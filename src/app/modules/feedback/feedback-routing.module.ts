import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewfeedback', pathMatch: 'full' },
  { path: 'viewfeedback', component: FeedbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class FeedbackRoutingModule {}

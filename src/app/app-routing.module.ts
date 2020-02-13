import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulingPanelComponent } from './scheduling-panel/scheduling-panel.component';


const routes: Routes = [
  {path: 'scheduling-panel', component: SchedulingPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

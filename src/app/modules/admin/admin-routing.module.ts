import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from 'src/app/components/admin/adminhome/adminhome.component';
import { FakulteislemleriComponent } from 'src/app/components/admin/fakulteislemleri/fakulteislemleri.component';


const routes: Routes = [
  { path: "", component: AdminhomeComponent },
  { path: "fakulteislemleri", component: FakulteislemleriComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

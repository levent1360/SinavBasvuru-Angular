import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminhomeComponent } from 'src/app/components/admin/adminhome/adminhome.component';
import { FakulteislemleriComponent } from 'src/app/components/admin/fakulteislemleri/fakulteislemleri.component';
import { AppMaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppMaterialModule
  ]
})
export class AdminModule { }

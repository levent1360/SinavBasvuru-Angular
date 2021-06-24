import { BasvurularimComponent } from './components/ogrenci/basvurularim/basvurularim.component';
import { OgrencidetayComponent } from './components/ogrenci/ogrencidetay/ogrencidetay.component';
import { OgrencianasayfaComponent } from './components/ogrenci/ogrencianasayfa/ogrencianasayfa.component';
import { OgrenciGuard } from './guards/ogrenci.guard';
import { OgrencisidenavComponent } from './components/ogrenci/ogrencisidenav/ogrencisidenav.component';
import { BasvuruislemleriComponent } from './components/admin/basvuruislemleri/basvuruislemleri.component';
import { KullanicidetayComponent } from './components/admin/kullaniciislemleri/kullanicidetay/kullanicidetay.component';
import { KullaniciislemleriComponent } from './components/admin/kullaniciislemleri/kullaniciislemleri.component';
import { SinavdetayComponent } from './components/admin/sinavislemleri/sinavdetay/sinavdetay.component';
import { SinavislemleriComponent } from './components/admin/sinavislemleri/sinavislemleri.component';
import { DerslikislemleriComponent } from './components/admin/derslikislemleri/derslikislemleri.component';
import { AdminsidenavComponent } from './components/admin/adminsidenav/adminsidenav.component';
import { FakulteislemleriComponent } from './components/admin/fakulteislemleri/fakulteislemleri.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path: "admin", component:AdminsidenavComponent, children:[
    {path:"fakulteislemleri", component:FakulteislemleriComponent},
    {path:"derslikislemleri/:id", component:DerslikislemleriComponent},
    {path:"sinavislemleri", component:SinavislemleriComponent},
    {path:"sinavdetay/:sinavid",component:SinavdetayComponent},
    {path:"kullaniciislemleri", component:KullaniciislemleriComponent},
    {path:"kullanicidetay/:oeid", component:KullanicidetayComponent},
    {path:"basvuruislemleri", component:BasvuruislemleriComponent},
    {path:"", component:AdminhomeComponent}
  ]},
  {path:"ogrenci",component:OgrencisidenavComponent, canActivate:[OgrenciGuard], children:[
    {path:"", component:OgrencianasayfaComponent},
    {path:"ogrencidetay", component:OgrencidetayComponent},
    {path:"basvurularim", component:BasvurularimComponent}
  ]},
  {path:"**", redirectTo:"",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

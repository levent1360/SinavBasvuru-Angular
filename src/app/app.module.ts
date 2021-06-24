import { OgrencibasvuruiptalComponent } from './components/ogrenci/ogrencidialoglar/ogrencibasvuruiptal/ogrencibasvuruiptal.component';
import { GirisyapDialogComponent } from './components/admin/dialogs/girisyap-dialog/girisyap-dialog.component';
import { OgrencicikisyapdialogComponent } from './components/ogrenci/ogrencidialoglar/ogrencicikisyapdialog/ogrencicikisyapdialog.component';
import { OgrencibasvurudialogComponent } from './components/ogrenci/ogrencidialoglar/ogrencibasvurudialog/ogrencibasvurudialog.component';
import { SinavDialog2Component } from './components/admin/dialogs/sinav-dialog-2/sinav-dialog-2.component';
import { KullanicidetayComponent } from './components/admin/kullaniciislemleri/kullanicidetay/kullanicidetay.component';
import { KullaniciDialogComponent } from './components/admin/dialogs/kullanici-dialog/kullanici-dialog.component';
import { SinavdetayComponent } from './components/admin/sinavislemleri/sinavdetay/sinavdetay.component';
import { SinavDialogComponent } from './components/admin/dialogs/sinav-dialog/sinav-dialog.component';
import { DialogService } from './sevices/dialog.service';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { FakulteislemleriComponent } from './components/admin/fakulteislemleri/fakulteislemleri.component';
import { AdminsidenavComponent } from './components/admin/adminsidenav/adminsidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FDialogComponent } from './components/admin/dialogs/f-dialog/f-dialog.component';
import { ServisService } from './sevices/servis.service';
import { DerslikislemleriComponent } from './components/admin/derslikislemleri/derslikislemleri.component';
import { DerslikDialogComponent } from './components/admin/dialogs/derslik-dialog/derslik-dialog.component';
import { SinavislemleriComponent } from './components/admin/sinavislemleri/sinavislemleri.component';
import { KullaniciislemleriComponent } from './components/admin/kullaniciislemleri/kullaniciislemleri.component';
import { BasvuruislemleriComponent } from './components/admin/basvuruislemleri/basvuruislemleri.component';
import { OgrencisidenavComponent } from './components/ogrenci/ogrencisidenav/ogrencisidenav.component';
import { OgrencianasayfaComponent } from './components/ogrenci/ogrencianasayfa/ogrencianasayfa.component';
import { OgrencidetayComponent } from './components/ogrenci/ogrencidetay/ogrencidetay.component';
import { BasvurularimComponent } from './components/ogrenci/basvurularim/basvurularim.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,

    //Admin Components
    AdminhomeComponent,
    FakulteislemleriComponent,
    AdminsidenavComponent,
    DerslikislemleriComponent,
    SinavislemleriComponent,
    SinavdetayComponent,
    KullaniciislemleriComponent,
    KullanicidetayComponent,
    BasvuruislemleriComponent,

    //dialogs-admin
    FDialogComponent,
    DerslikDialogComponent,
    SinavDialogComponent,
    KullaniciDialogComponent,
    SinavDialog2Component,
    GirisyapDialogComponent,

    //Öğrenci Components
    OgrencisidenavComponent,

    OgrencianasayfaComponent,

    OgrencidetayComponent,

    BasvurularimComponent,

    //öğrenci Dialoglar
    OgrencibasvurudialogComponent,
    OgrencicikisyapdialogComponent,
    OgrencibasvuruiptalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ServisService,DialogService,    
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'}
],
  bootstrap: [AppComponent],
  entryComponents:[FDialogComponent,
    DerslikDialogComponent,
    SinavDialogComponent,
    KullaniciDialogComponent,OgrencicikisyapdialogComponent]
})
export class AppModule { }

import { Router } from '@angular/router';
import { ServisService } from 'src/app/sevices/servis.service';
import { Ogrenci } from './../../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SinavDialogComponent } from 'src/app/components/admin/dialogs/sinav-dialog/sinav-dialog.component';
import { Sinav } from 'src/app/models/models';

@Component({
  selector: 'app-ogrencibasvurudialog',
  templateUrl: './ogrencibasvurudialog.component.html',
  styleUrls: ['./ogrencibasvurudialog.component.scss']
})
export class OgrencibasvurudialogComponent implements OnInit {

basvuruYapilanSinav:Sinav;
BasvuruForm: FormGroup;
dialogBaslik: string;
islem: string;
checked = false;
OgrenciId:string;
ogrenci:Ogrenci;


  constructor(
    public dialogRef: MatDialogRef<OgrencibasvurudialogComponent>,
    public servis:ServisService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.basvuruYapilanSinav = data.basvuru;
    if (this.islem == "yenibasvuru") {
      this.dialogBaslik = "Sınav Başvuru Sayfası";
     
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Sınav Düzenle";
    }
   }

  ngOnInit() {
    this.OgrenciId = sessionStorage.getItem("ogrUID");
    if (!this.OgrenciId) {
      this.router.navigate(['/'])
    }
    this.OgrenciById(this.OgrenciId)
  }

  OgrenciById(id: string) {
    this.servis.OgrenciByIdServis(id).subscribe((o: Ogrenci) => {
      this.ogrenci = o;
    })
  }

}

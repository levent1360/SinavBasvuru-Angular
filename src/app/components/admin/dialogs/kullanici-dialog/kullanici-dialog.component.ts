import { Fakulte } from 'src/app/models/models';
import { OgretimElemani } from './../../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServisService } from 'src/app/sevices/servis.service';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.scss']
})
export class KullaniciDialogComponent implements OnInit {

  unvanlar= [
    {id:"Öğr. Gör.",ad:"Öğr. Gör."},
    {id:"Arş. Gör.",ad:"Arş. Gör."},
    {id:"Dr. Öğr. Üyesi",ad:"Dr. Öğr. Üyesi"},
    {id:"Doç. Dr.",ad:"Doç. Dr."},
    {id:"Prof. Dr.",ad:"Prof. Dr."}
  ]

  OEForm: FormGroup;
  ogretimElemani: OgretimElemani
  dialogBaslik: string;
  islem: string;
  fakulteler: Fakulte[]

  constructor(
    public formBuilder: FormBuilder,
    public servis: ServisService,
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.ogretimElemani = data.kayit;
    this.FakulteListele()
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Öğretim Elemanı Ekle";
      this.OEForm = this.createForm();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Öğretim Elemanı Düzenle";
      this.OEForm = this.createForm();
    }
  }

  ngOnInit() {
  }

  FakulteListele() {
    this.servis.FakulteListeleServis().subscribe((response: Fakulte[]) => {
      this.fakulteler = response;
    })
  }

  createForm() {
    return this.formBuilder.group({
      OEUnvan: [this.ogretimElemani.OEUnvan, [Validators.required]],
      OEAd: [this.ogretimElemani.OEAd, [Validators.required]],
      OESoyad: [this.ogretimElemani.OESoyad, [Validators.required]],
      OEKimlikNo: [this.ogretimElemani.OEKimlikNo, [Validators.required]],
      OEEposta: [this.ogretimElemani.OEEposta, [Validators.required]],
      OETel: [this.ogretimElemani.OETel, [Validators.required]],
      OEFakulteId: [this.ogretimElemani.OEFakulteId, [Validators.required]]
    });
  }

}

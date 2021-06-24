import { Sinav } from './../../../../models/models';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-sinav-dialog',
  templateUrl: './sinav-dialog.component.html',
  styleUrls: ['./sinav-dialog.component.scss']
})
export class SinavDialogComponent implements OnInit {

  sinavDetay: Sinav;
  sinavForm: FormGroup;
  dialogBaslik: string;
  islem: string;

  @ViewChild('picker') picker: any;
 
  constructor(
    public formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    public dialogRef: MatDialogRef<SinavDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dateAdapter.setLocale('tr-TR');
    this.islem = data.islem;
    this.sinavDetay = data.kayit;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Sınav Ekle";
      this.sinavForm = this.createForm();
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Sınav Düzenle";
      this.sinavForm = this.createForm();
    }
  }

  ngOnInit() {
  }

  createForm() {
    return this.formBuilder.group({
      SinavAd: [this.sinavDetay.SinavAd, [Validators.required]],
      SinavDonem: [this.sinavDetay.SinavDonem, [Validators.required]],
      SinavZamani: [this.sinavDetay.SinavZamani, [Validators.required]],
      SinavTuru: [this.sinavDetay.SinavTuru, [Validators.required]],
      SinavDili: [this.sinavDetay.SinavDili, [Validators.required]],
      SinavTamam: [this.sinavDetay.SinavTamam, [Validators.required]],
      SinavIptal: [this.sinavDetay.SinavIptal, [Validators.required]],
      SinavAciklama: [this.sinavDetay.SinavAciklama, [Validators.required]],
      SinavBasvuruBaslama: [this.sinavDetay.SinavBasvuruBaslama, [Validators.required]],
      SinavBasvuruBitis: [this.sinavDetay.SinavBasvuruBitis, [Validators.required]]
    });
  }
}

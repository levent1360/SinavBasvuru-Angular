import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Derslik } from 'src/app/models/models';

@Component({
  selector: 'app-derslik-dialog',
  templateUrl: './derslik-dialog.component.html',
  styleUrls: ['./derslik-dialog.component.css']
})
export class DerslikDialogComponent implements OnInit {

  yeniDerslik: Derslik;
  derslikForm: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DerslikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniDerslik = data.derslik;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Derslik Ekle"
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Derslik Düzenle"
    }

    this.derslikForm = this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    return this.formBuilder.group({
      DerslikAd: [this.yeniDerslik.DerslikAd, [Validators.required]],
      DerslikKapasite: [this.yeniDerslik.DerslikKapasite, [Validators.required]],
      DerslikKat: [this.yeniDerslik.DerslikKat, [Validators.required]],
      DerslikAktif: [this.yeniDerslik.DerslikAktif, [Validators.required]]
    });
  }

}

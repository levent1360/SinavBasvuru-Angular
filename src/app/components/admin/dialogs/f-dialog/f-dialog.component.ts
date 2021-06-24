import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fakulte } from 'src/app/models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-f-dialog',
  templateUrl: './f-dialog.component.html',
  styleUrls: ['./f-dialog.component.css']
})
export class FDialogComponent implements OnInit {

  yeniFakulte: Fakulte;
  fakulteForm: FormGroup;
  dialogBaslik: string;
  islem: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem,
      this.yeniFakulte = data.kayit
    if (this.islem == "ekle") {
      this.dialogBaslik = "Yeni Fakülte Ekle"
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Fakülte Düzenle"
    }

    this.fakulteForm = this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    return this.formBuilder.group({
      FakulteAd: [this.yeniFakulte.FakulteAd, [Validators.required]]
    });
  }

}

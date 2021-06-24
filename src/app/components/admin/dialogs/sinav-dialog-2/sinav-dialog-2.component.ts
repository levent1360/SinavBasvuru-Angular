import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sinav } from 'src/app/models/models';
import { SinavDialogComponent } from '../sinav-dialog/sinav-dialog.component';

@Component({
  selector: 'app-sinav-dialog-2',
  templateUrl: './sinav-dialog-2.component.html',
  styleUrls: ['./sinav-dialog-2.component.scss']
})
export class SinavDialog2Component implements OnInit {
  sinavDetay: Sinav;
  sinavForm: FormGroup;
  dialogBaslik: string;
  islem: string;
  
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
      this.sinavForm = this.createForm(this.sinavDetay,false);
    }
    else if (this.islem == "duzenle") {
      this.dialogBaslik = "Sınav Düzenle";
      this.sinavForm = this.createForm(this.sinavDetay,true);
    }
  }


  ngOnInit() {
  }
  createForm(v,d) {
    return this.formBuilder.group({
      SinavZamani: [{value:v.SinavZamani,disabled:false}, [Validators.required]]
    });
  }

}

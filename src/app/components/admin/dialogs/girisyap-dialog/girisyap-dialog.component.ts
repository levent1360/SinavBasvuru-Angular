import { FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-girisyap-dialog',
  templateUrl: './girisyap-dialog.component.html',
  styleUrls: ['./girisyap-dialog.component.css']
})
export class GirisyapDialogComponent implements OnInit {

  
  form:FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GirisyapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form=this.formOlustur();
    }

  ngOnInit() {
  }

  formOlustur() {
    return this.formBuilder.group({
      KullaniciMail: ["", [Validators.required,Validators.email]],
      KullaniciSifre: ["", [Validators.required]],
    });
  }


}

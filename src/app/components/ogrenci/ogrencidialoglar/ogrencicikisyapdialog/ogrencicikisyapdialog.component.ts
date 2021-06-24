import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ogrencicikisyapdialog',
  templateUrl: './ogrencicikisyapdialog.component.html',
  styleUrls: ['./ogrencicikisyapdialog.component.scss']
})
export class OgrencicikisyapdialogComponent implements OnInit {

  dialogBaslik: string;
  islem: string;
  constructor(
    public dialogRef: MatDialogRef<OgrencicikisyapdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}

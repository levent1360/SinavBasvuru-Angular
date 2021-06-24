import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ogrencibasvuruiptal',
  templateUrl: './ogrencibasvuruiptal.component.html',
  styleUrls: ['./ogrencibasvuruiptal.component.scss']
})
export class OgrencibasvuruiptalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OgrencibasvuruiptalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}

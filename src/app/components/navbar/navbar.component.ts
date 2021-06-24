import { ServisService } from 'src/app/sevices/servis.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { GirisyapDialogComponent } from '../admin/dialogs/girisyap-dialog/girisyap-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  girisyapDialogRef: MatDialogRef<GirisyapDialogComponent>;

  constructor(
    public servis: ServisService,
    private matdialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

  }
  girisYap() {
    this.girisyapDialogRef = this.matdialog.open(GirisyapDialogComponent, {
      width: "500px"
    })
  }

}

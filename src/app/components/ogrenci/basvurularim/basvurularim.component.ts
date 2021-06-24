import { Sonuc } from 'src/app/models/models';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Basvuru } from './../../../models/models';
import { ServisService } from 'src/app/sevices/servis.service';
import { Component, OnInit } from '@angular/core';
import { OgrencibasvuruiptalComponent } from '../ogrencidialoglar/ogrencibasvuruiptal/ogrencibasvuruiptal.component';

@Component({
  selector: 'app-basvurularim',
  templateUrl: './basvurularim.component.html',
  styleUrls: ['./basvurularim.component.css']
})
export class BasvurularimComponent implements OnInit {

  basvuruliste: Basvuru[];
  ogrenciId: string;
  basvuruIptalDialogRef: MatDialogRef<OgrencibasvuruiptalComponent>;

  constructor(private servis: ServisService, private matdialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ogrenciId = sessionStorage.getItem("ogrUID");
    this.BasvuruByOgrenciListe();
  }

  BasvuruByOgrenciListe() {
    this.servis.BasvuruByOgrenciIdListeleServis(this.ogrenciId).subscribe((res: Basvuru[]) => {
      this.basvuruliste = res;
    })
  }

  BasvuruIptal(basvuru) {
    this.basvuruIptalDialogRef = this.matdialog.open(OgrencibasvuruiptalComponent, {
      width: "400px"
    })

    this.basvuruIptalDialogRef.afterClosed().subscribe(d => {
      if (d == true) {
        this.servis.BasvuruSilServis(basvuru.BasvuruId).subscribe((res: Sonuc) => {
          if (res.Islem) {
            this.toastr.success(res.Mesaj)
            this.BasvuruByOgrenciListe()
          }
          else {
            this.toastr.error(res.Mesaj)
            this.BasvuruByOgrenciListe()
          }
        })
      }
      else {
        this.toastr.info("İptal etmekten vazgeçildi.")
      }
    })
  }

}

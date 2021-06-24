import { KullaniciDialogComponent } from './../dialogs/kullanici-dialog/kullanici-dialog.component';
import { OgretimElemani, Sonuc, KullaniciGiris } from './../../../models/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServisService } from 'src/app/sevices/servis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-kullaniciislemleri',
  templateUrl: './kullaniciislemleri.component.html',
  styleUrls: ['./kullaniciislemleri.component.css']
})
export class KullaniciislemleriComponent implements OnInit {

  dataSource: MatTableDataSource<OgretimElemani>;
  yeniOgretimElemani: OgretimElemani;
  yeniKullaniciGiris: KullaniciGiris;

  kullanicidialogRef: MatDialogRef<KullaniciDialogComponent>

  displayedColumns: string[] = ['#', 'OEUnvan', 'OEAd', 'OESoyad', 'OEDetay', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: ServisService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.OEListele();
  }

  OEListele() {
    this.servis.OEListeleServis().subscribe((response: OgretimElemani[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => {
        console.log(err)
      }
    )
  }

  OEEkle() {
    var yeniOgretimElemani = new OgretimElemani()
    this.kullanicidialogRef = this.matdialog.open(KullaniciDialogComponent, {
      width: "800px",
      data: {
        kayit: yeniOgretimElemani,
        islem: "ekle"
      }
    })
    this.kullanicidialogRef.afterClosed().subscribe(kullanici => {
      if (kullanici) {
        this.servis.OEEkleServis(kullanici).subscribe((res: Sonuc) => {
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
            this.OEListele();
          } else {
            this.OEListele();
            this.toastr.success(res.Mesaj);
            this.yeniKullaniciGiris = new KullaniciGiris();
            this.yeniKullaniciGiris.KGOEId = kullanici.OEAd;
            this.yeniKullaniciGiris.KGOEAd = kullanici.OEAd;
            this.yeniKullaniciGiris.KGOESoyad = kullanici.OESoyad;
            this.yeniKullaniciGiris.KGOEDKullaniciAdi = kullanici.OEEposta;
            this.yeniKullaniciGiris.KGOEDSifre = kullanici.OEKimlikNo;
            this.yeniKullaniciGiris.KGYetki = "Üye";
            console.log(this.yeniKullaniciGiris)
            this.servis.OEKGEkleServis(this.yeniKullaniciGiris).subscribe((res: Sonuc) => {
              if (res.Islem == false) {
                this.toastr.error(res.Mesaj);
                
              } else {
                this.toastr.warning(res.Mesaj);
              }
            }, err => {
              console.log(err)
            })
          }
        }, err => {
          console.log(err)
        })
      }
    })

  }
  OEDuzenle(duzenleEO: OgretimElemani) {
    this.kullanicidialogRef = this.matdialog.open(KullaniciDialogComponent, {
      width: "800px",
      data: {
        kayit: duzenleEO,
        islem: "duzenle"
      }
    })
  }

  OESil(OEId) {
    this.servis.OESilServis(OEId).subscribe((res: Sonuc) => {
      if (res.Islem == false) {
        this.toastr.error(res.Mesaj);
        this.OEListele()
      } else {
        this.toastr.warning(res.Mesaj);
        this.OEListele()
      }
    }, err => {
      console.log(err)
    })
  }

  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

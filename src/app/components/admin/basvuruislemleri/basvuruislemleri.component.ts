import { Basvuru } from './../../../models/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServisService } from 'src/app/sevices/servis.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basvuruislemleri',
  templateUrl: './basvuruislemleri.component.html',
  styleUrls: ['./basvuruislemleri.component.css']
})
export class BasvuruislemleriComponent implements OnInit {

  dataSource: MatTableDataSource<Basvuru>;
  yeniBasvuru: Basvuru;

  //basvurudialogRef: MatDialogRef<KullaniciDialogComponent>

  displayedColumns: string[] = ['#', 'BasvuruSinavAd','BasvuruSinavZamani', 'BasvuruOgrenciNo', 'BasvuruOgrenciAd','BasvuruOgrenciSoyad', 'BasvuruDetay', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: ServisService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.BasvuruListele();
  }

  BasvuruListele() {
    this.servis.BasvuruListeleServis().subscribe((response: Basvuru[]) => {
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
   /* var yeniOgretimElemani = new OgretimElemani()
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
*/
  }
 /* OEDuzenle(duzenleEO: OgretimElemani) {
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
*/
  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

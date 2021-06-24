import { SinavDialogComponent } from './../dialogs/sinav-dialog/sinav-dialog.component';
import { Sinav, Sonuc } from './../../../models/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServisService } from 'src/app/sevices/servis.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SinavDialog2Component } from '../dialogs/sinav-dialog-2/sinav-dialog-2.component';

@Component({
  selector: 'app-sinavislemleri',
  templateUrl: './sinavislemleri.component.html',
  styleUrls: ['./sinavislemleri.component.css']
})
export class SinavislemleriComponent implements OnInit {

  dataSource: MatTableDataSource<Sinav>;
  yeniSinav: Sinav;
  xss: string = "";
  sinavlar:Sinav[];

  sinavdialogRef: MatDialogRef<SinavDialogComponent>
  sinavdialog2Ref: MatDialogRef<SinavDialog2Component>

  displayedColumns: string[] = ['#', 'SinavAd', 'SinavDonem', 'SinavZamani','Durum', 'BasvuruSayisi', 'SinavDetay', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: ServisService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.SinavListele();
  }

  SinavListele() {
    this.servis.SinavListeleServis().subscribe((response: Sinav[]) => {
      this.sinavlar=response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => {
        console.log(err)
      }
    )
  }


  SinavEkle() {
    var yeniSinav = new Sinav()
    this.sinavdialogRef = this.matdialog.open(SinavDialogComponent, {
      width: "800px",
      data: {
        kayit: yeniSinav,
        islem: "ekle"
      }
    })

    this.sinavdialogRef.afterClosed().subscribe(sinav => {
      if (sinav) {
        var st = Date.parse(sinav.SinavZamani);
        var sb = Date.parse(sinav.SinavBasvuruBaslama);
        var sbt = Date.parse(sinav.SinavBasvuruBitis);
        if (sbt <= sb) {
          this.toastr.error("Sınav başvuru bitiş tarihi, başvuru başlangıç tarihinden önce olamaz!");
        }
        else if (st <= sb && st <= sbt) {
          this.toastr.error("Sınav tarihi, başvuru bitiş tarihi ve başvuru başlangıç tarihinden önce olamaz!");
        }
        else {
          this.servis.SinavEkleServis(sinav).subscribe((res: Sonuc) => {
            if (res.Islem == false) {
              this.toastr.error(res.Mesaj);
              this.SinavListele();
            } else {
              this.SinavListele();
              this.toastr.success(res.Mesaj)
            }
          }, err => {
            console.log(err)
          })
        }
      }
    })
  }

  SinavDuzenle(DuzenleSinav: Sinav) {
    this.sinavdialogRef = this.matdialog.open(SinavDialogComponent, {
      width: "800px",
      data: {
        kayit: DuzenleSinav,
        islem: "duzenle"
      }
    })
    this.sinavdialogRef.afterClosed().subscribe(sinav => {
      if (sinav) {
        DuzenleSinav.SinavAd = sinav.SinavAd;
        DuzenleSinav.SinavDonem = sinav.SinavDonem;
        DuzenleSinav.SinavZamani = sinav.SinavZamani;
        DuzenleSinav.SinavTuru = sinav.SinavTuru;
        DuzenleSinav.SinavDili = sinav.SinavDili;
        DuzenleSinav.SinavTamam = sinav.SinavTamam;
        DuzenleSinav.SinavIptal = sinav.SinavIptal;
        DuzenleSinav.SinavAciklama = sinav.SinavAciklama;
        DuzenleSinav.SinavBasvuruBaslama = sinav.SinavBasvuruBaslama;
        DuzenleSinav.SinavBasvuruBitis = sinav.SinavBasvuruBitis;

        this.servis.SinavDuzenleServis(DuzenleSinav).subscribe((res: Sonuc) => {
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
            this.SinavListele();
          } else {
            this.SinavListele();
            this.toastr.success(res.Mesaj)
          }
        }, err => {
          this.SinavListele();
          console.log(err)
        })
      }
    })
  }

  SinavSil(SinavId: string) {
    this.servis.SinavSilServis(SinavId).subscribe((res: Sonuc) => {
      if (res.Islem == false) {
        this.toastr.error(res.Mesaj);
      }
      else {
        this.SinavListele();
        this.toastr.warning(res.Mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

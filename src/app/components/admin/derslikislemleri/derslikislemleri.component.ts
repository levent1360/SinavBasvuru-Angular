import { DialogService } from './../../../sevices/dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Derslik, Fakulte, Sonuc } from 'src/app/models/models';
import { ServisService } from 'src/app/sevices/servis.service';
import { DerslikDialogComponent } from '../dialogs/derslik-dialog/derslik-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-derslikislemleri',
  templateUrl: './derslikislemleri.component.html',
  styleUrls: ['./derslikislemleri.component.css']
})
export class DerslikislemleriComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['#', 'DerslikAd', 'DerslikKapasite',  'DerslikKat','DerslikAktif', 'islem'];

  seciliFakulte: Fakulte;
  yeniDerslik: Derslik;

  fakulteId: string;

  derslikdialogRef: MatDialogRef<DerslikDialogComponent>
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    private servis: ServisService,
    private routeactive: ActivatedRoute,
    public matdialog: MatDialog,
    public derslikDialog: DialogService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.routeactive.params.subscribe(p => {
      if (p) {
        this.fakulteId = p.id;
        this.FakulteById()
      }
      this.DerslikbyFakulteIdListele();
    })
  }

  FakulteById() {
    this.servis.FakulteByIdServis(this.fakulteId).subscribe(
      (response: Fakulte) => {
        this.seciliFakulte = response;
      }
    )
  }

  DerslikbyFakulteIdListele() {
    this.servis.DerslikByFakulteIdServis(this.fakulteId).subscribe((response: Derslik[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator;
    },
      err => {
        console.log(err)
      }
    )
  }

  DerslikEkle() {
    this.yeniDerslik = new Derslik();
    this.derslikdialogRef = this.matdialog.open(DerslikDialogComponent, {
      width: "400px",
      data: {
        derslik: this.yeniDerslik,
        islem: "ekle"
      }
    })
    this.derslikdialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.yeniDerslik.DerslikFakulteId=this.fakulteId;
        this.yeniDerslik.DerslikAd=d.DerslikAd;
        this.yeniDerslik.DerslikKat=d.DerslikKat;
        this.yeniDerslik.DerslikKapasite=d.DerslikKapasite
        this.yeniDerslik.DerslikAktif=parseInt(d.DerslikAktif)
        this.servis.DerslikEkleServis(this.yeniDerslik).subscribe((res:Sonuc)=>{
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
          } else {
            this.DerslikbyFakulteIdListele();
            this.toastr.success(res.Mesaj)
          }
        },err=>{
          console.log(err)
        })
      }
    })
  }

  DerslikDuzenle(duzenleDerslik:Derslik) {
    this.derslikdialogRef = this.matdialog.open(DerslikDialogComponent, {
      width: "400px",
      data: {
        derslik: duzenleDerslik,
        islem: "duzenle"
      }
    })
    this.derslikdialogRef.afterClosed().subscribe(d => {
      if (d) {
        duzenleDerslik.DerslikFakulteId=this.fakulteId;
        duzenleDerslik.DerslikAd=d.DerslikAd;
        duzenleDerslik.DerslikKat=d.DerslikKat;
        duzenleDerslik.DerslikKapasite=d.DerslikKapasite
        duzenleDerslik.DerslikAktif=parseInt(d.DerslikAktif)
        this.servis.DerslikDuzenleServis(duzenleDerslik).subscribe((res:Sonuc)=>{
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
            this.DerslikbyFakulteIdListele();
          } else {
            this.DerslikbyFakulteIdListele();
            this.toastr.success(res.Mesaj)
          }
        },err=>{
          console.log(err)
        })
      }
    })
  }

  
  derslikSil(DerslikId) {
    this.servis.DerslikSilServis(DerslikId).subscribe((res: Sonuc) => {
      if (res.Islem == false) {
        this.toastr.error(res.Mesaj);
      }
      else {
        this.DerslikbyFakulteIdListele();
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

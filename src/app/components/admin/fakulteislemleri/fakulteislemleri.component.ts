import { FDialogComponent } from './../dialogs/f-dialog/f-dialog.component';
import { Derslik } from './../../../models/models';
import { DialogService } from '../../../sevices/dialog.service';
import { Fakulte, Sonuc } from 'src/app/models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServisService } from 'src/app/sevices/servis.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-fakulteislemleri',
  templateUrl: './fakulteislemleri.component.html',
  styleUrls: ['./fakulteislemleri.component.css']
})
export class FakulteislemleriComponent implements OnInit {

  fakulteId: string = "";

  fdialogRef: MatDialogRef<FDialogComponent>

  dataSource: MatTableDataSource<Fakulte>;

  displayedColumns: string[] = ['#', 'FakulteAd', 'FakulteDerslikSayisi', 'Derslik', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: ServisService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.FakulteListele();
  }

  FakulteListele() {
    this.servis.FakulteListeleServis().subscribe(
      response => {
        console.log(response)
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err)
      }
    )
  }

  OpenDialog(w, k, i) {

  }


  FakulteEkle() {
    var yeniFakulte = new Fakulte();
    this.fdialogRef = this.matdialog.open(FDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniFakulte,
        islem: "ekle"
      }
    })
    this.fdialogRef.afterClosed().subscribe(d => {
      if (d) {

        this.servis.FakulteEkleServis(d).subscribe((res: Sonuc) => {
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
          } else {
            this.FakulteListele();
            this.toastr.success(res.Mesaj)
          }

        }, err => {
          console.log(err)
        });

      }
    })
  }

  FakulteDuzenle(duzenleFakulte: Fakulte) {
    this.fdialogRef = this.matdialog.open(FDialogComponent, {
      width: "400px",
      data: {
        kayit: duzenleFakulte,
        islem: "duzenle"
      }
    })

    this.fdialogRef.afterClosed().subscribe(d => {
      if (d) {
        duzenleFakulte.FakulteAd = d.FakulteAd;

        this.servis.FakulteDuzenleServis(duzenleFakulte).subscribe((res: Sonuc) => {
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
          } else {
            this.FakulteListele();
            this.toastr.success(res.Mesaj)
          }
        }, err => {
          console.log(err)
        });

      }
    })
  }

  fakulteSil(FakulteId) {
    this.servis.FakulteSilServis(FakulteId).subscribe((res: Sonuc) => {
      if (res.Islem == false) {
        this.toastr.error(res.Mesaj);
      }
      else {
        this.FakulteListele();
        this.toastr.warning(res.Mesaj)
      }
    }, err => {
      console.log(err)
    });
  }

  DerslikbyFakulteIdListele(FakulteId) {
    this.route.navigate(['/derslikislemleri', FakulteId])
  }

  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



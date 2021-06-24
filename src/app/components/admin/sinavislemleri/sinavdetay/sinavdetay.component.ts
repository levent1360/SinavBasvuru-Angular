import { Sinav, Basvuru } from './../../../../models/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServisService } from 'src/app/sevices/servis.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sinavdetay',
  templateUrl: './sinavdetay.component.html',
  styleUrls: ['./sinavdetay.component.scss']
})
export class SinavdetayComponent implements OnInit {
  SinavId: string;
  seciliSinav:Sinav;
  dataSource: MatTableDataSource<Basvuru>;
  displayedColumns: string[] = ['#', 'BasvuruZamani', 'BasvuruOgrenciNo', 'BasvuruOgrenciAd','BasvuruOgrenciSoyad', 'BasvuruDetay', 'islem'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private servis: ServisService,
    private routeactive: ActivatedRoute
    ) { }

  ngOnInit() {
    this.routeactive.params.subscribe(p => {
      if (p) {
        this.SinavId = p.sinavid;
        console.log(p);
        this.SinavById();
        this.BasvuruListeleBySinavId(this.SinavId);
      }
    })
  }

  SinavById() {
    this.servis.SinavByIdServis(this.SinavId).subscribe(
      (response: Sinav) => {
        this.seciliSinav = response;
      }
    )
  }

  BasvuruListeleBySinavId(id:string){
    this.servis.BasvuruBySinavListeleServis(id).subscribe((response: Basvuru[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => {
        console.log(err)
      }
    )
  }

  Filtrele(e) {
    var arama = e.target.value;
    this.dataSource.filter = arama.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

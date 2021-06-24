import { OgrencicikisyapdialogComponent } from './../ogrencidialoglar/ogrencicikisyapdialog/ogrencicikisyapdialog.component';
import { Ogrenci } from './../../../models/models';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ServisService } from 'src/app/sevices/servis.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ogrencisidenav',
  templateUrl: './ogrencisidenav.component.html',
  styleUrls: ['./ogrencisidenav.component.css']
})
export class OgrencisidenavComponent implements OnInit {

  OgrenciId: string;
  ogrenci: Ogrenci;
  cikisYapDialogRef: MatDialogRef<OgrencicikisyapdialogComponent>


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private servis: ServisService,
    private router: Router,
    private toastr: ToastrService,
    public matdialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.OgrenciId = sessionStorage.getItem("ogrUID");
    if (!this.OgrenciId) {
      this.router.navigate([''])
    }
    this.OgrenciById(this.OgrenciId)
  }

  OgrenciById(id: string) {
    this.servis.OgrenciByIdServis(id).subscribe((o: Ogrenci) => {
      this.ogrenci = o;
    })
  }

  CikisYap() {
    this.cikisYapDialogRef = this.matdialog.open(OgrencicikisyapdialogComponent, {
      width: "300px",
      data: {}
    })

    this.cikisYapDialogRef.afterClosed().subscribe(d => {
      if (d == true) {
        if (sessionStorage.getItem("ogrUID")) {
          sessionStorage.removeItem("ogrUID");
          this.router.navigate(['/'])
          this.toastr.success("Sistemden başarıyla çıkış yapıldı.")
        }
        else{
          this.router.navigate(['/'])
        }
      }
      else if (d == false) {
        this.toastr.warning("Çıkış yapmaktan vazgeçildi.")
      }
    })
  }
}

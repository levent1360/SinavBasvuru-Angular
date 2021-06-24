import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sinav, Basvuru, Sonuc } from './../../../models/models';
import { Component, OnInit } from '@angular/core';
import { ServisService } from 'src/app/sevices/servis.service';
import { OgrencibasvurudialogComponent } from '../ogrencidialoglar/ogrencibasvurudialog/ogrencibasvurudialog.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-ogrencianasayfa',
  templateUrl: './ogrencianasayfa.component.html',
  styleUrls: ['./ogrencianasayfa.component.css']
})
export class OgrencianasayfaComponent implements OnInit {

  sinavliste: Sinav[];
  basvuruBitenSinavListe: Sinav[];
  basvurubyogrenciliste: Basvuru[];
  ogrenciBasvuruSinavlar:Basvuru[];
  basvuruYapılanSinav: Sinav;
  sinavFark: any;
  ogrenciId: string;
  yeniBasvuru: Basvuru = new Basvuru();
  sinavId: string;

  basvuruYapDialogRef: MatDialogRef<OgrencibasvurudialogComponent>

  constructor(
    private servis: ServisService,
    public matdialog: MatDialog,
    private toastr: ToastrService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.BasvurulacakSinavListele();
    this.BasvuruBitenSinavListele();
    this.ogrenciId = sessionStorage.getItem("ogrUID");
    this.BasvuruByOgrenciListele(this.ogrenciId);
  }

  BasvurulacakSinavListele() {
    this.servis.SinavBasvurulacakListeleServis().subscribe((d: Sinav[]) => {
      this.sinavliste = d;
    })
  }
  BasvuruBitenSinavListele() {
    this.servis.SinavBasvuruBitenListeleServis().subscribe((d: Sinav[]) => {
      this.basvuruBitenSinavListe = d;
    })
  }

  BasvuruByOgrenciListele(OgrenciId:string) {
    this.servis.BasvuruByOgrenciIdListeleServis(OgrenciId).subscribe((b: Basvuru[]) => {
      this.basvurubyogrenciliste = b;
    })
  }

  BasvuruKontrol(sinavId:string) {
    var b = this.basvurubyogrenciliste.filter(s=>s.BasvuruSinavId==sinavId)
    // this.servis.BasvuruByOgrenciIdListeleServis(this.ogrenciId).pipe(map((b:Basvuru[])=>b.filter(x=>x.BasvuruSinavId==this.sinavId))).subscribe((res:Basvuru[])=>{
    //   this.ogrenciBasvuruSinavlar=res;
    // })
    if (b.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  SinavById(id) {
    this.servis.SinavByIdServis(id).subscribe((sinav: Sinav) => {
      this.basvuruYapılanSinav = sinav;
    })
  }

  BasvuruYap(Sinav) {
    this.basvuruYapDialogRef = this.matdialog.open(OgrencibasvurudialogComponent, {
      width: "800px",
      height: "640px",
      data: {
        basvuru: Sinav,
        islem: "yenibasvuru"
      }
    })
    this.basvuruYapDialogRef.afterClosed().subscribe(d => {
      if (d.islem == true) {
        this.yeniBasvuru.BasvuruSinavId = d.sinavid;
        this.yeniBasvuru.BasvuruOgrenciId = this.ogrenciId;
        this.yeniBasvuru.BasvuruTarihi = new Date().toString();
        this.yeniBasvuru.BasvuruIptalTarihi = "",
        this.yeniBasvuru.BasvuruDuzenlemeTarihi = new Date().toString(),
        this.yeniBasvuru.BasvuruDerslikId = "b1bc2023-7ce1-4d5a-8ffa-5062be11f789",
        this.yeniBasvuru.BasvuruIptal = 0

        this.servis.BasvuruEkleServis(this.yeniBasvuru).subscribe((res: Sonuc) => {
          if (res.Islem == false) {
            this.toastr.error(res.Mesaj);
          } else {
            this.toastr.success(res.Mesaj)
            this.BasvurulacakSinavListele();
            this.BasvuruByOgrenciListele(this.ogrenciId);
          }
        }, err => {
          console.log(err)
        });
      }
      else if (d.islem == false) {
        this.toastr.warning("Başvurudan vazgeçildi.")

      }
    })
  }

}

import { KullaniciGiris } from './../../../../models/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OgretimElemani } from 'src/app/models/models';
import { ServisService } from 'src/app/sevices/servis.service';

@Component({
  selector: 'app-kullanicidetay',
  templateUrl: './kullanicidetay.component.html',
  styleUrls: ['./kullanicidetay.component.scss']
})
export class KullanicidetayComponent implements OnInit {

  OEId: string;
  seciliOgretimElemani:OgretimElemani
  seciliOEKGiris:KullaniciGiris

  constructor(
    private servis: ServisService,
    private routeactive: ActivatedRoute
    ) { }

  ngOnInit() {
    this.routeactive.params.subscribe(p => {
      if (p) {
        this.OEId = p.oeid;
        console.log(p)
        this.OEById();
        this.KGbyOEId()
      }
    })
  }

  OEById() {
    this.servis.OEByIdServis(this.OEId).subscribe(
      (response: OgretimElemani) => {
        this.seciliOgretimElemani = response;
      }
    )
  }

  KGbyOEId(){
    this.servis.OEKGByOEIdServis(this.OEId).subscribe((response:KullaniciGiris)=>{
      this.seciliOEKGiris=response;
    })
  }


}

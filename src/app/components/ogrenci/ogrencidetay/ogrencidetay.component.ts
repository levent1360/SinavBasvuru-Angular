import { ToastrService } from 'ngx-toastr';
import { Ogrenci, Sonuc } from './../../../models/models';
import { Component, OnInit } from '@angular/core';
import { ServisService } from 'src/app/sevices/servis.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ogrencidetay',
  templateUrl: './ogrencidetay.component.html',
  styleUrls: ['./ogrencidetay.component.css']
})
export class OgrencidetayComponent implements OnInit {
  ogrenci: Ogrenci;
  ogrenciId: string;

  constructor(
    private servis: ServisService,
    private router: ActivatedRoute,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.ogrenciId = sessionStorage.getItem("ogrUID");
    this.OgrenciById(this.ogrenciId);
  }

  ngOnInit(): void {
  }

  OgrenciById(id: string) {
    this.servis.OgrenciByIdServis(id).subscribe((d: Ogrenci) => {
      this.ogrenci = d
    })
  }

  Guncelle(mail, tel) {
    this.ogrenci.OgrenciMail = mail;
    this.ogrenci.OgrenciTel = tel;
    this.servis.OgrenciDuzenleServis(this.ogrenci).subscribe((res: Sonuc) => {
      this.toastr.success(res.Mesaj);
      this.OgrenciById(this.ogrenciId);
    })
  }


}

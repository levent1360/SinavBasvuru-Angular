import { Derslik, Sinav, Fakulte, OgretimElemani, KullaniciGiris, Basvuru, Ogrenci } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServisService {


  apiurl = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  //Fakülte
  FakulteListeleServis(): Observable<Fakulte[]> {
    return this.httpClient.get<Fakulte[]>(this.apiurl + "api/fakulteliste");
  }
  FakulteByIdServis(fakulteid): Observable<Fakulte> {
    return this.httpClient.get<Fakulte>(this.apiurl + "api/fakultebyid/" + fakulteid);
  }
  FakulteEkleServis(fakulte: Fakulte) {
    return this.httpClient.post(this.apiurl + "api/fakulteekle", fakulte);
  }
  FakulteDuzenleServis(fakulte: Fakulte) {
    return this.httpClient.put(this.apiurl + "api/fakulteduzenle", fakulte);
  }
  FakulteSilServis(fakulteid) {
    return this.httpClient.delete(this.apiurl + "api/fakultesil/" + fakulteid);
  }

  //Derslik
  DerslikListeleServis(): Observable<Derslik[]> {
    return this.httpClient.get<Derslik[]>(this.apiurl + "api/derslikliste");
  }
  DerslikByFakulteIdServis(fakulteid) {
    return this.httpClient.get(this.apiurl + "api/derslikbyfakulteid/" + fakulteid);
  }
  DerslikEkleServis(derslik: Derslik) {
    return this.httpClient.post(this.apiurl + "api/derslikekle", derslik)
  }
  DerslikDuzenleServis(derslik: Derslik) {
    return this.httpClient.put(this.apiurl + "api/derslikduzenle", derslik)
  }
  DerslikSilServis(derslikId) {
    return this.httpClient.delete(this.apiurl + "api/dersliksil/" + derslikId)
  }

  //Sınav
  SinavListeleServis() {
    return this.httpClient.get(this.apiurl + "api/sinavlistele")
  }
  SinavBasvurulacakListeleServis() {
    return this.httpClient.get(this.apiurl + "api/basvurulacaksinavlistele")
  }
  SinavBasvuruBitenListeleServis() {
    return this.httpClient.get(this.apiurl + "api/basvurubitensinavlistele")
  }
  SinavByIdServis(id: string) {
    return this.httpClient.get(this.apiurl + "api/sinavbyid/" + id)
  }
  SinavEkleServis(sinav: Sinav) {
    return this.httpClient.post(this.apiurl + "api/sinavekle", sinav)
  }
  SinavDuzenleServis(sinav: Sinav) {
    return this.httpClient.put(this.apiurl + "api/sinavduzenle", sinav)
  }
  SinavSilServis(sinavId: string) {
    return this.httpClient.delete(this.apiurl + "api/sinavsil/" + sinavId)
  }

  //Öğretim elemanı
  OEListeleServis() {
    return this.httpClient.get(this.apiurl + "api/ogretimelemaniliste")
  }
  OEByIdServis(OEId: string) {
    return this.httpClient.get(this.apiurl + "api/ogretimelemanibyid/" + OEId)
  }
  OEEkleServis(eo: OgretimElemani) {
    return this.httpClient.post(this.apiurl + "api/ogretimelemaniekle", eo)
  }
  OEDuzenleServis(eo: OgretimElemani) {
    return this.httpClient.put(this.apiurl + "api/ogretimelemaniduzenle", eo)
  }
  OESilServis(OEId: string) {
    return this.httpClient.delete(this.apiurl + "api/ogretimelemanisil/" + OEId)
  }

  //Kullanıcı Giriş
  OEKGByOEIdServis(OEId: string) // Öğretim Elemanına Göre Kullanıcı Giriş
  {
    return this.httpClient.get(this.apiurl + "api/kullanicigirisibyid/" + OEId)
  }
  OEKGEkleServis(KG: KullaniciGiris) {
    return this.httpClient.post(this.apiurl + "api/kullaniciekle", KG)
  }


  //Basvuru
  BasvuruListeleServis() {
    return this.httpClient.get(this.apiurl + "api/basvurulistele")
  }

  BasvuruBySinavListeleServis(sinavId: string) {
    return this.httpClient.get(this.apiurl + "api/basvurubysinavid/" + sinavId)
  }

  BasvuruByOgrenciIdListeleServis(OgrenciId: string) {
    return this.httpClient.get(this.apiurl + "api/basvurubyogrenciid/" + OgrenciId)
  }

  BasvuruEkleServis(basvuru: Basvuru) {
    return this.httpClient.post(this.apiurl + "api/basvuruekle", basvuru)
  }
  BasvuruSilServis(basvuruId: string) {
    return this.httpClient.delete(this.apiurl + "api/basvurusil/" + basvuruId)
  }


  //Ogrenci
  OgrenciGirisServis(OgrenciTC: string, OgrenciNo: string) {
    return this.httpClient.get(this.apiurl + "api/ogrencigiris/" + OgrenciTC + "/" + OgrenciNo)
  }

  OgrenciListeleServis() {

  }
  OgrenciDuzenleServis(ogrenci: Ogrenci) {
    return this.httpClient.put(this.apiurl + "api/ogrenciduzenle", ogrenci)
  }
  OgrenciByIdServis(OgrenciId: string) {
    return this.httpClient.get(this.apiurl + "api/ogrencibyid/" + OgrenciId)
  }


  //istatistik
  IstatistikServis() {
    return this.httpClient.get(this.apiurl + "api/istatistikler");
  }
}

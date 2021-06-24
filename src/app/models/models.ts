export class Ogrenci{
    OgrenciId: string;
    OgrenciNo: string;
    OgrenciTC: string;
    OgrenciAd: string;
    OgrenciSoyad: string;
    OgrenciMail: string;
    OgrenciTel: string;
    OgrenciFakulteId: string;
    OgrenciFakulteAd: string;
    OgrenciBolum: string;
    OgrenciSinif: string;
    OgrenciKayitTuru: string;
    OgrenciDerece: string;
    OgrenciAktif: number;

}

export class OgrenciGiris{
    OgrenciId:string;
}


export class Fakulte{
    FakulteId:string;
    FakulteAd:string;
    FakulteDerslikSayisi:number;
}

export class Sonuc{
    Islem:boolean;
    Mesaj:string;
}

export class Derslik{
    DerslikAd:string;
    DerslikId:string;
    DerslikKat:string;
    DerslikFakulteId:string;
    DerslikFakulteAd:string;
    DerslikKapasite:string;
    DerslikAktif:number;
}

export class Sinav{
    SinavId: string;
    SinavAd: string;
    SinavDonem: string;
    SinavZamani: string;
    SinavTuru: string;
    SinavDili: string;
    SinavTamam: number;
    SinavIptal: number;
    SinavAciklama: string;
    SinavBasvuruBaslama: string;
    SinavBasvuruBitis: string;
    SinavBasvuruSayisi:number;
}

export class OgretimElemani{
    OEId: string;
    OEAd: string;
    OESoyad: string;
    OEUnvan: string;
    OEFakulteId: string;
    OEFakulteAd: string;
    OETel: string;
    OEEposta: string;
    OEKimlikNo: string;
}

export class KullaniciGiris{
    KullaniciId: string;
    KGOEId: string;
    KGOEAd: string;
    KGOESoyad: string;
    KGOEDKullaniciAdi: string;
    KGOEDSifre: string;
    KGYetki: string;
}

export class Basvuru{
    BasvuruId: string;
    BasvuruOgrenciId: string;
    BasvuruOgrenciNo: string;
    BasvuruOgrenciTC: string;
    BasvuruOgrenciAd: string;
    BasvuruOgrenciSoyad: string;
    BasvuruOgrenciMail: string;
    BasvuruOgrenciTel: string;
    BasvuruOgrenciFakulteId: string;
    BasvuruOgrenciFakulteAd: string;
    BasvuruOgrenciBolum: string;
    BasvuruOgrenciSinif: string;
    BasvuruOgrenciKayitTuru: string;
    BasvuruOgrenciDerece: string;
    BasvuruTarihi: string;
    BasvuruDuzenlemeTarihi: string;
    BasvuruIptal: number;
    BasvuruIptalTarihi: string;
    BasvuruSinavId: string;
    BasvuruSinavAd: string;
    BasvuruSinavZamani: string;
    BasvuruDerslikId: string;
    BasvuruDerslikAd: string;
    BasvuruDerslikKat: string;
}

export class Stats{
    FakulteSayisi: number;
    OgrenciSayisi: number;
    DerslikSayisi: number;
    OgretimElemaniSayisi: number;
}
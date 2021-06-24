import { Stats } from './../../../models/models';
import { Fakulte } from 'src/app/models/models';
import { Component, OnInit } from '@angular/core';
import { ServisService } from 'src/app/sevices/servis.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  collapse = false;
  sayilar:Stats
  
  constructor(public servis: ServisService) { }

  ngOnInit(): void {
    this.servis.IstatistikServis().subscribe((d: Stats) => {
      this.sayilar = d;
    })
  }

  

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

}

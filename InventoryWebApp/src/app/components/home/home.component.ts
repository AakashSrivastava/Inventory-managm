import { Component, OnInit } from '@angular/core';
import { GetAllDataService } from '../../services/get-all-data.service';
import { log } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = [];
  constructor(private getAllDataService: GetAllDataService) { }

  ngOnInit() {
    this.getAllDataService.getAllData().subscribe(data => {
      if (data.success) {
         this.items=data.msg;
         console.log(data.msg);
      }
    })
  }

}

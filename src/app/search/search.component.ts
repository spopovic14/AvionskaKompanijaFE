import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Flight } from '../Flight';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	flights = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.flights = [];
  }

  buy(fnumber: any) {
    const cardNum = document.getElementById(fnumber) as HTMLInputElement;
    if (this.checkField(cardNum.value)) {
      alert('Polje mora biti popunjeno!');
      return ;
    }
    if (this.checkValid(cardNum.value)) {
      alert('Nevalidan unos!');
      return ;
    }
    this.adminService.buyTicket(fnumber, cardNum.value).subscribe(data => {
      if (data['status'] === 'FAIL') {
        alert('Neuspesn kupovina!');
      } else {
        alert('Uspesna kupovina!');
      }
    });
  }

  checkField(fnumber: string): boolean {
    return fnumber === '';
  }

  checkValid(fnumber: string): boolean {
    return Number.isNaN(Number(fnumber));
  }

  search() {
    const comp = document.getElementById('company') as HTMLInputElement;

    this.flights = [];

    this.adminService.flightsByCompany(comp.value).subscribe(data => {
      let i = 0;
      for (const flight in data) {
          this.flights[i++] = data[flight];
      }
    });
  }

}

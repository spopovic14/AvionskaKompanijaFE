import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private location: Location) { }

  superAdmin = false;

  companies = [];

  ngOnInit() {
    if(sessionStorage.getItem('type') == '0') {
      this.superAdmin = true;

      this.adminService.getCompanies().subscribe(data => {
        console.log(data);
        let i = 0;
        for (const company in data) {
          this.companies[i++] = data[company];
        }
      });
    } else {
      this.superAdmin = false;
    }
  }

  addAdmin() {
    const fname = document.getElementById('fname') as HTMLInputElement;
    const lname = document.getElementById('lname') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;
    const type = document.getElementById('type') as HTMLOptionElement;
    if (!this.checkFields(fname.value, lname.value, username.value)) {
      alert('Sva polja moraju biti popunjena!');
      return ;
    }

    let company = '';

    if(this.superAdmin) {
      company = (document.getElementById('company') as HTMLInputElement).value;

      if(company === '') {
        alert('Kompanija ne moze biti prazna');
        return false;
      }
    }

    this.adminService.addAdmin(fname.value, lname.value, username.value, type.value, company)
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] === 'FAIL') {
          alert('Postoji clan sa unetim username-om!');
        } else {
          alert('Uspesno dodavanje!');
        }
      });
  }

  checkFields(fname: string, lname: string, username: string): boolean {
    if (fname === '' || lname === '' || username === '') {
      return false;
    }
    return true;
  }

  back() {
    this.location.back();
  }
}

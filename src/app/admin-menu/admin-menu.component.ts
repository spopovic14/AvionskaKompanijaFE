import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  currUser: String;

  superAdmin = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    if (!(sessionStorage.getItem('user') != null)) {
      this.router.navigate(['./']);
    }
    this.currUser = sessionStorage.getItem('user');

    if(sessionStorage.getItem('type') == '0') {
      this.superAdmin = true;
    }
    else {
      this.superAdmin = false;
    }
  }

  logout() {
    this.currUser = '';
    sessionStorage.removeItem('remembered');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('type');
    this.router.navigate(['./']);
  }

  addCompany() {
    const company = document.getElementById('company') as HTMLInputElement;

    if(company.value === '') {
      alert('Ime kompanije mora biti popunjeno');
      return false;
    }

    this.adminService.addCompany(company.value).subscribe((data: any) => {
      console.log(data);

      if(data.status === 'FAIL') {
        alert('Neuspesno dodavanje kompanije');
      }
      else {
        alert('Uspesno dodavanje');
      }
    });
  }

}

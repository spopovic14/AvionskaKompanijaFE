import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private passwordService: PasswordService, private router: Router) { }

  ngOnInit() {
  	if (sessionStorage.getItem('remembered') != null) {
      const type = sessionStorage.getItem('type');
      if (type === '1') {
        this.router.navigate(['/adminMenu']);
      } else if (type === '2') {
        this.router.navigate(['/operaterMenu']);
      } else {
        this.router.navigate(['/userMenu']);
      }
    }
  }

  reset() {
  	const token = document.getElementById('token') as HTMLInputElement;
  	const password = document.getElementById('password') as HTMLInputElement;
  	const cpassword = document.getElementById('cpassword') as HTMLInputElement;

    if(token.value === '' || password.value === '' || cpassword.value === '') {
      alert('Polja ne smeju biti prazna');
      return false;
    }

    if(password.value !== cpassword.value) {
      alert('Sifre se ne poklapaju');
      return false;
    }

    this.passwordService.reset(token.value, password.value).subscribe(data => {
      console.log(data);

      if (data.status == 'FAIL') {
        alert('Neuspesno');
      }
      else {
        alert('Sifra uspesno promenjena');
      }
    });
  }

  requestReset() {
  	const email = document.getElementById('email') as HTMLInputElement;

  	if(email.value === '') {
  		alert('Email ne sme biti prazan');
  		return false;
  	}

  	this.passwordService.requestReset(email.value).subscribe(data => {
      console.log(data);

      if (data.status == 'FAIL') {
        alert('Neuspesno.');
      }
      else {
        alert('Token je poslat na email');
      }
  	});
  }

}

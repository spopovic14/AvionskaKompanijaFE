import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) { }

  reset(token: String, password: String): Observable<any> {
    const json = {'token': token, 'password': password };
    return this.http.post('http://localhost:8080/user/resetPassword', JSON.stringify(json));
  }

  requestReset(email: String): Observable<any> {
  	const json = {'email': email};
  	return this.http.post('http://localhost:8080/user/requestReset', JSON.stringify(json));
  }

}

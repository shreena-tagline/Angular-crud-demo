import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  returnUrl: string;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('this.returnUrl', this.returnUrl);

  }

  login(formData) {
    localStorage.setItem('currentUser', JSON.stringify(formData));
    this.currentUserSubject.next(formData);
    this.router.navigate([this.returnUrl]);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private pageCache = new Map<number, any>();
  private idCache = new Map<number, any>();
  errorMessage!:string;

  constructor(private http: HttpClient,private route:Router) { }

  getUsers(page: number): Observable<any> {
    if (this.pageCache.has(page)) {
      return of(this.pageCache.get(page));
    } else {
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      tap(user => {this.pageCache.set(page, user);  
      }),
      shareReplay(1),
      catchError((error) => {
        this.errorMessage='Error in fetching users!'
        this.route.navigate(['error']);
        return of([]);
      })
    );}
  }

  getUserById(id: number): Observable<any> {
    if (this.idCache.has(id)) {
      return of(this.idCache.get(id));
    } else {
      return this.http.get(`${this.apiUrl}/${id}`).pipe(
        tap(user => this.idCache.set(id, user)),
        catchError((error) => {
          this.errorMessage='Error in fetching user by id! No User Found in given'
          this.route.navigate(['error']);
          return of(null);
        })
      );
    }
  }
}

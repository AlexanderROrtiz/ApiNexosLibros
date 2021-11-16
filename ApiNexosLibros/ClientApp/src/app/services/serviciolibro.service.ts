import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { Libro } from '../models/Libro';


@Injectable()
export class ServicioLibro {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Libro[]>(this.myAppUrl + 'api/Libro/Index').pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getLibroById(id: number) {
    return this._http.get(this.myAppUrl + "api/Libro/FindById/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveLibro(libro) {
    return this._http.post(this.myAppUrl + 'api/Libro/Create', libro).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateLibro(id: number, libro) {
    return this._http.put<Libro>(this.myAppUrl + 'api/libro/Edit/' + id, libro).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  deleteLibro(id) {
    return this._http.delete(this.myAppUrl + "api/Libro/Delete/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
    } else {
     
      errorMessage = `${error.error}`;
    }
    console.log(errorMessage);
    console.log(error);
    return throwError(errorMessage);
  }
}

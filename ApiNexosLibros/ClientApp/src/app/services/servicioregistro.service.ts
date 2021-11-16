import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { Registro } from '../models/Registro';



@Injectable()
export class ServicioRegistro {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Registro[]>(this.myAppUrl + 'api/Registro/Index').pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getById(id: number) {
    return this._http.get(this.myAppUrl + "api/Registro/FindById/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  save(registro) {
    return this._http.post(this.myAppUrl + 'api/Registro/Create', registro).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  update(id: number, registro) {
    return this._http.put<Registro>(this.myAppUrl + 'api/Registro/Edit/' + id, registro).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  delete(id){
    return this._http.delete(this.myAppUrl + "api/Registro/Delete/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
     
      errorMessage = error.error.message;
    } else {
     
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpGetOptions, HttpPostOptions } from '../../models/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private domain = '';

  constructor(private http: HttpClient) {}

  get<T>(path: string, options?: HttpGetOptions): Observable<T> {
    return this.http.get<T>(this.domain + path, options);
  }

  post<T, D>(path: string, data: D, options?: HttpPostOptions): Observable<T> {
    return this.http.post<T>(this.domain + path, data, options);
  }
}

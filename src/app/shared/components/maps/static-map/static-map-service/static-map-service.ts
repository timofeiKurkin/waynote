import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaticMapService {
  private geoapifyStaticApi = `https://maps.geoapify.com/v1/staticmap?apiKey=${environment.geoapify}`;

  constructor(private http: HttpClient) {}

  getStaticMap(map: Record<string, number | string | object>): Observable<Blob> {
    return this.http.post(this.geoapifyStaticApi, map, {
      responseType: 'blob',
    });
  }
}

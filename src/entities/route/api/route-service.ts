import { Injectable } from '@angular/core';
import { IRoute } from '../models/interface';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../../shared/api/firebase/firebase';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private geoapifyStaticApi = `https://maps.geoapify.com/v1/staticmap?apiKey=${environment.geoapify}`;

  constructor(private http: HttpClient) {}

  createRoute(route: IRoute) {
    return addDoc(collection(firestore, 'routes'), route);
  }

  getRoute(routeId: string) {
    return getDoc(doc(firestore, 'routes', routeId));
  }

  getDocsByOwner(ownerId: string) {
    const q = query(
      collection(firestore, 'routes'),
      where('ownerId', '==', ownerId)
    );
    return getDocs(q);
  }

  getRoutes() {
    return getDocs(collection(firestore, 'routes'));
  }

  getStaticMapOfRoute(map: Record<string, number | string | object>) {
    return this.http.post(this.geoapifyStaticApi, map, {
      responseType: 'blob',
    });
  }
}

import { Injectable } from '@angular/core';
import { IRoute } from '../models/interface';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  createRoute(route: IRoute) {
    return addDoc(collection(firestore, 'routes'), route);
  }

  getRoute(routeId: string) {
    return getDoc(doc(firestore, 'routes', routeId));
  }

  getRoutes() {
    return getDocs(collection(firestore, 'routes'));
  }
}

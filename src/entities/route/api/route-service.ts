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
}

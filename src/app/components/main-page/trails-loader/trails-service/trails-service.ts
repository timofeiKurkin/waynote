import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class TrailsService {
  getTrails() {
    return getDocs(collection(firestore, 'trails'));
  }
}

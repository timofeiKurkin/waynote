import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  getTrail(trailId: string) {
    return getDoc(doc(firestore, 'trails', trailId));
  }
}

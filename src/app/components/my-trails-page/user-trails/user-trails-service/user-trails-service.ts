import { Injectable } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../../core/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class UserTrailsService {
  getUserTrails(ownerId: string) {
    const q = query(collection(firestore, 'trails'), where('ownerId', '==', ownerId));
    return getDocs(q);
  }
}

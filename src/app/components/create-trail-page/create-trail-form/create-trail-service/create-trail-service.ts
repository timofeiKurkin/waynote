import { Injectable } from '@angular/core';
import { ITrail } from '../trail-interface';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../../shared/api/firebase/firebase';

@Injectable({
  providedIn: 'root',
})
export class CreateTrailService {
  createTrail(trail: ITrail) {
    return addDoc(collection(firestore, 'trails'), trail);
  }
}

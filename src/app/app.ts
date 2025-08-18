import { TuiRoot } from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../features/header/ui/header';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../shared/api/firebase/firebase';
import { AuthService } from '../entities/user/state/auth-service';

@Component({
  imports: [RouterModule, ReactiveFormsModule, TuiRoot, Header],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        this.authService.setUser(user);
        this.authService.setIsAuth(true);
      }
    });
  }

  // ngAfterViewInit() {
  //   fromEvent(this.fileInput.nativeElement, 'change')
  //     .pipe(
  //       switchMap(event => {
  //         const input = event.target as HTMLInputElement;
  //         console.log('INPUT:', input);
  //
  //         if (!input.files?.length) {
  //           throw new Error('Пустой файл');
  //         }
  //
  //         const file = input.files[0];
  //         return this.readGPXFile(file);
  //       }),
  //       map(stringToGPX),
  //       map(parsed => {
  //         const { yPoints, bounds, center } = this.parseTackPoints(
  //           parsed.tracks[0].points
  //         );
  //
  //         const minZoom = this.getMaxZoomForBounds(bounds, 600);
  //         console.log(minZoom);
  //
  //         return {
  //           featureProps: {
  //             id: 'track',
  //             geometry: {
  //               type: 'LineString',
  //               coordinates: yPoints,
  //             },
  //             style: {
  //               stroke: [{ color: 'black', width: 4 }],
  //             },
  //           },
  //           mapProps: {
  //             theme: 'light',
  //             location: {
  //               bounds: bounds,
  //               center: center,
  //             },
  //             restrictMapArea: bounds,
  //             zoomRange: { min: minZoom, max: 21 },
  //             zoomStrategy: 'zoomToCenter',
  //             margin: [40, 40, 40, 40],
  //           },
  //         } as { featureProps: YMapFeatureProps; mapProps: YMapProps };
  //       })
  //     )
  //     .subscribe({
  //       next: ({ mapProps, featureProps }) => {
  //         this.mapProps.set(mapProps);
  //         this.featureProps.set(featureProps);
  //       },
  //       error: error =>
  //         this.isError.set({
  //           isError: true,
  //           message: 'Ошибка парсинга GPX:' + error,
  //         }),
  //     });
  // }
}

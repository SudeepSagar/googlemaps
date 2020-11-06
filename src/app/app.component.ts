import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'google-map';
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  markerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 12;
  display?: google.maps.LatLngLiteral;

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 0,
  };
  markers = [];
  infoContent = '';

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markerPositions.push(this.center);
    });
  }

  addMarker(event: google.maps.MouseEvent): void {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent): void {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker);
  }

  removeLastMarker(): void {
    this.markerPositions.pop();
  }

  // zoomIn(): void {
  //   if (this.zoom < this.options.maxZoom) {
  //     this.zoom++;
  //   }
  // }

  // zoomOut(): void {
  //   if (this.zoom > this.options.minZoom) {
  //     this.zoom--;
  //   }
  // }

  // click(event): void {
  //   console.log(event);
  //   this.markers.push({
  //     position: {
  //       lat: this.currentLat,
  //       lng: this.currentLon,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     info: 'Marker info ' + (this.markers.length + 1),
  //     options: {
  //       animation: google.maps.Animation.BOUNCE,
  //     },
  //   });
  // }

  // openInfo(marker: MapMarker, content): void {
  //   this.infoContent = content;
  //   this.info.open(marker);
  // }

  // logCenter(): void {
  //   console.log(JSON.stringify(this.map.getCenter()));
  // }
}

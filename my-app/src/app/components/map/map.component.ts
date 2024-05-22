import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  private map: any;
  private userMarker!: L.Marker; // Ajout d'une propriété pour le marqueur
  @Output() locationFound = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.locateUser();
  }

  private locateUser(): void {
    this.map.locate({setView: true, maxZoom: 16});

    const Icon = L.icon({
      iconUrl: 'assets/icon-marqueur.webp',
      iconSize: [35, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.map.on('locationfound', (e: any) => {
      this.locationFound.emit(e.latlng);
      this.userMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: Icon}).addTo(this.map)
        .bindPopup('Vous voilà !').openPopup();
    });

    this.map.on('locationerror', (e: any) => {
      alert("Location access denied.");
    });
  }

  public centerMap(): void {
    if (this.userMarker) {
      this.map.setView(this.userMarker.getLatLng(), this.map.getZoom());
    }
  }

}

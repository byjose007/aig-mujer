import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private watch:any;
  miUbicacion: any = {
    lat: '',
    long: ''
  };
  // private afDB: AngularFirestore
  // public _usuarioProv: UsuarioProvide
  constructor(private geolocation: Geolocation) { }

  iniciarGeoLocalizacion() {

    this.geolocation.getCurrentPosition().then((resp) => {
      //
      // resp.coords.longitude
      this.miUbicacion.lat =  resp.coords.latitude;
      this.miUbicacion.long =  resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.watch = this.geolocation.watchPosition();
    
    this.watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data.coords.latitude + ',' + data.coords.longitude);
      
    });
  }

  detenerUbicacion() {

    try {
      this.watch.unsubscribe();
    } catch (e) {
      console.log(JSON.stringify(e));
    }


  }
}

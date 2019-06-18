// import { GoogleMaps } from '@ionic-native/google-maps';

import { environment } from './../../environments/environment';
import { UbicacionService } from "./../services/ubicacion.service";
import { OnInit, Component, ViewChild } from "@angular/core";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";

import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-here-map",
  templateUrl: "./here-map.page.html",
  styleUrls: ["./here-map.page.scss"]
})
export class HereMapPage implements OnInit {

  title: string = 'My first AGM project';
  support = false;

  height = 0;
  zoom: number = 13;
  public lat: number;
  public lng: number;
  public disableDefaultUI: true;

  public origin: any;
  public destination: any;

  public renderOptions = {
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#f00',
      strokeOpacity: 0.6,
      strokeWeight: 5,
    }

  };

  public mapOptions = {
    zoomControl: false
  };

  public markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png',
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      infoWindow: `
        <h4>Hello<h4>
        <a href='http://www-e.ntust.edu.tw/home.php' target='_blank'>Taiwan Tech</a>
        `
    },
  };

  constructor(public platform: Platform,
    public alertController: AlertController,
    private geolocation: Geolocation) {
    console.log(platform.height());
    this.height = platform.height() - 56;
    this.loadMap();

  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapPage');
    //this.loadMap();

  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.getDirection();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

  }

  /*calculateDistance() {
    const mexicoCity = new google.maps.LatLng(19.432608, -99.133209.);
    const jacksonville = new google.maps.LatLng(40.730610, -73.935242.);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london);
  }*/

  getDirection() {
    console.log('getDirections', this.lat, this.lng);

    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: 41.398984, lng: 2.154858 };

    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  onClick() {
    this.presentAlertPrompt();

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Gracias por su aviso!',
      subHeader: 'En breve nos pondremos en contacto',
      message: `<p>Para agilizar el proceso de asistencia y de manera opcional se podrá llenar el siguiente formulario. No olvide seguir nuestros consejos.`,
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.support = !this.support;
          }
        }
      ]
    });

    await alert.present();
  }


}

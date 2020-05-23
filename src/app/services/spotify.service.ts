import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Filtro aspersor de agua para api
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log("Spotify Service ready");
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization' : 'Bearer BQDkElw0sbz2WXRKV5dUtiUAB6T6c0wVKoQ8fYsnY3Duk8l459Z1Lag8GzqNFIRVLCmdg8D-snGqpyUTXPM'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=25')
               .pipe( map( data =>  data['albums'].items ));

  }

  getArtistas( termino: string){

    return  this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                      .pipe( map( data => data['artists'].items ));

  }

  getArtista( id: string){

    return  this.getQuery(`artists/${ id }`);

  }
  
  getTopTracks( id: string){

    return  this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }



}

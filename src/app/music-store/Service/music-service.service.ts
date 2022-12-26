import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  url = 'https://api.spotify.com/v1/search';
  type = 'artist';
  limit = 10;
  redirect_uri = 'http://localhost:4200/';
  client_id = '61a99f3e8dda4664beff04e1ca223ccb';
  client_secret = '9e5333c3d4b64c2abfb86f814459e5be';

 
  messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) {}
 
  searchArtist(q: string, accessToken: string) {
    return this.http.get(this.url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      }),
 
      params: {
        q: q,
        type: this.type,
        limit: this.limit.toString(),
      },
    });
  }
 
  getTopTracksById(id: string, accessToken: string) {
    return this.http.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        }),
        params: {
          country: 'VN',
        },
      }
    );
  }
 
  changeMessage(message: string) {
    this.messageSource.next(message);
  }


  generateNewToken() {
   const urlGetAccesToken = 'https://api.spotify.com/api/token';
  //  const body = 'grant_type=client_credentials';
  const encoded =  (new Buffer(this.client_id + ':' + this.client_secret).toString('base64'));
   const body = {
    grant_type: 'authorization_code',
    redirect_uri: this.redirect_uri,
    json: true
   }
    return this.http.post(urlGetAccesToken, body, {
        headers: new HttpHeaders({
            'Authorization': 'Basic  ' + encoded,
            'Content-Type': 'application/x-www-form-urlencoded;',
        }),
    });
  
  }
}
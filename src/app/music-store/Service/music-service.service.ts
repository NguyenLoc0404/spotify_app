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


  generateNewToken() {
    const urlGetAccesToken = 'https://accounts.spotify.com/authorize?';
    const client_id = '61a99f3e8dda4664beff04e1ca223ccb';
    const response_type = 'token'; //code
    const client_secret = '9e5333c3d4b64c2abfb86f814459e5be';
    const redirect_uri = 'http://localhost:4200/music';
    const scope = 'user-read-playback-position';
    const finalUrlGetToken =
      urlGetAccesToken +
      'client_id=' +
      `${client_id}&` +
      'response_type=' +
      `${response_type}&` +
      'redirect_uri=' +
      `${redirect_uri}&` +
      'scope=' +
      scope;
    return finalUrlGetToken;
  }
}

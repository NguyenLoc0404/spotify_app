import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}
  searchMusic(q: string, accessToken: string, type: string) {
    const url = 'https://api.spotify.com/v1/search';
    const limit = 10;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }),

      params: {
        q: q,
        type: type,
        limit: limit.toString(),
      },
    });
  }

  getCurrentUserPlaylists(accessToken: string){
    const url = 'https://api.spotify.com/v1/me/playlists';
    return this.http.get(url,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      })
    })
  }

  getCurrentTracksInPlaylist(idOfPlaylist: string, accessToken: string) {
    const url = `https://api.spotify.com/v1/playlists/${idOfPlaylist}/tracks`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }),

      params: {
        playlist_id: idOfPlaylist
      },
    });
  }

  getCurrentTrack(idOfTrack: string,accessToken: string){
    const url = `https://api.spotify.com/v1/tracks/${idOfTrack}`;
    return this.http.get(url,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      })
    })
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

  generateAccessToken() {
    const client_id = '61a99f3e8dda4664beff04e1ca223ccb';
    const client_secret = '9e5333c3d4b64c2abfb86f814459e5be';
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic  ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded;',
      }),
    });
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
      `${scope}&` + 'response_type=token' ;
    return finalUrlGetToken;
  }
}

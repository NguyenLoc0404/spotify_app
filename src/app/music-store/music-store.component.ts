import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MusicService } from './Service/music-service.service';
@Component({
  selector: 'app-music-store',
  templateUrl: './music-store.component.html',
  styleUrls: ['./music-store.component.scss'],
})
export class MusicStoreComponent implements OnInit {
  url = 'https://accounts.spotify.com/authorize?';
  client_id = '61a99f3e8dda4664beff04e1ca223ccb';
  response_type = 'token'; //code
  client_secret = '9e5333c3d4b64c2abfb86f814459e5be';
  redirect_uri = 'http://localhost:4200/';
  scope = 'user-read-playback-position';
  finalUrlGetToken: string = '';
  accessToken: string = '';
  keyword: string = '';
  artists: any;
  default: boolean = false;
  tokenExprise: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private musicService: MusicService
  ) {
    this.finalUrlGetToken =
      this.url +
      'client_id=' +
      `${this.client_id}&` +
      'response_type=' +
      `${this.response_type}&` +
      'redirect_uri=' +
      `${this.redirect_uri}&` +
      'scope=' +
      this.scope;
  }
 
  searchArtist() {
    if (this.accessToken && !this.tokenExprise) {
      console.log('this.keyword', this.keyword);
      if (this.keyword.length > 0) {
        this.musicService
          .searchArtist(this.keyword, this.accessToken)
          .subscribe(
            (res: any) => {
              this.artists = res.artists.items;
            },
            (error) => {
              console.log('error', error);
              if ((error.status = 401)) {
                this.tokenExprise = true;
              }
            }
          );
      }
    }
  }
 
  getNewToken() {
    this.musicService.generateNewToken().subscribe(res => {
      console.log('res',res);
      
    })
    // window.location.href = `${this.finalUrlGetToken}`;
  }
 
  ngOnInit(): void {
    // if (JSON.parse(sessionStorage.getItem('accessToken')) && !this.tokenExprise) {
    //   this.accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    //   this.location.go('');
    // } else {
    this.activeRoute.fragment.subscribe((res) => {
      if (res && res.length > 0 && res.includes('access_token')) {
        this.accessToken = res.slice(res.indexOf('=') + 1, res.indexOf('&'));
        // sessionStorage.setItem(
        //   'accessToken',
        //   JSON.stringify(this.accessToken)
        // );
        this.location.go('');
      }
    });
    // }
  }
 
  ngDoCheck() {
    if (!this.default) {
      this.musicService.currentMessage.subscribe((res: any) => {
        if (res == true) {
          this.default = res;
          this.searchArtist();
        }
      });
    }
  }
}
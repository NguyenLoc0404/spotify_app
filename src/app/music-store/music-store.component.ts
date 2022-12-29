import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MusicService } from './Service/music-service.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-music-store',
  templateUrl: './music-store.component.html',
  styleUrls: ['./music-store.component.scss'],
})
export class MusicStoreComponent implements OnInit {
  accessToken: string = '';
  keyword: string = '';
  artists: any;
  tracks: any;
  playlists: any;
  default: boolean = false;
  tokenExprise: boolean = false;
  currentToken: any = sessionStorage.getItem('accessToken');
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private musicService: MusicService,
  ) {}

  searchMusic(type: string) {
    if (this.accessToken && !this.tokenExprise) {
      if (this.keyword.length > 0) {
        this.musicService
          .searchMusic(this.keyword, this.accessToken,type)
          .subscribe(
            (res: any) => {
              if(type == 'artist')
                this.artists = res.artists.items;
              else {
                this.tracks = res.tracks.items;
              }  
            },
            (error) => {
              if ((error.status = 401)) {
                this.tokenExprise = true;
              }
            }
          );
      }
    }
  }

  getCurrentPlaylist(){
    this.musicService.getCurrentUserPlaylists(this.accessToken).subscribe((res:any) => {
      this.playlists = res.items;
    })

  }

  getNewToken() {
    if (this.musicService.generateNewToken().length > 0)
      window.location.href = `${this.musicService.generateNewToken()}`;
  }

  ngOnInit(): void {
    if (this.currentToken) {
      this.accessToken = JSON.parse(this.currentToken);
    } else {
      this.activeRoute.fragment.subscribe((res) => {
        if (res && res.length > 0 && res.includes('access_token')) {
          this.accessToken = res.slice(res.indexOf('=') + 1, res.indexOf('&'));
          sessionStorage.setItem(
            'accessToken',
            JSON.stringify(this.accessToken)
          );
          this.location.go('/music');
        }
      });
    }
  }
}

interface Post {
  content: string;
}
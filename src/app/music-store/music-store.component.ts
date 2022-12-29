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
  clickInformation = {
    isClickSearch: false,
    isTypeTrack: false,
    isTypeCurrentList: false
  };
  isLoading: boolean = false;

  selectedTypeSearch: string = 'Choose Search Type';

  options = [
    { name: "Choose Search Type", value: 0 },
    { name: "track", value: 1 },
    { name: "artist", value: 2 },
    { name: "Current User Playlists", value: 3 },
  ]
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private musicService: MusicService,
  ) { }

  searchMusic() {
    this.isLoading = true;
    this.clickInformation.isClickSearch = true;
    if (this.selectedTypeSearch === 'Current User Playlists') {
      this.clickInformation.isTypeCurrentList = true;
      this.getCurrentPlaylist();
    } else {
      if (this.selectedTypeSearch === 'track') {
        this.clickInformation.isTypeTrack = true;
      }

      if (this.accessToken && !this.tokenExprise) {
        if (this.keyword.length > 0) {
          this.musicService
            .searchMusic(
              this.keyword,
              this.accessToken,
              this.selectedTypeSearch
            )
            .subscribe(
              (res: any) => {
                this.isLoading = false;
                if (this.selectedTypeSearch == 'artist')
                  this.artists = res.artists.items;
                else {
                  this.tracks = res.tracks.items;
                }
              },
              (error) => {
                this.isLoading = false;
                if ((error.status = 401)) {
                  this.tokenExprise = true;
                }
              }
            );
        }
      }
    }
  }

  changeType() {
    this.artists = [];
    this.tracks = [];
    this.playlists = [];
    this.clickInformation.isClickSearch = false;
    this.clickInformation.isTypeTrack = false;
    this.clickInformation.isTypeCurrentList = false;
    this.keyword = '';
  }

  isDisableInput(typeSearch: string) {
    if (typeSearch === ('Choose Search Type') || (typeSearch === 'Current User Playlists'))
      return true;
    return false;
  }

  getCurrentPlaylist() {
    this.musicService.getCurrentUserPlaylists(this.accessToken).subscribe((res: any) => {
      this.isLoading = false;
      this.playlists = res.items;
    },
      (error) => {
        this.isLoading = false;
        if ((error.status = 401)) {
          this.tokenExprise = true;
        }
      }
    )

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
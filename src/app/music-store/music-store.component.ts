import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MusicService } from './Service/music-service.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  contactTemplate = {
    content: ''
  };

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]]
  });

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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm.controls['name'].disable();
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

  returnColor(input: any) {
    
    if (input.status === 'DISABLED' || (input.status === 'INVALID' && input.value.length === 0 && !input.touched)) 
      return '#ced4da';
    else if (input.status === 'INVALID' && ((input.value.length > 0)|| input.touched ))
      return 'red';
    else return 'green';
  }


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
        this.musicService
          .searchMusic(
            this.contactForm.controls['name'].value,
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
                sessionStorage.clear();;
              }
            }
          );
      }
    }
  }

  changeType() {
    if (this.isDisableInput(this.selectedTypeSearch))
      this.contactForm.controls['name'].disable();
    else this.contactForm.controls['name'].enable();
    this.artists = [];
    this.tracks = [];
    this.playlists = [];
    this.clickInformation.isClickSearch = false;
    this.clickInformation.isTypeTrack = false;
    this.clickInformation.isTypeCurrentList = false;
    this.contactForm.controls['name'].setValue('');
    this.contactForm.controls['name'].markAsUntouched();
  }

  isDisableInput(typeSearch: string) {
    if (typeSearch === ('Choose Search Type') || (typeSearch === 'Current User Playlists'))
      return true;
    return false;
  }

  isDiableSearchButton() {
    if (this.selectedTypeSearch === 'Choose Search Type' || (this.contactForm.status === "INVALID"))
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
          sessionStorage.clear();;
        }
      }
    )

  }

  getNewToken() {
    if (this.musicService.generateNewToken().length > 0)
      window.location.href = `${this.musicService.generateNewToken()}`;
  }


}

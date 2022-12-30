import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MusicService } from './Service/music-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACCESSTOKEN, ACCESS_TOKEN, CHOOSE_SEARCH_TYPES, COLORS_AND_STATUS, NAME } from 'src/assets/constans';
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
  currentToken: any = sessionStorage.getItem(ACCESSTOKEN);
  clickInformation = {
    isClickSearch: false,
    isTypeTrack: false,
    isTypeCurrentList: false
  };
  isLoading: boolean = false;

  selectedTypeSearch: string = CHOOSE_SEARCH_TYPES.CHOOSE_SEARCH_TYPES;

  contactTemplate = {
    content: ''
  };

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]]
  });

  options = [
    { name: CHOOSE_SEARCH_TYPES.CHOOSE_SEARCH_TYPES, value: 0 },
    { name: CHOOSE_SEARCH_TYPES.TRACK, value: 1 },
    { name: CHOOSE_SEARCH_TYPES.ARTIST, value: 2 },
    { name: CHOOSE_SEARCH_TYPES.CURRENT_USER_PLAYLISTS, value: 3 },
  ]
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private musicService: MusicService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm.controls[NAME].disable();
    if (this.currentToken) {
      this.accessToken = JSON.parse(this.currentToken);
    } else {
      this.activeRoute.fragment.subscribe((res) => {
        if (res && res.length > 0 && res.includes(ACCESS_TOKEN)) {
          this.accessToken = res.slice(res.indexOf('=') + 1, res.indexOf('&'));
          sessionStorage.setItem(
            ACCESSTOKEN,
            JSON.stringify(this.accessToken)
          );
          this.location.go('/music');
        }
      });
    }
  }

  returnColor(input: any) {
    if (input.status === COLORS_AND_STATUS.DISABLED || (input.status === COLORS_AND_STATUS.INVALID && input.value.length === 0 && !input.touched))
      return COLORS_AND_STATUS.BLACK;
    else if (input.status === COLORS_AND_STATUS.INVALID && ((input.value.length > 0) || input.touched))
      return COLORS_AND_STATUS.RED;
    else return COLORS_AND_STATUS.GREEN;
  }


  searchMusic() {
    this.isLoading = true;
    this.clickInformation.isClickSearch = true;
    if (this.selectedTypeSearch === CHOOSE_SEARCH_TYPES.CURRENT_USER_PLAYLISTS) {
      this.clickInformation.isTypeCurrentList = true;
      this.getCurrentPlaylist();
    } else {
      if (this.selectedTypeSearch === CHOOSE_SEARCH_TYPES.TRACK) {
        this.clickInformation.isTypeTrack = true;
      }

      if (this.accessToken && !this.tokenExprise) {
        this.musicService
          .searchMusic(
            this.contactForm.controls[NAME].value,
            this.accessToken,
            this.selectedTypeSearch
          )
          .subscribe(
            (res: any) => {
              this.isLoading = false;
              if (this.selectedTypeSearch == CHOOSE_SEARCH_TYPES.ARTIST)
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
      this.contactForm.controls[NAME].disable();
    else 
      this.contactForm.controls[NAME].enable();
    this.artists = [];
    this.tracks = [];
    this.playlists = [];
    this.clickInformation.isClickSearch = false;
    this.clickInformation.isTypeTrack = false;
    this.clickInformation.isTypeCurrentList = false;
    this.contactForm.controls[NAME].setValue('');
    this.contactForm.controls[NAME].markAsUntouched();
  }

  isDisableInput(typeSearch: string) {
    if (typeSearch === (CHOOSE_SEARCH_TYPES.CHOOSE_SEARCH_TYPES) || (typeSearch === CHOOSE_SEARCH_TYPES.CURRENT_USER_PLAYLISTS))
      return true;
    return false;
  }

  isDiableSearchButton() {
    if (this.selectedTypeSearch === CHOOSE_SEARCH_TYPES.CHOOSE_SEARCH_TYPES || (this.contactForm.status === COLORS_AND_STATUS.INVALID))
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

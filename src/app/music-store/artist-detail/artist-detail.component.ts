import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MusicService } from '../Service/music-service.service';
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
})
export class ArtistDetailComponent implements OnInit {
  @Input() artists: any;
  @Input() accessToken: any;
  // @Input() default: any;
  artistsList: any;
  selectArtist: any;
  token: any;
  topTrack: any;
  // reload: any;
  constructor(private musicService: MusicService) {}
 
  ngOnInit(): void {}
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['artists'] && changes['artists'].currentValue) {
      const change = changes['artists'].currentValue;
      this.artistsList = change;
    }
 
    if (changes['accessToken'] && changes['accessToken'].currentValue) {
      const token = changes['accessToken'].currentValue;
      this.token = token;
    }
 
    if (this.artistsList)
      this.artistsList.map((ele: { display: boolean; }) => {
        ele.display = true;
      });
 
    // if (changes.default && changes.default.currentValue) {
    //   const default1 = changes.default.currentValue;
    //   this.reload = default1;
    //   if (this.reload) this.topTrack = [];
    // }
  }
 
  returnGenres(input: any[]) {
    return input.map((ele, index) => {
      if (index == input.length - 1) return ele;
      else return ele + ', ';
    });
  }
 
  async viewTopTrack(item: any, i: any) {
    item.click = !item.click;
    this.artistsList.map((ele: any, index: number) => {
      if (index != i) {
        ele.display = false;
      } else ele.display = true;
    });
    this.selectArtist = item;
 
    await this.musicService
      .getTopTracksById(item.id, this.token)
      .subscribe((res: any) => {
        this.topTrack = res.tracks;
      },
      (error) => {
        console.log('error', error);
        if(error.status = 401){
            alert('123');
        }
      });
  }
}
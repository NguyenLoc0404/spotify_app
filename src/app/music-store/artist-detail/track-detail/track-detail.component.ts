import { Component,Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MusicService } from '../../Service/music-service.service';
 
@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  @Input() topTrack: any;
  @Input() tracksList: any;

  @Input() artistsList: any;
  @Input() playlists: any;

  @Input() index: any;
  @Input() indexOfPlaylist: any;

  tracks:any;
  constructor() { }
 
  ngOnInit(): void {
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topTrack'] && changes['topTrack'].currentValue) {
      const change = changes['topTrack'].currentValue;
      this.tracks = change;
    }

    if (changes['tracksList'] && changes['tracksList'].currentValue) {
      const change = changes['tracksList'].currentValue;
      this.tracks = change;
      this.tracks = this.tracks.map((ele: any) => ele.track);
    }
  }

  backList(){
    this.tracks = [];
    if(this.topTrack){
      this.artistsList.map((ele: any, index: number) => {
        ele.display = true;
      });
    }
    if(this.tracksList){
      this.playlists.map((ele: any, index: number) => {
        ele.display = true;
      });
    }

  }
 
}
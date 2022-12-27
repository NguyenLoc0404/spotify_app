import { Component,Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MusicService } from '../../Service/music-service.service';
 
@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  @Input() topTrack: any;
  @Input() artistsList: any;
  @Input() index: any;
  tracks:any;
  constructor(private musicService: MusicService) { }
 
  ngOnInit(): void {
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['topTrack']?.currentValue;
    this.tracks = change;
  }
  backList(){
    this.tracks = [];
    this.artistsList.map((ele: any, index: number) => {
      ele.display = true;
    });
  }
 
}
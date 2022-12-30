import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MusicService } from '../Service/music-service.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() playlists: any;
  @Input() accessToken: any;
  @Input() clickInformation: any;
  indexOfPlaylist: number = -1;
  playList: any;
  token: any;
  tracksList: any;
  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playlists'] && changes['playlists'].currentValue) {
      const change = changes['playlists'].currentValue;
      this.playList = change;
    }

    if (changes['accessToken'] && changes['accessToken'].currentValue) {
      const token = changes['accessToken'].currentValue;
      this.token = token;
    }

    if (this.playList)
      this.playList.map((ele: any) => {
        ele.display = true;
      });
  }

  async viewListDetail(item: any, i: number) {
    this.indexOfPlaylist = i;
    this.playList.map((ele: any, index: number) => {
      if (index != i) {
        ele.display = false;
      } else ele.display = true;
    });

    await this.musicService
      .getCurrentTracksInPlaylist(item.id, this.token)
      .subscribe((res: any) => {
        this.tracksList = res.items;
      },
        (error) => {
          if (error.status = 401) {
            sessionStorage.clear();;
          }
        });
  }

}

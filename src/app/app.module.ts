import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArtistDetailComponent } from './music-store/artist-detail/artist-detail.component';
import { TrackDetailComponent } from './music-store/artist-detail/track-detail/track-detail.component';
import { MusicStoreComponent } from './music-store/music-store.component';
import { PlaylistsComponent } from './music-store/playlists/playlists.component';
@NgModule({
  declarations: [
    AppComponent,
    MusicStoreComponent,
    ArtistDetailComponent,
    TrackDetailComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
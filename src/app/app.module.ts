import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArtistDetailComponent } from './music-store/artist-detail/artist-detail.component';
import { TrackDetailComponent } from './music-store/artist-detail/track-detail/track-detail.component';
import { PlaylistsComponent } from './music-store/playlists/playlists.component';
import { HightlightDirective } from './shared/highlight.directive';
import { MusicStoreComponent } from './music-store/music-store.component';
@NgModule({
  declarations: [
    AppComponent,
    MusicStoreComponent,
    ArtistDetailComponent,
    TrackDetailComponent,
    PlaylistsComponent,
    HightlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
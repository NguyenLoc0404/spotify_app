import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArtistDetailComponent } from './music-store/artist-detail/artist-detail.component';
import { TrackDetailComponent } from './music-store/artist-detail/track-detail/track-detail.component';
import { PlaylistsComponent } from './music-store/playlists/playlists.component';
import { HightlightDirective } from './shared/highlight.directive';
import { MusicStoreComponent } from './music-store/music-store.component';
import { AuthInterceptorService } from './music-store/Service/auth-interceptor.service';
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
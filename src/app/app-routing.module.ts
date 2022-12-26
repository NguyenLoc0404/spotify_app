import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackDetailComponent } from './music-store/artist-detail/track-detail/track-detail.component';
import { MusicStoreComponent } from './music-store/music-store.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'music', pathMatch: 'full' },
  {
    path: 'music',
    component: MusicStoreComponent,
  },
  {
    path: 'music/:id',
    component: TrackDetailComponent,
  },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
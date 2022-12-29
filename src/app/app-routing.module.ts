import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicStoreComponent } from './music-store/music-store.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'music', pathMatch: 'full' },
  { path: 'music', component: MusicStoreComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
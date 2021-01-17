import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicsPage } from './musics.page';

const routes: Routes = [
  {
    path: '',
    component: MusicsPage
  },
  {
    path: 'add-music',
    loadChildren: () => import('./add-music/add-music.module').then( m => m.AddMusicPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicsPageRoutingModule {}

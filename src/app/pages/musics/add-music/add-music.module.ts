import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddMusicPageRoutingModule } from './add-music-routing.module';

import { AddMusicPage } from './add-music.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMusicPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddMusicPage]
})
export class AddMusicPageModule {}

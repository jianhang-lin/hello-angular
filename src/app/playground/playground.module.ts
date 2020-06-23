import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';

@NgModule({
  declarations: [PlaygroundComponent, OneComponent, TwoComponent, ThreeComponent],
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }

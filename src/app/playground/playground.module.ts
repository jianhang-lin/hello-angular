import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { TrimSpacePipe } from './trim-space.pipe';

@NgModule({
  declarations: [PlaygroundComponent, OneComponent, TwoComponent, ThreeComponent, TrimSpacePipe],
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }

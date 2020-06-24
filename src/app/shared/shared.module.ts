import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdlModule } from '@angular-mdl/core';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MdlModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MdlModule
  ]
})
export class SharedModule { }

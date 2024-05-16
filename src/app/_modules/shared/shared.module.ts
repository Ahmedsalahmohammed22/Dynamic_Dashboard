import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-circus' }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
  ],
  exports:[
    PaginationModule,
    NgxSpinnerModule,
    ToastrModule,
  ]
})
export class SharedModule { }

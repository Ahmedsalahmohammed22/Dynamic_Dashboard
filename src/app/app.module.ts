import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { SharedModule } from './_modules/shared/shared.module';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

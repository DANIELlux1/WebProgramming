import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { InternshipComponent } from './internship/internship.component';
import { AdminComponent } from './admin/admin.component';
import { TweetComponent } from './tweet/tweet.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TweetPostComponent } from './tweet/tweet-post/tweet-post.component';
import { ProfileComponent } from './profile/profile.component';
import { JoinInternshipComponent } from './internship/join-internship/join-internship.component';
import { ApiDownComponent } from './error/api-down/api-down.component';
import { ManageUserComponent } from './manage/manage-user/manage-user.component';
import { ManageInternshipComponent } from './manage/manage-internship/manage-internship.component';
import { InternshipItemComponent } from './manage/manage-internship/internship-item/internship-item.component';
import { UserItemComponent } from './manage/manage-user/user-item/user-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    HeaderComponent,
    InternshipComponent,
    AdminComponent,
    TweetComponent,
    HomeComponent,
    TweetPostComponent,
    ProfileComponent,
    JoinInternshipComponent,
    ApiDownComponent,
    ManageUserComponent,
    ManageInternshipComponent,
    InternshipItemComponent,
    UserItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

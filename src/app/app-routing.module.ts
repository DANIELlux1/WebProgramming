import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiDownComponent } from './error/api-down/api-down.component';
import { JoinInternshipComponent } from './internship/join-internship/join-internship.component';
import { ManageUserComponent } from './manage/manage-user/manage-user.component';
import { ManageInternshipComponent } from './manage/manage-internship/manage-internship.component';
import { TweetPostComponent } from './tweet/tweet-post/tweet-post.component';
import { AddUserComponent } from './manage/manage-user/add-user/add-user.component';
import { ManageComponent } from './manage/manage.component';
import { AddInternshipComponent } from './manage/manage-internship/add-internship/add-internship.component';

const appRoutes: Routes = [
    {path: "", redirectTo: "/auth", pathMatch: "full"},
    {path: "auth", component: AuthComponent},
    {path: "home", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "internship", component: JoinInternshipComponent},
    {path: "post", component: TweetPostComponent},
    {path: "error", component: ApiDownComponent},
    {path: "manage", component: ManageComponent, children:
    [
        {path: "user", component: ManageUserComponent},
        {path: "internship", component: ManageInternshipComponent},
        {path: "addInternship", component: AddInternshipComponent},
        {path: "addUser", component: AddUserComponent}
    ]},
    {path: "addUser", component: AddUserComponent},
    {path: "postTweet", component: TweetPostComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
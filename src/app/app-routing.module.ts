import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ApiDownComponent } from './error/api-down/api-down.component';
import { JoinInternshipComponent } from './internship/join-internship/join-internship.component';
import { ManageUserComponent } from './manage/manage-user/manage-user.component';
import { ManageInternshipComponent } from './manage/manage-internship/manage-internship.component';

const appRoutes: Routes = [
    {path: "", redirectTo: "/auth", pathMatch: "full"},
    {path: "auth", component: AuthComponent},
    {path: "home", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "internship", component: JoinInternshipComponent},
    {path: "error", component: ApiDownComponent},
    {path: "manageUser", component: ManageUserComponent},
    {path: "manageInternship", component: ManageInternshipComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
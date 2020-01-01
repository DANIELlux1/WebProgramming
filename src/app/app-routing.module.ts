import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InternshipComponent } from './internship/internship.component';

const appRoutes: Routes = [
    {path: "", redirectTo: "/auth", pathMatch: "full"},
    {path: "auth", component: AuthComponent},
    {path: "home", component: HomeComponent},
    {path: "profile/:id", component: ProfileComponent},
    {path: "internship", component: InternshipComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
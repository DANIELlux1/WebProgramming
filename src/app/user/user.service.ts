import { Injectable } from "@angular/core";
import { User } from './user.model';
import { TestBed } from '@angular/core/testing';
import { Tweet } from '../tweet/tweet.model';

@Injectable({providedIn: "root"})
export class UserService{

    //id, email, userName, name, category, profilePic, tweets
    private user: User[] = [new User("1",
                                     "test@TestBed.com",
                                     "Tester1",
                                     "Tester1",
                                     "Student",
                                     "https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg",
                                     [
                                        new Tweet("Tester1","This is the first Test Tweet. As mentioned this is number one"),
                                        new Tweet("Tester1","This is the second Test Tweet. I just want to check if multiple tweets will be shown."),
                                        new Tweet("Tester1","This is a Tweet with an image to see if optionals work.", 
                                                  "https://p1.pxfuel.com/preview/306/9/101/animal-cat-monty-pets-royalty-free-thumbnail.jpg")
                                     ] 
                                ),
                            new User("2",
                                    "test2@TestNO2.com",
                                    "Tester2",
                                    "Tester2",
                                    "Teacher",
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgmFYtOsa_VJIA-zPcLtOvpm97znL3gSH-r2wOHrfZCdlpnWFww&s",
                                    [
                                        new Tweet("Tester2","This is the first Test Tweet. As mentioned this is number one"),
                                        new Tweet("Tester2","This is the second Test Tweet. I just want to check if multiple tweets will be shown."),
                                        new Tweet("Tester2","This is a Tweet with an image to see if optionals work.", 
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQWY9pUXti6vH6OUBZ9hu55Z82qPLrPHJLUKjBxh9WAFHwz0sNg&s")
                                    ] 
                                )
                            ]

    getUser(id: string){
        
        let found = false;
        let i = 0;

        while(!found && i < this.user.length)
        {
            if(id === this.user[i].id)
            {
                return this.user[i];
            }
            i++;
        }

        return undefined;
    }

    getUsers(){
        return this.user;
    }
}
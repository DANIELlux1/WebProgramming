import { Injectable } from '@angular/core';
import { Internship } from './internship.model';

@Injectable({providedIn: "root"})
export class InternshipService{

    private internships: Internship[] = [new Internship("BINFO",
                                                        "BINFO",
                                                        "Bachelor in Information Technology.",
                                                        "Tester2",
                                                        undefined,
                                                        undefined,
                                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Qg0tNZr3PK20cbVRf0RrGPZtc7DevNyaHyTa4bf9L7EcOeNp&s"),
                                         new Internship("BICS",
                                                        "BICS",
                                                        "Bachelor in Information Technology.",
                                                        "Tester3",
                                                        undefined,
                                                        undefined,
                                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Qg0tNZr3PK20cbVRf0RrGPZtc7DevNyaHyTa4bf9L7EcOeNp&s")


    ]


}
export class Internship{

    public internshipID: string;
    public title: string;
    public description: string;
    public profilePic: string;
    public academicSupervisor: string;


     constructor(id: string,
                title: string,
                description: string,
                academicSupervisorID: string,
                profilePic?: string
    ){
        this.internshipID = id;
        this.title = title;
        this.description = description;
        this.academicSupervisor = academicSupervisorID;
        this.profilePic = profilePic;
    }
}


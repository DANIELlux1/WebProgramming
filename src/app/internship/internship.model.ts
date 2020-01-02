export class Internship{

    public id: string;
    public title: string;
    public description: string;
    public profilePic: string;
    public studentIDs: string[];
    public localSupervisorIDs: string[];
    public academicSupervisorID: string;


    constructor(id: string,
                title: string,
                description: string,
                academicSupervisorID: string,
                localSupervisor?: string[],
                studentIDs?: string[],
                profilePic?: string
    ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.academicSupervisorID = academicSupervisorID;
        this.localSupervisorIDs = localSupervisor;
        this.studentIDs = studentIDs;
        this.profilePic = profilePic;
    }
}


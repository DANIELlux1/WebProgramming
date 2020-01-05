const express = require("express")
const mysql   = require('mysql')
const cors    = require('cors')
const jwt = require('jsonwebtoken')
const shajs = require('sha.js')

const app = express()
const port = process.env.PORT || 3000

const key = new Map()

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'twitter'
})

app.get("/login", (req, res) => {
    x = req.query.x
    user = req.query.userName
    date = Date.now()
    key[user] = {x, date}
    res.send({date})
})

app.post("/login", async (req, res) => {

    const userName = req.body.userName
    const password = req.body.password
    const token = jwt.sign({_id: userName}, "fakeTwitter", {expiresIn: 60*10})

    connection.query("SELECT password FROM user WHERE userName = '" + userName + "'", (err, r, f) => {
        if(err)
        {
            res.send(err)
        }
        
        let date = key[userName].date
        let x = key[userName].x
        let pw = ""
        if(r[0] != undefined && r[0].password)
        {
            pw = r[0].password
        }
        let test = shajs("sha256").update(x + pw + date).digest('hex')

        if(test === password)
        {
            connection.query("UPDATE user SET _token = '"+ token +"'  WHERE userName='"+ userName +"' AND password='"+r[0].password+"';",
            (error, result, field) => {
                if(error)
                {
                    res.send(error)
                }
                else{
                    if(result.affectedRows === 1)
                    {
                        if(userName === "root")
                        {
                            return res.send({token,special:"is Admin."})
                        }
                        res.send({token})
                    }
                    else{
                        res.send({error: "No such credentials were found."})
                    }
                }
            })
        }else{
            res.send({error : "There was an Error with your credentials."})
        }
    })
})

app.get("/test", (req, res) => {
    res.send("Hello I work fine.")
})

app.patch("/disableUser", (req, res) => {

    user = req.body.userName
    status = req.body.deactivated

    connection.query("UPDATE user SET deactivated = '" + status + "' WHERE userName = '"+ user +"';",
     (error, result, field) => {
        if(error)
        {
            res.send(error)
        }else
        {
            res.send("Success!")
        }
    })
})

app.post("/join", (req, res) => {

    const user = req.body.userName
    const intern = req.body.internship

    connection.query("INSERT INTO student (userName, internship) VALUES ('" + user + "', '" + intern +"');", 
    (error,result,field) => {
        if(error)
        {
            console.log(error)
            res.send(error)
        }else
        {
            console.log(result)
            res.send("Success!")
        }
    })

})

app.post("/addInternship", (req, res) => {

    const title = req.body.title
    const des = req.body.description
    const supervisor = req.body.supervisor

    const values = "'" + title + "'," + "'" + des + "'," + "'" + supervisor + "'"

    connection.query("INSERT INTO internship (title,description,academicSupervisor) VALUES (" +values+");",
    (error,result,field) => {
        if(error)
        {
            res.send(error)
        }else
        {
            res.send("Success!")
        }
    })
})

app.post("/addUser", (req, res) => {

    var destination = ""
    var values = ""

    if(req.body.userName)
    {
        destination = destination + "userName, "
        values = values + "'" + req.body.userName + "', "
    }

    if(req.body.password)
    {
        destination = destination + "password, "
        values = values + "'" + req.body.password + "', "
    }

    if(req.body.name)
    {
        destination = destination + "name, "
        values = values + "'" + req.body.name + "', "
    }

    if(req.body.email)
    {
        destination = destination + "email"
        values = values + "'" + req.body.email
    }

    connection.query("INSERT INTO user (" + destination + ") VALUES (" + values +"');", 
                        (error, result, fields) => {
                            if(error)
                            {
                                res.send({error: "User couldn't be added."})
                            }
                            else
                            {
                                res.send({success: "User has been added."})
                            }
    })
})


app.listen(port, () => {
    console.log("Comunication API up and running on: " + port)
})

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
})



//TO DO

app.get("/tweet", (req, res) => {

    let cond

    user = req.query.user
    intern = req.query.intern

    if(user || intern)
    {
        cond = "WHERE ";
    }

    if(user)
    {
        cond = cond + "owner = '" + user + "'"   
    }

    if(intern)
    {
        if(user)
        {
            cond = cond + " AND "
        }

        cond = cond + "internshipID = '" + intern + "'"
    }

    fetch("tweet", cond, req, res)

})

app.get("/users", (req, res) => {

    const token = req.query.token
    let cond
    if(token)
    {
        cond="WHERE _token = '" + token + "'"
    }
    
    fetch("user", cond , req, res)
})

app.get("/student", (req, res) => {
    fetch("student" ,"WHERE userName ='"+ req.query.user +"'", req, res)
})

app.get("/internship", (req, res) => {
    fetch("internship" ,"", req, res)
})

fetch = (table, cond, req, res) => {

    connection.query("SELECT * FROM " + table + " " + cond + ";",
    (error, result, fields) => {
        if(error)
        {
            err = error
            res.send(error)
        }
        else
        {
            res.send(result)
        }
    })
}

app.post("/tweet", (req, res) => {

    console.log("inside Tweet.")
    
    user = req.body.userName
    intern = req.body.internship
    message = req.body.message
    ts = Date.now()
    _date  = new Date(ts)

    date = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate()

    destination = "owner, internshipID, message, postDate "
    values =  "'" + user + "','" + intern + "','" + message + "','" + date

    connection.query("INSERT INTO tweet (" + destination + ") VALUES (" + values +"');",
    (error, result, fields) => {
        if(error)
        {
            res.send({error: "couldnt post Message."})
        }
        else
        {
            res.send({success: "Message has been posted."})
        }
    })
})

app.patch("/logout", (req, res) => {
    token = req.body.token
    connection.query("UPDATE user SET _token = 'null' WHERE _token = '"+ token +"';", (error,result,field) => {
        if(error)
        {
            res.send(error)
        }
        else
        {
            res.send({success: "Logout success."})
        }
    })
})

app.patch("/switchCategory", (req, res) => {
    userName = req.body.user
    category = req.body.category

    connection.query("Update user SET category='"+category+"' WHERE userName='"+ userName +"'",
    (error, result, fields) => {
        if(error)
        {
            err = error
            res.send(error)
        }
        else
        {
            res.send(result)
        }
    })
})

app.get("/loadHome", (req, res) => {
    userName = req.query.user

    connection.query(
    "SELECT * " +
    "FROM tweet AS T, (SELECT internship FROM student WHERE userName='" + userName + "') AS S " +
    "WHERE T.internshipID = S.internship",
    (error, result, fields) => {
        if(error)
        {
            err = error
            res.send(error)
        }
        else
        {
            res.send(result)
        }
    })
})
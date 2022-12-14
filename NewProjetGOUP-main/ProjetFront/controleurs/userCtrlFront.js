const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');


exports.addUser = async (req, res) => {
    console.log('-------- toto -------', req.body); 
    const data = {
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        password  : req.body.password,
    };
    console.log('-------- data -------', data); 

    fetch('http://localhost:3500/api/register', {
      
        // Adding method type
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // Adding body or contents to send
        body: JSON.stringify(data),
      
    })
    
    //Converting to JSON
    .then((res) => {  
        return res.json() 
    })
    // Displaying results to console
    .then(json => {
        console.log(json)
        if(!json.error)
            res.redirect('/login');
        else  
            res.render('register', json)
    })
}

exports.logUser = async (req, res, next) => {
   console.log('-------- toto -------', req.body); 
    await fetch('http://localhost:3500/api/login', {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        // Adding body or contents to send
        body: JSON.stringify({
            email : req.body.email,
            password  : req.body.password,
        }),
       
    })
    // Converting to JSON
    .then((res) => {  
        return res.json() 
    })
    // Displaying results to console
    .then(json => {
        localStorage.setItem('token', json.token);
        console.log('token console', localStorage.getItem('token'));
        // console.log('token console', json);
        if ( json.token) {
            res.redirect('/')
        }
        else {
            res.render('connexion', json)
        }
        })
    
    .catch((err) => {
        console.error(err);
    })

//res.redirect('/')
}
exports.logOut  = async(req, res, next) => {
    localStorage.clear();
    res.redirect('/login')
}

/*exports.getUser = async (req,res) => {
    const users= await fetch('http://localhost:3500/api/getUser',{
        headers: {
            Authorization: localStorage.getItem('token'),// Token ?? r??cup??rer
        },

    })
    const getuser = await users.json()
    if(getuser){
        console.log(getuser)
        res.render('profil',getuser)
    }
    
}*/

/*exports.getUserByToken = async (req, res, next) => {
    
    const response = await fetch('http://localhost:3500/getUser',{
        headers: {
            'Authorization':  localStorage.getItem('token')// Token ?? r??cup??rer 
        }
     });
    const myJson = await response.json();
    console.log('myJson')
    return next();
    
}*/


const express = require('express');
const exphbs = require('express-handlebars');


const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;


const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        getShortComment(comment) {
            if (comment.length < 64) {
                return comment;
            }
            return comment.substring(0, 61) + '...';
        }
    }
}));

app.use(express.static('public'));





app.get('/', function (req, res) { //view all
    //fetch
    //object
    let myHeaders = new Headers();
    myHeaders.append("app-id", "5fd803c07fe41dd32a2a4bc3");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let newObject = {};

    fetch("https://dummyapi.io/data/api/user", requestOptions)
        .then(response => response.json())
        .then(result => {

            //console.log(result.data);
            newObject.posts = result.data;
            console.log(newObject.posts);
            res.render('home', newObject);
        })
        .catch(error => console.log('error', error));


});


//single item details (get): /details/:{id}
//Create (POST): /create
//view all forms (get): /forms/all      you can change this route name
//delete form submission (delete): /delete/:{id}
//delet single form (comment?) by (ID) and render forms/all route

app.get('/details/:id', function (req, res) { //single item details
    //fetch
    //object
    let id = req.params.id;
    console.log(req.params.id);
    let myHeaders = new Headers();
    myHeaders.append("app-id", "5fd803c07fe41dd32a2a4bc3");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let newObject = {};

    fetch(`https://dummyapi.io/data/api/user/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            console.log(result);
            // newObject.posts = result.data;
            // console.log(newObject.posts);
            res.render('user', result);


            // 0F8JIqi4zwvb77FGz6Wt
            // {
            //   id: '0F8JIqi4zwvb77FGz6Wt',
            //   phone: '0700-3090279',
            //   lastName: 'Fiedler',
            //   firstName: 'Heinz-Georg',
            //   location: {
            //     state: 'Rheinland-Pfalz',
            //     street: '4118, Schulstraße',
            //     city: 'Fellbach',
            //     timezone: '-7:00',
            //     country: 'Germany'
            //   },
            //   email: 'heinz-georg.fiedler@example.com',
            //   gender: 'male',
            //   title: 'mr',
            //   registerDate: '2020-03-07T00:42:32.221Z',
            //   picture: 'https://randomuser.me/api/portraits/men/81.jpg',
            //   dateOfBirth: '1974-03-12T21:15:08.878Z'
            // }

        })
        .catch(error => console.log('error', error));


});

app.get('/myroute', function (req, res) {
    res.render('myroute', {
        testData: 'it works!',
    });
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});
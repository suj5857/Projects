const express = require('express');
const mustachExpress = require('mustache-express');
const bodyParser = require('body-parser');


const app = express();
const mustache = mustachExpress();

const { Client, Connection } = require('pg');

mustache.cache = null;
app.engine('mustache',mustache);
app.set('view engine','mustache');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));


app.get('/add',(req,res)=>{
    res.render('med-form');

});

app.post('/meds/add',(req,res)=>{
    console.log('post body',req.body);  //to see the entered data

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        console.log('connection complete');
        const sql = 'INSERT INTO meds (name,count,brand) VALUES ($1 , $2 ,$3)';     //inserting data inti data base
        const params = [req.body.name,req.body.count,req.body.brand];
        return client.query(sql,params);
    })
    .then((result)=>{
        console.log('results?',result);
        res.redirect('/meds');

    });

    

});


app.get('/meds',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        return client.query('SELECT * FROM meds');
    })
    .then((results)=>{
        console.log('results?',results);
        res.render('meds',results);

    });

});

app.post('/meds/delete/:id',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const sql = 'DELETE FROM meds WHERE mid=$1'
        const params = [req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        response.redirect('/meds');

    });

})

app.post('/meds/counti/:id',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        
        const sql = 'UPDATE meds SET count=count+1 WHERE mid=$1'
        const params = [req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        response.redirect('/meds');

    });

})

app.post('/meds/countd/:id',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        
        const sql = 'UPDATE meds SET count=count-1 WHERE mid=$1'
        const params = [req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        response.redirect('/meds');

    });

})

app.get('/meds/edit/:id',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const sql = 'SELECT * FROM meds WHERE mid=$1'
        const params = [req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        res.render('meds-edit',{med:results.rows[0]})
        

    });

})

app.post('/meds/edit/:id',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const sql = 'UPDATE meds SET name=$1 , count=$2 , brand=$3 WHERE mid=$4'
        const params = [req.body.name,req.body.count,req.body.brand,req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        res.redirect('/meds');
        

    });

})




//patient side

app.get('/register',(req,res)=>{
    res.render('patient-form');

})


app.post('/patients/register',(req,res)=>{
    console.log('post body',req.body);  //to see the entered data

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        console.log('connection complete');
        const sql = 'INSERT INTO patients (name,mob_no,doctor) VALUES ($1 , $2 ,$3)';     //inserting data inti data base
        const params = [req.body.name,req.body.mob_no,req.body.doctor];
        return client.query(sql,params);
    })
    .then((result)=>{
        console.log('results?',result);
        res.redirect('/patients');

    });

    

});

app.get('/patients',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        return client.query('SELECT * FROM patients');
    })
    .then((results)=>{
        console.log('results?',results);
        res.render('patients',results);

    });

});

app.get('/patients/edits/:id',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const sql = 'SELECT * FROM patients WHERE pid=$1'
        const params = [req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        res.render('patients-edit',{patient:results.rows[0]})
        

    });

})

app.post('/patients/edits/:id',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const sql = 'UPDATE patients SET name=$1 , mob_no=$2 , doctor=$3 WHERE pid=$4'
        const params = [req.body.name,req.body.mob_no,req.body.doctor,req.params.id];
        return client.query(sql,params);
       
    })
    .then((results)=>{
        res.redirect('/patients');
        

    });

})


app.get('/doctors',(req,res)=>{
    res.render('doctors');

})

app.get('/dashboard',(req,res)=>{
    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
    client.connect()
    .then(()=>{
       
        
        return client.query('SELECT SUM(count) FROM meds;SELECT DISTINCT COUNT(name) FROM meds;');
       
    })
    .then((results)=>{

       console.log('?results',results[0]);
       console.log('?results',results[1]);

       res.render('dashboard',{n1:results[0].rows,n2:results[1].rows});
      
        

    })

})

app.get('/dashboard',(req,res)=>{

    const client = new Client({
        user:'postgres',
        host:'localhost',
        database:'medical2',
        password:'test123',
        port:5432,

    });
client.connect()
    .then(()=>{
        const text = 'SELECT  COUNT(name) FROM patient WHERE doctor=$1'
        const values = ['Dr Roy']
        return client.query(text,values);
       
    })
    .then((results)=>{
        console.log('?results',results[0]);
        

    });

})





app.listen(5000,()=>{
    console.log('Listening to Port 5000');
})




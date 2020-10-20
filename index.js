
const express = require('express');
const cors = require('cors');
const { appData, saveData } = require('./app-data');
const app = express();
const appUtils = require('./app-utilits');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {

    res.send('ok!');
});

app.post('/account', (req, res) => {

    const user = req.body;

    if (appData.users.some((x) => x.nick === user.nick)) {

        appUtils.sendError(res, 'nick existente!');

        return;
    }

    user.id = new Date().getTime();
    user.tasks = [];
    appData.users.push(user);
    saveData();

    res.send(null);
});

app.post('/login', (req, res) => {

    const userLogged = appData.users.find((user) => req.body.nick === user.nick && req.body.password === user.password);

    if (userLogged !== undefined) {

        res.send({
            token: appUtils.generateToken(userLogged.id)
        });
    }
    else {
        appUtils.sendError(res, 'Nick ou senha invalido');
    }
});

app.post('/task', (req, res) => {

    const user = appUtils.getUser(req, res);
    if (! user) return;

    const task = {
        name: req.body.name,
        isDone: false,
        id: new Date().getTime()
    };
    
    user.tasks.push(task);
    saveData();

    res.send(task);    
});

app.put('/task', (req, res) => {

    const user = appUtils.getUser(req, res);
    if (! user) return;

    const task = user.tasks.find((task) => task.id === parseInt(req.body.id));

    task.isDone = req.body.isDone;
    saveData();

    res.send(task);    
});

app.delete('/task/:id', (req, res) => {

    const user = appUtils.getUser(req, res);
    if (! user) return;

    const taskIndex = user.tasks.findIndex((task) => task.id === parseInt(req.params.id));

    if (taskIndex === -1) {

        appUtils.sendError(res, 'Tarefa não encontrada');

        return;
    }

    user.tasks.splice(taskIndex, 1);
    saveData();

    res.send(null);
})

app.get('/tasks', (req, res) => {

    const user = appUtils.getUser(req, res);

    if (! user) return;

    res.send(user.tasks);
});

const port = 5655;

app.listen(port, () => {

    console.log(`http://localhost:${port}`);
});
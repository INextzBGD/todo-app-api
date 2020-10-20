const {appData} = require('./app-data');

exports.sendError = (res, message) => {

    res.status(400);
    res.send({
        message: message
    });
} 

exports.generateToken = (userId) => {
    
    let token = `${userId}|`;

    for (let i = 0; i < 20; i++) {

        let digite = Math.trunc(Math.random() * 10);

        token = token + digite;
    }

    return token;
}

exports.getUser = (req, res) => {

    const token = req.headers.authorization;
    const tokenData = extractTokenData(token);

    if (! tokenData) {

        res.status(401).send(null);

        return;
    }

    const user = appData.users.find((user) => user.id === tokenData.userId);

    if (! user) {

        res.status(401).send(null);

        return;
    }

    return user;
}

const extractTokenData = (token) => {

    if (! token) {

        return null;
    }

    const tokenSplit = token.split('|');

    return {
        userId: parseInt(tokenSplit[0])
    };
}
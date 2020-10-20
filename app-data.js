const fs = require(`fs`);
const fileName =  process.env.PORT ? 'app-data.json' : `../../app-data.json`;

let appData = {
    users: []
};


exports.appData = appData;

exports.saveData = () => {

    fs.writeFileSync(fileName, JSON.stringify(appData));
}

const loadData = () => {

    if (fs.existsSync(fileName)) {        
        appData = JSON.parse(fs.readFileSync(fileName, `utf-8`));
        exports.appData.users = appData.users;
    }
}

loadData();
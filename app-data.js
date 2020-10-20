const fs = require(`fs`);

let appData = {
    users: []
};


exports.appData = appData;

exports.saveData = () => {

    fs.writeFileSync(`../../app-data.json`, JSON.stringify(appData));
}

const loadData = () => {

    if (fs.existsSync(`../../app-data.json`)) {        
        appData = JSON.parse(fs.readFileSync(`../../app-data.json`, `utf-8`));
        exports.appData.users = appData.users;
    }
}

loadData();
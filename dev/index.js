var jwt = require('jsonwebtoken');
var payload = {
    scope: 'user',
    name: 'kapana',
    email: 'kapana27@gmail.com',
    iat: Math.floor(Date.now() / 1000),
    external_id: '123123123'
};

var token = jwt.sign(payload, 'BpjKhCzO0qWOMP4W5yqZJgPV9xWt4hcW1w6wfSSIJRIq6x6yrlTuM-GiJaBaM2UbQHrPmUA9SyU6KvRq6QyipQ',{
    header: {
        kid:'app_63076e69038c3000f3b6ee38'
    }
});

console.log(token)

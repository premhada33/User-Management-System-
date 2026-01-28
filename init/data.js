const { faker } = require('@faker-js/faker');
let userData = [];

    let getRandomUser = () => {

    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        // avatar: faker.image.avatar(),
        faker.internet.password(),
        // birthdate: faker.date.birthdate(),
        // registeredAt: faker.date.past(),
    ]
}
// getRandomUser();
// console.log(userData);

function generateUserData (count)
{
    userData =[]; // it will delete all data then feed some raw data , its like restart the database data 
    for (let i = 1; i <=count; i++) {
        
        userData.push(getRandomUser());
    }

    return userData;

    
}


module.exports = generateUserData ;
// console.log(userData.length);
// exports.userData =userData;






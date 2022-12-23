import fs from 'fs';
import faker from '@faker-js/faker';


let str = 'NOMBRE, APELLIDO, EMAIL, TRABAJO, LUGAR\r\n';
for (let i = 0; i < 100; i++) {
    str += faker.name.firstName() +
        ',' + faker.name.lastName() +
        ',' + faker.internet.email() +
        ',' + faker.name.jobTitle() +
        ',' + faker.random.locale() +
        '\r\n';
}
fs.writeFile('./test.csv', str, (err)=>{
    if(err){
        throw new Error(err);
    }
    console.log('Archivo guardado');
})
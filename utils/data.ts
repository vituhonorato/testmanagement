// eslint-disable-next-line no-unused-vars
let bcrypt = require('bcryptjs');





interface Certificals {
    namecertificals:string;
    slug:string;
    category:string;
    image:string;
    description:string;
    date:string;
    contact:string;

}


interface User {
    name:string;
    email: string;
    password: string
    isAdmin: boolean;
    certificals:[{
            namecertificals:string;
            slug:string;
            category:string;
            image:string;
            description:string;
            date:string;
            contact:string;


    }]
}

interface Data {
  
    
    users: User[];
}

const data:Data = {
    users:[
        {
           name:'Admin',
           email:'admin@parquedasarvores.com',
           password:bcrypt.hashSync('thmpv77d6f'),
           isAdmin: true, 
           certificals:[{
                namecertificals:'certificado',
                slug:'certificado-slug',
                category:'tecnologia',
                image:'',
                description:'curso informatica',
                date:'00/00/0000',
                contact:'7198765-1233'

           }]
        },
       
    
    ],
    

}
export default data
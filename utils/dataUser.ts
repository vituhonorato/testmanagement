let bcrypt = require('bcryptjs');
interface User {
    name:string;
    email: string;
    password: string
    isAdmin: boolean;
}
interface Data {

    users: User[];
}

const data:Data = {
    users: [
        {
            name:'admin',
            email:'admin@certificalink.com',
            password:bcrypt.hashSync('thmpv77d6f'),
            isAdmin: true, 
         },

    ]
}

export default data
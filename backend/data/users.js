import bcrypy from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypy.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Jaska Jokinen',
        email: 'jaska@example.com',
        password: bcrypy.hashSync('123456', 10),
    },
    {
        name: 'Pekka Pouta',
        email: 'pekka@example.com',
        password: bcrypy.hashSync('123456', 10),
    },
]

export default users;
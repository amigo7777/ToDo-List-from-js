//config, содержит файл конфигурации, который сообщает CLI, как подключиться к базе данных
//migrations, содержит все файлы миграции
//seeders, содержит все исходные файлы
const Router = require('express')
const cors = require('cors');
const {sequelize, User, ToDo, Token} = require('./models')
const user = require('./models/user')
const todo = require('./models/todo')

const rout = Router()

rout.use(cors());
rout.use(Router.urlencoded({ extended: true }));
rout.use(Router.json())


//POST запрос для создания нового пользователя =)
rout.post('/users', async(req, res) => {
    const {login, password, email} = req.body

    try{
        const user = await User.create({login, password, email})

        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

// запрос get вывод всех пользователей http://localhost:3000/users 
rout.get('/users', async(req,res)=>{
    try{
        const users = await User.findAll()

        return res.json(users)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// запрос get вывод пользователя по id http://localhost:3000/users/(номер id)
rout.get('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid 
    try{
        const user = await User.findOne({where:{uuid}})

        return res.json(user)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

//Удаление пользователя по его uuid
rout.delete('/users/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try{
        const user = await User.destroy({where:{uuid}})

        return res.status(200).json({message: 'The enemy is destroyed!!!=)'})

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

//удаление всех пользователей
rout.delete('/users', async(req,res)=>{
    try{
        const user = await User.findAll()

        await user.destroy()
        return res.status(200).json({message: 'Users delete('})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Someting went wrong'})
    }
})

//регистрация полььзователя и добавление в бд
rout.post('/api/auth/registration', async(req, res)=>{
    const {email, password, login} = req.body

    const user = await User.findOne({where: {email: req.body.email}})
    if(!user){
        const user = await User.create({login, password, email})
        return res.status(200).json(user)
    }
    else{
        return res.status(400).json({error: 'A user with this username or email already exists'}) // если такой пользователь уже сущ, выводт ошибку
    }

})

//авторизация пользователя
rout.post('/api/auth/login', async(req, res)=>{
    
        const user = await User.findOne({where: {login: req.body.login, password: req.body.password}})
        if(!user){
            return res.status(404).json({error: 'There is no such user'}) // Пользователя не существует
        }
        else{
            const token = await Token.create({value: generate_token(32), userId: user.id})
            return res.status(200).json({accessToken: token.value})
           // return res.status(200).json({msg: 'Such a user exists'}) //сообщение о том что пользователь существует
        }
        
})
// выход из системы удаление токена
rout.post('/api/user/logout', async(req, res)=>{
    await Token.destroy({
        where:{
            value: req.header('x-access-token'),
        },
    });
    res.status(200).json({message:'OK'});
})

//PATCH используется для частичного изменения ресурса. PUT создает новый ресурс 
//или заменяет представление целевого ресурса, данными представленными в теле запроса.

//обновление пользователя неработает, переделать... теперь работает
rout.put('/users/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    const {login, password, email} = req.body
    try{
        const user = await User.findOne({where:{uuid}})
        
        user.login = login
        user.email = email
        user.password = password

        await user.save()

        return res.json(user)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

//CRUD цикл для ToDo
//создание ToDo
rout.post('/api/todos/created', async(req, res)=>{
    // const {userId, tittle, description, isComleted, priority} = req.body
    const {tittle, description, isComleted, priority} = req.body
    try{
        //const user = await User.findOne({where:{uuid: userId}})
        // const todo = await ToDo.create({tittle, description, isComleted, priority, userId: user.uuid})
        const todo = await ToDo.create({description, isComleted, priority, tittle})
        return res.json(todo)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//показать все туду
rout.get('/api/todos', async(req, res)=>{
    try{
        const todos = await ToDo.findAll() // ToDo.findAll({include:[User]}) чтобы приавязакть пользователя к сообщению


        return res.json(todos)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//показать туду по id
rout.get('/api/todos/:uuid', async(req,res)=>{
    const uuid = req.params.uuid 
    try{
        const todos = await ToDo.findOne({
            where:{uuid}
        })

        return res.json(todos)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
// обновление туду по id не работает изменения isCompleted
rout.patch('/api/todos/:uuid', async(req, res)=>{
    // const uuid = req.params.uuid
    // const {tittle, description, isComleted, priority} = req.body
    const isComleted = req.body
    try{
        const todo = await ToDo.findOne({where:{uuid: req.params.uuid}})
        
        // todo.tittle = tittle
        // todo.description = description
        todo.isComleted = isComleted
        // todo.priority = priority

        await todo.save()
        return res.json(todo)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
// удалить все туду
rout.delete('/api/todos', async(req, res)=>{
    try{
        const todos = await ToDo.findAll()

        await todos.destroy()
        return res.status(200).json({message: 'Users delete=('})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Someting went wrong'})
    }
})
// удалить туду по id
rout.delete('/api/todos/:uuid', async(req, res)=>{
    const uuid = req.params.uuid
    try{
        const todos = await ToDo.destroy({where:{uuid}})

        return res.status(200).json({message: 'The enemy is destroyed!!!=)'})

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})


function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

rout.listen({port:3000}, async () =>{
    console.log('Server up on localhost3000')
    await sequelize.authenticate()
    console.log('Database connected!')
})

//http.createServer(rout).listen(rout.get('port'), function(){
//    console.log("Express server listening on port " + rout.get('port'))
//  })  

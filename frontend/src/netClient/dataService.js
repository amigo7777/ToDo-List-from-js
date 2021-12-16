import http from "@/netClient/config";

export async function doRegister(login, password, email){
    try{
       const response = await http.post('/auth/registration', { login, password, email });
        return response.data;
    }catch(error){
        console.error({error})
        throw error;
    }
}

export async function doLogin(login, password){
    try{
       const response = await http.post('/auth/login', {
            login,
            password,
        });
        const {accessToken} = response.data;
        localStorage.accessToken = accessToken;
        return accessToken;
    }catch(error){
        console.error({error})
        throw error;
    }
}

export async function doLogout(){
    try{
       const response = await http.post('/user/logout', {},
       {
           headers: {
               'Content-Type': "appllication/json",
               'x-access-token' : localStorage.accessToken,
           }
       });
        localStorage.removeItem('accessToken');
        return response.data;
    }catch(error){
        console.error({error})
        throw error;
    }
}

export async function fetchTodoList(){
    try{
       const response = await http.get('/todos',
       {
           headers: {
               'Content-Type': "appllication/json",
               'x-access-token' : localStorage.accessToken,
           }
       });
        return response?.data || [];
        //return response.data?.todos || [];
    }catch(error){
        console.error({error})
        throw error;
    }
}
//неработает
export async function patchTodo(uuid, isCompleted){
    try {
       const response = await http.patch('/todos/' + uuid, {
            isCompleted
        },
        {
           headers: {
                'Content-Type': "appllication/json",
                'x-access-token' : localStorage.accessToken,
            }
       })
        return response?.data ?? {};
    } catch (error) {
        console.error({error});
    }
}

export async function createTodo(tittle){
    try {
        const response = await http.post('/todos/created', { tittle },
        {
           headers: {
                'Content-Type': "appllication/json",
                'x-access-token' : localStorage.accessToken,
            }
       });
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//удаление туду по его uuid
export async function delettodo(uuid){
    try {
        const response = await http.delete('/todos/' + uuid,
        {
            headers: {
                'Content-Type': "appllication/json",
                'x-access-token' : localStorage.accessToken,
            }

        });
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}
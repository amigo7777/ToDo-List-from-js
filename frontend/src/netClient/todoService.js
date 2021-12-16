import http from "@/netClient/config";

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
export async function patchTodo({uuid, isCompleted}){
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

export async function createTodo({tittle}){
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

//удаление туду по его uuid работает
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
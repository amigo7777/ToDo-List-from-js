<template>
    <div class="home-page base-page">
        <CreateTodo @todo-created="onTodoCreated"/>
    <div class="separator"> <hr /></div>
        <ul class="todo-list">
            <li
               v-for="todoItem in todoList"
               :key="todoItem.uuid"
               class="todo-item"
               :class="{'done': todoItem.isCompleted}"
            >
                <div class="tittle">
                     {{todoItem.tittle}}
                </div>
                <div class="actions">
                    {{todoItem.description}}
                    <input 
                      type="checkbox"
                      class="checkbox"
                      :checked="todoItem.isCompleted"
                      @input="onCheckBoxInput(todoItem.uuid, todoItem.isCompleted)"
                    />
                    <button @click="delettodo(todoItem.uuid)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import CreateTodo from '@/components/CreateTodo'
import {fetchTodoList, patchTodo, delettodo} from '@/netClient/todoService'
export default{
    name:"HomePage",
    components:{
        CreateTodo
    },
    data: () => ({
        todoName: '',
        todoList: [],
    }),
    created(){
        this.fetchTodoList()
    },
    methods:{
        onTodoCreated(data){
            console.warn(data)
            this.fetchTodoList()
        },
        async fetchTodoList(){
            try {
               this.todoList = await fetchTodoList();
            } catch (error) {
                console.error({error})
            }
        },
        async onCheckBoxInput(uuid, isCompleted){
            try {
                await patchTodo({uuid, isCompleted: !isCompleted});
                this.fetchTodoList()
            } catch (error) {
                console.error({error});
            }
        },
        async delettodo(uuid){
            try {
                await delettodo(uuid);
                this.fetchTodoList()
            } catch (error) {
                console.error({error})
            }
        }
    }
};

</script>
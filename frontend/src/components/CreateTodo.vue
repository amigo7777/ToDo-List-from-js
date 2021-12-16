<template>
    <section class="create-todo">
            <!--Верстка добавления туду-->
            <h1>Создать</h1>
            <div>
                <input v-model="todoName" id="todoName" type="text" placeholder="Заголовок" required>                
                <button @click="onCreateTodoClicked" id="bth" type="submit">Создать</button>
            </div>
    </section>
</template>

<script>
import {createTodo} from '../netClient/dataService'
export default{
    name: "CreateTodo",
    data:() => ({
        todoName: '',
    }),
    async mounted(){},
    methods: {
        async onCreateTodoClicked(){
            try {
                const newtodo = await createTodo(this.todoName);
                if (newtodo){
                    this.todoList.push(newtodo);
                }
                this.$emit('todo-creted', {message: 'All is Ok'})
                console.warn({ newtodo })
            } catch (error) {
                console.error({error});
            }

        },
    },
};
</script>
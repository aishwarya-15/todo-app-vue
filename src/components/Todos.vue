<template>
  <div>
  <h1>Todos</h1>
  <input type="text" placeholder="Search...." @input="search">
  <input type="checkbox" @click="getCompletedTodos"> completed
  <input type="checkbox" @click="getUnCompletedTodos"> Not completed

  <div class="todos">
  <div v-for="todo in todoList" 
    :key="todo.id" class="todo" 
    @dblclick="ondblclick(todo)" 
    :class = "{'completed':todo.completed}">
     {{todo.title}}
     <button @click = "deleteTodo(todo.id)">Delete</button>
     <button @click = "editTodo(todo)" >Edit</button>
  </div>
  </div>
  <edit-modal v-if="isModalVisible" :todo="this.editableTodo" @updateEditedTodo="updateEditedTodo"></edit-modal>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditModal from './EditModal.vue';
export default {
  components: { EditModal },
  name: 'Todos',
  data(){
    return{
      isCompleted: false,
      isNotCompleted : false,
      searchKey : '',
      isModalVisible : false,
      editableTodo:{}
    }
  },
  methods :{
    ...mapActions(['fetchTodos','deleteTodo','updateTodo']),
    ondblclick(todo){
      todo.completed = ! todo.completed;
      // this.updateTodo(todo);
      this.$store.dispatch('updateTodo',todo);
    },

    getCompletedTodos({ target }){
      this.isCompleted = target.checked;
    },

    getUnCompletedTodos({ target }){
      this.isNotCompleted = target.checked;
    },
    search({ target }){
      this.searchKey = target.value.trim().toLowerCase();
    },
    editTodo(oldTodo){
      console.log(oldTodo)
      this.isModalVisible = true;
      // this.editableTodo = Object.assign({},oldTodo);
      this.editableTodo = oldTodo;
    },
    updateEditedTodo(updatedTodo){
      this.isModalVisible= !this.isModalVisible;
      this.updateTodo(updatedTodo);
    }
  },

  computed : {
    // allTodos(){
    //   return this.$store.getters.allTodos
    // },
    ...mapGetters(['allTodos','completedTodos','unCompletedTodos','searchTodos']),

    todoList() {
      let todos = this.allTodos;
      if(this.searchKey){
        // return this.completedTodos
        return this.searchTodos(this.searchKey);
      }
      if((this.isCompleted && this.isNotCompleted) || (!this.isCompleted && !this.isNotCompleted)){
        return this.allTodos;
      }
      if(this.isCompleted){
        return this.completedTodos;
      }
      if(this.isNotCompleted){
        return this.unCompletedTodos;
      }
      // return this.isCompleted ? this.completedTodos : this.allTodos;
    }    
  },

  created(){
    this.fetchTodos();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.todo {
  border: 1px solid #ccc;
  background: #333;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  width: 300px;
  margin-bottom:10px ;
  user-select: none;
}
.completed{
  background-color: #41b883;
}



</style>

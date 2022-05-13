<template>
  <div>
      <h3>Add Todo</h3>
      <form @submit.prevent="onSubmit">
      <input type="text" v-model="title" placeholder="Add Todo" />
      <input type="submit"/>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name : 'AddTodo',
    data(){
       return{
           title : '',
       }
    },
    methods : {
        ...mapActions(['addTodo']),
        onSubmit(){
            this.addTodo(this.title)
        },
    }
}
</script>

<style>

</style>
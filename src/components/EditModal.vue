<template>
<div class="backdrop">
  <div class="modal">
      <form @submit.prevent="onSubmit">
        <label for="Edit">Edit Todo</label>
        <input type="text"  placeholder="Edit Todo" v-model.trim="value">
        <input type="submit">
      </form>
  </div>
</div>
</template>

<script>
export default {
  name : 'EditModal',
  props:['todo'],
  data() {
    let vm = this;
    return {
      value: vm.todo.title
    }
  },
  methods:{
    onSubmit(){
      this.todo.title=this.value;
      // this.$set(this.todo,'title',this.value)
      this.$emit('updateEditedTodo',this.todo);
      
      console.log(this.todo)
    }
  },
}
</script>

<style>
label{
  color: white;
}
.modal{
  padding: 20px;
  margin: 0 auto;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form > input,label{
  margin: 10px;
}
form > input{
   border: 2px solid black;
   border-radius: 4px;
}
.backdrop{
 position: fixed;
 top:0;
 background-color: rgba(0,0,0,0.7);
 width: 100%;
 height: 100%;
}
</style>
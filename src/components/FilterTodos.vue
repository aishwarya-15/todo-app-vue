<template>
  <div class="filter">
      Filter Todos : 
      <select @change="filterTodos($event)">
          <option value="200">200</option>
          <option value="100">100</option>
          <option value="50">50</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
      </select>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name:'FilterTodos',
  methods:{
   ...mapActions(['filterTodos'])
  }
}
</script>

<style>
.filter{
    margin: 10px;
    padding: 10px;
}
select{
    width:150px;
    border-radius: 3px;
    border: 2px solid #666;
    background-color: white;
}
</style>
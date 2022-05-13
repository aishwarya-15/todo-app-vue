const state ={
    todos : []
}

const getters = {
    allTodos : (state) => {
        return state.todos
    },
    completedTodos : (state) =>{
        return state.todos.filter(item => item.completed===true)
    },
    unCompletedTodos : (state) =>{
        return state.todos.filter(item => item.completed===false)
    },
    searchTodos : (state) => (term) =>{
        return state.todos.filter(item => item.title.indexOf(term)!== -1)
    }

}

const mutations = {
    setTodos(state,data){
        state.todos = data;
    },
    newTodo(state,data){
        state.todos.unshift(data)
    },
    removeTodo(state,id){
        state.todos = state.todos.filter( todo => todo.id !== id )
    },
    updateTodo(state,updatetodo){
        let index = state.todos.findIndex( item => item.id === updatetodo.id );
        if(index !== -1){
            state.todos.splice(index,1,updatetodo);
        }
    },
    editTodo(state,editedTodo){
        let index = state.todos.findIndex( item => item.id === updatetodo.id );
        if(index !== -1){
            state.todos.splice(index,1,editedTodo);
        }
    },
}

const actions = {
    async fetchTodos({commit}){
        let response = await fetch("https://jsonplaceholder.typicode.com/todos")
        let data = await response.json();
        commit('setTodos',data)
    },
    async addTodo( { commit },title){
        let response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({title : title , completed : false}) 
          });
        let data = await response.json();
        commit('newTodo',data);
    },
    async deleteTodo({commit },id){
        await fetch("https://jsonplaceholder.typicode.com/todos"+id, { method: 'DELETE'});
        commit('removeTodo',id);
    },
    async filterTodos({commit},e){
        let limit = parseInt(e.target.value)
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        let data = await response.json();
        commit('setTodos',data)
    },
    async updateTodo({commit},updatedTodo){
        let response = await fetch("https://jsonplaceholder.typicode.com/todos"+updatedTodo.id, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(updatedTodo) 
          });
        let data = await response.json();
        commit('updateTodo',data);
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}
<template>
  <div>
    <v-text-field single-line label="할 일 추가..." append-icon="mdi-plus" @click:append="addTodo" v-model="newTodo" @keyup.enter="addTodo" class="px-1" />
    <v-list flat subheader>
      <v-list-item class="list_item" v-for="(todo, index) in todos" :key="todo.id">
        <template v-slot:default="{ active }">
          <v-list-item-action><v-checkbox :input-value="active"></v-checkbox></v-list-item-action>
          <v-list-item-content><v-list-item-title>{{todo.title}}</v-list-item-title></v-list-item-content>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item link class="px-3" @click="editTodo(index)">수정하기</v-list-item>
                <v-list-item link class="px-3" @click="removeTodo(index)">삭제하기</v-list-item>
              </v-list>

            </v-menu>
        </template>
      </v-list-item>
    </v-list>
    <v-col class="d-flex px-0">
      <v-btn depressed dark small color="primary">전체</v-btn>
      <v-btn depressed dark small color="indigo">완료</v-btn>
      <v-btn depressed dark small color="teal">남은일</v-btn>
      <v-btn small color="dark-grey" dark depressed class="endBtn">완료한 일 삭제</v-btn>
    </v-col>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <span>수정하기</span>
          <v-spacer />
          <v-btn icon @click="doneEdit"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialog=false"><v-icon>mdi-close </v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field outlined hide-details v-model="formTitle" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todos: [
        { id: 1, title: 'wake up', completed: false, editing: false },
        { id: 2, title: 'make Coffee', completed: false, editing: false }
      ],
      newTodo: '',
      idCount: 3,
      snackbar: false,
      timeout: 2000,
      text: '할 일이 삭제되었습니다.',
      dialog: false,
      formTitle: '',
      selectedIndex: ''
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo === '') return
      this.todos.push({
        id: this.idCount,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idCount++
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
      setTimeout(() => {
        this.snackbar = true
      }, 500)
    },
    editTodo (index) {
      this.selectedIndex = index
      this.dialog = true
      this.formTitle = this.todos[index].title
    },
    doneEdit () {
      this.todos[this.selectedIndex].title = this.formTitle
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  padding: 0;
}
.list_item {
  border-bottom: 1px solid #ddd;
}
</style>

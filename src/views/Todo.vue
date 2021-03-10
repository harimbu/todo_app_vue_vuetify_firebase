<template>
  <div>
    <v-text-field
      v-model="newTodo"
      class="px-5 mt-3"
      lined
      prepend-inner-icon="mdi-pencil"
      append-icon="mdi-plus"
      clearable
      hide-details
      @click:append="addTodo"
      @keyup.enter="addTodo"
      ></v-text-field>

    <v-list flat>
      <div v-for="todo in filterTodo" :key="todo.createAt">
        <v-list-item @click="checkTodo(todo)" :class="{'blue lighten-5':todo.done}">
          <v-list-item-action>
            <v-checkbox :input-value="todo.done"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title :class="{'text-decoration-line-through':todo.done}">{{todo.title}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon>
                  <v-icon color="grey lighten-1" v-on="on" v-bind="attrs">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editTodo(todo)"><v-list-item-title>수정하기</v-list-item-title></v-list-item>
                <v-list-item @click="removeTodo(todo)"><v-list-item-title>삭제하기</v-list-item-title></v-list-item>
              </v-list>
            </v-menu>

          </v-list-item-action>
        </v-list-item>
        <v-divider />
      </div>
    </v-list>

    <div class="pa-3 text-right" v-if="showDelBtn">
      <v-btn depressed color="primary" @click="removeDoneTodo">완료한 일 삭제</v-btn>
    </div>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="grey lighten-3">수정하기</v-card-title>
        <v-card-text class="pb-0">
          <v-text-field hide-details v-model="formTitle" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">취소</v-btn>
          <v-btn color="primary" text @click="editDone">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db, auth } from '../firebase'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      newTodo: '',
      formTitle: '',
      docId: null
    }
  },
  computed: {
    ...mapGetters(['filterTodo', 'showDelBtn'])
  },
  created () {
    this.getTodos()
  },
  methods: {
    getTodos () {
      db.collection('todos').orderBy('createAt', 'desc').onSnapshot(sn => {
        this.$store.state.todos = sn.docs.map(doc => {
          return {
            id: doc.id,
            title: doc.data().title,
            createAt: doc.data().createAt,
            editing: doc.data().editing,
            done: doc.data().done,
            userId: doc.data().userId
          }
        })
      })
    },
    checkTodo (todo) {
      db.collection('todos').doc(todo.id).update({
        done: !todo.done
      })
    },
    addTodo () {
      const todo = {
        userId: auth.currentUser.uid,
        createAt: Date.now(),
        title: this.newTodo,
        done: false,
        editing: false
      }
      if (this.newTodo === '') return
      db.collection('todos').add(todo)
      this.newTodo = ''
    },
    removeTodo (todo) {
      db.collection('todos').doc(todo.id).delete()
    },
    editTodo (todo) {
      this.docId = todo.id
      this.dialog = true
      this.formTitle = todo.title
    },
    editDone () {
      console.log(this.selectedId)
      db.collection('todos').doc(this.docId).update({
        title: this.formTitle
      })
      this.dialog = false
    },
    async removeDoneTodo () {
      const todoQuery = await db.collection('todos').where('userId', '==', auth.currentUser.uid).where('done', '==', true).get()
      todoQuery.forEach(doc => {
        doc.ref.delete()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item__action {
    align-self: center;
    margin: 0;
}
</style>

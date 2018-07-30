<template>
  <div>
    <q-toolbar color="primary">
      <q-toolbar-title>
        Todos {{ todos.length }}
      </q-toolbar-title>
      <q-btn @click="createUser" flat dense label="register" />
      <q-btn @click="login" flat dense label="login" />
      <q-btn @click="$dbCon.logout()" flat dense label="logout" />
    </q-toolbar>
    <div class="col">
      <q-field
        icon="cloud"
        label="Details"
        :error="!todoText"
        error-label="required"
      >
        <q-input v-model="todoText" />
      </q-field>
      <q-btn @click="add" color="pink" class="full-width" label="Save" :disabled="!todoText" />
      <!-- <pre>{{ todos }}</pre> -->
      <q-list highlight>
        <q-list-header>Recent chats</q-list-header>
        <q-item v-for="todo in todos" :key="todo._id">
          <q-item-main>
            <q-item-tile label>{{ todo.details }}</q-item-tile>
            <q-item-tile sublabel>{{ todo.user }}</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-checkbox :value="todo.done || false" @input="changeStatus(todo)" />
          </q-item-side>
          <q-item-side right>
            <q-btn @click="remove(todo._id)" round icon="delete" color="negative"></q-btn>
          </q-item-side>
        </q-item>
      </q-list>
      <q-btn @click="$dbCon.services.todos.loadMoreData()">Load more...</q-btn>
      <q-btn @click="$dbCon.services.todos.loadAllData()">Load All Data</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    this.$dbCon.authenticate()
    this.$dbCon.services['todo-auth'].onDataChange(data => {
      this.todos = data
      console.log('CHANGED', this.todos)
    })

    console.log(this.$dbCon)

    this.$dbCon.on('authenticated', () => {
      console.log('logged In')
      this.$dbCon.services['todo-auth'].reQuery()
    })
    this.$dbCon.on('logout', () => {
      console.log('logged OUT')
      this.$dbCon.services['todo-auth'].reQuery()
    })
  },
  data: () => ({
    todoText: '',
    todos: []
  }),
  methods: {
    add () {
      this.$dbCon.services['todo-auth'].create({
        details: this.todoText,
        user: 'Cardo Dalisay',
        done: false,
        date: new Date()
      })
    },
    edit () {},
    createUser () {
      this.$dbCon.services.users.create({
        email: 'test@test.test',
        password: 'testtest'
      })
    },
    login () {
      this.$dbCon.authenticate({
        strategy: 'local',
        email: 'test@test.test',
        password: 'testtest'
      })
        .then(user => console.log(user))
        .catch(error => console.error(error))
    },
    changeStatus (t) {
      console.log('OY NAPINDOT')
      this.$dbCon.services['todo-auth'].patch(t._id, {
        done: !t.done
      })
    },
    remove (id) {
      this.$dbCon.services['todo-auth'].remove(id).then(data => console.log(this.$dbCon.services['todo-auth'].data))
    }
  }
}
</script>

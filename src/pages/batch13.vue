<template>
  <div>
    <q-toolbar color="primary">
      <q-toolbar-title>
        Title
      </q-toolbar-title>
      <q-btn flat round dense icon="mail" />
    </q-toolbar>
    <h1>{{name}} asd</h1>
    <ul v-for="(person, i) in persons" :key="i">
      <li>{{person.name}} - {{person.age}}
        <button @click="update(person)">Edit</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'xander ford',
      persons: [
        {
          name: 'Xander',
          age: 55
        },
        {
          name: 'Jake',
          age: 44
        }
      ]
    }
  },
  methods: {
    update (p) {
      p.name += 'Edited'
    }
  }
}
</script>

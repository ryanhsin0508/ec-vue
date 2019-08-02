Vue.component('listComponent', {
  props: ['type'],
  data() {
    return {
      selected: 0
    }
  },
  template: `
    <section class="list list-st1">
      <ul>
        <li 
          v-for="(items, index) in filteredList" 
          :class="{active:selected == index}"
          @click="toggleActive">
          <div class="info flex between"><p v-for="v in items">{{v}}</p></div>
          <list-extended-component :type="type" :selected="selected" v-if="selected == index"></list-extended-component>
        </li>
      </ul>
    </section>
  `,
  computed: {
    filteredList() {
      return this.$store.getters.filteredList
    }
  },
  methods:{
    toggleActive(){

    }
  },
  created(){
    this.$store.commit('init', this.type)
  }
})

Vue.component('listExtendedComponent', {
  props: ['type'],
  data() {
    return {
    }
  },
  template: `
    <div class="">
      sss
    </div>
  `,
  computed: {
    filteredList() {
      return this.$store.getters.filteredList
    }
  },
  created(){
    this.$store.commit('init', this.type)
  }
})
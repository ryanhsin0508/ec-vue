Vue.component('listExtendedComponent', {
  props: ['type'],
  data() {
    return {
    }
  },
  template: `
    <div class="">
      <template v-if="type = 'customers'">afas</template>
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
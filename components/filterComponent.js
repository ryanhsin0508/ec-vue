Vue.component('filterComponent', {
  data(){
    return {
      search:""
    }
  },
  template:`
    <section class="search-box custom-input">
      <div class="flex">
        <input 
          class="fg1" 
          style="margin-right: 10px;" 
          type="text" 
          v-model="search"
          @keyup="searchList"
        />
        <button class="btn-search"><i class="fas fa-search"></i></button>
      </div>
    </section>
  `,
  methods:{
    searchList(){
      this.$store.commit('searchList', this.search)
    }
  }
})
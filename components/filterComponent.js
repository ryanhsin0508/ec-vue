Vue.component('filterComponent', {
  props:['type'],
  data(){
    return {
      search:"",
      sort:0,
      sortReverse:false,
      menuActive: false
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
      <div class="sort dropdown-menu">
        <h3 @click="menuActive = menuActive ? menuActive = false : menuActive = true">{{sortList['MA002']}}</h3>
        <ul :class="{active: menuActive}">
          <li
            v-for="(item, index) in sortList"
            @click="sortBy(index)"
          >
            {{item}}
          </li>
        </ul>
      </div>
    </section>
  `,
  computed:{
    searchBy(){
      let sortName = Object.keys(this.sortList)[this.sort];
      return sortName
    },
    sortList(){
      console.log(this.$store.state.sortList)
      return this.$store.state.sortList;
    }
  },
  methods:{
    searchList(){
      this.$store.commit('searchBy', this.searchBy)
      this.$store.commit('searchList', this.search)
    },
    sortBy(i){
      // this.sortReverse = false;
      if(this.sort == i){
        this.sortReverse = !this.sortReverse ? true : false;
      }
      this.sort = i;
      this.menuActive = false;
      this.$store.commit('sortBy', {val:this.sort,reverse:this.sortReverse})
    }
  }
})
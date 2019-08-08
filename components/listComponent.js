Vue.component('listComponent', {
  props: ['type', 'call', 'extended'],
  data() {
    return {
      // selected: 0
    }
  },
  template: `
    <section class="list list-st1">
      <ul>
        <li 
          v-for="(items, index) in filteredList" 
          :class="[type, {active:selected == index}]"
          @click="$store.commit('setNumber',{i:index,t:'selectedList'})">
          <div class="info flex between">
          <p v-for="v in call" :class="v">{{items[v]}}</p>
          </div>
          <list-extended-component
            :type="type"
            :selected="selected"
            :extended="extended"
            :data="items"
            v-show="selected == index"
          ></list-extended-component>
        </li>
      </ul>
    </section>
  `,
  computed: {
    selected(){
      return this.$store.state.selectedList
    },
    filteredList() {
      let sorted = [...this.$store.getters.filteredList];
      let sortList = this.$store.state.sortList;
      let reverse = this.$store.state.sortReverse;
      let sortBy = this.$store.state.sortBy;
      sorted = sorted.sort((a,b)=>
        a[sortList[sortBy]['name']] > b[sortList[sortBy]['name']] ? 1 : -1
      );
      if(reverse){
        return sorted.reverse()
      }
      return sorted;
    }
  },
  methods:{
  },
  created(){
    this.$store.commit('init', this.type);

  }
})

Vue.component('listExtendedComponent', {
  props: ['type', 'selected', 'data', 'extended'],
  data() {
    return {
    }
  },
  template: `
    <div class="list-extended" :class="{'no-style': type == 'customers'}">
      <template v-if="type == 'customers'">
        <ul class="btns square grid2 spacing10 between">
          <li>
            <button class="btn-order" @click.stop="$store.commit('showOverlay',{type:'order',data:data})">
              <span class="icon"><i class="fas fa-cart-plus"></i></span>下單
            </button>
          </li>
          <li>
            <button class="btn-detail"
              @click.stop="$store.commit('showOverlay',{type:'detail',data:data})"">
              <span class="icon"><i class="fas fa-info-circle"></i></span>明細
            </button>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li v-for="(item, index) in extended" :class="item">
            <template v-if="item == 'MB002'">{{data[item]}} {{data['MB003']}}</template>
            <template v-else>{{data[item]}}</template>
          </li>
        </ul>
      </template>
    </div>
  `,
  computed: {
    extendedList() {
      if(this.extended){
        let titleList = {};
        for(i in this.$store.state.sortList){
          
        }
        console.log(sortLists)
      }
      return this.$store.state.sortList;
    }
  },
  created(){
    // this.$store.commit('init', this.type)
  }
})
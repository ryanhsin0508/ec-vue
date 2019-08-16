Vue.component('dateComponent', {
  data() {
    return {
      now: {
        y:null,
        m:null,
        d:null
      },
      selected: {
        y:2019,
        m:5,
        d:10
      },
      dropdownActive: false,
      yearActive:false,
      monthActive:false,
      dateActive:false,
      dateArr:[],
      monthArr:[]

    }
  },
  template: `
    <div class="custom-date">
      <h3 @click="showDropdown()">{{selectedFullDate}}</h3>
      <div class="opt" v-if="dropdownActive">
        <ul :class="['c-year', {active:yearActive}]">
          <li>
            {{selected.y}}
          </li>
        </ul>
        <ul :class="['c-month', {active:monthActive}]">
          <li 
            v-for="(item, index) in monthArr" 
            v-if="item + 1 == selected.m || monthActive"
            :class="{active: item + 1 == selected.m}"
            @click.stop="monthHandler(item+1)"
          >
            {{item+1}}月
          </li>
        </ul>
        <ul class="c-date">
          <li 
            v-for="(item, index) in dateArr"
            :class="{active: selected.y == now.y && selected.m == now.m && selected.d == now.d}"
            @click="dateHandler(item)"
          >{{item}}日
          </li>
        </ul>
      </div>
    </div>
  `,
  methods:{
    monthHandler(m){
      this.monthActive = this.monthActive ? false : true;
      if(this.monthActive){
        return;
      }
      this.selected.m = m;
      this.calcDate();
    },
    dateHandler(d){
      this.dropdownActive = false;
      this.selected.d = d;
    },
    calcDate(){
      this.dateArr = [];
      var now = new Date();
      var y = this.selected.y
      var m = this.selected.m;
      var d = this.selected.d
      var start = new Date(`${m}/1/${y}`);
      var end = m < 12 ? new Date(`${m+1}/1/${y}`) : new Date(`1/1/${y+1}`);
      console.log(end)
      var loop = new Date(start);
      
      while (loop <= end) {
        var loopMonth = loop.getMonth() < 12 ? loop.getMonth() + 1 : 1;
        console.log(loopMonth)
        if (loopMonth == m) {
          let y = loop.getFullYear();
          let m = loop.getMonth() < 11 ? loop.getMonth() + 1 : 1;
          let d = loop.getDate();
          m = m.toString.length<2 ? '0' + m : m;
          // d = d.toString().length<2 ? '0' + d : d;
          this.dateArr.push(d);
        }
        var newDate = loop.setDate(loop.getDate() + 1);
      }
    },
    showDropdown(){
      this.dropdownActive = this.dropdownActive ? false : true;
      
      if(!this.dropdownActive){
        return;
      }
      this.calcDate();
    }
  },
  beforeMount(){
    //init today
    var now = new Date();
    this.now.y = now.getFullYear()
    this.now.m = now.getMonth() < 11 ? now.getMonth() + 1 : 1;
    this.now.d = now.getDate()

    for(let i = 0; i < 12; i++){
      this.monthArr.push(i)
    }
  },
  computed:{
    selectedFullDate(){
      let y = this.selected.y;
      let m = this.selected.m;
      let d = this.selected.d;
      m = m.toString.length<2 ? '0' + m : m;
      d = d.toString().length<2 ? '0' + d : d;
      return '' + y + m + d
    }
  }
})
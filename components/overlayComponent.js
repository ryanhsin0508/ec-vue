Vue.component('overlayComponent', {
  props:['overlayData'],
  template: `
    <transition name="overlay">
      <div class="overlay-mask">
        <div class="overlay-wrapper">
          <order-component v-if="$store.state.overlayType == 'order'" :overlay-data="overlayData"></order-component>
          <detail-component v-if="$store.state.overlayType == 'detail'" :overlay-data="overlayData"></detail-component>
        </div>
      </div>
    </transition>
    `,
    mounted(){
      console.log(this.$store.state.overlayType)
    }
})
Vue.component('orderComponent',{
  props:['overlayData'],
  data(){
    return{
      formData:{
        type:"",
        note1:"",
        note2:"",
        note3:""
      },
      productList:[],
      products:[{
        selected:0,
        count:0,
        gift:0,
        note:""
      }],
      productTemplate:{
        selected:0,
        count:0,
        gift:0,
        note:""
      }
    }
  },
  template:`
    <div class="overlay-container">
    
      <header class="flex">
        <h3>「{{overlayData.MA002}}」訂購單</h3>
        <button class="btn-close" @click="$store.commit('closeOverlay')"></button>
      </header>
      <main class="content">
        <div class="dropdown-menu">
          <h3>最近下單日期</h3>
          <ul>
            <li></li>
          </ul>
        </div>
        <form action="">
          <div class="custom-input hor">
            <input type="date" style="width:100%;"/>
            <ul>
              <li><h3>單據別</h3><input type="text" /></li>
              <li><h3>內部備註</h3><input type="text" /></li>
              <li><h3>外部備註</h3><input type="text" /></li>
              <li><h3>單據備註</h3><input type="text" /></li>
            </ul>
          </div>
          <div class="custom-input hor sp" v-for="(item, index) in products">
            <ul>
              <li>
                <h3>商品名稱</h3>
                <select v-model="products[index].selected">
                  <option value="0" selected disabled hidden>選擇商品：</option>
                  <option v-for="(item, index) in productList" :value="index"><span class="name">{{item['MB002']}}</span> <span class="spec">{{item['MB003']}}</span></option>
                </select>
              </li>
              <li class="counter">
                <h3>數量</h3>
                <span class="btn-minus" @click="products[index].count > 0 ? products[index].count-- : products[index].count = 0">-</span>
                <input type="number" v-model="products[index].count"/>
                <span @click="products[index].count++">+</span>
              </li>
              <li class="counter">
                <h3>贈品量</h3>
                <span class="btn-minus" @click="products[index].gift > 0 ? products[index].gift-- : products[index].gift = 0">-</span>
                <input type="number" v-model="products[index].gift" />
                <span @click="products[index].gift++">+</span>
              </li>
              <li>
                <h3>商品備註</h3>
                <input type="text" />
              </li>
            </ul>
          </div>
          <button @click.prevent="addProduct" class="btn-box rounded"><span>+</span> 加入產品</button>
        </form>
      </main>
      <footer>
        <ul class="grid2 btns">
          <li>
            <button class="btn-box close" @click="$store.commit('closeOverlay')">關閉</button>
          </li>
          <li>
            <button class="btn-box confirm">確認下單</button>
          </li>
        </ul>
      </footer>
    
    
    </div>
  `,
  methods:{
    addProduct(){
      this.products.push(this.productTemplate);
    }
  },
  beforeMount(){
    $.ajax({
      url: '/ec-vue/json/data.json',
      async: false,
      success: (data) => {
        this.productList = data.get_products
        console.log(data.get_products)
      }
    })
  }
})
Vue.component('detailComponent', {
  props:['overlayData'],
  template:`
  <div class="overlay-container">
    <header class="flex">
      <h3>「{{overlayData.MA002}}」明細</h3>
      <button class="btn-close" @click="$store.commit('closeOverlay')"></button>
    </header>
    <main class="content">
    <filter-component type="customers"></filter-component>
    </main>
  </div>
  `,
  computed: {
    filteredList(){

    }
  },
  beforeMount(){

  }
})
Vue.component("rightside", {
  props: {
    orders: {
      type: Array,
      required: false
    }
  },

  template: 
  `
    <div v-if="orders.length" class="order-list">
    <button v-on:click="showAllNoteBox" class="button-pop-comment-box-all">[+]</button>
    <button v-on:click="showNoneNoteBox" class="button-pop-comment-box-all">[-]</button>
    
      <ul>
        <li v-for="(order, index) in orders" :key="index">
         <span>#{{index+1}}: {{order.qty}} of {{order.product}} in variant {{order.category}}</span>   
         
         <button v-on:click="showNoteBox(index)" class="button-pop-comment-box">[...]</button>
   
         <commentbox v-show="showNotes[index]"></commentbox>
            
        </li>
      </ul>

   
    </div>
    
    `,

  data() {
    return {
      showNotes: [false],
      cindex: 0,
    };
  },
  methods: {
    showNoteBox(index) {
      this.showNotes[index] ? this.$set(this.showNotes,index,false) : this.$set(this.showNotes,index, true);
      this.cindex = index
      this.flag ? this.flag = false : this.flag = true;
    },
    showAllNoteBox() {
      for (var i = 0; i <= this.orders.length; i++) {
        this.$set(this.showNotes,i,true);
      }
    },
    showNoneNoteBox() {
      for (var i = 0; i <= this.orders.length; i++) {
        this.$set(this.showNotes,i,false);
      }
    },
  },
  


});

/* ---------------------------------------------------------- */

Vue.component("commentbox", {

  template: 
  `
          <div class="comment-box">        
          <form class="comment-form" @submit.prevent="onCommentSubmit">
            <p>
              <label for="review">Notes:</label>      
              <textarea id="notes" v-model="notes"></textarea>
            </p> 
            <p>
              <input class="button-main-content" type="submit" value="Add">  
            </p>    
          
          </form>
          </div> 
    `,

  data() {
    return {
      notes: null,
    };
  },

  methods: {
  
  },

  computed: {

  }
});

/* ---------------------------------------------------------- */

Vue.component("leftside", {
  props: {
    min: {
      type: Number,
      required: true
    }
  },

  template: `

    <div>
    Recommended qty: {{min}}
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="product">Product Name:</label>
      <input required id="product" v-model="product" placeholder="product name">
    </p>
    
 
    <p>
      <label for="category">Model:</label>
      <select required id="category" v-model.number="category">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>

    <button 
       v-on:click="decreaseCounter" 
       :disabled="!(qty-1)"
       :class="{disabledButton: !(qty-1)}"
       class="button-main-content"
    >-</button>
    <button
      v-on:click="increaseCounter"
      class="button-main-content" 
    >+</button>
    <span>Selected Qty: {{totalItems}} </span>

    </div>

    `,

  data() {
    return {
      variant: 'A',
      product: null,
      category: 1,
      qty:  this.min,

    };
  },

  methods: {
    decreaseCounter() {
     this.qty -= 1;
    },
    increaseCounter() {
      this.qty += 1;
    },
    onSubmit() {
      let productOrder= {
        product: this.product,
        category: this.category,
        qty: this.qty
      }
      this.$emit('order-submitted', productOrder)
      this.product = null
      this.category = 1
      this.qty = this.min
    },
  },

  computed: {
    totalItems() {
      return this.qty;
    }
  }
});


/* ------------------------------------------------ */ 

var app = new Vue({
  el: "#app",

  data: {
    min: 10,
    orders: []
  },

  methods: {
  
    
    addOrder(productOrder) {
      this.orders.push(productOrder)
    }
  },
  computed: {
    specialOrders() {
      var a = 0;
      for (const i of this.orders) {
         a +=1 ? i.qty > 10 : a;
      }
      return a;
    }
  }
});

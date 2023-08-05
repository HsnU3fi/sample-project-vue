<template>
  <Header/>
  <Alert :show="show" :color="color" :text="text"/>

  <div class="table-container">
    <h2 v-if="!items" class="row-center font-word space-top">
      Please add a new item
    </h2>

    <label v-if="items">
      <input type="text" class="search-bar" v-model="searchQuery" placeholder="Search By Id">
    </label>


    <button @click="showDialogAddItem=true" class="right btn-add-item cursor">
      <h3>Add Item</h3>
    </button>

    <table v-if="items" class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>TODO</th>
        <th>CREATED AT</th>
        <th>IS COMPLETE</th>
        <th>DELETE ITEM</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in  paginatedItems" :key="i">
        <td>{{ item._id }}</td>
        <td>
          <div class="tooltip">{{ item.todoName.slice(0, 30) + ' ...' }}
            <!--            <span class="tooltiptext">{{ item.todoName }}</span>-->
          </div>
        </td>
        <td>{{ formatDate(item.createdAt) }}</td>

        <td>
          <button @click="editItem(item)" class="cursor" :style="getColor(item.isComplete)">
            <h3 class="row-center">{{ changeTitle(item.isComplete) }}</h3>
          </button>
        </td>


        <td>
          <button @click="showDialogDeleteItem=true" class="btn-delete cursor">
            <h3>Delete</h3>
          </button>
        </td>

        <div  v-if="showDialogDeleteItem" class="dialog-overlay">
          <div class="dialog-item">

            <h2 class="font-word">
              Are you sure you want to delete item ?
            </h2>
            <div class="row-center">
              <button class="space-item btn-dialog" @click="showDialogDeleteItem = false;"><h3 class="font-word">
                Cancel</h3>
              </button>
              <div class="space-item"/>
              <button class="space-item btn-dialog" @click="deleteItem(item._id)"><h3 class="font-word">Yes</h3>
              </button>
            </div>
          </div>
        </div>
      </tr>
      </tbody>
    </table>

    <div  v-if="showDialogAddItem" class="dialog-overlay">
      <div class="dialog-item">
        <h3 class="font-word">Todo:</h3>
        <textarea  required class="textarea-size" v-model="todoName"/>
        <h3 class="font-word">
          {{ toggleTitle() }}
        </h3>
        <div>
          <button class="toggle-button" :class="{ active: isToggled }" @click="toggle">
            <div class="toggle-circle" :class="{ active: isToggled }"/>
          </button>
        </div>
        <div class="row-center">
          <button class="space-item btn-dialog" @click="showDialogAddItem = false;"><h3 class="font-word">Cancel</h3>
          </button>
          <div class="space-item"/>
          <button @click="addItem();" class="space-item btn-dialog"><h3 class="font-word">Save</h3></button>
        </div>
      </div>
    </div>

    <div v-if="items" class="pagination row-center">
      <button class="btn-item cursor" @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <h3 class="total-page">{{ currentPage }} / {{ totalPages }}</h3>
      <button class="btn-item cursor" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

  </div>
  <Loading :is-loading="loading"/>
  <Footer/>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Alert from "@/components/alert/Alert.vue";
import Loading from "@/components/loading/Loading.vue";
import axios from 'axios'


export default {
  components: {Header, Alert,Loading},
  data() {
    return {
      showDialogAddItem: false,
      showDialogDeleteItem: false,
      todoName: ' ',
      isToggled: false,
      text: '',
      show: false,
      color: '',
      search: '',
      searchQuery: '',
      data: [],
      items: [],
      loading: false,
      itemsPerPage: 10,
      currentPage: 1,

    }
  },
  //==================================================================================================================
  computed: {
    filteredItems() {
      let filteredItems = this.items;
      if (this.searchQuery !== "") {
        filteredItems = filteredItems.filter(item => item._id.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      return filteredItems;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
    },
  },
  //====================================================================================================================
  methods: {
    async getTodo() {
      this.loading = true
      await axios.get('https://calm-plum-jaguar-tutu.cyclic.app/todos').then((res) => {
        if (res.status === 200) {
          this.items = res.data.data;
          console.log(this.items)
        }
      }).catch((err) => {
        this.show = true
        this.text = 'Error'
        this.color = 'background-color: red'
        console.log(err)
      });
      this.loading = false
    },
    //==================================================================================================================
    async deleteItem(id) {
      this.showDialogDeleteItem = false
      await axios.delete('https://calm-plum-jaguar-tutu.cyclic.app/todos/' + id).then((res) => {
        if (res.status === 200) {
          this.getTodo()
          this.show = true
          this.text = 'Success Deleted Item'
          this.color = 'background-color: red'
        }
      }).catch((err) => {
        this.show = true
        this.text = 'Error'
        this.color = 'background-color: red'
        console.log(err)
      });
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
    //==================================================================================================================
    async addItem() {
      this.showDialogAddItem = false
      await axios.post('https://calm-plum-jaguar-tutu.cyclic.app/todos', {
        todoName: this.todoName,
        isComplete: this.isToggled
      }).then((res) => {
        if (res.status === 200) {
          this.getTodo()
          this.show = true
          this.text = 'Success Add Item'
          this.color = 'background-color: #87d872'
        }
      }).catch((err) => {
        this.show = true
        this.text = 'Error'
        this.color = 'background-color: red'
        console.log(err)
      });
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
    //==================================================================================================================
    async editItem(value) {
      await axios.put('https://calm-plum-jaguar-tutu.cyclic.app/todos/' + value._id, {
        isComplete: value.isComplete = !value.isComplete
      }).then((res) => {
        if (res.status === 200) {
          this.getTodo()
          this.show = true
          this.text = 'Success'
          this.color = 'background-color: #87d872'
        }
      }).catch((err) => {
        this.show = true
        this.text = 'Error'
        this.color = 'background-color: red'
        console.log(err)
      });
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
    //==================================================================================================================
    formatDate(value) {
      return value.slice(0, 10);
    },
    //==================================================================================================================
    changeTitle(value) {
      return value === true ? "Done" : "Not Done";
    },
    //==================================================================================================================
    toggleTitle() {
      return this.isToggled ? 'Done' : 'Not Done';
    },
    //==================================================================================================================
    toggle() {
      this.isToggled = !this.isToggled;
    },
    //==================================================================================================================
    getColor(value) {
      if (value === true) {
        return "height: 40px;width: 80px;border-radius: 20px;background-color: #00dba8;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.30);border:none";
      } else {
        return "height: 40px;width: 80px;border-radius: 20px;background-color: red;  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.30);border:none"
      }
    },
    //==================================================================================================================
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    //==================================================================================================================
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.getTodo()
  }
}
</script>

<style lang="scss">
@media (max-width: 768px) {
  th,
  td {
    display: block;
  }

  th {
    text-align: center;
  }

  td:before {
    content: attr(data-label);
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
  }
}


.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  background-color: #F9B319;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

//.tooltip:hover .tooltiptext {
//  visibility: visible;
//}

.pagination {
  margin-top: 40px;
}

.dialog-item {
  background-color: #f6feff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}


.btn-item {
  width: 100px;
  height: 43px;
  margin-top: -30px;
  margin-right: 30px;
  background-color: #FFC23D;
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}


.search-bar {
  display: block;
  padding: 13px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.table {
  width: 100%;
  border-radius: 8px;
  background-color: #f6feff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.50);
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border-top: 1px solid black;

}

.table thead th {
  background-color: #D4FCF6;
  font-weight: bold;
}

.toggle-button {
  position: relative;
  width: 55px;
  height: 26px;
  //margin-bottom: -50x;
  margin-top: -30px;
  border-radius: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.toggle-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #dddddd;
  border-radius: 50%;
  border: 1px solid #333333;
  transition: transform 0.3s ease;
}

.toggle-circle.active {
  transform: translateX(30px);
}

.toggle-button.active {
  background-color: #F9B319;
}

.total-page {
  margin-top: -28px;
  margin-left: -30px;
  padding: 10px
}

</style>
<template>
  <Header/>
  <Alert :show="show" :color="color" :text="text"/>

  <div class="table-container">
    <label>
      <input type="text" class="search-bar" v-model="searchText" @input="resetPage" placeholder="Search...">
    </label>


    <button @click="showDialogAddItem=true" class="right btn-item cursor">
      <h3>Add Item</h3>
    </button>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>todo</th>
        <th>created at</th>
        <th>is complete</th>
        <th>edit item</th>
        <th>delete item</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in  items" :key="i">

        <td>{{ item._id }}</td>
        <td>
          <div class="tooltip">{{ item.todoName.slice(0, 30) + ' ...' }}
            <!--            <span class="tooltiptext">{{ item.todoName }}</span>-->
          </div>
        </td>
        <td>{{ formatDate(item.createdAt) }}</td>

        <td>
          <button :style="getColor(item.isComplet)">
            <h3 class="row-center">{{ changeTitle(item.isComplet) }}</h3>
          </button>
        </td>

        <td>
          <button @click="getDataEdit(item)" class="btn-edit cursor">
            <h3>Edit</h3>
          </button>
        </td>

        <td>
          <button @click="showDialogDeleteItem=true" class="btn-delete cursor">
            <h3>Delete</h3>
          </button>
        </td>

        <div v-if="showDialogDeleteItem" class="dialog-overlay">
          <div class="dialog-item">

            <h2 class="font-word">
              Are you sure you want to delete item ?
            </h2>
            <div class="row-center">
              <button class="space-item btn-dialog" @click="showDialogDeleteItem = false"><h3 class="font-word">
                Cancel</h3>
              </button>
              <div class="space-item"/>
              <button class="space-item btn-dialog" @click="deleteItem(item._id)"><h3 class="font-word">Yes</h3>
              </button>
            </div>
          </div>
        </div>



        <div v-if="showDialogEditItem" class="dialog-overlay">
          <div class="dialog-item">
            <h3>Todo:</h3>
            <textarea class="textarea-size" v-model="todoNameEdit"/>
            <h3>
              {{toggleTitle()}}
            </h3>
            <div>
              <button class="toggle-button" :class="{ active: isToggledEdit }" @click="toggle">
                <div class="toggle-circle" :class="{ active: isToggledEdit }"/>
              </button>
            </div>
            <div class="row-center">
              <button class="space-item btn-dialog" @click="showDialogEditItem = false"><h3 class="font-word">Cancel</h3>
              </button>
              <div class="space-item"/>
              <button class="space-item btn-dialog" @click="editItem()"><h3 class="font-word">Save</h3></button>
            </div>
          </div>
        </div>

      </tr>
      </tbody>
    </table>

    <div v-if="showDialogAddItem" class="dialog-overlay">
      <div class="dialog-item">
        <h3>Todo:</h3>
        <textarea class="textarea-size" v-model="todoName"/>
        <h3>
          {{toggleTitle()}}
        </h3>
        <div>
          <button class="toggle-button" :class="{ active: isToggled }" @click="toggle">
            <div class="toggle-circle" :class="{ active: isToggled }"/>
          </button>
        </div>
        <div class="row-center">
          <button class="space-item btn-dialog" @click="showDialogAddItem = false"><h3 class="font-word">Cancel</h3>
          </button>
          <div class="space-item"/>
          <button class="space-item btn-dialog" @click="addItem()"><h3 class="font-word">Save</h3></button>
        </div>
      </div>
    </div>

    <nav class="pagination">
      <ul>
        <li :class="{ disabled: currentPage === 1 }">
          <a @click="prevPage">Previous</a>
        </li>
        <li v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a @click="changePage(page)">{{ page }}</a>
        </li>
        <li :class="{ disabled: currentPage === totalPages }">
          <a @click="nextPage">Next</a>
        </li>
      </ul>
    </nav>

  </div>

</template>

<script>
import Header from "@/components/header/Header.vue";
import Alert from "@/components/alert/Alert.vue";
import axios from 'axios'


export default {
  components: {Header, Alert},
  data() {
    return {
      showDialogAddItem: false,
      showDialogEditItem: false,
      showDialogDeleteItem: false,
      todoName: '',
      isToggled: false,
      todoNameEdit:'',
      isToggledEdit:false,
      idEdit:'',
      text: '',
      show: false,
      color: '',
      search: '',
      currentPage: 1,
      itemsPerPage: 10, // Number of items to display per page
      searchText: '', // Search text input value
      data: [],

      items: [
        {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "salam man hassan yousefi taeme az tehran motavaled 1375 bara bara ba man amadeam vay vay man amadeam vay vay ",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: false
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: false
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "jkkkkkkkkkkkkkkkkkkkknv'dsj'''''''''''''''''''''''dvnnnnnnnnnnnnnnnnnnnnnnnnnnnj'sssssssssssssssssvnnnnnnnnnnnnnnnnnnnnnnnnnnn",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        }, {
          _id: "64ca8cce3233eb7588f6fd67",
          todoName: "Bbbb",
          createdAt: "2023-08-02T17:05:16.389Z",
          isComplet: true
        },
      ],

      loading: false,
    }
  },
  computed: {
    filteredData() {
      if (this.searchText) {
        const searchRegex = new RegExp(this.searchText, 'i');
        return this.data.filter((item) =>
            Object.values(item).some(value => value.toString().match(searchRegex))
        );
      }
      return this.data;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredData.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
  methods: {
    //==================================================================================================================
    async getTodo() {
      this.loading = true
      await axios.get('https://calm-plum-jaguar-tutu.cyclic.app/todos').then((res) => {
        if (res.status === 200) {
          // this.items=res.data.data ;
          console.log(this.items)
        }
      }).catch((err) => {
        console.log(err)
      });
      this.loading = false
    },
    //==================================================================================================================
    async deleteItem(id) {
      this.showDialogDeleteItem = false
      await axios.delete('https://calm-plum-jaguar-tutu.cyclic.app/todos/' + id).then((res) => {
        if (res.status === 200) {
          this.show = true
          this.text = 'Success Deleted Item'
          this.color = 'background-color: red'
        }
      }).catch((err) => {
        console.log(err)
      });
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
    async addItem() {
      this.showDialogAddItem = false
      await axios.post('https://calm-plum-jaguar-tutu.cyclic.app/todos/',{
        todoName:this.todoName,
        isComplete:this.isToggled
      }).then((res) => {
        if (res.status === 200) {
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
    getDataEdit(value){

      this.showDialogEditItem=true
      this.todoNameEdit=value.todoName
      this.idEdit=value._id
      this.isToggledEdit=value.isComplet
    },
    async editItem() {
      this.showDialogEditItem = false
      await axios.put('https://calm-plum-jaguar-tutu.cyclic.app/todos/'+this.idEdit,{
        todoName:this.todoNameEdit,
        isComplete:this.isToggledEdit
      }).then((res) => {
        if (res.status === 200) {
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
    formatDate(value) {
      return value.slice(0, 10);
    },
    //==================================================================================================================
    changeTitle(value) {
      if (value === true) {
        return "Done";
      } else {
        return "Not Dane"
      }
    },
    toggleTitle() {
      return this.isToggled ? 'Done' : 'Not Done';
    },
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
    resetPage() {
      this.currentPage = 1;
    },
    changePage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
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


.dialog-item {
  background-color: #ccfaf0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}


.btn-item {
  width: 120px;
  height: 40px;
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.pagination li {
  display: inline-block;
  margin-right: 5px;
}

.pagination a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

.pagination a:hover {
  background-color: #ddd;
}

.pagination .disabled {
  pointer-events: none;
  opacity: 0.5;
}


.toggle-button {
  position: relative;
  width: 55px;
  height: 26px;
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


</style>
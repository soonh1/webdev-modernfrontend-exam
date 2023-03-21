import axios from 'axios';

axios.defaults.baseURL = 'https://my-json-server.typicode.com/Jakobbnielsen/json-sample-data'


const state = {
  invoicesItems: [] 
}

const mutations = {
  GET_INVOICES_ITEMS (state, payload) {
    state.invoicesItems = payload;
  },

  ADD_INVOICES(state, { invoices }) {
    state.invoicesItems.push(invoices)
  },

  //virker ikke endnu
  UPDATE_INVOICES_ITEMS(state, id, payload) {
    const record = state.invoicesItems.find(i => i.id === id);
    state.invoicesItems[record] = payload;
  },

  DELETE_INVOICE(state, id) {
    var index = state.invoicesItems.findIndex(i => i.id == id)
    state.invoicesItems.splice(index, 1)
  }
}

const actions = {
  // Get
  getInvoicesItems ({ commit }) {
    axios.get('/invoices').then((response) => {
      commit('GET_INVOICES_ITEMS', response.data)
    });
  },

  //Create
  ADD_NEW_INVOICES({ commit }, payload) {
    axios.post('/invoices', payload).then((response) => {
      commit('ADD_INVOICES', { invoices: response.data })
    }, (err) => {
      console.log(err)
    })
  },

  //Edit
  async UPDATE_INVOICES({ commit }, id) {
    axios.patch('/invoices/' + id,{
      status: "paid"
    } ).then((response) => {
      commit('UPDATE_INVOICES_ITEMS', id, { invoices: response.data })
    }, (err) => {
      console.log(err)
    })
  },

  //DELETE
  async deleteInvoice({commit}, id) {
    axios.delete('/invoices/' + id).then(() =>{
      commit('DELETE_INVOICE', id)
    }, (err) => {
      console.log(err)
    })
  }
}

const getters = {
  invoicesItems: state => state.invoicesItems,
  invoicesItemFromId: (state) => (id) => {
    return state.invoicesItems.find(invoicesItem => invoicesItem.id === id)
  }
}

const invoicesModule = {
  state,
  mutations,
  actions,
  getters
}

export default invoicesModule;

<template>
  <b-container>
    <!-- Diary Entry Box -->
    <b-row style="margin-top: 20px">
      <b-col class="text-right">
        <b-button variant="success" align-v='right' v-b-modal.modal-add-entry>+ Add Entry</b-button>
      </b-col>
    </b-row>

    <!-- Diary Entries -->
    <div v-for="entry in entries" :key="entry">
      <Entry
        :title="entry.title"
        :date="entry.createdAt"
        :body="entry.body"
        :id="entry._id"
        @openUpdateModal="openUpdateModal"
        @openDeleteModal="openDeleteModal"
      />
    </div>

    <!-- Add new diary entry modal -->
    <b-modal id="modal-add-entry" title="Add new diary entry" @ok="addNewEntry">
      <b-form-input
        style="margin-bottom: 10px;"
        v-model="new_entry_title"
        placeholder="Whats on your mind?" />
      <b-form-textarea
        v-model="new_entry_body"
        placeholder="Tell me more..."
        rows="5"
        max-rows="6"
      />
    </b-modal>

    <!-- Update diary entry modal -->
    <b-modal id="modal-update-entry" title="Update diary entry" @ok="updateEntry">
      <b-form-input
        style="margin-bottom: 10px;"
        v-model="update_entry_title"
        placeholder="Whats on your mind?" />
      <b-form-textarea
        v-model="update_entry_body"
        placeholder="Tell me more..."
        rows="5"
        max-rows="6"
      />
    </b-modal>

    <!-- Delete diary entry modal -->
    <b-modal id="modal-delete-entry"  title="Delete diary entry" @ok="deleteEntry">
      <p>Are you sure you want to delete this entry?</p>
    </b-modal>

  </b-container>
</template>

<script>
import axios from 'axios';
import Entry from '../components/Entry.vue';

let endpoint = process.env.VUE_APP_API_ENDPOINT;

export default {
  name: 'Diary',
  components: {
    Entry
  },
  props: {
  },
  data(){
    return {
      entries: [],
      currentID: -1,
      update_entry_title: '',
      update_entry_body: ''
    }
  },
  created() {
    this.fetchEntries();
  },
  methods: {
    fetchEntries() {
      // Get all entries
      axios.get(endpoint)
      .then(response => {
        // JSON responses are automatically parsed.
        let data = response.data;
        this.entries = data.data;
      })
      .catch(e => {
        console.log(e);
      })
    },
    addNewEntry() {
      axios.post(endpoint, {
        title: this.new_entry_title,
        body: this.new_entry_body
      })
      .then(() => {
        this.new_entry_title = "";
        this.new_entry_body = "";
        this.fetchEntries();
      })
      .catch(e => {
        console.log(e);
      })
    },
    updateEntry() {
      axios.put(endpoint + this.currentID, {
        title: this.update_entry_title,
        body: this.update_entry_body
      })
      .then(() => {
        this.fetchEntries();
      })
      .catch(e => {
        console.log(e);
      })
    },
    deleteEntry(){
      axios.delete(endpoint + this.currentID)
      .then(() => {
        this.fetchEntries();
      })
      .catch(e => {
        console.log(e);
      })
    },
    openUpdateModal(id, title, body){
      this.currentID = id;
      this.update_entry_title = title;
      this.update_entry_body = body;
      this.$bvModal.show("modal-update-entry");
    },
    openDeleteModal(id){
      this.currentID = id;
      this.$bvModal.show("modal-delete-entry");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

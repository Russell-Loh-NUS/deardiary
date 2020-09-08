<template>
  <b-card
    class="text-left"
    :title="title"
    :sub-title="moment(date).format('DD/MM/YYYY')"
    style="margin-top: 20px;"
  >
    <b-card-text v-html="body.replace(/(?:\r\n|\r|\n)/g, '<br />')">
      {{body}}
    </b-card-text>

    <b-row>
      <b-col class="text-right">
        <b-button variant="warning" @click="openUpdateModal(id, title, body)"><b-icon style="color: #FFF;" icon="pencil"></b-icon></b-button>
        <b-button style="margin-left: 10px" variant="danger" @click="openDeleteModal(id)"><b-icon icon="trash"></b-icon></b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    title: String,
    date: String,
    body: String,
    id: String
  },
  methods: {
    openUpdateModal(id, title, body){
      this.$emit('openUpdateModal', id, title, body);
    },
    openDeleteModal(id){
      this.$emit('openDeleteModal', id);
    }
  }
}
</script>

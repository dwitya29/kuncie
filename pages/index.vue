<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">Search</b-navbar-brand>
    </b-navbar>
    <b-breadcrumb :items="[{ text: 'Home', href: '/' }]"></b-breadcrumb>
    <b-card
      v-for="classItem in classes.items"
      :key="classItem.id"
      class="m-3"
    >
      <b-card-text>
        {{ classItem.name }}
      </b-card-text>
      <nuxt-link :to="{
        path: '/details',
        query: {
          id: classItem.id,
        }
      }">
        <b-button size="sm" variant="info">Lihat detail</b-button>
      </nuxt-link>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'IndexPage',
  computed: {
    ...mapState('classes', ['classes']),
  },
  async mounted() {
    await this.fetchClasses();
  },
  methods: {
    ...mapActions('classes', ['fetchClasses']),
  },
});
</script>

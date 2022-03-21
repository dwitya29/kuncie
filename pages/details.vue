<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">{{ classDetails.name }}</b-navbar-brand>
    </b-navbar>
    <b-breadcrumb :items="[{ text: 'Home', href: '/' }, { text: `${classDetails.name}`, href: '#' }]"></b-breadcrumb>
    <b-card class="m-3">
      <b-card-text>
        {{ classDetails.description }}
      </b-card-text>
    </b-card>
    <div class="m-3">
      <h4>Mentors</h4>
      <b-list-group>
        <b-list-group-item v-for="mentor in classDetails.mentors" :key="mentor.id">{{ mentor.name }} - {{ mentor.description }}</b-list-group-item>
      </b-list-group>
    </div>
    <hr class="m-3" />
    <div class="m-3">
      <h4>Register</h4>
      <b-card>
        <b-form>
          <b-form-group id="input-group-name" label="Full Name" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              placeholder="Enter full name"
              required
            />
          </b-form-group>

          <b-form-group id="input-group-email" label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            />
          </b-form-group>

          <b-button class="sm" variant="info" @click="handleRegisterButton">Register</b-button>
        </b-form>
      </b-card>
    </div>
    <b-modal v-model="showDialog" :title="notifTitle" @ok="closeDialog" @hide="closeDialog" @close="closeDialog" ok-only>
      <p>{{ notifMessage }}</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { JoinClassParams } from '~/types/model/class-details';

export default Vue.extend({
  name: 'DetailsPage',
  computed: {
    ...mapState('classes', ['classDetails', 'notifTitle', 'notifMessage']),
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
      },
      showDialog: false,
    }
  },
  watch: {
    notifMessage(newVal) {
      if (newVal !== '') {
        this.showDialog = true
      }
    }
  },
  async mounted() {
    await this.fetchClassDetails(this.$route.query.id);
  },
  methods: {
    ...mapActions('classes', ['fetchClassDetails', 'joinClass']),
    ...mapMutations('classes', ['SET_NOTIFICATION']),
    async handleRegisterButton() {
      const params: JoinClassParams = {
        classId: this.classDetails.id,
        attendeeFullName: this.form.name,
        attendeeEmail: this.form.email,
      }
      await this.joinClass(params);
      this.form.name = '';
      this.form.email = '';
    },
    closeDialog() {
      this.showDialog = false;
      this.SET_NOTIFICATION({
        title: '',
        message: '',
      });
    }
  },
});
</script>

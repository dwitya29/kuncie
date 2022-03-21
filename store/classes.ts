import { ActionTree, MutationTree } from 'vuex';
import { Class } from '~/types/model/class';
import { ClassDetails, JoinClassParams } from '~/types/model/class-details';

const HOST_URL: string = 'https://baee0c5d-15e7-45e2-ae1b-392ba74406a9.mock.pstmn.io';

export const state = () => ({
  classes: [] as Class[],
  classDetails: {} as ClassDetails,
  notifMessage: '' as string,
  notifTitle: '' as string,
});

export type ClassesState = ReturnType<typeof state>

export const mutations: MutationTree<ClassesState> = {
  SET_CLASSES: (state: ClassesState, classes: Class[]) => (state.classes = classes),
  SET_CLASS_DETAILS: (state: ClassesState, classDetails: ClassDetails) => (state.classDetails = classDetails),
  SET_NOTIFICATION: (state: ClassesState, { title, message }) => {
    state.notifTitle = title;
    state.notifMessage = message;
  }
};

export const actions: ActionTree<ClassesState, ClassesState> = {
  async fetchClasses({ commit }) {
    try {
      const response = await this.$axios.$get(
        `${HOST_URL}/available-classes`,
      );
      commit('SET_CLASSES', response);
    } catch (e: any) {
      const { message } = e.response.data;
      commit('SET_NOTIFICATION', {
        title: 'Error',
        message
      });
    }
  },

  async fetchClassDetails({ commit }, id: number) {
    try {
      const response = await this.$axios.$get(
        `${HOST_URL}/learning-class?id=${id}`,
      );
      commit('SET_CLASS_DETAILS', response);
    } catch (e: any) {
      const { message } = e.response.data;
      commit('SET_NOTIFICATION', {
        title: 'Error',
        message
      });
    }
  },

  async joinClass({ commit }, { classId, attendeeFullName, attendeeEmail }: JoinClassParams) {
    try {
      const data: JoinClassParams = {
        classId,
        attendeeFullName,
        attendeeEmail,
      }
      const config: Object = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }

      const response = await this.$axios.$post(
        `${HOST_URL}/join-class`,
        data,
        config,
      );
      const message: string = response?.message ?? '';
      commit('SET_NOTIFICATION', {
        title: 'Success',
        message
      });
    } catch (e: any) {
      const { message } = e.response.data;
      commit('SET_NOTIFICATION', {
        title: 'Error',
        message
      });
    }
  },
};

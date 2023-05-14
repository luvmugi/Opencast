// @ts-check
import { defineStore } from 'pinia'


export const useMenuStore = defineStore({
  id: 'user',

  state: () => ({
    selectedMenu: 'ztqk',
    loadingInstance1: null,
  }),

  actions: {
    setSelectedMenu(menuID) {
      this.selectedMenu = menuID
    },
  },
})


interface IUserProp {
  name: string
  age: number
}

interface IState {
  user: IUserProp
}

const state = {
  user: {
    name: 'vite',
    age: 24,
  },
}

const getters = {
  userName(state: IState) {
    return state.user.name
  },
}

const mutations = {
  SET_USER(state: IState, value: IUserProp) {
    state.user = value
  },
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations,
}

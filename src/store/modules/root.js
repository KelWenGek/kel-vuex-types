export default {
    namespace: 'root',
    mapTypesToModule: ['SET_NAME'],
    mapTargetsToModule: ['list'],
    mapDefinitionToModule({ types }) {
        return {
            state: {
                greeting: 'hello kel',
                geek: 'is geek',
                name: 'kel'
            },
            getters: {
                kel(state, getters) {
                    return state.geek
                }
            },
            mutations: {
                [types.SET_NAME](state, payload) {
                    state.name = payload;
                }
            },
            actions: {

            }
        }
    }
}
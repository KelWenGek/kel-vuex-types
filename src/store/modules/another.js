export default {
    namespace: 'another',
    mapTypesToModule: ['SET_AGE', 'SET_AGE_ASYNC'],
    mapTargetsToModule: ['list'],
    mapDefinitionToModule({ types }) {
        return {
            state: {
                age: 28
            },
            mutations: {
                [types.SET_AGE](state, payload) {
                    state.age = payload
                }
            },
            actions: {
                async [types.SET_AGE_ASYNC]({ commit, state }) {
                    try {
                        return await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                let payload = 20;
                                resolve(payload);
                                commit(types.SET_AGE, payload);
                            }, 2000);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}
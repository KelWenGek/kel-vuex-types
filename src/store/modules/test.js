export default {
    namespace: 'test',
    mapTypesToModule: ['SET_KEY', 'SET_KEY_ASYNC', 'GET_STH_ASYNC'],
    mapTargetsToModule: ['list'],
    mapDefinitionToModule({ types, namespace }) {
        return {
            state: {
                greeting: 'hello luly',
                key: 'hello kel'
            },
            mutations: {
                [types.SET_KEY](state, payload) {
                    state.key = payload
                }
            },
            actions: {
                async [types.GET_STH_ASYNC]({ commit }) {
                    // commit(types.SET_LIST_LOADING);
                    try {
                        const searchResult = await this.http({
                            // namespace: 'test',
                            target: ['test', 'list'],
                            url: 'search',
                            params: {
                                keywords: '海阔天空'
                            }
                        });
                        // commit(types.SET_LIST_SUCCESS, {
                        //     data: {
                        //         loaded: true,
                        //         total: searchResult.result.songCount,
                        //         data: searchResult.result.songs
                        //     }
                        // })
                        return searchResult;
                    } catch (e) {
                        // console.error(e);
                        // commit(types.SET_LIST_FAILURE, {
                        //     error: e
                        // })
                    }
                },
                async [types.SET_KEY_ASYNC]({ commit, state }) {
                    // console.log(this);
                    try {
                        return await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                let payload = 'hyhy';
                                resolve(payload);
                                commit(types.SET_KEY, payload);
                            }, 3000);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            },
            modules: [
                {
                    namespace: 'll',
                    mapTypesToModule: ['SET_LLL'],
                    mapTargetsToModule: ['list'],
                    mapDefinitionToModule({ types, namespace }) {
                        return {
                            state: {
                                name: 'hyhy'
                            },
                            mutations: {
                                [types.SET_LLL](state, payload) {
                                    state.name = payload;
                                }
                            },
                            modules: [
                                {
                                    namespace: 'hahah',
                                    mapTypesToModule: ['SET_HHH'],
                                    mapTargetsToModule: ['list'],
                                    mapDefinitionToModule({ types, namespace }) {
                                        return {
                                            state: {
                                                name: 'hyhy'
                                            },
                                            mutations: {
                                                [types.SET_HHH](state, payload) {
                                                    state.name = payload;
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
}
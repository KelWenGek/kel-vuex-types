import axios from 'axios';
import { normalizeTypeForEffect } from '../vuex-types/util';
//创建一个客户端
const http = axios.create({
    baseURL: 'http://localhost:3000/'
});
//http注入Vue中
http.install = function (Vue, options) {
    if (http.installed) return;
    http.installed = true;
    Object.defineProperties(Vue.prototype, {
        //挂载axios
        '$http': {
            writable: false,
            configurable: false,
            enumerable: false,
            value: http
        }
    });
}
//将http模块注入store中
http.inject = function (store) {
    if (store.http) return;
    http.defaults.store = store;
    Object.defineProperty(store, 'http', {
        get() {
            return http;
        },
        enumerable: false
    });
    //统一管理list request loading;
    http.interceptors.request.use(config => {
        let { target, store } = config;
        if (target) {
            let commit, realTarget;
            if (Array.isArray(target)) {
                const namespace = store._modules.getNamespace(store.namespaces[target[0]]);
                commit = store._modulesNamespaceMap[namespace].context.commit;
                realTarget = target[1];
            } else if (typeof target === 'string') {
                commit = store.commit;
                realTarget = target;
            } else {
                throw new Error('Target shoud be a array or string');
            }
            const effect = normalizeTypeForEffect({ effect: 'loading', target: realTarget });
            commit({ type: effect, target: realTarget });
        }
        return config;
    });
}


export default http;

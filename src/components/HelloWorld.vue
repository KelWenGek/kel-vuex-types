<template>
  <div class="hello">
    <div @click="setKeyAsync('luly')">{{key}}</div>
    <div @click="setName('ll')">{{name}}</div>
    <div>{{`age:${age}`}}</div>
    <h1 @click="setN('fjfjksf')">{{ ll }}</h1>
    <p>{{listLoading?'正在加载':'加载完成'}}</p>
    <p>
      For guide and recipes on how to configure / customize this project,
      <br> check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank">vuex</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'HelloWorld Title',
      // all titles will be injected into this template
      titleTemplate: '%s | My Awesome Webapp',
      meta: [
        { vmid: 'description', name: 'description', content: 'bar' }
      ]
    },

    data() {
      //由于beforeCreate之前会mergeOptions 所以data fn会被调用,此时this.$options还没准备好
      return {};
    },
    props: {
      msg: String
    },
    methods: {
      getCommit(target) {
        if (Array.isArray(target)) {
          let namespace = this.$store._modules.getNamespace(this.$store.namespaces[target[0]]);
          return this.$store._modulesNamespaceMap[namespace].context.commit;
        }
        return this.$store.commit;
      },
      getTypes(target) {
        if (Array.isArray(target)) {
          return this.$store.namespaces[target[0]].reduce((memo, path) => memo[path], this.$store.types);
        }
        return this.$store.types.root
      }
    },
    created() {
      // console.log('im in my component');
      // console.log(this.types);
      // this.$http({
      //   url: 'search',
      //   params: {
      //     keywords: '海阔天空'
      //   }
      // }).then(console.log);
      // console.log(this.$types);
      // this.$http({
      //   target: ['test', 'list'],
      //   url: 'search',
      //   params: {
      //     keywords: '海阔天空'
      //   }
      // }).then(({ data, config }) => {

      // });
      // this.getSthAsync().then(console.log);

    },
    mixins: [
      {
        created() {
          // console.log('im in mixins');
        },
        _mappedState: {
          root: ['name'],
          test() {
            return {
              greeting: 'greeting'
            }
          }
        },
        _mappedMutations: {
          ['test/ll']({ types }) {
            return {
              setN: types.SET_LLL
            }
          }
        }
      }
    ],
    _mappedState: {
      test() {
        let name = this.$options.name;
        return {
          // greeting(state) {
          //   return state.greeting + ' ' + name;
          // },
          'listLoading': 'listLoading',
          key: 'key'
        };
      },
      another: ['age'],
      ['test/ll']() {
        return {
          // 'listLoading':'listLoading',
          ll(state) {
            return state.name;
          }
        }
      }
    },
    _mappedGetters: {
      root: ['kel']
    },
    _mappedMutations: {
      root({ types, rootCommit }) {
        return {
          setName(commit, payload) {
            // types rootTypes 在 this.$types都能拿到
            commit(types.test.SET_KEY, payload);
            rootCommit(types.another.SET_AGE, 18);
          }
        }
      },
      ['test/ll']({ types }) {
        return {
          setN(commit, payload) {
            // console.log('this is extended');
            commit(types.SET_LLL, payload);
          }
        }
      },
      // test({ types, rootTypes, rootCommit }) {
      //   return {
      //     setKey(commit, payload) {
      //       commit(types.SET_KEY, payload);
      //       rootCommit(rootTypes.another.SET_AGE, 19);
      //     }
      //   }
      // }
      test({ types, rootTypes }) {
        // 通过参数注入的用意是该种情况下时能够拿到
        return {
          setKey: types.SET_KEY
        }
      }
    },
    _mappedActions: {
      test({ types, rootTypes, rootDispatch }) {
        return {
          getSthAsync: types.GET_STH_ASYNC,
          async setKeyAsync(dispatch, payload) {
            await dispatch(types.SET_KEY_ASYNC, payload);
            await rootDispatch(rootTypes.another.SET_AGE_ASYNC);
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
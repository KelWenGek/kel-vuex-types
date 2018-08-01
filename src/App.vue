<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div @click="toggle">click me</div>
    <Test v-verify.immediate="valid">
      <!-- <div>hello div</div> -->
      <!-- <Com name="kel">
        <div>hello functional child1</div>
      </Com> -->
      <!-- <Child title="hello hyhy">hello slot</Child> -->
    </Test>
    <router-view/>
  </div>
</template>
<script>
  import Test from './components/Test';
  // import Child from './components/Child';
  export default {
    name: 'App',
    // metaInfo: {
    //   // if no subcomponents specify a metaInfo.title, this title will be used
    //   title: 'Default Title',
    //   // all titles will be injected into this template
    //   titleTemplate: '%s | My Awesome Webapp',
    //   htmlAttrs: {
    //     foo: 'bar',
    //     amp: undefined
    //   },
    //   link: [
    //     { rel: 'stylesheet', href: '/css/index.css' },
    //     { rel: 'favicon', href: 'favicon.ico' }
    //   ],
    //   style: [
    //     { cssText: '.foo { color: red }', type: 'text/css' }
    //   ],
    //   // script: [
    //   //   { innerHTML: 'console.log("I am in body");', type: 'text/javascript', body: true }
    //   // ],
    //   meta: [
    //     { charset: 'utf-8' },
    //     { vmid: 'description', name: 'description', content: 'foo' }
    //   ]
    // },
    mounted() {
      // console.log(this.$meta().inject().link.text());
    },
    components: {
      Test,
      // Com: {
      //   functional: true,
      //   render(h, context) {
      //     console.log(context);
      //     console.log(context.props);
      //     console.log(context.children);
      //     return h('div', context.data, context.children);
      //   }
      // },
    },
    data() {
      return {
        valid: true
      }
    },
    methods: {
      toggle() {
        this.valid = !this.valid;
      }
    },
    directives: {
      verify(el, binding, vnode) {
        // console.log(this);
        // console.log(el);
        // console.log(vnode);
        if (binding.modifiers.immediate) {
          // binding.value ? vnode.componentInstance.log() : console.log('binding value has change');
        }
      }
    }
  }
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    /* a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    } */
  }
</style>
# Vuex-types 使用文档
该文档包含了代码组织及使用方式

主要解决了在使用`Vuex`过程中的两个问题

1. 声明`mutations`和`actions`时的*`types`*的正交化问题

2. `vue helpers`的改造,自动匹配命名空间和`types`注入,与1中的声明`types`完成正交化

***
	
# 核心概念

* **Module**

	> `Vuex-types Module`=`Vuex Module Creator`

	> 同时注入*`types`*,返回一个`Vuex Module`

	```js
	{
		namespace: 'test',
		mapTypesToModule: ['TYPE_1', 'TYPE_2', 'TYPE_3'...],
		mapTargetsToModule: ['TARGET_1'...],
		mapDefinitionToModule({ types, namespace }) {
			return {
				state:{},
				getters:{},
				mutations:{
					[types.TYPE_1](state,payload){}
				},
				actions:{
					[types.TYPE_2]({commit},payload){}
				},
				modules:[] 
			}
		}
	}
	```
	
	* namespace 
	
    >`String` Module命名空间名称 
	* mapTypesToModule 
		
		>`Function:() => Array<string> | Array<string>` `types`映射 
	* mapTargetsToModule 
		
		>`Function:() => Array<string> | Array<string>` `targets`映射 主要用于收集需要`loading`效果的state属性
	* mapDefinitionToModule
	
		```ts
		type VuexTypesModuleUtil={
			types:{
				[key:string]:string
			};
			namespace:string;
		}
		type VuexModule={
			state:{ [key:string]: any};
			getters:{ [key:string]: any};
			mutations:{ [key:string]:(state,payload:any)=>any}
			actions:{ [key:string]:({commit},payload:any)=>any}
		}
		
		```
		>`Function:(util: VuexTypesModuleUtil) => VuexModule` 将`VuexTypes Utility`注入,拿到`types`等用于声明`mutations`及`actions`
		
		> **注意** 返回的modules为`Array`类型,其中可以在嵌套 `VueTypesModule`

***

# 使用方式

通过`Vue.use(VuexTypes)`安装完`vuex-types`,`this.$store`上自动注入`types`,再也不用烦恼如何管理`types constants`的问题,`VuexTypes.createStore`生成一个`vuex store`

>以下是`createStore`的参数`option`

```js
{
	root,
  	modules: [
   		module1,
    	module2
  	],
  	plugins: [
   		plugin1,
   		plugin2
  	]
}
```
> 其中 `root`和`modules`中的模块都是`Vuex Type Module`
 
> 按层级关系,根级module放入`root`,一级module放入`modules`属性中,二级module放入一级module的`modules`
 
> 如上代码组织形式,使用`vuex helpers`时无需引用,直接使用,在`component option`中直接注入`_mappedState,_mappedGetters,_mappedMutations,_mappedActions`,

> `_mappedState,_mappedGetters,_mappedMutations,_mappedActions`的类型为`Function`时,自动注入`types,rootTypes,rootCommit,rootDispatch`,返回的形式和直接使用`vuex`时一模一样


```js
{
	_mappedState: {
      root: ['name'],
      test() {
        let name = this.$options.name;
        return {
          greeting(state) {
            return state.greeting + ' ' + name;
          },
          'listLoading': 'listLoading',
          key: 'key'
        };
      },
      ['test/ll']() {
        return {
          'listLoading':'listLoading',
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
          setN: types.SET_LLL
        }
      },
      test({ types, rootTypes, rootCommit }) {
        return {
          setKey(commit, payload) {
            commit(types.SET_KEY, payload);
            rootCommit(rootTypes.another.SET_AGE, 19);
          }
        }
      }
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
```



	
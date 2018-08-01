<!-- <template>
    <div>hello kel</div>
</template> -->
<script>
    import Child from './Child';
    export default {
        name: 'test',
        components: {
            // Child: () => import('./Child'),
            Child,
            Com: {
                functional: true,
                render(h, context) {
                    console.log(context);
                    return h('div', context.data, context.parent.$slots.default);
                }
            },
        },
        methods: {
            log() {
                // console.log('hello kel in component test');
            }
        },
        render(h) {
            return h(Child, {
                props: {
                    title: 'hello hyhy'
                },
                hook: {
                    init(vnode) {
                        console.log('component init', vnode);
                    }
                }
            });
        }
    }
</script>
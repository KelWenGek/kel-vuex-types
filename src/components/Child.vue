<template>
    <div>
        <div>
            {{msg}}--{{title}}
        </div>
        <slot></slot>
    </div>
</template>
<script>    
    export default {
        name: 'child',
        props: ['title'],
        data() {
            return {
                msg: 'hello child'
            };
        }
    }
</script>
<template>
  <span class="markdown__nodes">
    <span
      v-for="(node, index) in nodes"
      :key="index"
      class="markdown__node-item"
    >
      <code v-if="mdTypes.INLINE_CODE === node.type">{{ node.value }}</code>
      <em v-else-if="mdTypes.EMPHASIS === node.type" class="markdown__em">
        <MDnode :nodes="node.children"></MDnode
      ></em>
      <strong v-else-if="mdTypes.STRONG === node.type" class="markdown__strong">
        <MDnode :nodes="node.children"></MDnode
      ></strong>
      <a
        v-else-if="mdTypes.LINK === node.type"
        :href="node.url"
        target="_blank"
        rel="noreferrer"
        class="markdown__link"
      >
        <MDnode :nodes="node.children"></MDnode
      ></a>
      <span v-else-if="mdTypes.TEXT === node.type">{{ node.value }}</span>
      <span v-else>⚠️ no handling - {{ node.type }}</span>
    </span>
  </span>
</template>

<script>
import { mdTypes } from 'mdast-util-from-span-markdown'

export default {
  name: 'MDnode',
  props: {
    nodes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      mdTypes,
    }
  },
}
</script>

<template>
	<uvText :type="type" :show="show" :text="text" :prefixIcon="prefixIcon" :suffixIcon="suffixIcon" :mode="mode" :href="href" :format="format" :call="call" :openType="openType"
		:bold="bold" :block="block" :lines="lines" :color="color" :decoration="decoration" :size="size" :iconStyle="iconStyle" :margin="margin" :lineHeight="lineHeight" :align="align"
		:wordWrap="wordWrap" :customStyle="customStyle" @click="$emit('click')"></uvText>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-text被uni-app官方占用了，u-text在nvue中相当于input组件
	 * 所以在nvue下，取名为u--input，内部其实还是u-text.vue，只不过做一层中转
	 * 不使用v-bind="$attrs"，而是分开独立写传参，是因为微信小程序不支持此写法
	 */
	import uvText from "../u-text/u-text.vue";
	import props from "../u-text/props.js";
	import mixin from '../u-text/libs/mixin/mixin.js'
	export default {
		name: "u--text",
		// #ifdef MP-WEIXIN
		// 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
		options: {
			virtualHost: true
		},
		// #endif
		mixins: [props, mixin],
		components: {
			uvText,
		},
	};
</script>
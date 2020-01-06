<template>
	<view>
		<label class="label" :for="id">
			<text class="yticon icon-xuanzhong2" :class="[isShow?'red':'black']"></text>
			<!-- <input type="checkbox" :id="id" v-model="checkboxVal"/> -->
			<checkbox-group @change="inputChange">
				<checkbox :value="value" v-show="false" :checked="value1" :id="id"/>
			</checkbox-group>
		</label>
		<label class="text" :for="id">
			{{text}}
		</label>
	</view>
</template>

<script>
	export default {
		props:{
			isChecked:{
				type:Boolean,
				default(){
					return false
				}
			},
			text:{
				type:String,
				default: ''
			}
		},
		data() {
			return {
				id: 123,
				isShow: false,
				value: false
			}
		},
		created() {
			this.isShow = this.isChecked
		},
		methods:{
			inputChange(e){
				// console.log(e.detail.value[0])
				if(e.detail.value[0]== "false"){
					this.value = true
				}else{
					this.value = false
				}
				console.log(this.value)
				// this.value = false
			}
		},
		watch:{
			value(val){
				console.log(this.value)
				this.isShow = this.value;
				this.$emit('update:isChecked',this.value)
				},
			// get(){
			// 	this.isShow = this.isChecked
			// 	return this.isChecked
			// }
		}
	}
</script>

<style lang="scss">
	.red{
		color: #fa436a!important;
	}
</style>

<template>
	<view>
		<label class="label" :for="id">
			<text class="yticon icon-xuanzhong2" :class="[checkedVal?'red':'black']"></text>
			<!-- <input type="checkbox" :id="id" v-model="checkboxVal"/> -->
			<checkbox-group @change="inputChange">
				<checkbox :value="value" v-show="false" :checked="checkedVal" :id="id"/>
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
				value: false  // 可要可不要，不要就直接写 value='false'
			}
		},
		methods:{
			inputChange(e){
				// console.log(e.detail.value[0])
				let flag;
				if(e.detail.value[0]== "false"){
					flag = true
				}else{
					flag = false
				}
				this.checkedVal = flag
				console.log(flag)
				console.log(this.checkedVal)
			}
		},
		computed:{
			checkedVal:{
				set(newVal){
					console.log(111,newVal)
					this.$emit('update:isChecked',newVal)
				},
				get(){
					console.log(this.isChecked)
					return this.isChecked
				}
			},
		}
	}
</script>

<style lang="scss">
	.red{
		color: #fa436a!important;
	}
</style>

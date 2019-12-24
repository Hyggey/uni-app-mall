<template>
	<view class="goodsHeader">
		<image :src="good.src" mode=""></image>
		<view class="tit_box">
			<text class="tit">{{good.title}}</text>
			<text class="tit2">{{good.title2}}</text>
		</view>
		<text class="yticon icon-you"></text>
	</view>
</template>

<script>
	export default {
		props:{
		// 单个传递
			// src: {
			// 	type: String,
			// 	default:''
			// },
			// title:{
			// 	type: String,
			// 	default:'精品团购'
			// },
			// title2:{
			// 	type: String,
			// 	default:'dagadogogdadg'
			// }
		//一起传递
			good:{
				default(){
					return {
						src:'',
						title:'精品团购',
						title2:'dagadogogdadg'
					}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.goodsHeader{
		padding: 6rpx 30rpx 8rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		height: 140rpx;
		image{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
		.tit_box{
			display: flex;
			flex-direction: column;
			flex: 1;
			.tit{
				font-size: 34rpx;
			}
			.tit2{
				font-size: 24rpx;
				color: #909399;
			}
		}
		.icon-you{
			color: #909399;
		}
	}
</style>

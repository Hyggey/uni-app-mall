<template>
	<view class="container">
		<view>
			<view class="cart_list">
				<block v-for="(item,index) in cartList" :key="index">
					<view class="cart_item">
						<view class="image_wrapper">
							<image :src="item.image" mode=""></image>
						</view>
						<view class="item_middle">
							<text>{{item.title}}</text>
							<text>{{item.attr_val}}</text>
							<text>￥{{item.price}}</text>
							<uni-number-box :min="0" :max="9"></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork"></text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{
			uniNumberBox
		},
		data() {
			return {
				cartList:[],   // 购物车模拟得数据
			}
		},
		onLoad() {
			this.getCartData()
		},
		methods: {
			async getCartData(){
				let list =await this.$api.json('cartList')
				// console.log(list)
				// map 可以改变原数组
				let cartList = list.map(item =>{
					item.check = true;
					return item
				})
				this.cartList = cartList;
				console.log(this.cartList)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.cart_list{
			.cart_item{
				display: flex;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				.image_wrapper{
					width: 230rpx;
					height: 230rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.item_middle{
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;
					flex: 1;
					justify-content: space-between;
					box-sizing: border-box;
					text{
						font-size: 30rpx;
						color: #303133;
					}
					text:nth-child(2){
						font-size: 26rpx;
						color: #909399;
						// margin: 10rpx 0;
					}
					text:nth-child(3){
						// margin-bottom: 24rpx;
					}
				}
				.yticon{
				}
			}
		}
	}
</style>

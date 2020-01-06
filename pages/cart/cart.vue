<template>
	<view class="container">
		<view>
			<!-- 商品列表 -->
			<view class="cart_list">
				<block v-for="(item,index) in cartList" :key="index">
					<view class="cart_item">
						<view class="image_wrapper">
							<image :src="item.image" mode=""></image>
							<view class="yticon icon-xuanzhong2" 
							:class="{checked:item.check}"
							@click="check('item',index)"
							>
							</view>
						</view>
						<view class="item_middle">
							<text>{{item.title}}</text>
							<text>{{item.attr_val}}</text>
							<text>￥{{item.price}}</text>
							<uni-number-box 
							:min="1" 
							:max="item.stock"
							:index="index"
							:value="item.number>item.stock?item.stock:item.number"
							@change="numberChange($event,index)"
							>
							</uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏目 -->
			<view class="menu_section">
				<view class="checkbox">
					<image
						:src="allChecked?'/static/selected.png':'/static/select.png'" 
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear_btn" :class="{show:allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total_price">
					<text class="price_item">￥{{totalPrice}}</text>
					<text class="low">已优惠
						<text>74.35</text>元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
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
				allChecked: false,
				totalPrice: 0   // 设置购物车总价格
			}
		},
		onLoad() {
			this.getCartData()
		},
		methods: {
			// 获取购物车数据
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
				// 初始化计算总价
				this.calcTotal()
			},
			// 点击选中与不选中
			check(type,index){
				console.log(type)
				// this.allChecked = !this.allChecked
				if(type == 'item'){
					this.cartList[index].check = !this.cartList[index].check 
				}else{
					// this.allChecked = !this.allChecked
					// 设置全选与全不选
					const checked = !this.allChecked
					this.cartList.forEach(item =>{
						item.check = checked
					})
					this.allChecked = checked
				}
				this.calcTotal()
			},
			// 计算总价
			calcTotal(){
				let total = 0;
				let checked2 = true;
				// 其中一个为false，全选按钮为false
				this.cartList.forEach(item =>{
					if(item.check == true){
						let value = item.number>item.stock?item.stock:item.number
						total += item.price * value
						console.log(222)
					}else if(checked2 == true){
						checked2 = false
						console.log(111)
					}
					this.allChecked = checked2;
					console.log(checked2)
					this.totalPrice = Number(total.toFixed(2))
				})
			},
			// 单个商品加减计算
			numberChange(number,index){
				// console.log(number,index)
				this.cartList[index].number = parseInt(number);
				this.calcTotal();
				// item.number = parseInt(value)
				// this.calcTotal()
			},
			// 清空购物车
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					// 使用箭头函数，不然找不到this
					success:(e) =>{
						if(e.confirm){
							this.cartList = []
						}
					}
				})
			},
			// 删除单个商品
			deleteCartItem(index){
				console.log(index)
				this.cartList.splice(index,1)
				this.calcTotal()
			},
			// 结算按钮
			createOrder(){
				const goodsData = [];
				this.cartList.forEach(item =>{
					if(item.check == true){
						goodsData.push({
							attr_val: item.attr_val,
							number: item.number
						})
					}
				})
				console.log(goodsData)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding-bottom: 130rpx;
		box-sizing: border-box;
		.cart_list{
			.cart_item{
				display: flex;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #E4E7ED;
				.image_wrapper{
					width: 230rpx;
					height: 230rpx;
					flex-shrink: 0;
					position: relative;
					image{
						width: 100%;
						height: 100%;
					}
					.icon-xuanzhong2{
						font-size: 44rpx;
						position: absolute;
						top: -17rpx;
						left: -16rpx;
						background: #fff;
						border-radius: 50%;
						padding: 0 4rpx;
						color: #C0C4CC;
					}
					.checked{
						color: #fa436a;
					}
				}
				.item_middle{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
					text:nth-child(1){
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: block;
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
					padding: 4rpx 10rpx;
					box-sizing: border-box;
				}
			}
		}
		.menu_section{
			position: fixed;
			bottom: 30rpx;
			width: 100%;
			height: 100rpx;
			background: rgba(255, 255, 255, 0.9);
			box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			z-index: 99;
			.checkbox{
				display: flex;
				position: relative;
				image{
					width: 52rpx;
					height: 52rpx;
					position: relative;
					z-index: 5;
				}
				.clear_btn{
					background: #C0C4CC;
					color: #FFFFFF;
					height: 52rpx;
					line-height: 52rpx;
					border-radius: 0 50px 50px 0;
					padding-left: 38rpx;
					left: 26rpx;
					position: absolute;
					top: 0;
					font-size: 28rpx;
					box-sizing: border-box;
					opacity: 0;
					width: 0;   // 伸缩效果
					transition: .2s;   // opacity动画
					&.show{
						opacity: 1;
						width: 120rpx;
					}
				}
			}
			.total_price{
				display: flex;
				flex-direction: column;
				flex: 1;
				text-align: right;
				color: #303133;
				padding-right: 30rpx;
				box-sizing: border-box;
				.price_item{
					font-size: 32rpx;
				}
				.low{
					font-size: 24rpx;
					text{
						color: #909399;
					}
				}
			}
			button[type=primary]{
				border-radius: 100px;
				height: 76rpx;
				line-height: 76rpx;
				font-size: 30rpx;
				padding: 0 38rpx;
				background: #fa436a;
			}
		}
	}
</style>

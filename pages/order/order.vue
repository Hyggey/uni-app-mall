<template>
	<view class="content">
		<!-- 头部选项卡 -->
		<view class="navbar">
			<view class="tab_item" :class="{active:currentIndex == index}" 
			v-for="(item,index) in  navList" :key="index"
			@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		
		<swiper :current="currentIndex" class="swiper_box" @change="changeTab" duration="800">
			<swiper-item class="swiper_content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="loadData">
					<empty v-if="tabItem.loaded == true && tabItem.orderList.length == 0"></empty>
					<!-- 订单列表 -->
					<view class="order-item" v-for="(item,index) in tabItem.orderList" :key="index">
						<view class="itemTop">
							<text>{{item.time}}</text>
							<text :style="{color:item.stateTipColor}">{{item.stateTip}}</text>
							<text v-if="item.state == 9" @click="delOrder(index)" class="yticon icon-iconfontshanchu1 del_btn"></text>
						</view>
						<!-- 条件item.goodsList.length>1的作用，挑选出只用图片的数据，专门对这些进行渲染 -->
						<scroll-view v-if="item.goodsList.length>1" scroll-x="true" class="goods_box">
							<view class="goods_item" v-for="(goodsItem,goodsIndex) in item.goodsList" :key="goodsIndex">
								<image :src="goodsItem.image" mode="aspectFill"></image>
							</view>
						</scroll-view>
						
						<!-- 单个商品 -->
						<view class="wares_box" 
							v-if="item.goodsList.length == 1"
							v-for="(goodsItem,goodsIndex) in item.goodsList" :key="goodsIndex"
							>
							<image :src="goodsItem.image" mode="aspectFill"></image>
							<view class="description">
								<text>{{goodsItem.title}}</text>
								<text>{{goodsItem.attr}}</text>
								<text>￥{{goodsItem.price}}</text>
							</view>
						</view>
						<!-- 价格那一栏目 -->
						<view class="price">
							<text class="number">共7件商品&nbsp;实付款<text class="priceItem">￥143.7</text></text>
						</view>
						<!-- 订单按钮 -->
						<view class="order_box" v-if="item.state!==9">
							<button @click="cancelOrder(item)">取消订单</button>
							<button>立即支付</button>
						</view>
					</view> 
					
					<uniLoadMore :status="tabItem.loadingType" v-if="tabItem.loadingType !=='nomore'"></uniLoadMore>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Json from '@/Json';
	import empty from '@/components/empty.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			empty,
			uniLoadMore
		},
		data() {
			return {
				currentIndex: 0,    // 头部选项卡初始选中位置
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '售后',
						loadingType: 'more',
						orderList: []
					}
				]
			};
		},
		onLoad(options) {
			this.currentIndex = options.state
			this.loadData()
		},
		methods:{
			// 头部点击换颜色方法
			tabClick(index){
				this.currentIndex = index;
			},
			// 获取订单列表
			loadData(source){
				let index = this.currentIndex;
				let navItem = this.navList[index];
				let state = navItem.state
				console.log(index,navItem,state)
				// 与下面一样的请求到数据一样的
				// this.$api.json('orderList').then(res =>{
				// 	console.log(res)
				// })
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据,数据处理一次，下面的就不执行了，return掉了
					return;
				}
				
				// 很重要，不然一直出现转圈
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				
				setTimeout(() =>{
					let orderList = Json.orderList.filter(item =>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						console.log(item)
						// 一定要return，不然最后的console.log(orderList)打印不到内容
						// 如果state为0得话，就返回所有订单
						if(state === 0){
							return item
						}
						// 否则就返回后台中数据中订单得state与用户选则得tab栏中的state相同得数据
						// 其实下面的item.state === state 就是一个条件筛选，所以要用filter方法
						return item.state === state
					})
					// console.log(orderList)
					orderList.forEach((item) =>{
						navItem.orderList.push(item)
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem,'loaded',true)
					console.log(this.navList)
					
					//判断是否还有数据， 有改为 more， 没有改为noMore
					navItem.loadingType = 'nomore';
				},600)
			},
			// tab栏切换
			changeTab(e){
				console.log(e)
				this.currentIndex = e.detail.current
				this.loadData('tabChange')
			},
			// 删除订单
			delOrder(index){
				// 先找到是全部还是待付款，待评价，然后找到里面要删除哪一个
				uni.showLoading({
					title:'请稍后'
				})
				setTimeout(() =>{
					this.navList[this.currentIndex].orderList.splice(index,1);
					uni.hideLoading()
				},600)
				
			},
			// 取消订单
			cancelOrder(item){
				console.log(item);
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() =>{
					let {stateTip, stateTipColor} = this.orderStateExp(9);
					console.log(stateTip,stateTipColor)
					item = Object.assign(item,{
						state: 9,
						stateTip,
						stateTipColor
					})
					
					// 状态更改完之后，删除待付款中的相同订单
					let order = this.navList[1].orderList;
					let index = order.findIndex(item =>item.state == 9)
					order.splice(index,1)
					
					uni.hideLoading()
				},1000)
				
			},
			// 给每个商品添加颜色属性，订单状态属性
			orderStateExp(state){
				let stateTip='',
				stateTipColor = '#fa436a';
				switch(state){
					case 1:
					stateTip = '待付款'; break;
					case 2:
					stateTip = '待发货'; break;
					case 9:
					stateTip = '订单已关闭';
					stateTipColor = '#909399';
					break;
				}
				return {stateTip,stateTipColor};
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.content{
		background: #f8f8f8;
		height: 100%;
		// 头部选项卡
		.navbar{
			height: 40px;
			background: #FFFFFF;
			display: flex;
			padding: 0 5px;
			box-sizing: border-box;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
			.tab_item{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				color: #303133;
				font-size: 15px;
			}
			.active{
				color: #fa436a;
				&:after{
					content: '';
					position: absolute;
					width: 44px;
					border-bottom: 2px solid #fa436a;
					bottom: 0;
				}
			}
		}
		// 订单列表
		.swiper_box{
			height: calc(100% - 40px);
			.swiper_content{
				.order-item{
					padding: 0rpx 30rpx 0 30rpx;
					box-sizing: border-box;
					background: #fff;
					margin-top: 15rpx;
					.itemTop{
						height: 80rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						border-bottom: 1px solid #DCDFE6;
						text:first-child{
							flex: 1;
						}
						.del_btn{
							color: #909399;
							padding: 5rpx 0rpx 0 30rpx;
							position: relative;
							box-sizing: border-box;
							&:after{
								content: '';
								position: absolute;
								height: 30rpx;
								width: 0;
								border: 1rpx solid #DCDFE6;
								left: 16rpx;
								top: 50%;
								transform: translateY(-50%);
							}
						}
					}
					.goods_box{
						white-space: nowrap;
						padding: 20rpx 0;
						height: 160rpx;
						.goods_item{
							width: 120rpx;
							height: 120rpx;
							display: inline-block;
							margin-right: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
					.price{
						text-align: right;
						color: #909399;
						font-size: 26rpx;
						padding: 20rpx 30rpx;
						.number{
							.priceItem{
								font-size: 32rpx;
								color: #303133;
							}
						}
					}
					.wares_box{
						display: flex;
						padding: 20rpx;
						image{
							width: 120rpx;
							height: 120rpx;
							flex-shrink: 0;
							margin-right: 20rpx;
						}
						.description{
							display: flex;
							flex-direction: column;
							overflow: hidden;
							justify-content: space-between;
							text:first-child{
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-size: 30rpx;
								color: #303133;
							}
							text:nth-child(2){
								font-size: 26rpx;
								color: #909399;
							}
							text:nth-child(3){
								font-size: 30rpx;
							}
						}
					}
					.order_box{
						display: flex;
						height: 100rpx;
						align-items: center;
						justify-content: flex-end;
						border-top: 1px solid #DCDFE6;
						button{
							width: 160rpx;
							height: 60rpx;
							font-size: 26rpx;
							background: #fff;
							margin: 0;
							line-height: 60rpx;
							text-align: center;
							margin-left: 24rpx;
							padding: 0;
							&:after{
								border-radius: 100px;
							}
						}
						button:last-child{
							color: #fa436a;
							background: #fff9f9;
							&:after{
								border-color: #f7bcc8;
							}
						}
					}
				}
			}
		}
	}
</style>

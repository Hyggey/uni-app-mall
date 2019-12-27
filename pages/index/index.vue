<template>
	<view class="content">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="search_box">
			<input class="ser_input" type="text" value="输入关键字搜索" />
		</view>
		<!-- #endif -->
		
		<!-- 轮播图区域 -->
		<view class="carousel_section">
			<swiper class="carousel" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
				<swiper-item class="carousel_item" v-for="(item,index) in carouselList" :key="index">
					<view class="swiper-item">
						<image :src="item.src" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 小分类 -->
		<view class="cate_section">
			<view class="cate_item">
				<image src="/static/temp/c3.png" mode=""></image>
				<text>环球美食</text>
			</view>
			<view class="cate_item">
				<image src="/static/temp/c5.png"></image>
				<text>个护美妆</text>
			</view>
			<view class="cate_item">
				<image src="/static/temp/c6.png"></image>
				<text>营养保健</text>
			</view>
			<view class="cate_item">
				<image src="/static/temp/c7.png"></image>
				<text>家居厨卫</text>
			</view>
			<view class="cate_item">
				<image src="/static/temp/c8.png"></image>
				<text>速食生鲜</text>
			</view>
		</view>
		
		<view class="ad-1">
			<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
		</view>
		
		<!-- 限时秒杀 -->
		<view class="seckill_section m_t">
			<view class="header">
				<image src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<text class="tip">8点场</text>
				<text class="timer">07</text>
				<text class="timer">13</text>
				<text class="timer">54</text>
				<text class="yticon icon-you"></text>
			</view>
			<scroll-view class="floor_list" scroll-x="true" >
				<view class="scoll_wrapper">
					<view class="floor_item" v-for="(item,index) in goodsList" :key="index">
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title">{{item.title}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!--  精品团购-->
		<view class="m_t">
			<goodsHeader :good="goods"></goodsHeader>
			<view class="group-section">
				<swiper class="g-swiper" :autoplay="false" :interval="3000" :duration="1000">
					<swiper-item class="g-swiper-item" 
					v-for="(item,index) in goodsList" :key="index" v-if="index%2 === 0">
						<view class="g-item left">
							<image :src="item.image" mode="aspectFill"></image>
							<view class="t-box">
								<text class="title">{{item.title}}</text>
								<view class="price-box">
									<text class="price">￥{{item.price}}</text>
									<text class="no-price">￥188</text>
								</view>
								<view class="pro-box">
									<view class="progress-box">
										<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
									</view>
									<text>6人成团</text>
								</view>
							</view>
						</view>
						<view class="g-item right">
							<image :src="goodsList[index+1].image2" mode="aspectFill"></image>
							<view class="t-box">
								<text class="title">{{goodsList[index+1].title}}</text>
								<view class="price-box">
									<text class="price">￥{{goodsList[index+1].price}}</text>
									<text class="no-price">￥188</text>
								</view>
								<view class="pro-box">
									<view class="progress-box">
										<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
									</view>
									<text>10人成团</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 分类推荐 -->
		<view class="m_t">
			<goodsHeader :good="classify"></goodsHeader>
			<view class="hot-floor" v-for="(item,index) in classifyImg" :key="index">
				<view class="floor-img-box">
					<image class="floor-img" :src="item.src" mode="scaleToFill"></image>
				</view>
				<scroll-view class="floor-list" scroll-x>
					<view class="scoll-wrapper">
						<view class="floor-item" v-for="(it,idx) in goodsList" :key="idx">
							<image v-if="index === 0" :src="it.image" mode="aspectFill"></image>
							<image v-else-if="index === 1" :src="it.image3" mode="aspectFill"></image>
							<image v-else :src="it.image2" mode="aspectFill"></image>
							<text class="title">{{it.title}}</text>
							<text class="price">￥{{it.price}}</text>
						</view>
						<view class="more">
							<text>查看全部</text>
							<text>More+</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 猜你喜欢 -->
		<view class="m_t">
			<goodsHeader :good="like"></goodsHeader>
			<view class="guess_section">
				<view class="guess_item" v-for="(item,index) in goodsList" :key="index">
					<view class="image_wrapper">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<text class="title">{{item.title}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsHeader from '@/components/goodsHeader.vue'
	export default {
		data() {
			return {
				carouselList:[]   ,// 轮播图数组
				goodsList:[],       // 所有商品的数组
				goods:{             // 精品团购头部
					src:'/static/temp/h1.png',
					title:'精品团购',
					title2:'Boutique Group Buying'
				},
				classify:{
					src:'/static/temp/h1.png',
					title:'分类精选',
					title2:'Competitive Products For You'
				},
				classifyImg:[
					{src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409398864&di=4a12763adccf229133fb85193b7cc08f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F19%2F20170319150032_MNwmn.jpeg"},
					{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409984228&di=dee176242038c2d545b7690b303d65ea&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ef4da9f17faaf4612f0d5046f4161e556e9bbcfdb5b-rHjf00_fw658'},
					{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409794730&di=12b840ec4f5748ef06880b85ff63e34e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dc03589ed568a8012060c82ac03c.jpg%40900w_1l_2o_100sh.jpg'}
				],
				like:{
					src:'/static/temp/h1.png',
					title:'猜你喜欢',
					title2:'Guess You Like It'
				}
			}
		},
		onLoad() {
			this.getData()
		},
		components:{
			goodsHeader
		},
		methods: {
			async getData(){
				// 获取轮播图的接口
				let carouselList = await this.$api.json('carouselList');
				// console.log(carouselList)
				this.carouselList = carouselList
				let goodsList = await this.$api.json('goodsList')
				console.log(goodsList)
				this.goodsList = goodsList
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f5f5f5;
	}
	.content{
		// height: 100vh;
		// background: red;
		.search_box{
			position: absolute;
			top: 30rpx;
			width: 100%;
			padding: 0 80rpx;
			box-sizing: border-box;
			z-index: 999;
			.ser_input{
				height: 56rpx;
				line-height: 56rpx;
				background: rgba(255,255,255,.7);
				border-radius: 20rpx;
				font-size: 28rpx;
				color: #606266;
				text-align: center;
			}
		}
		// 轮播图
		.carousel_section{
			.carousel{
				width: 100%;
				height: 350rpx;
				.swiper-item{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		// 小分类
		.cate_section{
			display: flex;
			justify-content: space-between;
			padding: 22rpx 30rpx;
			background: #FFFFFF;
			position: relative;
			margin-top: -20rpx;
			border-radius: 16rpx 16rpx 0 0;
			.cate_item{
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 26rpx;
				color: #333;
				image{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					opacity: .7;
					margin-bottom: 15rpx;
				}
			}
		}
		.ad-1{
			width: 100%;
			height: 210rpx;
			padding: 10rpx 0;
			background: #FFFFFF;
			image{
				width: 100%;
				height: 100%;
			}
		}
		// 限时秒杀
		.seckill_section{
			padding: 4rpx 30rpx 24rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			.header{
				height: 92rpx;
				display: flex;
				align-items: center;
				line-height: 1;
				image{
					width: 140rpx;
					height: 30rpx;
				}
				.tip{
					margin: 0 15rpx 0 30rpx;
					color: #999999;
					font-size: 28rpx;
				}
				.timer{
					font-size: 26rpx;
					background: #000;
					color: #FFFFFF;
					border-radius: 5rpx;
					margin-right: 10rpx;
					width: 40rpx;
					height: 36rpx;
					text-align: center;
					line-height: 36rpx;
				}
				.icon-you{
					color: #909399;
					flex: 1;
					text-align: right;
					font-size: 32rpx;
				}
			}
		}
		.m_t{
			margin-top: 15rpx;
		}
		.floor_list{
			white-space: nowrap;
			.scoll_wrapper{
				display: flex;
				justify-content: flex-start;
				.floor_item{
					width: 150rpx;
					font-size: 26rpx;
					color: #303133;
					margin-right: 20rpx;
					image{
						width: 150rpx;
						height: 150rpx;
						border-radius: 6rpx;
					}
					.title{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: block;
					}
					.price{
						color: #fa436a;
					}
				}
			}
		}
		// 精品团购
		.group-section{
			background: #FFFFFF;
			.g-swiper{
				height: 650rpx;
				padding-bottom: 30rpx;   // 非常重要，不然两边对不齐
				box-sizing: border-box;
				.g-swiper-item{
					padding: 0 30rpx;
					box-sizing: border-box;
					display: flex;
					.g-item{
						overflow: hidden;
						image{
							height: 460rpx;
							width: 100%;
							border-radius: 4px;
						}
						.t-box{
							height: 160rpx;
							font-size: 30rpx;
							box-sizing: border-box;
							color: #303133;
							line-height: 1.6;
							.title{
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								display: block;
							}
							.price-box{
								.price{
									color: #fa436a;
								}
								.no-price{
									font-size: 26rpx;
									text-decoration: line-through;
									color: #909399;
									margin-left: 10rpx;
								}
							}
							.pro-box{
								display: flex;
								font-size: 24rpx;
								align-items: center;
								margin-top: 10rpx;
								.progress-box{
									flex: 1;
									margin-right: 10rpx;
									border-radius: 10rpx;
									overflow: hidden;
								}
							}
						}
					}
					.left{
						display: flex;
						flex-direction: column;
						flex: 1.2;
						margin-right: 24rpx;
						.t-box{
							padding-top: 20rpx;
						}
					}
					.right{
						display: flex;
						flex-direction: column-reverse;
						flex: 0.8;
						.t-box{
							padding-bottom: 20rpx;
						}
					}
				}
			}
		}
		// 分类推荐
		.hot-floor{
			margin-bottom: 20rpx;
			overflow: hidden;   // 去scroll-view盒子的box-shadow  431
			.floor-img-box{
				height: 320rpx;
				width: 100%;
				position: relative;   // 定位面纱用的
				&:after{   // 图片上的一层面纱  416
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
				}
				.floor-img{
					width: 100%;
					height: 100%;
				}
			}
			.floor-list{
				padding: 20rpx;
				box-sizing: border-box;
				margin-left: 30rpx;
				background: #FFFFFF;
				padding-right: 50rpx;
				margin-top: -140rpx;
				position: relative;    // 用这个可以使背景颜色白色显示出来  427
				box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
				border-radius: 6rpx;
				.scoll-wrapper{
					display: flex;
					.floor-item{
						width: 180rpx;
						margin-right: 20rpx;
						font-size: 26rpx;
						color: #303133;
						line-height: 1.8;
						image{
							width: 180rpx;
							height: 180rpx;
						}
						.title{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							display: block;
						}
						.price{
							color: #fa436a;
						}
					}
					.more{
						width: 180rpx;
						height: 180rpx;
						background: #f3f3f3;
						color: #909399;
						font-size: 28rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						flex-shrink: 0;    // 非常重要，不然出不来宽度，防止被压缩 也可以用父盒子设置为display:inline-flex
						border-radius: 5rpx;
					}
				}
			}
		}
		
		// 猜你喜欢
		.guess_section{
			padding: 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			background: #FFFFFF;
			.guess_item{
				width: 48%;
				margin-bottom: 40rpx;
				.image_wrapper{
					width: 100%;
					height: 330rpx;
					border-radius: 10rpx;
					overflow: hidden;
					background: #f3f3f3;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
					line-height: 80rpx;
				}
				.price{
					color: #fa436a;
				}
			}
		}
	}
</style>

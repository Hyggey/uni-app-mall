<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg" mode=""></image>
			<view class="userInfoBox">
				<view class="avatar">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577513283337&di=12e56e6d53765e41b3e4cedcc3420e65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fac4bd11373f08202b4a9a53a4bfbfbedab641bff.jpg" mode=""></image>
				</view>
				<view class="name">
					<text>Leo yo</text>
				</view>
			</view>
			<view class="vipCardBox">
				<view class="vipTitle">
					<text class="yticon icon-iLinkapp-"></text>
					DCloud会员
				</view>
				<text class="tit1">DCloud Union</text>
				<text class="tit2">开通会员开发无bug 一测就上线</text>
				<view class="vipBtn">立即开通</view>
				<image class="vipImg" src="/static/vip-card-bg.png" mode=""></image>
			</view>
		</view>
		<view class="cover_box"
		:style="[{
			transform: coverTransform,
			transition: coverTransition
		}]"
		@touchstart="coverTouchstart"
		@touchmove="coverTouchmove"
		@touchend="coverTouchend"
		>
			<!-- 半弧形 -->
			<image class="arc" src="/static/arc.png"></image>
			<!-- 金额那一栏 -->
			<view class="kashBox">
				<view class="kash_item">
					<text>128.8</text>
					<text>余额</text>
				</view>
				<view class="kash_item">
					<text>0</text>
					<text>优惠券</text>
				</view>
				<view class="kash_item">
					<text>20</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
			};
		},
		methods:{
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				console.log(e.touches[0])
				this.coverTransition = 'transform .1s linear';
				// 手指触摸获得初始位置
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				console.log(e.touches[0])
				// 计算滑动了多少距离
				moveY = e.touches[0].clientY;
				let distance = moveY - startY;
				if(distance<0){
					return
				}
				// 让他可以拖到最大距离80px
				if(distance>=80 && distance<100){
					distance = 80
				}
				// 让他可以拖到最大距离80px
				if(distance>0 && distance<=80){
					this.coverTransform = `translateY(${distance}px)`
				}
			},
			coverTouchend(e){
				console.log(e)
				// 滑到80px得时候让他回到起点
				this.coverTransform = 'translateY(0px)';
				// 回到起点得动画
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.user-section{
			height: 520rpx;
			position: relative;
			padding: 100rpx 30rpx 0;
			box-sizing: border-box;
			.bg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				filter: blur(1px);
				opacity: .6;
			}
			.userInfoBox{
				z-index: 1;
				position: relative;
				display: flex;
				align-items: center;
				height: 180rpx;
				.avatar{
					image{
						width: 130rpx;
						height: 130rpx;
						border-radius: 50%;
						border: 5rpx solid #FFFFFF;
					}
				}
				.name{
					font-size: 38rpx;
					margin-left: 20rpx;
					color: #333;
				}
			}
			.vipCardBox{
				height: 240rpx;
				border-radius: 16rpx 16rpx 0 0;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				position: relative;
				display: flex;
				flex-direction: column;
				background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
				.vipTitle{
					color: #f7d680;
					margin-bottom: 28rpx;
					.yticon{
						margin-right: 16rpx;
					}
				}
				.tit1{
					color: #f7d680;
				}
				.tit2{
					color: #d8cba9;
					font-size: 24rpx;
					margin-top: 10rpx;
				}
				.vipBtn{
					position: absolute;
					right: 20rpx;
					top: 16rpx;
					z-index: 1;
					font-size: 22rpx;
					height: 40rpx;
					border-radius: 20rpx;
					padding: 4rpx 26rpx;
					box-sizing: border-box;
					background: linear-gradient(left, #f9e6af, #ffd465);
				}
				.vipImg{
					position: absolute;
					width: 380rpx;
					height: 260rpx;
					right: 0rpx;
					top: 20rpx;
				}
			}
		}
		.cover_box{
			position: relative;
			margin-top: -150rpx;
			background: #f5f5f5;
			padding: 0 30rpx;
			.arc{
				width: 100%;
				height: 36rpx;
				position: absolute;
				top: -34rpx;
				left: 0;
			}
			.kashBox{
				display: flex;
				justify-content: space-around;
				height: 140rpx;
				align-items: center;
				background: #FFFFFF;
				border-radius: 8rpx;
				.kash_item{
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 34rpx;
					text:last-child{
						color: #75787d;
						font-size: 24rpx;
						margin-top: 10rpx;
					}
				}
			}
			.order-section{
				display: flex;
				justify-content: space-around;
				background: #FFFFFF;
				margin-top: 20rpx;
				border-radius: 8rpx;
				padding: 30rpx 0;
				.order-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					.yticon{
						color: #fa436a;
						font-size: 48rpx;
						margin-bottom: 14rpx;
					}
					text:last-child{
						font-size: 24rpx;
						color: #303133;
					}
				}
			}
		}
	}
</style>

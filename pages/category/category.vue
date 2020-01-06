<template>
	<view class="content">
		<scroll-view scroll-y="true" class="left-aside">
			<view class="f-item" :class="[item.id == currentIndex?'active':'']" @click="tabtap(item,index)" v-for="(item,index) in flist" :key="index">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view :scroll-into-view="clickId" @scroll="asideScroll" :scroll-top="tabScrollTop" scroll-with-animation scroll-y="true" class="right-aside">
			<view class="box" v-for="(v,k) in flist" :key="k">
				<view class="s-list" v-for="(item,index) in slist" v-if="item.pid == v.id" :key="index" :id="'main-'+item.id">
					<text class="s-title">{{item.name}}</text>
					<view class="t-list">
						<view class="t-item" v-for="(it,idx) in tlist" v-if="it.pid === item.id" :key="idx">
							<image :src="it.picture" mode="aspectFill"></image>
							<text>{{it.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 1,  // 左侧点击变颜色
				flist:[],   // 一级分类
				slist:[],   // 二级分类
				tlist:[],    // 三级分类，带图片
				clickId:'',   // scroll-into-view 点击一级分类，右边跳转   第二种方法用的
				tabScrollTop:'',  // 二级分类跳转距离顶部的距离
				sizeCalcState: false,
				elist:[]
			};
		},
		onLoad() {
			this.getListData()
		},
		methods:{
			async getListData(){
				let list = await this.$api.json('cateList')
				// console.log(list)
				list.forEach(item =>{
					// 没有pid的放进一级分类
					if(!item.pid){
						this.flist.push(item)
						// 既没有pid，也没有图片的放进二级分类
					}else if(!item.picture){
						this.slist.push(item)
						//有pid和图片的放进三级分类
					}else{
						this.tlist.push(item)
					}
				})
				// console.log(this.flist)
				// console.log(this.slist)
				// console.log(this.tlist)
			},
			tabtap(item,index){
				this.currentIndex = item.id   // 设置active样式
				// 让calSize方法只执行一次,使之获取高度及拥有top属性
				if(!this.sizeCalcState){
					this.calcSize()
				}
				//第一种方法
				// let indexOne = this.slist.findIndex(sitem=>sitem.pid === item.id)
				// this.tabScrollTop = this.slist[indexOne].top
				
				//第二种做法，用的是scroll-into-view做的，不好，需要循环遍历数据判断
				let a = []
				this.slist.forEach(sitem =>{
					if(sitem.pid === item.id)
					a.push(sitem)
				})
				this.clickId = 'main-'+a[0].id
			},
			asideScroll(e){
				// 让calSize方法只执行一次,使之获取高度及拥有top属性
				if(!this.sizeCalcState){
					this.calcSize()
				}
				// 太秀了
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				// console.log(tabs)
				if(tabs.length > 0){
					this.currentIndex = tabs[0].pid;
				}
				// console.log(e)
			},
			// 计算右侧每个tab栏的高度
			calcSize(){
				let h = 0;
				this.slist.forEach((item,index) =>{
					// console.log(item)
					let view = uni.createSelectorQuery().select("#main-"+item.id)
					view.fields({
						size:true
					},data =>{
						item.top = h;
						h += data.height
						item.bottom = h
						console.log(item)
					}).exec()
				})
				this.sizeCalcState = true
			}
		}
	}
</script>

<style lang="scss">
	page,.content{
		display: flex;
		background: #f8f8f8;
		height: 100%;
		.left-aside{
			width: 200rpx;
			height: 100%;
			flex-shrink: 0;
			background: #FFFFFF;
			.f-item{
				width: 100%;
				height: 100rpx;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #606266;
				border-bottom: 1px solid #EFF0F3;
				box-sizing: border-box;
				&.active{
					color: #fa436a;
					background: #f8f8f8;
					&:before{
						content: '';
						position: absolute;
						width: 8rpx;
						height: 36rpx;
						background: #fa436a;
						left: 0;
						border-radius: 0 4px 4px 0;
						opacity: .8;
					}
				}
			}
		}
		.right-aside{
			padding-left: 20rpx;
			box-sizing: border-box;
			.box:last-child{
				min-height: 100%;
			}
			.s-list{
				.s-title{
					height: 70rpx;
					font-size: 28rpx;
					display: flex;
					align-items: center;
				}
				.t-list{
					display: flex;
					flex-wrap: wrap;
					font-size: 26rpx;
					background: #FFFFFF;
					.t-item{
						display: flex;
						flex-direction: column;
						width: 176rpx;
						align-items: center;
						padding-bottom: 20rpx;
						box-sizing: border-box;
						color: #666;
						image{
							width: 140rpx;
							height: 140rpx;
						}
					}
				}
			}
		}
	}
</style>

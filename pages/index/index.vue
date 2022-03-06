<template>
	<view class="content">
		<view class="select">
			<view class="list-left">
				选择服务器
			</view>
			<view class="list-right">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<button type="default" @click="submit">查看详情</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				array: '',
				chartsDatalocaldata: [],
			}
		},
		onReady() {
			// 获取数据
			this.getServerName()
		},
		onLoad() {
			// this.getServerName()
		},
		methods: {
			getServerName() {
				console.log('clicked');
				uni.request({
					url: 'http://8.140.125.87:5000/getservername',
					method: 'GET',
					success: (res) => {
						console.log('test');
						console.log(res);
						console.log(JSON.stringify(res));
						this.array = res.data
					},
					fail: (err) => {
						console.log('failed')
					}
				})
			},
			
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			
			submit(){
				uni.navigateTo({
					url:'../server/server?name='+this.array[this.index],
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>

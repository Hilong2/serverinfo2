<template>
	<view class="content">
		<view class="titles">
			当前监控主机：{{servername}}
		</view>
		<view class="charts-box">
			<qiun-data-charts type="line" :localData="alldata" :echartsH5="true" background="none"
				:ontouch="true" />
		</view>
	</view>
</template>

<script>
	import {
		jsontoarray,
		jsontodata,
		changekey,
		changekeymap,
	} from '../../store/method.js';
	
	export default {
		data() {
			return {
				alldata:[],
				arraydata: [],
				servername: '',
				cpu_percent:[],
				cpu_percentdata:[],			
			}
		},
		onReady() {

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.servername = option.name;
			// 获取数据
			this.getServerData();
		},
		methods: {

			getServerData() {
				setTimeout(() => {
					uni.request({
						url: 'http://8.140.125.87:5000/getserverinfo/' + this.servername,
						method: 'POST',
						header: {
							'Content-Type' : 'application/json',
						},
						success: (res) => {
							console.log('request success!!', res);
							
							let newdata = res.data;
							console.log(newdata);
							this.alldata = [];
							for (let i = 0; i < newdata["length"]; i++) {
							    this.alldata.push(newdata[`${i}`]);
							}
							
							console.log(this.alldata);
							// this.arraydata = jsontoarray(res.data);
							// console.log(this.arraydata);
							
							cpu_percent = changekeymap(alldata, "boot_time",
								"cpu_percent");
							console.log(cpu_percent);
							// this.cpu_percent = JSON.parse(JSON.stringify(this.cpu_percentdata))
						},
						fail: (err) => {
							console.log('request fail', err);
						},
					})
					// this.chartsDatalocaldata = JSON.parse(JSON.stringify())
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

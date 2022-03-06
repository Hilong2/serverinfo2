function jsontodata(api_data) {
	//由于api格式给的是JSON对象的格式，这里需要用到JS中遍历对象属性的方法,先把这个对象转成数组方便操作
	let data = [];
	//JS对象是支持[attr_name]的方式访问对象的属性
	/**
	 * 例子:
	 * 
	 * let a = {a:1,b:2,"c":3,"0":4};
	 * 这里a就是对象,里边的a,b,c都是a的属性
	 * 可以通过a.a访问,也可以通过a["a"]访问
	 * "0"这个属性只能通过a["0"]访问
	 */
	for (let i = 0; i < api_data["length"]; i++) {
	    //这里用了个技巧，就是用模板字符串把下标i转成字符串类型，其实不转成字符串也一样访问，js会自动识别的(弱类型特性)
	    data.push(api_data[`${i}`]);
	}
	//可以看到成功转成数组了
	console.log(data);
	
	/**
	 * 第二步就是使用这个data转换成想要的数据
	 * {
	 *  label:String,
	 *  data:Array //里边放的是cpu_percent
	 * }
	 */
	let result = {
	    label: "XXX",
	    data: []
	}
	data.forEach(item => {
	    result.data.push(item.cpu_percent); //法一
	    //result.data.push(item["cpu_percent"]);//法二
	})
	console.log(result);
	
	return result;
}



function changekey(_obj, old_key, new_key){
	obj = _obj;
	obj[new_key] = obj[old_key];
	delete obj[old_key];
	
	return obj;
}


//修改键值为value和text
function changekeymap(_obj, old_key1, old_key2){
	var obj = _obj.map(function(item){
		return{
			"text": item[old_key1],
			"value": item[old_key2]
		}
	});
	return obj;
}

function jsontoarray(api_data) {
	//由于api格式给的是JSON对象的格式，这里需要用到JS中遍历对象属性的方法,先把这个对象转成数组方便操作
	let data = [];
	for (let i = 0; i < api_data["length"]; i++) {
	    //这里用了个技巧，就是用模板字符串把下标i转成字符串类型，其实不转成字符串也一样访问，js会自动识别的(弱类型特性)
	    data.push(api_data[`${i}`]);
	}
	//可以看到成功转成数组了
	console.log(data);
	
	return data;
}

export {
	jsontoarray,
	jsontodata,
	changekey,
	changekeymap,
}
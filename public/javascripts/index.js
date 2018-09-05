
$("#tel").val('18858336290')
$("#url").val('https://h5.ele.me/hongbao/?from=groupmessage&isappinstalled=0#hardware_id=&is_lucky_group=True&lucky_number=6&track_id=&platform=0&sn=2a07ca21489ea0c1&theme_id=3033&device_id=&refer_user_id=31257437')

$("#submit").click(function() {
	let telVal = $("#tel").val()
	let urlVal = $("#url").val()
	$.post("/submit", {
		tel: telVal,
		url: urlVal
	}, function(data) {
		console.log(data)
	})
})


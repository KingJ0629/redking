var express = require('express');
var router = express.Router();
var hongbao = require('../nodejs/hongbao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ele.红包插件' });
});

router.post("/submit", function(req, res) {
	console.log(req.body)//请求的参数对象
	console.log("get data success!!")

	hongbao.run(req.body.tel, req.body.url)

	res.json({//给前端返回json格式的数据
		code: 0,
		msg: "登录成功"
	})
})

module.exports = router;

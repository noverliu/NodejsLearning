var express=require('express');
var sql=require('./dal.js');
var bodyParser = require('body-parser');
var app=express();




var mysql=new sql.ysg();

//console.log(String.format("{0},word","hello"));

app.use(express.static("../"));
app.use("/modules",express.static("../../node_modules"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/GetAgent',function(req,res){
	//var obj={a:'hello',b:'word'};
	var userid=req.query.agentid;
	mysql.GetAgent(userid,function(r){
		res.send({data:r,total:100});
	});	
})
app.get('/GetTorrents',function(req,res){
	var t=req.body.type;
	switch(t){
		case "Pager":
			var from=req.body.from,
				qty=req.body.qty;
			if(!from||!qty){
				console.log("参数不全");
				return;
			}
			mysql.GetAgentByPage(from,qty,function(data){
				res.send({data:data[1],total:data[0][0].total})
			});
			break;
		default:
			console.log("参数错误");
			return;
	}
});
app.post('/GetAgent',function(req,res){
	var t=req.body.type;
	switch(t){
		case "Pager":
			var from=req.body.from,
				qty=req.body.qty;
			if(!from||!qty){
				console.log("参数不全");
				return;
			}
			mysql.GetAgentByPage(from,qty,function(data){
				res.send({data:data[1],total:data[0][0].total})
			});
			break;
		case "All":
			mysql.GetAgentList(function(data){
				res.send({data:data})
			});
			break;
		case "Detail":
			var id=req.body.agentid;
			if(!id){
				console.log("参数不全");
				return;
			}
			mysql.GetAgent(id,function(data){
				res.send({data:data})
			})
			break;
		default:
			console.log("参数错误");
			return;
	}
})

app.get('/GetAgentPager',function(req,res){
	var from=req.query.from;
	var qty=req.query.qty;
	mysql.GetAgentByPage(from,qty,function(data){
		res.send({data:data[1],total:data[0]})
	})
})

app.listen(8000);
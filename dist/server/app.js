/*! testnode 2016-02-26 */
var express=require("express"),sql=require("./dal.js"),bodyParser=require("body-parser"),app=express(),mysql=new sql.ysg;app.use(express["static"]("../")),app.use("/modules",express["static"]("../../node_modules")),app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!0})),app.get("/GetAgent",function(a,b){var c=a.query.agentid;mysql.GetAgent(c,function(a){b.send({data:a,total:100})})}),app.post("/GetAgent",function(a,b){var c=a.body.type;switch(c){case"Pager":var d=a.body.from,e=a.body.qty;if(!d||!e)return;mysql.GetAgentByPage(d,e,function(a){b.send({data:a[1],total:a[0][0].total})});break;case"All":mysql.GetAgentList(function(a){b.send({data:a})});break;case"Detail":var f=a.body.agentid;if(!f)return;mysql.GetAgent(f,function(a){b.send({data:a})});break;default:return}}),app.get("/GetAgentPager",function(a,b){var c=a.query.from,d=a.query.qty;mysql.GetAgentByPage(c,d,function(a){b.send({data:a[1],total:a[0]})})}),app.listen(8e3);
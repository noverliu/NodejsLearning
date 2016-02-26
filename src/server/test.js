var m=require("./liucr-mysql");

var cfg={
	"host":"10.1.2.147",
	"user":"hcuser1",
	"password":"hcuser2016",
	"database":"tjshealthclub"
}

var cb=function(data){
	console.log(data);
}

var a=new m.mysqlop(cfg);

a.GetMaxID("agentname","t_agents",cb);
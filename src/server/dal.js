var mysql=require("./liucr-mysql");
var cfg=require('./config.json');
var strext=require("./liucr-strext");
var db=new mysql.mysqlop(cfg);

strext.Load();

exports.ysg=function(){
	this.GetAgent=function(userid,cb){
		db.ExecuteSql("select * from t_agents where agentid = :agentid",{agentid:userid},cb);
	}
	this.GetAgentByPage=function(from,count,cb){
		db.QueryMulti(String.format("select count(1) total from t_agents;select * from t_agents order by agentid limit {0},{1}",from,count),[],10000,cb);
	}
	this.GetAgentList=function(cb){
		db.ExecuteSql("select * from t_agents order by agentid;",[],cb);
	}
}
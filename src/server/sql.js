exports.sql=function(){
	var sql=require('mysql');
	var cfg=require('./config.json')
	var con=null;

	function Connect(multiple){
		if(multiple){
			cfg.multipleStatements=true;
		}
		con =sql.createConnection(cfg);
		con.connect();
	}
	function Disconnect(){
		con.end();
	}
	this.GetAgent=function(userid,callback){		
		Connect(false);
		var s='select * from t_agents';
		var para=[];
		if(userid&& userid!="all"){
			s+=" where agentid=?";
			para=[userid];
		}
		con.query(s,para,function(err,rows,fields){
			if(err){
				throw err;
			}
			// if(rows.length==1){
			// 	callback(rows[0]);
			// }else{
				callback(rows);
			// }
		})
	}
	this.GetAgentByPage=function(from,count,cb){
		Connect(true);
		var s='select count(1) total from t_agents;select * from t_agents order by agentid limit ?,?;';
		con.query(s,[from-1,Number.parseInt(count)],function(err,result,fields){
			if(err){
				throw err;
			}
			cb(result);
		})
	}
	this.GetTorrentsByPage=function(from,count,cb){
		Connect(true);
		var s='select count(1) total from t_spider;select * from t_spider order by id limit ?,?;';
		con.query(s,[from-1,Number.parseInt(count)],function(err,result,fields){
			if(err){
				throw err;
			}
			cb(result);
		})
	}
	this.GetAgentList=function(cb){
		Connect();
		var s='select * from t_agents order by agentid;';
		con.query(s,function(err,result,fields){
			if(err){
				throw err;
			}
			cb(result);
		})
	}
}
var nodemysql=require("mysql");
var StrExt=require("liucr-strext");

StrExt.Load();

var mysqlop=function(opt){
	this.option=opt;
	this.connection=null;
	this.connect=function(){
		if(this.option===undefined){
			throw new Error("None options");
		}
		if(this.connection===null){
			this.connection=nodemysql.createConnection(this.option);
			this.connection.config.queryFormat = function (query, values) {
				if (!values) return query;
				  	return query.replace(/\ :(\w+)/g, function (txt, key) {
				    if (values.hasOwnProperty(key)) {
				      	return this.escape(values[key]);
				    }
				    return txt;
				}.bind(this));
			};
		}
		if(this.connection.state=="disconnected"){
			this.connection.connect();
			this.connection.config.queryFormat = function (query, values) {
				if (!values) return query;
				  	return query.replace(/\ :(\w+)/g, function (txt, key) {
				    if (values.hasOwnProperty(key)) {
				      	return this.escape(values[key]);
				    }
				    return txt;
				}.bind(this));
			};
		}
		return this.connection;
	};
	this.disconnect=function(){
		this.connection=nodemysql.end()
	}
}



mysqlop.prototype.GetMaxID=function(field,table,cb){
	var con=this.connect();
	con.query(String.format("select max({0}) max from {1}",field,table),function(err,result,field){
		if(err){
			throw err;
		}
		cb(result[0].max);
	})
}

mysqlop.prototype.Exists=function(sql,params,cb){
	var con=this.connect();
	con.query(sql,params,function(err,result){
		if(err){
			throw err;
		}
		cb(result.length>=1);
	})

}

mysqlop.prototype.ExecuteSql=function(sql,params,cb){
	var con=this.connect();
	con.query(sql,params,function(err,result){
		if(err){
			throw err;
		}
		cb(result);
	})
}

mysqlop.prototype.ExecuteSqlByTime=function(sql,time,cb){
	var con=this.connect();
	con.query({sql:sql,timeout:time},function(err,result){
		if(err){
			throw err;
		}
		cb(result);
	})
}

mysqlop.prototype.ExecuteSqlTran=function(sql,time,cb){
	var con=this.connect();
	con.beginTransaction(function(err){
		if(typeof(sql)==="string"){
			con.query(sql,function(err,result){
				if(err){
					return con.rollback(function(){
						cb({err:err});
					})
				}
				cb({result:result});
			})
		}
		if(sql instanceof Array){
			for(var i in sql){
				con.query(sql[i],function(err,result){
					if(err){
						return con.rollback(function(){
							cb({err:err,statement:sql[i]});
						})
					}
				//cb({result:result});
				})
			}
			con.commit(function(err){
				if(err){
					cb({err:err});
				}
				cb({result:"success"});
			})
		}
	})	
}

//mysqlop.prototype.ExecuteSqlInsertImg=function(sql,img,cb){}

mysqlop.prototype.GetSingle=function(sql,time,cb){}

mysqlop.prototype.ExecuteReader=function(sql,cb){}

mysqlop.prototype.Query=function(sql,params,time,cb){}

mysqlop.prototype.QueryMulti=function(sql,params,time,cb){
	var con=this.connect();
	if(this.option.multipleStatements){
		
		con.query(sql,params,function(err,result){
			if(err){
				throw err;
			}
			cb(result);
		})
	}else{
		throw new Error("Current settings not allow multiple statements query.")
	}
}

mysqlop.prototype.ExecuteSqlTranWithIndentity=function(sqls,cb){}

exports.mysqlop=mysqlop;
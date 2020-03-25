const connectionDb= require('./connectionDB');
const userConnection=require('./../models/userConnection');


module.exports.getUserConnections=function(uProfileArray,id, cb){
    
    var conn= uProfileArray.find(c => c.userId === id);

    if (conn) cb(conn);
    else cb(null);
}
module.exports.updateRSVP=function(uProfileArray,user,cb){
    var conn= uProfileArray.find(c => c.userId === user.userId);
    console.log(conn);
    if (conn){
        var ob= conn.connections.find(c=>c.userConnection.connId===user.connId);
        if (ob){
            
        ob.userConnection.rsvp=user.rsvp;
            
        cb(uProfileArray);}
        else{
            cb(null);
        }
    }
    
};
module.exports.addConnection = function(uProfileArray,user,cb){
    var conn= uProfileArray.find(c => c.userId === user.userId);
    console.log(conn);
    if (conn){
        
            var ob= conn.connections.find(c=>c.userConnection.connId===user.connId);
            if (ob){
                
            ob.userConnection.rsvp=user.rsvp;
                
            cb(uProfileArray);}
            else{
                
            connectionDb.getConnection(user.connId,function (data){
                    
                conn.connections.push({
                    userConnection:  new userConnection(user.connId,
                        user.rsvp,
                        data.name,
                        data.topic) 
                });
            });
         
            cb(uProfileArray);
            }
    }
}
module.exports.deleteConnection = function(uProfileArray,conn,cb){
        console.log(conn);
        var c= uProfileArray.find(c => c.userId === conn.userId);
        if (c){
            console.log(conn.connId);
            c.connections= c.connections.filter(function(co){
               return co.userConnection.connId !==conn.connId;
            })
            console.log(c.connections);
            cb(uProfileArray);
        }
}

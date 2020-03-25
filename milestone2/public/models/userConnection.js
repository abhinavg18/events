module.exports=class UserConnection{
    constructor(connId,rsvp,connName,topic){
        this.connId=connId;
        this.rsvp=rsvp;
        this.connName=connName;
        this.topic=topic
    }
    get getConnId(){
        return this.connId;
    }
    get getRsvp(){
        return this.rsvp;
    }
    get getConnName(){
        return this.connName;
    }
    get getTopic(){
        return this.topic;
    }

    set setConnId(value){
        this.connId=value;
    }
    set setRsvp(value){
        this.rsvp=value;
    }
    set setConnName(value){
        this.connName=value;
    }
    set setTopic(value){
        this.topic=value;
    }
    
};


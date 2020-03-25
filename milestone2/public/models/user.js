module.exports= class User{
    constructor(userName, password){
        this.userName=userName;
        this.password=password;
    }

    get userName(){
        return this.userName;
    }

    get password(){
        return this.password;
    }

    
    set userName(value){
        this.userName = value;
    }

    set password(value){
        this.password = value;
    }
}
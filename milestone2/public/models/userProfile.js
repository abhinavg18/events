module.exports= class UserProfile{
    constructor(userId, fName, lName, email, address){
        this.userId=userId;
        this.fName=fName;
        this.lName=lName;
        this.email=email;
        this.address=address;
    }

    get getUserId(){
        return this.userId;
    }

    get getFName(){
        return this.fName;
    }
    get getLName(){
        return this.lName;
    }
    get getEmail(){
        return this.email;
    }
    get getAddress(){
        return this.address;
    }
    set setUserId(value){
        this.userId = value;
    }
    set setFName(value){
        this.fName = value;
    }
    set setLName(value){
        this.lName = value;
    }
    set setEmail(value){
        this.email = value;
    }
    set setAddress(value){
        this.address = value;
    }
}
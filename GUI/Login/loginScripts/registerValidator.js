export class validateRegister{

    static validatePasswordNotEmpty(password){
        if(password.length === 0){
            return false;
        }else{
            return true;
        }
    }

    static validatePasswordLength(password){
        if(password.length >3){
            return true;
        }else{
            return false;
        }
    }

    static validateConfirmPassword(password, confirmpassword){
        if(password === confirmpassword){
            return true;
        }else{
            return false;
        }
    }

};
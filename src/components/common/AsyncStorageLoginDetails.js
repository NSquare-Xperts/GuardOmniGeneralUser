
import { AsyncStorage } from 'react-native'



export function GetLoginData() {
    
    AsyncStorage.multiGet(["UserDetailData"]).then((data) => {
        
        console.log("Asynch 1 ",data)
        LoginData = data[0][1];
        //var LoginObj = JSON.parse(LoginData)
        console.log("loginDetails :: ", LoginData)
        return LoginData
    
    })

}
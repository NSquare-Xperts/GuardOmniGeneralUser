
import { AsyncStorage } from 'react-native'



export function GetLoginData() {
    
    AsyncStorage.multiGet(["UserDetailData"]).then((data) => {       
        
        LoginData = data[0][1];               
        return LoginData
    
    })

}
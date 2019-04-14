import { Platform } from "react-native";
//import CustomDatePickerAndroid from "../DateAndTimePicker/CustomDatePickerAndroid";
//import CustomDatePickerIOS from "../DateAndTimePicker/CustomDatePickerIOS";

const IS_ANDROID = Platform.OS === "android";
if(IS_ANDROID){
export * from './CustomDatePickerAndroid'
}else{
 export * from './CustomDatePickerIOS'   
}
//export default (IS_ANDROID ? CustomDatePickerAndroid : CustomDatePickerIOS);

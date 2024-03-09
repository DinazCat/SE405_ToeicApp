import {
    StyleSheet
} from 'react-native';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const viewstyle = StyleSheet.create({

    upzone: {
        height:50,
        backgroundColor:PRIMARY_COLOR,
        alignItems:'center',
        flexDirection:'row',
    },
    component_upzone: {
        height:'8%',
        backgroundColor:PRIMARY_COLOR,
        justifyContent:'flex-start',
        alignItems: 'center',
        flexDirection:'row',
    },
    row_evenly:{
        flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', alignSelf:'center', width:'90%'
    },
    row_start:{
        flexDirection:'row',justifyContent:'flex-start', alignItems:'center', alignSelf:'center', width:'90%'
    },
    column_view:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:'5%'
    },
    column_card:{
        flexDirection:'column',width:'90%', backgroundColor:'#F5F5F5', alignSelf:'center', marginTop:'5%', height:120, justifyContent:'space-evenly', borderWidth:1, borderColor:'#D3D3D3', borderRadius:10
    }
});
export default viewstyle;
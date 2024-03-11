      import {
        View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Image,
        ScrollView,
        Dimensions
      } from 'react-native';
      import React, { useState, useEffect } from 'react';
      import FontAwesome from 'react-native-vector-icons/FontAwesome';
      import Slider from '@react-native-community/slider';
      import Icon from 'react-native-vector-icons/FontAwesome5';
      import AppStyle from '../theme'
    import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
    const {width, height} = Dimensions.get('window');
      const AgendaItem = ({item}) => {
        const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    
      useEffect(() => {
        const updateScreenWidth = () => {
          setScreenWidth(Dimensions.get('window').width);
        };
    
        Dimensions.addEventListener('change', updateScreenWidth);
    
        // return () => {
        //   Dimensions.removeEventListener('change', updateScreenWidth);
        // };
      }, []);
      const PopupMenu = () =>{
        const[visible,setvisible] = useState(false);
        const options = [
          {
            title:"Delete",
            action:async()=>{
              setvisible(false)
            }
          },
          {
            title:'Edit',
            action:()=>{
              setvisible(false)
            },
          }
        ];
        
        return(
          <View style={{flexDirection:'row'}}>
           {visible&&<View style = {styles.popup}>
                {
                  options.map((op,i)=>(
                    <TouchableOpacity  style={[styles.popupitem]} key={i} onPress={op.action}>
                      <Text>{op.title}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              }
           <TouchableOpacity style={[styles.MenuButton,{marginHorizontal:5}]} onPress={()=>setvisible(!visible)}>
                <Icon name={'ellipsis-h'}  color={'#555'}/>
            </TouchableOpacity>
          </View>
        )
      }
    //   const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    // const getRandomColor = () => {
    //   const randomIndex = Math.floor(Math.random() * COLORS.length);
    //   return COLORS[randomIndex];
    // };
        return (  
     <TouchableOpacity style={{marginTop:10, height:80, backgroundColor:card_color,elevation: 5, flexDirection:'row', alignItems:'center',width:screenWidth*0.95,alignSelf:'center', justifyContent:'space-between'}} >
        <View>
        <Text style={{color:'black', fontSize:18, fontWeight:'500', marginHorizontal:7, marginVertical:3}}>{item.Name}</Text>
      <Text style={{color:'black', fontSize:15, marginHorizontal:7}}>{item.Time}</Text>
        </View>
        <PopupMenu/>
      </TouchableOpacity>
        );
      };
      const styles = StyleSheet.create({
        container: {
          backgroundColor: '#FFFFFF',
          flex: 1,
        },
        MenuButton:{
            color: 'black', 
            fontSize: 30, 
            padding: 10,
            alignSelf:"center",
          },
          popup:{
            borderRadius:8,
            borderColor:'#333',
            borderWidth:1,
            backgroundColor:'#fff',
            width:62,
            height:65,
            textAlign:'center',
          },
          popupitem:
          {
            borderBottomColor:'black', 
            alignItems:'center', 
            width:60, 
            alignSelf:'center',
            paddingVertical:5
          }
      
      });
      export default AgendaItem;
      
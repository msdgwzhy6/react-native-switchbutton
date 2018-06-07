import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
export default class SwitchButton extends Component{
  constructor(props){
    super(props);
    let {onTintColor,tintColor,value}=props;
    this.state = {
      scale: new Animated.Value(value?0.01:1),
      left: new Animated.Value(value?21:1),
      background:value?onTintColor:tintColor,
      animatedColor:new Animated.Value(value?1:0),
      value,
    }
  }
  static propTypes={
    value:PropTypes.bool,
    onValueChange:PropTypes.func,
    onTintColor:PropTypes.string,//开启时的背景颜色
    thumbTintColor:PropTypes.string,//原型按钮的背景颜色
    tintColor:PropTypes.string,//关闭时的背景颜色
    disabled:PropTypes.bool,
    useNativeDriver:PropTypes.bool,
  }
  //开关转换
  toggleSwitch=()=>{
    let {value} = this.state;
    let {onValueChange,useNativeDriver} = this.props;
    if(!value) {//处于关闭状态
      this.setState(preState=>({
        value:!preState.value,
      }),()=>{
        onValueChange(this.state.value)
        Animated.parallel([
          Animated.timing(this.state.scale,{
            toValue:0.01,
            duration:375,
            easing:Easing.bezier(0.0,0.0,0,1),
            useNativeDriver,
          }),
          Animated.spring(this.state.left,{
            toValue:51-29-1,
            duration:375,
            easing:Easing.bezier(0.4,0.0,0.2,1),
            bounciness:10,
            speed:10,
            useNativeDriver
          }),
          Animated.timing(this.state.animatedColor,{
            toValue:1,
            duration:375,
            easing:Easing.bezier(0.0,0.0,0,1)
          })
        ]).start();
      })
    } else {//处于打开状态
      this.setState(preState=>({
        value:!preState.value,
      }),()=>{
        onValueChange(this.state.value)
        Animated.parallel([
          Animated.timing(this.state.scale,{
            toValue:1,
            duration:375,
            easing:Easing.bezier(0.4,0.0,0.2,1),
            useNativeDriver,
          }),
          Animated.spring(this.state.left,{
            toValue:0,
            duration:375,
            easing:Easing.bezier(0.4,0.0,0.2,1),
            bounciness:10,
            speed:10,
            useNativeDriver
          }),
          Animated.timing(this.state.animatedColor,{
            toValue:0,
            duration:375,
            easing:Easing.bezier(0.0,0.0,0,1)
          })
        ]).start();
      })
    }
  }
  render(){
    let {onTintColor,tintColor,thumbTintColor,disabled,style} = this.props;
    return(
      <TouchableWithoutFeedback disabled={disabled} onPress={this.toggleSwitch}>
        <Animated.View style={
          [style,styles.container, {backgroundColor:this.state.animatedColor.interpolate({
              inputRange: [0,0.1,1],
              outputRange: [tintColor,onTintColor,onTintColor],
            })}]
        }>
          <Animated.View style={[styles.switchBtn,{transform:[{scale:this.state.scale}]}]}/>
          <Animated.View style={[styles.switchThumb,{transform:[{translateX:this.state.left}],backgroundColor:thumbTintColor}]}/>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
SwitchButton.defaultProps={
  value:false,
  onValueChange:()=>{},
  onTintColor:'#00cc33',//开启时的背景颜色
  thumbTintColor:"#fff",//原型按钮的背景颜色
  tintColor:'#DDD',
  disabled:false,
  useNativeDriver:false
}
const styles = StyleSheet.create({
  container:{
    height:31,
    width:51,
    borderRadius:31/2,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  switchBtn:{
    height:29,
    width:50,
    backgroundColor:'#fff',
    borderRadius:29/2,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  switchThumb:{
    height:29,
    width:29,
    borderRadius:29/2,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#ddd',
    position:'absolute',
  }
})

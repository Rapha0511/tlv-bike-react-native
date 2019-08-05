import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import styles from './home.styles';
import {publish} from '../features/session';
import MapView ,{Marker}from 'react-native-maps';


const {height,width}= Dimensions.get('window');
class HomeScreen extends React.Component {

state ={
  count:0,
  items:[],

}

incCount = ()=> this.setState({count:this.state.count+1},()=>{
  publish ("count",this.state.count)
  if(this.state.count >= 10)
  this.props.navigation.navigate('Links');
})
addItems = () => this.setState(state => ({items:[...state.items,Math.random() ]}));

flyToTLV = () =>{
  this.map.animateToRegion({
    latitude: 32.0805,
    longitude: 34.7794,
    latitudeDelta: 0.0615,
    longitudeDelta: 0.0281
}, 100);
}

addMarker=(event)=>{
  
  this.setState({
  marker:event.nativeEvent.coordinate
})
publish('marker',event.nativeEvent.coordinate);
}


  render(){
    console.log(this.state.marker);
    
  return (
    <View style={styles.container}> 
      
        <MapView
        style={{height:height - 100 , width:width}}
        ref={map=> this.map=map}
          initialRegion={{
            latitude: 32.0805,
            longitude: 34.7794,
            latitudeDelta: 0.0615,
            longitudeDelta: 0.0281
            }}
            onLongPress={this.addMarker}>

            {this.state.marker ?(
            <Marker
            coordinate = {this.state.marker}
            title ='blah'
            description={'putain'}
            />
            ):null}
            </MapView>

            <Button
            onPress={this.flyToTLV}
            style={styles.hoverButton}
            title = "TLV"
            color = "#841584"
            accessvisibilityLabel ="Fly to TLV"
            />

    </View>
  );
}
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {getValue, subscribe} from '../features/session'
class LinksScreen extends React.Component {

  componentDidMount(){
    subscribe('marker',marker => this.setState({marker}));
  }

  state ={
    marker:getValue('marker')
  }
  render(){
  return (
    <ScrollView style={styles.container}>
      {this.state.marker?(
        <Text>{this.state.marker.latitude}N - {this.state.marker.longitude}E</Text>
        ):null}
      <ExpoLinksView />
    </ScrollView>
  );
}
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default LinksScreen;
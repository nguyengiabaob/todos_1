import { StatusBar } from 'expo-status-bar';
import React from 'react';
import icon from 'react-native-vector-icons'
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, Text, View } from 'react-native';
import Todos from './todos';
import { List } from 'react-native-paper';

function Custom_list({complete,id,ten}) {
    async function togglecomplete()
    {
        await firestore()
        .collection('todos')
        .doc(id)
        .update({complete:!complete})
    }
  return (
    
        <List.Item title={ten} onPress={()=>{togglecomplete()}}left={(props)=><List.Icon {...props} icon={complete ? 'check':'cancel'}/>}>

        </List.Item>
    
  );
}
export default Custom_list
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

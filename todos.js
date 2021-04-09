import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Appbar, Button, TextInput } from 'react-native-paper';
import { set } from 'react-native-reanimated';
import { List } from 'react-native-paper';
import Custom_list from './Custom_flaslist';

export default function Todos() {
const [todos, settodos]= React.useState("")
const ref =firestore().collection('todos')
const [listtodos, setlisttodos]= React.useState([])
const [loading, setloading]= React.useState(true)
async function addTodo()
{
    await ref.add({
        ten: todos,
        complete: false
    })
    settodos("")
}
React.useEffect(
    ()=>{
        return ref.onSnapshot(querysnapshot=>{
            const list=[]
            querysnapshot.forEach(doc=>{
                const {ten, complete}= doc.data()
                console.log(ten)
                list.push(
                    {
                        id: doc.id,
                        ten,
                        complete
                    }
                )
            });
            setlisttodos(list)
            console.log(listtodos)
            if(loading)
            {
                setloading(false)
            }
           

        });
        
     
    }
,[]) 
if(loading)
    return null
async function togglecomplete()
    {
        await firestore()
        .collection('todos')
        .doc(id)
        .update({complete:!complete})
    }
  return (
    <View style={{flex:1}}>
        <Appbar>
            <Appbar.Content title='todolist'/>

        </Appbar>
        <ScrollView style={{flex:1}}>
            <Text>List of todos </Text>
            <FlatList data={listtodos}
            
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
                <Custom_list {...item}></Custom_list>
            )}>

            </FlatList>
        </ScrollView>
        <TextInput label="new Todo" onChangeText={(text)=>{settodos(text)}}>
        </TextInput>
        <Button onPress={()=>{addTodo()}}>Add Button</Button>

        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

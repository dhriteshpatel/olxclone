import React,{useState, useEffect} from 'react'
import { View, Text,FlatList, StyleSheet, Linking, Platform} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'


const ListItemScreen = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)


    const getDetails = async () =>{
      const querySnap = await firestore().collection('ads').get()
      const result = querySnap.docs.map(docSnap=>docSnap.data())
      console.log(result)
      setItems(result)
    }

    const openDial = (phone) =>{
        if(Platform.OS === 'android'){
         Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    
    useEffect(() => {
        getDetails()
        return () => {
            console.log('cleanup')
        }
    }, [])

    const renderItems = (item) =>{
        return (
            <Card style={styles.card}>
            <Card.Title title={item.name}  />
            <Card.Content>
              <Paragraph>{item.desc}</Paragraph>
              <Paragraph>{item.year}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Actions>
              <Button>{item.price}</Button>
              <Button onPress={()=>openDial()}>call-{item.phone}</Button>
            </Card.Actions>
          </Card>
        )
    }

    return (
        <View>
            <FlatList 
            data={items.reverse()}
            keyExtractor={(item)=> item.phone}
            renderItem={({item})=> renderItems(item)}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
       margin: 10,
       elevation:2
    },
   
})

export default ListItemScreen;

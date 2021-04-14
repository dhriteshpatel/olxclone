import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const AccountScreen = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const getDetails = async () =>{
        const querySnap = await firestore().collection('ads')
        .where('uid', '==', auth().currentUser.uid)
        .get()
        const result = querySnap.docs.map(docSnap=>docSnap.data())
        console.log(result)
        setItems(result)
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
        <View style={{flex:1 }}>
            <View style={{height:'30%',justifyContent:'space-evenly', alignItems:'center'}}>
            <Text style={{fontSize:22}}>{auth().currentUser.email}</Text>
            <Button style={{marginHorizontal:10}} mode='contained' onPress={() => auth().signOut() }>
            Logout
            </Button>
            <Text style={{fontSize:22}}>My ads</Text>

            </View>


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

export default AccountScreen;

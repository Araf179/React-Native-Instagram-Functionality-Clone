import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView, Button } from 'react-native'
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
 
return (
        <View style={{flex: 1, marginTop: 45}}>
            <Text>Feed: Display liked users and their image posts</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1, marginTop: 20}}>
            {posts.map( (item, index) => {
                    return (
                        <View style={{}}>
                        <Text style={{textAlign: 'center'}}>{item.user.name}</Text>
                        <Image
                            style={{width: Dimensions.get('window').width/3, height: 100}}
                            source={{ uri: item.downloadURL }}
                        />
                        <View style={{flexDirection: 'row'}}>
                        {item.currentUserLike && <Icon name="heart" size={20} style={{marginRight: 5}} onPress={() => onDislikePress(item.user.uid, item.id)} />}
                        {!item.currentUserLike && <Icon name="hearto" size={20} style={{marginRight: 5}} onPress={() => onLikePress(item.user.uid, item.id)} />}
                        <Icon
                            name="message1"
                            size={20}
                            style={{marginBottom: 10}}
                            onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
                        />
                        </View>
                    </View>

                    )
                })}
            </View>
        </View>

    )
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})
export default connect(mapStateToProps, null)(feed);
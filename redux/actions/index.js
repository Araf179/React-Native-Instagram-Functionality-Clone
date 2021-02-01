import firebase from "firebase";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE,USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA} from "./types";

export function clearData() {
  return ((dispatch) => {
      dispatch({type: CLEAR_DATA})
  })
}

export const fetchUser = () => {
  return async (dispatch) => {
    let loggedInUser = firebase.auth().currentUser;
    let document = await firebase
      .firestore()
      .collection("users")
      .doc(loggedInUser.uid)
      .get();

    if (document.exists) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: document.data() });
    } else {
      console.log("Doc doesnt exist");
    }
  };
};

export const fetchUserPosts = () => {
  return async (dispatch) => {
    let loggedInUser = firebase.auth().currentUser;
    let documents = await firebase
      .firestore()
      .collection("posts")
      .doc(loggedInUser.uid)
      .collection("userPosts")
      .get();
    let posts = documents.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
  };
};


export function fetchUserFollowing() {
  return (async (dispatch) => {
    console.log("In fetchUserFollowing()")
      await firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .onSnapshot((snapshot) => {
              let following = snapshot.docs.map(doc => {
                  const id = doc.id;
                  return id
              })
              dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
              for(let i = 0; i < following.length; i++){
                  console.log(following[i])
                  dispatch(fetchUsersData(following[i], true));
              }
          })
  })
}

export function fetchUsersData(uid, getPosts) {
  return (async (dispatch, getState) => {
      const found = getState().usersState.users.some(el => el.uid === uid);
      if (!found) {
          await firebase.firestore()
              .collection("users")
              .doc(uid)
              .get()
              .then((snapshot) => {
                  if (snapshot.exists) {
                      let user = snapshot.data();
                      user.uid = snapshot.id;
                      
                      dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                  }
                  else {
                      console.log('does not exist')
                  }
              })
              if(getPosts){
                  dispatch(fetchUsersFollowingPosts(uid));
              }
      }
  })
}

export function fetchUsersFollowingPosts(uid) {
  return (async (dispatch, getState) => {
    
      await firebase.firestore()
          .collection("posts")
          .doc(uid)
          .collection("userPosts")
          .orderBy("creation", "asc")
          .get()
          .then((snapshot) => {
              console.log(uid)
              //const uid = snapshot.query.EP.path.segments[1];
              
              const user = getState().usersState.users.find(el => el.uid === uid);
              let posts = snapshot.docs.map(doc => {
                  const data = doc.data();
                  const id = doc.id;
                  return { id, ...data, user }
              })
              
              for(let i = 0; i< posts.length; i++){
                  dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
              }
              dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
              
          })
  })
}

export function fetchUsersFollowingLikes(uid, postId) {
  return (async (dispatch, getState) => {
     await firebase.firestore()
          .collection("posts")
          .doc(uid)
          .collection("userPosts")
          .doc(postId)
          .collection("likes")
          .doc(firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
              //const postId = snapshot.ZE.path.segments[3];
              
              let currentUserLike = false;
              if(snapshot.exists){
                  currentUserLike = true;
              }

              dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
          })
  })
}

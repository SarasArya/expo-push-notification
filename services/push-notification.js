import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushToken');

    if(previousToken){
        console.log('Previous Token', previousToken);
        return ;
    }

    try{
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if(status !== 'granted'){
        return;
    }
    }
    catch(err){
        console.error('Couldnot ask for permission');
        console.error(err);
    }
    
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('New Token', token);
    try{
        await axios.post(PUSH_ENDPOINT, {token : { token }});
        AsyncStorage.setItem("pushtoken", token);
    }
    catch(err){
        console.error(err);
    }
    

};
import io from 'socket.io-client'
import {store} from '../index'

export const socket = io('http://webprogramozas.inf.elte.hu:3030');

socket.on('action-sent',data => {
    store.dispatch(data.action);
});
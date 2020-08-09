import Vue from 'vue';
let myBus = new Vue();
/*
 * @Description: websocket连接，注册与发送【与后端采用socket通信，然后通过bus事件总线发送到相关vue】
 * @Author: ZZF
 * @Date: 2019-08-03 15:29:08
 * @LastEditTime: 2019-08-10 14:59:34
 */

//  websocket连接地址(联调和开发环境不一样，要注意修改)
const href = process.env.NODE_ENV == 'development' ? '192.168.78.228:3002' : window.location.host;
const websocketUrl = `ws://${href}/iotInfo/sensorResponse`;
/**
 * @param {eventName: 事件名称}
 * @param {command: 事件操作['add'为注册,'delete'为下线]}
 * @param {msg：事件消息【选填】}
 */

let mysocket = null;
let socketEventMap = new Map();
let reconnectTimeout = null;

let connectWebsocket = callback => {
    // 连接websocket
    mysocket = new WebSocket(websocketUrl, 'echo-protocol');
    console.info(mysocket);
    mysocket.onopen = () => {
        clearTimeout(reconnectTimeout); // 取消重连setTimeout
        console.info('Your WebSocket connecting succeed!');
        // 初始化发送信息
        mysocket.send(
            JSON.stringify({
                eventName: 'init'
            })
        );
        callback ? callback() : '';
        // 接收消息
        mysocket.onmessage = msg => {
            let socketContent = JSON.parse(msg.data);
            console.info('receiveData', socketContent);
            // 判断事件名称，并告诉前端刷新接口数据
            if (socketContent.eventName && socketEventMap.has(socketContent.eventName)) {
                myBus.$emit(socketContent.eventName, socketContent);
            }
        };
    };
    mysocket.onerror = () => {
        console.error('Something went wrong with your WebSocket!');
    };
    mysocket.onclose = () => {
        console.info('Your WebSocket was close!');
        // socket断线重连(2s连接一次)
        reconnectTimeout = setTimeout(() => {
            connectWebsocket(callback);
        }, 2000);
    };
};

/**
 * @description: 建立socket事件连接,注册时会进行socket的初始化连接
 * @param {eventName: socket事件名称}
 * @param {msg: 事件相关信息}
 */
let addSocketEvent = (eventName, cb) => {
    if (mysocket && mysocket.readyState) {
        // CONNECTING 状态
        if (mysocket.readyState === 0) {
            setTimeout(() => {
                sendMsg(eventName, cb);
            }, 300);
        }
        // OPEN 状态
        else if (mysocket.readyState === 1) {
            sendMsg(eventName, cb);
        }
    }
    if (!mysocket || !mysocket.readyState || mysocket.readyState > 1) {
        connectWebsocket(() => {
            sendMsg(eventName, cb);
        });
    }
};

let sendMsg = (eventName, cb) => {
    // let info = JSON.stringify({
    //   eventName: eventName,
    //   command: "add",
    //   msg: ""
    // })
    // mysocket.send(info)
    // console.log('sendSocketInfo', info)
    myBus.$on(eventName, res => {
        if (cb) {
            cb(res);
        }
    });
    socketEventMap.set(eventName, null);
    // console.log('socketEventMap', socketEventMap)
};
let delSocketEvent = eventName => {
    // let info = JSON.stringify({
    //   eventName: eventName,
    //   command: 'delete',
    //   msg: ""
    // })
    // console.log('deleteSocketEvent', info)
    // mysocket.send(info)
    socketEventMap.delete(eventName);
    myBus.$off(eventName);
    // console.log('socketEventMap', socketEventMap)
};

export default {
    add: addSocketEvent,
    delete: delSocketEvent
};

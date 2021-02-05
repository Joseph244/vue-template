// 消息来源
const messageSource = row => {
    if (row.sourceData.dataType == '0') {
        if (row.sourceData.content.sensorTypeName) {
            let typeNames = [];
            for (let i of row.sourceData.content.sensorTypeName) {
                if (i) {
                    typeNames.push(i);
                }
            }
            if (typeNames.length === 0) {
                for (let i of row.sourceData.content.sensorTypeCode) {
                    if (i) {
                        typeNames.push(i);
                    }
                }
            }
            return {
                style: 'tag',
                type: '传感器类型',
                value: typeNames
            };
        }
        if (row.sourceData.content.sensorTypeName && row.sourceData.content.sensorTypeName.length > 0) {
            return {
                style: 'tag',
                type: '传感器类型',
                value: row.sourceData.content.sensorTypeName
            };
        }
        if (row.sourceData.content.sensorInfo.length > 0) {
            return {
                style: 'box-num',
                type: '传感器',
                value: row.sourceData.content.sensorInfo.length
            };
        }
        if (!row.sourceData.content.sensorInfo || row.sourceData.content.sensorInfo.length == 0) {
            return {
                style: 'box',
                type: '全部设备数据',
                value: '全部设备数据'
            };
        }
    }

    if (row.sourceData.dataType == '1') {
        let appName = row.sourceData.content.appName || row.sourceData.address;
        return {
            style: 'box',
            type: '第三方APP',
            value: appName + 'APP'
        };
    }
};
// 消息目标
const messageDesName = row => {
    if (row.destinationData.dataType == 1) {
        return row.destinationData.content.appName || row.destinationData.address;
    } else if (row.destinationData.dataType == 2) {
        return '物联管理平台';
    } else if (row.destinationData.dataType == 3) {
        return '其他云平台';
    } else {
        return row.destinationData.address;
    }
};
export default {
    messageSource,
    messageDesName
};

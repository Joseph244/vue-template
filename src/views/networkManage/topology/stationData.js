export default {
    name: '变电站',
    type: 0,
    accessInfo: [100, 200, 300],
    convergenceInfo: [100, 200, 300],
    sensorInfo: [100, 200, 300],
    children: [
        {
            name: '接入1',
            type: 1,
            convergenceInfo: [100, 200, 300],
            sensorInfo: [100, 200, 300],
            children: [
                {
                    name: '汇聚1-1',
                    type: 2,
                    sensorInfo: [100, 200, 300],
                    children: [
                        {
                            name: '温度传感器',
                            type: 3,
                            sensorInfo: [100, 200, 300]
                        },
                        {
                            name: '湿度传感器',
                            type: 3,
                            sensorInfo: [100, 200, 300]
                        }
                    ]
                },
                {
                    name: '汇聚1-2',
                    type: 2,
                    sensorInfo: [100, 200, 300],
                    children: [
                        {
                            name: '汇聚1-2-1',
                            type: 2,
                            sensorInfo: [100, 200, 300],
                            children: [
                                {
                                    name: '温度传感器',
                                    type: 3,
                                    sensorInfo: [100, 200, 300]
                                },
                                {
                                    name: '温度传感器',
                                    type: 3,
                                    sensorInfo: [100, 200, 300]
                                }
                            ]
                        },
                        {
                            name: '温度传感器',
                            type: 3,
                            sensorInfo: [100, 200, 300]
                        },
                        {
                            name: '温度传感器',
                            type: 3,
                            sensorInfo: [100, 200, 300]
                        }
                    ]
                }
            ]
        }
    ]
};

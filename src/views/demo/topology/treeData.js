export default {
    name: '全网（江苏省）',
    type: 1,
    children: [
        {
            name: '南京市',
            type: 2,
            children: [
                {
                    name: '输电',
                    type: 3,
                    children: [
                        {
                            name: '220KV',
                            type: 4,
                            children: [
                                {
                                    name: '变电站1',
                                    type: 5,
                                    id: 'a1'
                                },
                                {
                                    name: '变电站2',
                                    type: 5,
                                    id: 'a2'
                                },
                                {
                                    name: '变电站3',
                                    type: 5,
                                    id: 'a3'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: '无锡市',
            type: 2,
            children: [
                {
                    name: '输电',
                    type: 3,
                    children: [
                        {
                            name: '220KV',
                            type: 4,
                            children: [
                                {
                                    name: '变电站4',
                                    type: 5,
                                    id: 'a4'
                                },
                                {
                                    name: '变电站5',
                                    type: 5,
                                    id: 'a5'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: '泰州市',
            type: 2
        },
        {
            name: '徐州市',
            type: 2
        },
        {
            name: '南通市',
            type: 2
        },
        {
            name: '盐城市',
            type: 2
        },
        {
            name: '连云港市',
            type: 2
        },
        {
            name: '淮安市',
            type: 2
        },
        {
            name: '镇江市',
            type: 2
        },
        {
            name: '苏州市',
            type: 2
        },
        {
            name: '常州市',
            type: 2
        },
        {
            name: '宿迁市',
            type: 2
        },
        {
            name: '扬州市',
            type: 2
        }
    ]
};

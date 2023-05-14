<template>
    <div class="water">
        <iframe id="app3dIframe" :src="url" width="100%" style="min-height: 100%; height: 99.4vh;" frameborder="0"
            border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"
            @load="iframeLoad"></iframe>

        <!-- tabs 右侧地位按钮 -->
        <el-radio-group v-model="radioTwo" class="headerRightTabs" id="headerRightTabs">
            <el-radio :label="1" id="scenario_1">全景</el-radio>
            <el-radio :label="2" id="scenario_2">潜水泵</el-radio>
            <el-radio :label="3" id="scenario_3">离心泵</el-radio>
            <el-radio :label="4" id="scenario_4">全景动态</el-radio>
        </el-radio-group>

        <div v-if="isShow">

            <!-- 风机总览 -->
            <div class="gradientBackground"></div>
            <div class="specialPandect" id="pandect">
                <div class="pandect">
                    <!--电机参数-->
                    <div class="parameters">
                        <div class="parameters-title">水泵房参数</div>
                        <ul class="parameters-list">
                            <li class="parameters-li" v-for="(item, key) in parametersList" :key="key">
                                <div class="parameters-logo"><span>{{ item.log }}</span></div>
                                <div class="parameters-box">
                                    <div class="parameters-name">{{ item.name }}</div>
                                    <div class="parameters-child-box">
                                        <div class="parameters-num">{{ item.num }}</div>
                                        <div class="parameters-unit">{{ item.unit }}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- 流量变化趋势 -->
                    <div class="flows">
                        <div class="title">流量变化趋势</div>
                        <div class="flowBox">
                            <div id="flowEcharts" class="chart-itself"></div>
                        </div>
                    </div>

                    <!-- 告警信息 -->
                    <div class="warn">
                        <div class="warn-title">告警信息</div>
                        <div class="warn-box tableScroll">
                            <el-table v-loading="loading" :data="biaoMianData" class="tableTop" style="width: 100%">
                                <el-table-column label="时间" align="left" prop="time" width="75" />
                                <el-table-column label="编号" align="center" prop="no" width="48" />
                                <el-table-column label="消息文本" align="center" prop="content" />
                                <el-table-column label="持续时间" align="center" prop="times" width="80" />
                                <el-table-column label="状态" align="right" prop="status" width="48" />
                            </el-table>
                            <vue3-seamless-scroll :list="biaoMianData" :limitScrollNum="4" :step="0.6" :hover="true"
                                class="tableWrap scroll">
                                <el-table v-loading="loading" :data="biaoMianData" class="tableBottom"
                                    style="width: 100%">
                                    <el-table-column label="时间" align="left" prop="time" width="75" />
                                    <el-table-column label="编号" align="center" prop="no" width="48" />
                                    <el-table-column label="消息文本" align="center" prop="content" />
                                    <el-table-column label="持续时间" align="center" prop="times" width="80" />
                                    <el-table-column label="状态" align="right" prop="status" width="48">
                                        <template #default="scope">
                                            <Lock v-if="scope.row.status == 1"
                                                style="width: 1.2em; height: 1.2em; color:rgba(57, 220, 149, 1); " />
                                            <WarningFilled v-if="scope.row.status == 0"
                                                style="width: 1.2em; height: 1.2em; color:rgba(220, 111, 57, 1);" />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </vue3-seamless-scroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dialogSmall" id="dialogSmall">
            <div class="title">{{ dialog.title }}</div>
            <div class="voltage">
                <span>电压</span>
                <span>{{ dialog.voltage }}</span>
                <span>V</span>
            </div>
            <div class="current">
                <span>电流</span>
                <span>{{ dialog.current }}</span>
                <span>A</span>
            </div>
        </div>

        <div class="dialogBig" id="dialogBig">
            <div class="title">{{ dialog.title }}</div>
            <div class="voltage">
                <span>电压</span>
                <span>{{ dialog.voltage }}</span>
                <span>V</span>
            </div>
            <div class="current">
                <span>电流</span>
                <span>{{ dialog.current }}</span>
                <span>A</span>
            </div>
            <div class="temp">
                <span>温度</span>
                <span>{{ dialog.temp }}</span>
                <span>℃</span>
            </div>
            <div class="shake">
                <span>震动</span>
                <span>{{ dialog.shake }}</span>
                <span>mm/s</span>
            </div>
            <div class="shake">
                <span>压力</span>
                <span>{{ dialog.pressure }}</span>
                <span>Mpa</span>
            </div>
            <div class="shake">
                <span>运行时间</span>
                <span>{{ dialog.runTimeH }}h{{ dialog.runTimeH }}m</span>
            </div>
            <div class="shake">
                <span>停止时间</span>
                <span>{{ dialog.stopTimeH }}h{{ dialog.stopTimeM }}m</span>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, ref, markRaw } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
export default defineComponent({
    components: {
        Vue3SeamlessScroll
    },

    setup() {
        /** 告警信息 */
        const biaoMianData = ref([
            {
                id: 1,
                time: '20:15:45',
                no: 58,
                content: '4#泵电流高于高限值',
                times: '00:00:00',
                status: 1
            },
            {
                id: 2,
                time: '20:15:47',
                no: 58,
                content: '4#泵电流高于高限值',
                times: '00:00:01',
                status: 0
            },
            {
                id: 3,
                time: '16:13:07',
                no: 45,
                content: '3#泵震动高于高限值',
                times: '00:00:00',
                status: 1
            },
            {
                id: 4,
                time: '16:13:08',
                no: 45,
                content: '3#泵震动高于高限值',
                times: '00:00:01',
                status: 0
            },
            {
                id: 5,
                time: '09:26:20',
                no: 45,
                content: '3#泵震动高于高限值',
                times: '89:13:13',
                status: 0
            },
            {
                id: 6,
                time: '09:26:21',
                no: 58,
                content: '4#泵电流高于高限值',
                times: '109:10:36',
                status: 0
            }
        ]);
        return { biaoMianData };
    },
    data() {
        return {
            radioTwo: 1,
            url: window.location.protocol + '//' + window.location.host + '/' + 'three/shuibengfang1/shuibengfang1.html',
            dialog: {
                title: '', // 标题
                voltage: '', // 电压
                current: '', // 电流
                temp: '', // 温度
                shake: '', // 震动
                pressure: '', // 压力
                runTimeH: '', // 运行时间
                runTimeM: '', // 运行时间
                stopTimeH: '', // 停止时间
                stopTimeM: '', // 停止时间
            },

            data: [
                {
                    id: 1,
                    title: '潜水泵1',
                    voltage: '',
                    current: '',
                },
                {
                    id: 2,
                    title: '潜水泵2',
                    voltage: '',
                    current: '',
                },
                {
                    id: 3,
                    title: '潜水泵3',
                    voltage: '',
                    current: '',
                },
                {
                    id: 4,
                    title: '潜水泵4',
                    voltage: '',
                    current: '',
                },
                {
                    id: 5,
                    title: '潜水泵5',
                    voltage: '',
                    current: '',
                },
                {
                    id: 6,
                    title: '潜水泵6',
                    voltage: '',
                    current: '',
                },
                {
                    id: 7,
                    title: '离心泵1',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                },
                {
                    id: 8,
                    title: '离心泵2',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                },
                {
                    id: 9,
                    title: '离心泵3',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                },
                {
                    id: 10,
                    title: '离心泵4',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                },
                {
                    id: 11,
                    title: '离心泵5',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                },
                {
                    id: 12,
                    title: '离心泵6',
                    voltage: '',
                    current: '',
                    temp: '',
                    shake: '',
                    pressure: '',
                    runTimeH: '', // 运行时间
                    runTimeM: '', // 运行时间
                    stopTimeH: '', // 停止时间
                    stopTimeM: '', // 停止时间
                }
            ],

            timer: null, // 轮训
            // 电机参数
            parametersList: [
                { name: 'COD', unit: 'mg/L', num: 0, log: 'COD' },
                { name: 'NH3-N', unit: 'mg/L', num: 0, log: 'NH3' },
                { name: '1#液位值', unit: 'm', num: 0, log: '液' },
                { name: '2#液位值', unit: 'm', num: 0, log: '液' },
                { name: '1#流量', unit: 'm³/h', num: 0, log: '流' },
                { name: '2#流量', unit: 'm³/h', num: 0, log: '流' },
            ],
            // 流量变化趋势
            flowEcharts: null,
            flowData: {
                time: [],
                FL_1: [],
                FL_2: [],
            },

            isShow: false,
            loading: false,
        }
    },

    watch: {

    },
    mounted() {
        let t = this;

        // 用于累加时间
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        function dateAdd(d, num) {
            var c = new Date(d.substring(0, 4),
                d.substring(5, 7) - 1,
                d.substring(8, 10),
                d.substring(11, 13),
                d.substring(14, 16),
                d.substring(17, 19));
            c.setTime(c.getTime() + num * 1000);
            return c.getFullYear() + "-"
                + checkTime((c.getMonth() + 1))
                + "-" + checkTime(c.getDate())
                + " " + checkTime(c.getHours())
                + ":" + checkTime(c.getMinutes())
                + ":" + checkTime(c.getSeconds());
        }

        function timeSlot(step) {   //  step = 间隔的分钟
            var date = new Date()
            date.setHours('00')    // 时分秒设置从零点开始
            date.setSeconds('00')
            date.setUTCMinutes('00')
            // console.log(date.getHours())
            // console.log(date.getSeconds())
            // console.log(new Date(date.getTime()))

            var arr = [], timeArr = [];
            var slotNum = 24 * 60 / step   // 算出多少个间隔
            for (var f = 0; f < slotNum; f++) {   //  stepM * f = 24H*60M
                // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
                var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f))  // 获取：零点的时间 + 每次递增的时间
                var hour = '', sec = '';
                time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
                time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
                timeArr.push(hour + ':' + sec)
            }
            return timeArr
        }
        let setTime = timeSlot(10)
        this.flowData = {
            time: [],
            FL_1: [],
            FL_2: [],
        }
        this.flowData.time = setTime


        // console.log('77777',times)
        setTime.forEach((item, index) => {
            this.flowData.FL_1.push(getRandom(234, 236))
            this.flowData.FL_2.push(getRandom(152, 154))
        })


        function getRandom(m, n) {
            return (Math.random() * (n - m) + m).toFixed(2)
        }

        function getParameter() {
            t.parametersList.forEach((item, index) => {
                if (index == 0) {
                    item.num = getRandom(4.2, 4.4)
                }
                if (index == 1) {
                    item.num = getRandom(0.5, 0.6)
                }
                if (index == 2) {
                    item.num = getRandom(5.8, 5.8)
                }
                if (index == 3) {
                    item.num = getRandom(5.63, 5.63)
                }
                if (index == 4) {
                    item.num = getRandom(235.0, 235.9)
                }
                if (index == 5) {
                    item.num = getRandom(153.0, 153.9)
                }
            })
        }

        let time7 = dateAdd('2022-01-01 09:44:50', 1)
        let time8 = dateAdd('2022-01-01 01:53:50', 1)
        let time9 = dateAdd('2022-01-01 02:48:50', 1)
        let time10 = dateAdd('2022-01-01 04:35:50', 1)
        let time11 = dateAdd('2022-01-01 09:40:50', 1)
        let time12 = dateAdd('2022-01-01 02:49:50', 1)

        function getData() {
            time7 = dateAdd(time7, 1)
            let hm7 = time7.slice(11, 16).split(':')
            time8 = dateAdd(time8, 1)
            let hm8 = time8.slice(11, 16).split(':')
            time9 = dateAdd(time9, 1)
            let hm9 = time9.slice(11, 16).split(':')
            time10 = dateAdd(time10, 1)
            let hm10 = time10.slice(11, 16).split(':')
            time11 = dateAdd(time11, 1)
            let hm11 = time11.slice(11, 16).split(':')
            time8 = dateAdd(time12, 1)
            let hm12 = time12.slice(11, 16).split(':')
            t.data.forEach((item, index) => {
                switch (item.id) {
                    case 1:
                        item.voltage = 388
                        item.current = '0.00'
                        break;
                    case 2:
                        item.voltage = getRandom(386, 387)
                        item.current = getRandom(40, 41)
                        break;
                    case 3:
                        item.voltage = 388
                        item.current = '0.00'
                        break;
                    case 4:
                        item.voltage = 388
                        item.current = '0.00'
                        break;
                    case 5:
                        item.voltage = 388
                        item.current = '0.00'
                        break;
                    case 6:
                        item.voltage = getRandom(382, 383)
                        item.current = getRandom(35, 36)
                        break;
                    case 7:
                        item.voltage = 388
                        item.current = '0.00'
                        item.temp = getRandom(8.29, 8.30)
                        item.shake = getRandom(0.27, 0.29)
                        item.pressure = '0.00'
                        item.runTimeH = 0
                        item.runTimeM = 0
                        item.stopTimeH = hm7[0]
                        item.stopTimeM = hm7[1]
                        break;
                    case 8:
                        item.voltage = getRandom(386, 387)
                        item.current = getRandom(266, 273)
                        item.temp = getRandom(29, 30)
                        item.shake = getRandom(1.7, 1.75)
                        item.pressure = getRandom(1, 1.1)
                        item.runTimeH = hm8[0]
                        item.runTimeM = hm8[1]
                        item.stopTimeH = 0
                        item.stopTimeM = 0
                        break;
                    case 9:
                        item.voltage = 388
                        item.current = '0.00'
                        item.temp = getRandom(10.5, 10.6)
                        item.shake = getRandom(23, 23.8)
                        item.pressure = '0.00'

                        item.runTimeH = 0
                        item.runTimeM = 0
                        item.stopTimeH = hm9[0]
                        item.stopTimeM = hm9[1]
                        break;
                    case 10:
                        item.voltage = 388
                        item.current = '0.00'
                        item.temp = getRandom(7.9, 7.96)
                        item.shake = getRandom(0.1, 0.13)
                        item.pressure = '0.00'

                        item.runTimeH = 0
                        item.runTimeM = 0
                        item.stopTimeH = hm10[0]
                        item.stopTimeM = hm10[1]
                        break;
                    case 11:
                        item.voltage = 388
                        item.current = '0.00'
                        item.temp = getRandom(7.02, 7.05)
                        item.shake = getRandom(0.02, 0.04)
                        item.pressure = '0.00'

                        item.runTimeH = 0
                        item.runTimeM = 0
                        item.stopTimeH = hm11[0]
                        item.stopTimeM = hm11[1]
                        break;
                    case 12:
                        item.voltage = getRandom(383, 384)
                        item.current = getRandom(258, 265)
                        item.temp = getRandom(29, 30)
                        item.shake = getRandom(1.7, 1.75)
                        item.pressure = getRandom(1, 1.1)

                        item.runTimeH = hm12[0]
                        item.runTimeM = hm12[1]
                        item.stopTimeH = 0
                        item.stopTimeM = 0
                        break;
                }

            })
        }

        getParameter()
        getData()
        this.timer = setInterval(() => {
            t.voltage = getRandom(387, 389)
            t.current = getRandom(40, 41.5)
            getParameter()
            getData()
            // console.log('44444',times)
        }, 1000)







    },
    methods: {
        // 监听iframe传回事件
        iframeLoad(obj) {
            window.addEventListener('message', this.loadEvent, false)
        },
        // iframe 传回事件内容
        loadEvent(e) {
            let t = this
            if (e.data && typeof e.data === 'object') {
                if ('eventType' in e.data) {
                    if (e.data.eventType === 1) { // tab切换 e.data.point
                        // e.data.tab 哪一类点位  e.data.point 点位名
                        let point = e.data.point
                        if (point.indexOf('4330810') !== -1) {
                            if (point.indexOf('.001') !== -1) {
                                t.dialog = t.data[1];
                            } else if (point.indexOf('.002') !== -1) {
                                t.dialog = t.data[2];
                            } else if (point.indexOf('.003') !== -1) {
                                t.dialog = t.data[3];
                            } else if (point.indexOf('.004') !== -1) {
                                t.dialog = t.data[4];
                            } else if (point.indexOf('.005') !== -1) {
                                t.dialog = t.data[5];
                            } else {
                                t.dialog = t.data[0];
                            }
                        }

                        if (point.indexOf('1685549') !== -1) {
                            if (point.indexOf('.001') !== -1) {
                                t.dialog = t.data[6];
                            } else if (point.indexOf('.002') !== -1) {
                                t.dialog = t.data[7];
                            } else if (point.indexOf('.003') !== -1) {
                                t.dialog = t.data[8];
                            } else if (point.indexOf('.004') !== -1) {
                                t.dialog = t.data[9];
                            } else if (point.indexOf('.005') !== -1) {
                                t.dialog = t.data[10];
                            } else if (point.indexOf('.006') !== -1) {
                                t.dialog = t.data[11];
                            }
                        }

                        // switch (e.data.point) {
                        //     case 'Obj3d66-4330810-331-49':
                        //         t.title = '潜水泵'
                        //         break
                        //     case 'Obj3d66-4330810-331-49.001':
                        //         t.title = '离心泵'
                        //         break
                        // }

                    }

                }

            }
            if (e.data.eventType === 0 && e.data.tab === 'init') {
                t.isShow = true;
                this.$nextTick(() => {
                    this.flowEcharts = this.getEchartsInstance('flowEcharts')
                    this.drawFlowEcharts();
                })

            }
        },

        // echarts获取实例 画图
        getEchartsInstance(id) {
            let chart = echarts.getInstanceByDom(document.getElementById(id))
            if (chart === undefined) {
                chart = markRaw(echarts.init(document.getElementById(id), null, {
                    renderer: 'svg'
                }))
            }
            return chart
        },

        drawFlowEcharts() {
            let xData = this.flowData.time ? this.flowData.time : [];
            let option = {
                grid: {
                    left: '0%',
                    right: '0%',
                    top: 60,
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderWidth: 0,
                    shadowBlur: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    padding: [5, 10],
                    textStyle: {
                        color: '#7588E4'
                    },
                    formatter: (p) => {
                        let dom = `<div style="background:rgba(0, 0, 0, 0.6); border-radius: 10px; padding: 5px 10px;">
                            <div style="color: #D6D9E0; font-size: 14px; font-family: 'STYuanti-SC-Regular';text-shadow: 2px 0 2px rgba(0, 0, 0, 0.7);">${p[0].axisValue}</div>`;
                        for (let i = 0; i < p.length; i++) {
                            dom += `<div>
                                  <span>${p[i].marker}</span>
                                  <span style="color: #D6D9E0; font-size: 14px; font-family: 'STYuanti-SC-Regular';text-shadow: 2px 0 2px rgba(0, 0, 0, 0.7);">${p[i].seriesName}</span>
                                  <span style="text-align: center; color: ${p[i].color}; font-size: 14px; font-family: 'STYuanti-SC-Regular';text-shadow: 2px 0 2px rgba(0, 0, 0, 0.7); font-weight: bold">
                                    <span>${p[i].data}</span>
                                    <span>m³/h</span>
                                    </span>
                                </div>`
                        }
                        dom + `</div>`
                        return dom
                    }
                },
                legend: {
                    top: 10,
                    right: 40,
                    orient: 'horizontal',
                    data: ['1#流量', '2#流量'],
                    textStyle: {
                        color: '#D6D9E0',
                        fontSize: 14,
                    }
                },
                dataZoom: [
                    {
                        show: false,
                        xAxisIndex: [0],
                        bottom: '8%',
                        start: 0,
                        end: 100,
                        handleSize: '110%'
                    },
                    {
                        type: 'inside',
                        show: false,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ],
                xAxis: {
                    type: 'category',
                    data: xData,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        interval: 'auto',
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.18)',
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14,
                            color: '#D6D9E0',
                            fontFamily: 'STYuanti-SC-Regular',
                        }
                    }
                },
                yAxis: {

                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        margin: 10,
                        textStyle: {
                            fontSize: 14,
                            color: '#D6D9E0',
                            fontFamily: 'STYuanti-SC-Regular'
                        },
                        formatter: function (value, index) {
                            // return value + '℃'
                            return value
                        }
                    }
                },
                series: [{
                    name: '1#流量',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    data: this.flowData.FL_1,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(114, 197, 255, 0.31)'
                        }, {
                            offset: 1,
                            color: 'rgba(114, 197, 255, 0)'
                        }], false)
                    },
                    itemStyle: {
                        color: '#72C5FF'
                    },
                    lineStyle: {
                        width: 3
                    }
                }, {
                    name: '2#流量',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbol: 'circle',
                    symbolSize: 6,
                    data: this.flowData.FL_2,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(245, 158, 64, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(245, 158, 64, 0)'
                        }], false)
                    },
                    itemStyle: {
                        color: '#F5E06D'
                    },
                    lineStyle: {
                        width: 3
                    }
                }]
            }

            this.flowEcharts.setOption(option)
            window.addEventListener('resize', this.flowEcharts.resize)
        }
    },
    beforeUnmount() {
        window.removeEventListener('message', this.loadEvent, false)
        if (this.flowEcharts) {
            this.flowEcharts.dispose()
            this.flowEcharts = null
        }

        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }
})
</script>
<style lang="scss" scoped>
.water {
    padding: 0 !important;
    font-family: 'STYuanti-SC-Regular';
    position: relative;
    width: 100%;
    height: 100vh;

    /** 左侧数据阴影 */
    .gradientBackground {
        width: 680px;
        height: 100vh;
        background: linear-gradient(to right, rgba(7, 8, 12, 0.8) 0%, rgba(7, 8, 12, 0.8) 60%, rgba(7, 8, 12, 0) 100%);
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
    }

    .specialPandect {
        position: absolute;
        left: 60px;
        top: 100px;
        z-index: 5;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100vh;
        font-family: "STYuanti-SC-Regular";
        pointer-events: auto;
        overflow: auto;

        &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 2px;
            background-color: rgba(14, 39, 77, 0);
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: rgba(148, 148, 148, 0.2);
        }


        .pandect {
            width: calc(400px + 4px);
            height: 90%;
            min-height: 850px;
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
            // flex-direction: column;
            // align-items: center;
            padding-bottom: 15px;

            /** 风机参数 */
            .parameters {
                width: 100%;
                height: 280px;
                margin-top: 20px;

                .parameters-title {
                    width: 400px;
                    height: 40px;
                    line-height: 34px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #D6D9E0;
                    margin-bottom: 15px;
                    background-image: url(../../assets/images/titlebj.webp);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    text-shadow: 0px 2px 2px rgba(5, 25, 32, 0.93);
                    text-indent: 30px;
                }

                .parameters-list {
                    width: 100%;
                    height: 160px;
                    margin: 0;
                    padding: 0;

                    .parameters-li {
                        width: 182px;
                        height: 50px;
                        line-height: 50px;
                        float: left;
                        margin: 5px 0 11px 0;

                        .parameters-logo {
                            width: 44px;
                            height: 44px;
                            text-align: center;
                            line-height: 40px;
                            float: left;
                            background-image: url(../../assets/images/iconBorder.webp);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;

                            span {
                                background-image: linear-gradient(to top, #FFFFFF, #00FFFF);
                                /* 线性渐变背景，方向向上 */
                                -webkit-background-clip: text;
                                /* 背景被裁剪成文字的前景色 */
                                -webkit-text-fill-color: transparent;
                                /* 文字填充颜色变透明 */
                                font-size: 12px;
                                font-weight: bold;
                            }
                        }

                        .parameters-box {
                            width: 124px;
                            height: 50px;
                            float: left;
                            margin-left: 14px;

                            .parameters-name {
                                height: 15px;
                                line-height: 15px;
                                font-size: 12px;
                                font-weight: bold;
                                color: #00F4F8;
                            }

                            .parameters-child-box {
                                width: 100%;
                                height: 35px;

                                .parameters-num {
                                    float: left;
                                    width: 88px;
                                    height: 35px;
                                    line-height: 35px;
                                    color: #fff;
                                    font-size: 30px;
                                }

                                .parameters-unit {
                                    width: 32px;
                                    text-align: right;
                                    float: left;
                                    font-size: 12px;
                                    font-weight: bold;
                                    color: #00F4F8;
                                }
                            }


                        }


                    }

                    .parameters-li:nth-child(2n) {
                        margin-left: 40px;
                    }
                }
            }

            /** 流量变化趋势 */
            .flows {
                width: 100%;
                height: 300px;
                position: relative;

                .title {
                    width: 400px;
                    height: 40px;
                    line-height: 34px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #D6D9E0;
                    margin-bottom: 15px;
                    background-image: url(../../assets/images/titlebj.webp);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    text-shadow: 0px 2px 2px rgba(5, 25, 32, 0.93);
                    text-indent: 30px;
                }

                .flowBox {
                    width: 400px;
                    height: 300px;
                    background-color: rgba(44, 53, 77, 0);
                    position: absolute;
                    top: 0;

                    .chart-itself {
                        width: 100%;
                        height: 280px;
                    }
                }

            }

        }


    }

    /** 左侧数据鼠标移上滚动条高亮 */
    .specialPandect:hover {
        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: rgba(148, 148, 148, 0.5);
        }
    }

    .warn {
        .warn-title {
            width: 400px;
            height: 40px;
            line-height: 34px;
            font-size: 18px;
            font-weight: bold;
            color: #D6D9E0;
            margin-bottom: 15px;
            background-image: url(../../assets/images/titlebj.webp);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-shadow: 0px 2px 2px rgba(5, 25, 32, 0.93);
            text-indent: 30px;
        }
    }
}

.dialogSmall {
    width: 432px;
    height: 198px;
    position: absolute;
    z-index: 99;
    background-image: url(../../assets/images/messageSmall.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: -25% !important;
    left: -8% !important;

    .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-indent: 30px;
        margin-top: 8px;
        color: #fff;
        font-size: 24px;
        text-align: left;
    }

    div {
        width: 60%;
        height: 34px;
        text-align: center;
        line-height: 34px;
        font-size: 24px;
        margin: 26px auto auto auto;
        color: #fff;

        span{
            display: block;
            width: fit-content;
            float:left;
        }
        span:nth-child(1){
            font-size: 16px;
            color: #00F4F8;
        }
        span:nth-child(2){
            font-size: 24px;
            width: 200px;
        }
        span:nth-child(3){
            font-size: 16px;
            color: #00F4F8;
        }
    }
    div:last-child{
        padding-top: 3px;
    }
}

.dialogBig {
    width: 432px;
    height: 302px;
    position: absolute;
    z-index: 99;
    background-image: url(../../assets/images/messageBig.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: -38% !important;
    left: -8% !important;


    div {
        width: 40%;
        height: 34px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        margin: 24px auto auto 36px;
        color: #fff;
        float: left;
        span{
            display: block;
            width: fit-content;
            float:left;
        }
        span:nth-child(1){
            color: #00F4F8;
        }
        span:nth-child(2){
            font-size: 18px;
            width: 100px;
        }
        span:nth-child(3){
            color: #00F4F8;
        }
    }
    div:last-child{
        padding-top: 3px;
    }
    .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-indent: 0px;
        margin-top: 8px;
        color: #fff;
        font-size: 24px;
        float: none;
        text-align: left;
    }

}

.tableScroll {
    ::v-deep .tableWrap {
        overflow: hidden;
        height: 210px;
    }

    ::v-deep .el-table {
        margin-top: 0px;
        background: none;
    }

    ::v-deep .el-table::before {
        height: 0 !important;
    }

    ::v-deep .tableTop .el-table__body-wrapper {
        display: none;
    }

    ::v-deep .tableTop thead tr {
        background: none;
    }

    ::v-deep .tableTop thead tr th {
        background: none;
        background-color: rgba(44, 53, 77, 0);
        border-bottom: 1px dashed rgba(44, 53, 77, 0) !important;
        color: #D6D9E0 !important;

    }

    ::v-deep .tableTop .cell,
    ::v-deep .tableBottom .cell {
        padding: 0;
    }

    ::v-deep .tableBottom {
        height: 210px;
    }

    ::v-deep .tableBottom .el-table__header-wrapper {
        display: none;
        width: 100%;
    }

    ::v-deep .tableBottom tbody tr {
        background: none;
    }

    ::v-deep .tableBottom tbody tr td {
        background: none;
        // background-color: rgba(44, 53, 77, 0.7);
        border-bottom: 1px dashed rgba(44, 53, 77, 0) !important;
        color: #D6D9E0 !important;
        padding: 0;
    }



    ::v-deep .tableBottom .el-table__cell {
        padding: 9px 0 !important;
    }

}

/** 右侧tab */
.headerRightTabs {
    visibility: hidden;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 30px;
    margin: auto;
    z-index: 100;
    width: 48px;
    height: 480px;
    background-color: rgba(44, 53, 77, 0.7);
    border-radius: 24px;

    ::v-deep .el-radio {
        width: 48px;
        height: 120px;
        line-height: 30px;
        text-align: center;
        writing-mode: vertical-lr;
        position: relative;

        .el-radio__input {
            display: none;
        }

        .el-radio__label {
            color: #9DA8BC;
            font-size: 16px;
            font-family: '微软雅黑';
            letter-spacing: 3px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    ::v-deep .is-checked {
        background-color: #455AD9;
        border-radius: 24px;

        .el-radio__label {
            color: #fff;
            font-size: 16px;
            font-family: '微软雅黑';
        }
    }

    ::v-deep .is-disabled {
        .el-radio__label {
            color: rgba(255, 255, 255, 0.2);
        }

    }


}
</style>

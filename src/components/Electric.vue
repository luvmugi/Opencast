<template>
    <div class="elecContainer">
        <div class="left">
            <div class="leftBox">
                <div class="day bgBox">
                    <div class="title">当日耗电曲线图</div>
                    <div class="box">
                        <div class="message">
                            <div class="messageTitle">当前时耗电量</div>
                            <div class="messageNum"><span>{{ dayNum }}</span> 度</div>
                        </div>
                        <div id="dayId" class="chart-self"></div>
                    </div>
                </div>
                <div class="month bgBox">
                    <div class="title">本月耗电曲线图</div>
                    <div class="box">
                        <div class="message">
                            <div class="messageTitle">当前日耗电量</div>
                            <div class="messageNum"><span>{{ monthNum }}</span> 度</div>
                        </div>
                        <div id="monthId" class="chart-self"></div>
                    </div>
                </div>
                <div class="year bgBox">
                    <div class="title">本年耗电曲线图</div>
                    <div class="box">
                        <div class="message">
                            <div class="messageTitle">当前月耗电量</div>
                            <div class="messageNum"><span>{{ yearNum }}</span> 度</div>
                        </div>
                        <div id="yearId" class="chart-self"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="center">
            <!-- 出线 -->
            <div class="appear">
                <el-row>
                    <el-col :span="2">P</el-col>
                    <el-col :span="8">{{ appear.P1 }}</el-col>
                    <el-col :span="8">{{ appear.P2 }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">Q</el-col>
                    <el-col :span="8">{{ appear.Q1 }}</el-col>
                    <el-col :span="8">{{ appear.Q2 }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">I</el-col>
                    <el-col :span="8">{{ appear.I1 }}</el-col>
                    <el-col :span="8">{{ appear.I2 }}</el-col>
                </el-row>
                <div class="centerTitle1 centerTitle">金新总降出线1</div>
                <div class="centerTitle2 centerTitle">原有35kv变电所出线</div>
            </div>
            <!-- 35KV I母线 上数据 -->
            <div class="generatrix35Top">
                <div class="generatrix35Top1">
                    <el-row>
                        <el-col :span="10">Ua</el-col>
                        <el-col :span="14">{{ appear.Ua }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Ub</el-col>
                        <el-col :span="14">{{ appear.Ub }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uc</el-col>
                        <el-col :span="14">{{ appear.Uc }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uab</el-col>
                        <el-col :span="14">{{ appear.Uab }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Ubc</el-col>
                        <el-col :span="14">{{ appear.Ubc }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uca</el-col>
                        <el-col :span="14">{{ appear.Uca }}</el-col>
                    </el-row>
                </div>
                <el-row class="generatrix35Top2">3201</el-row>
                <el-row class="generatrix35Top3">3207</el-row>
                <el-row class="generatrix35Top4">3207617</el-row>
            </div>

            <!-- 35KV I母线 下数据 -->
            <div class="generatrix35Bottom">
                <div class="generatrix35BottomTitle">35KV Ⅰ母线</div>
                <div class="generatrix35Bottom1">
                    <el-row>
                        <el-col :span="10">Ua</el-col>
                        <el-col :span="14">{{ generatrix.Ua }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Ub</el-col>
                        <el-col :span="14">{{ generatrix.Ub }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uc</el-col>
                        <el-col :span="14">{{ generatrix.Uc }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uab</el-col>
                        <el-col :span="14">{{ generatrix.Uab }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Ubc</el-col>
                        <el-col :span="14">{{ generatrix.Ubc }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">Uca</el-col>
                        <el-col :span="14">{{ generatrix.Uca }}</el-col>
                    </el-row>
                </div>
                <el-row class="generatrix35Bottom2">3203</el-row>
                <el-row class="generatrix35Bottom3">3205</el-row>
                <el-row class="generatrix35Bottom4">2305617</el-row>
                <el-row class="generatrix35Bottom5">
                    <div class="centerTitle3 centerTitle">1号主变高压侧</div>
                    <el-col :span="24">{{ generatrix.gyc1 }}</el-col>
                    <el-col :span="24">{{ generatrix.gyc2 }}</el-col>
                    <el-col :span="24">{{ generatrix.gyc3 }}</el-col>
                </el-row>
                <div class="centerTitle4 centerTitle">35kVI段PT</div>
            </div>

            <!-- 6KV I母线 下数据 -->
            <div class="generatrix6Bottom">
                <div class="generatrix6BottomTitle">6KV Ⅰ母线</div>
                <el-row class="generatrix6Bottom3">618</el-row>
                <el-row class="generatrix6Bottom4">618617</el-row>
                <el-row class="generatrix6Bottom5">617</el-row>
                <el-row class="generatrix6Bottom6">617617</el-row>
                <el-row class="generatrix6Bottom7">612</el-row>
                <el-row class="generatrix6Bottom8">612617</el-row>
                <el-row class="generatrix6Bottom9">611</el-row>
                <el-row class="generatrix6Bottom10">611617</el-row>
                <el-row class="generatrix6Bottom11">603</el-row>
                <el-row class="generatrix6Bottom12">601</el-row>
                <el-row class="generatrix6Bottom13">613</el-row>
                <el-row class="generatrix6Bottom14">613617</el-row>
                <el-row class="generatrix6Bottom15">614</el-row>
                <el-row class="generatrix6Bottom16">614617</el-row>
                <el-row class="generatrix6Bottom17">615</el-row>
                <el-row class="generatrix6Bottom18">615617</el-row>
                <el-row class="generatrix6Bottom19">616</el-row>
                <el-row class="generatrix6Bottom20">616617</el-row>

                <div class="generatrix6Bottom1">
                    <div class="centerTitle5 centerTitle">Ⅰ号站用变Ⅰ段</div>
                    <div class="centerTitle6 centerTitle">Ⅰ号站用变Ⅱ段</div>
                    <el-row>
                        <el-col :span="2">Ua</el-col>
                        <el-col :span="8">{{ yb.Ua1 }}</el-col>
                        <el-col :span="8">{{ yb.Ua2 }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2">Ub</el-col>
                        <el-col :span="8">{{ yb.Ub1 }}</el-col>
                        <el-col :span="8">{{ yb.Ub2 }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2">Uc</el-col>
                        <el-col :span="8">{{ yb.Uc1 }}</el-col>
                        <el-col :span="8">{{ yb.Uc2 }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2">Uab</el-col>
                        <el-col :span="8">{{ yb.Uab1 }}</el-col>
                        <el-col :span="8">{{ yb.Uab2 }}</el-col>
                    </el-row>
                </div>

                <div class="generatrix6Bottom2Background centerTitle"></div>
                <div class="generatrix6Bottom2">
                    <el-row gutter="0">
                        <el-col :span="1">
                            <el-row>
                                <el-col :span="24" class="centerTitle6" style="height:22px;color:rgba(0,0,0,0);">单位</el-col>
                                <el-col :span="24">P</el-col>
                                <el-col :span="24">Q</el-col>
                                <el-col :span="24">I</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">1号站用变</el-col>
                                <el-col :span="24">{{ generatrix.P1 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q1 }}</el-col>
                                <el-col :span="24">{{ generatrix.I1 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">1号电容器</el-col>
                                <el-col :span="24">{{ generatrix.P2 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q2 }}</el-col>
                                <el-col :span="24">{{ generatrix.I2 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">工业广场</el-col>
                                <el-col :span="24">{{ generatrix.P3 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q3 }}</el-col>
                                <el-col :span="24">{{ generatrix.I3 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">流干降水北线</el-col>
                                <el-col :span="24">{{ generatrix.P4 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q4 }}</el-col>
                                <el-col :span="24">{{ generatrix.I4 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">I段PT</el-col>
                                <!-- <el-col :span="24">{{ generatrix.P5 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q5 }}</el-col>
                                <el-col :span="24">{{ generatrix.I5 }}</el-col> -->
                            </el-row>
                        </el-col>
                        <el-col :span="3">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">1号主变进线</el-col>
                                <el-col :span="24">{{ generatrix.P6 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q6 }}</el-col>
                                <el-col :span="24">{{ generatrix.I6 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">一站</el-col>
                                <el-col :span="24">{{ generatrix.P7 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q7 }}</el-col>
                                <el-col :span="24">{{ generatrix.I7 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">南线</el-col>
                                <el-col :span="24">{{ generatrix.P8 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q8 }}</el-col>
                                <el-col :span="24">{{ generatrix.I8 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">长输皮带</el-col>
                                <el-col :span="24">{{ generatrix.P9 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q9 }}</el-col>
                                <el-col :span="24">{{ generatrix.I9 }}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="2">
                            <el-row>
                                <el-col :span="24" class="centerTitle6 centerTitle">二站</el-col>
                                <el-col :span="24">{{ generatrix.P10 }}</el-col>
                                <el-col :span="24">{{ generatrix.Q10 }}</el-col>
                                <el-col :span="24">{{ generatrix.I10 }}</el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                </div>

            </div>

        </div>
        <div class="right">
            <div class="rightBox">
                <div class="warnMessage bgBox">
                    <div class="title">报警信息</div>
                    <div class="box warn-box tableScroll">
                        <el-table v-loading="loading" :data="warn" class="tableTop" style="width: 100%">
                            <el-table-column label="序号" align="center" prop="id" width="30" />
                            <el-table-column label="时间" align="center" prop="time" width="80" />
                            <el-table-column label="等级" align="center" prop="grade" width="80" />
                            <el-table-column label="告警动作" align="center" prop="action" />
                            <el-table-column label="操作" align="center" width="80" />
                        </el-table>
                        <vue3-seamless-scroll :list="warn" :limitScrollNum="4" :step="0.6" :hover="true"
                            class="tableWrap scroll">
                            <el-table v-loading="loading" :data="warn" class="tableBottom" style="width: 100%">
                                <el-table-column label="序号" align="center" prop="id" width="30" />
                                <el-table-column label="时间" align="center" prop="time" width="80" />
                                <el-table-column label="等级" align="center" prop="grade" width="80" />
                                <el-table-column label="告警动作" align="center" prop="action" />
                                <el-table-column label="操作" align="center" prop="action" width="80">
                                    <template #default="scope">
                                        <el-button link type="text" size="small"
                                            @click.prevent="detailRow(scope.row, scope.$index)">
                                            详细
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </vue3-seamless-scroll>
                    </div>
                </div>
            </div>
        </div>



        <el-dialog v-model="dialogVisible" title="告警信息" height="919px" custom-class="el-table-warn"
            close-on-click-modalclass="el-table-warn">

            <el-table v-loading="loading" :data="warn" :height="800" ref='tTable' highlight-current-row :border="false"
                style="width: 100%;">
                <el-table-column label="序号" align="center" prop="id" width="80" />
                <el-table-column label="等级" align="center" prop="grade" width="120" />
                <el-table-column label="时间" align="center" prop="time" width="200" />
                <el-table-column label="厂站" align="center" prop="stand" />
                <el-table-column label="告警对象" align="center" prop="object" />
                <el-table-column label="告警动作" align="center" prop="action" width="200" />
            </el-table>

        </el-dialog>

    </div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, ref, markRaw } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
export default {
    components: {
        Vue3SeamlessScroll
    },
    data() {
        return {
            timer: null, // 轮训
            loading: false,
            dialogVisible: false,
            dayEchart: null,
            monthEchart: null,
            yearEchart: null,
            dayNum: 0,
            monthNum: 0,
            yearNum: 0,
            day: {
                time: [],
                data: [],
            },
            month: {
                time: [],
                data: [],
            },
            year: {
                time: [],
                data: [],
            },

            warn: [
                {
                    id: 1,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:31.256',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: '遥信变位 由合到分',
                },
                {
                    id: 2,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 18:13:06.687',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: 'SOE 由合到分',
                },
                {
                    id: 3,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:30.931',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置A机闭锁',
                    action: '遥信变位 由合到分',
                },
                {
                    id: 4,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 18:13:06.587',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置A机闭锁',
                    action: 'SOE 由合到分',
                },
                {
                    id: 5,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:13.087',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: '遥信变位 由合到分',
                },
                {
                    id: 6,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 18:12:49.005',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: 'SOE 由合到分',
                },
                {
                    id: 7,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:31.678',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: '遥信变位 由合到分',
                },
                {
                    id: 8,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 19:18:12.711',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置A机闭锁',
                    action: 'SOE 由合到分',
                },
                {
                    id: 9,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:07.557',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置A机闭锁',
                    action: '遥信变位 由合到分',
                },
                {
                    id: 10,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:56:07.710',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '公共测控2-PCS9705E_GPS对时装置B机闭锁',
                    action: 'SOE 由合到分',
                },
                {
                    id: 11,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:54:31.011',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '金新总降35KV出线1-PCS9613D_信号复归',
                    action: '遥信变位 退出',
                },
                {
                    id: 12,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 18:11:06.946',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '金新总降35KV出线1-PCS9613D_信号复归',
                    action: 'SOE 退出',
                },
                {
                    id: 13,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:54:30.620',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '金新总降35KV出线1-PCS9613D_信号复归',
                    action: '遥信变位 投入',
                },
                {
                    id: 14,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 18:11:06.328',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '金新总降35KV出线1-PCS9613D_信号复归',
                    action: 'SOE 投入',
                },
                {
                    id: 15,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:41:26.141',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '1号主变本体测控-PCS9705A-H2 通信恢复',
                    action: '恢复',
                },
                {
                    id: 16,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:41:26.141',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '1号主变本体测控-PCS9705A-H2 网络B 通讯恢复',
                    action: '恢复',
                },
                {
                    id: 17,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:41:26.141',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '1号主变本体测控-PCS9705A-H2 网络A 通讯恢复',
                    action: '恢复',
                },
                {
                    id: 18,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:41:21.179',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '1号主变本体测控-PCS9705A-H2 通信故障',
                    action: '告警',
                },
                {
                    id: 19,
                    confirm: '否',
                    grade: '一般级',
                    time: '2022-09-19 15:41:21.179',
                    stand: '内蒙古呼和浩特35KVxxx矿变',
                    object: '1号主变本体测控-PCS9705A-H2 网络B 通讯故障',
                    action: '告警',
                },
            ],

            //出线
            appear: {
                P1: 0,
                P2: 0,
                Q1: 0,
                Q2: 0,
                I1: 0,
                I2: 0,
                Ua: 0,
                Ub: 0,
                Uc: 0,
                Uab: 0,
                Ubc: 0,
                Uca: 0,
            },
            // 母线
            generatrix: {
                Ua: 0,
                Ub: 0,
                Uc: 0,
                Uab: 0,
                Ubc: 0,
                Uca: 0,
                gyc1: 0,
                gyc2: 0,
                gyc3: 0,
                P1: 0,
                P2: 0,
                P3: 0,
                P4: 0,
                P5: 0,
                P6: 0,
                P7: 0,
                P8: 0,
                P9: 0,
                P10: 0,
                Q1: 0,
                Q2: 0,
                Q3: 0,
                Q4: 0,
                Q5: 0,
                Q6: 0,
                Q7: 0,
                Q8: 0,
                Q9: 0,
                Q10: 0,
                I1: 0,
                I2: 0,
                I3: 0,
                I4: 0,
                I5: 0,
                I6: 0,
                I7: 0,
                I8: 0,
                I9: 0,
                I10: 0,
            },

            // 用变
            yb: {
                Ua1: 0,
                Ua2: 0,
                Ub1: 0,
                Ub2: 0,
                Uc1: 0,
                Uc2: 0,
                Uab1: 0,
                Uab2: 0,
            },

        }
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
                var timeCurrent = new Date();
                var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f))  // 获取：零点的时间 + 每次递增的时间
                if (time <= timeCurrent) {
                    var hour = '', sec = '';
                    time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
                    time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
                    timeArr.push(hour + ':' + sec)
                }

            }
            return timeArr
        }

        function timeSlot2(date) {   //  step = 间隔的分钟
            var myDate = new Date();
            myDate.setDate(myDate.getDate() - 29);
            var dateTemp;
            var flag = 1;
            var day;
            var time = []
            for (var i = 0; i < 30; i++) {
                if (myDate.getDate() < 10) {
                    day = '0' + myDate.getDate().toString()
                } else {
                    day = myDate.getDate().toString()
                }
                // var time;
                var month = myDate.getMonth() + 1;
                dateTemp = myDate.getFullYear() + "-" + (month < 10 ? '0' + month : '' + month) + "-" + day;
                time.push(dateTemp);
                myDate.setDate(myDate.getDate() + flag);
            }
            return time;
        }


        function timeSlot3() {
            // 1、封装方法 
            var result = [];
            for (var i = 0; i < 13; i++) {
                var d = new Date();
                d.setDate(1);
                d.setMonth(d.getMonth() - i);
                var m = d.getMonth() + 1;
                m = m < 10 ? "0" + m : m; //在这里可以自定义输出的日期格式 
                result.push(d.getFullYear() + "-" + m); //result.push(d.getFullYear() + "年" + m + '月'); 
            }
            return result; // return 创建好的日期数组 
        }

        function getRandom(m, n) {
            return (Math.random() * (n - m) + m).toFixed(2)
        }

        let setTime = timeSlot(60)
        let setTime2 = timeSlot2()
        let setTime3 = timeSlot3().reverse()

        setTime.forEach((item, index) => {
            this.day.time.push(item)
            this.day.data.push(getRandom(220, 280))
        })

        let daySum = eval(this.day.data.join('+'))
        setTime2.forEach((item, index) => {
            this.month.time.push(item)
            if (index == setTime2.length - 1) {
                this.month.data.push(getRandom(daySum, daySum))
            } else {
                this.month.data.push(getRandom(daySum + 300, daySum + 1000))
            }

        })


        let monthSum = eval(this.month.data.join('+'))
        setTime3.forEach((item, index) => {
            this.year.time.push(item)
            if (index == setTime3.length - 1) {
                this.year.data.push(getRandom(monthSum, monthSum))
            } else {
                this.year.data.push(getRandom(monthSum + 10000, monthSum + 30000))
            }
        })


        this.$nextTick(() => {
            this.dayEchart = this.getEchartsInstance('dayId')
            this.drawDayEcharts();
            this.dayEchart = this.getEchartsInstance('monthId')
            this.drawMonthEcharts();
            this.dayEchart = this.getEchartsInstance('yearId')
            this.drawYearEcharts();


            function getData() {
                //出线
                t.appear = {
                    P1: getRandom(3.6, 3.7),
                    P2: getRandom(0, 0),
                    Q1: getRandom(2.8, 2.85),
                    Q2: getRandom(0, 0),
                    I1: getRandom(76.1, 76.9),
                    I2: getRandom(0, 0),
                    Ua: getRandom(20.3, 20.4),
                    Ub: getRandom(19.9, 20),
                    Uc: getRandom(20, 21),
                    Uab: getRandom(34.8, 34.9),
                    Ubc: getRandom(34.8, 34.9),
                    Uca: getRandom(34.8, 34.9),
                }
                // 母线
                t.generatrix = {
                    Ua: getRandom(3.6, 3.7),
                    Ub: getRandom(3.6, 3.7),
                    Uc: getRandom(3.6, 3.7),
                    Uab: getRandom(6.3, 6.4),
                    Ubc: getRandom(6.3, 6.4),
                    Uca: getRandom(6.3, 6.4),
                    gyc1: getRandom(3.67, 3.7),
                    gyc2: getRandom(2.8, 2.85),
                    gyc3: getRandom(76.5, 75.6),
                    P1: getRandom(0.00, 0.00),
                    P2: getRandom(0.00, 0.00),
                    P3: getRandom(0.5, 0.6),
                    P4: getRandom(2.85, 2.8),
                    P5: getRandom(0.00, 0.00),
                    P6: getRandom(2.4, 2.49),
                    P7: getRandom(0.00, 0.00),
                    P8: getRandom(0.00, 0.00),
                    P9: getRandom(0.12, 0.14),
                    P10: getRandom(0.10, 0.15),
                    Q1: getRandom(0.00, 0.00),
                    Q2: getRandom(0.00, 0.00),
                    Q3: getRandom(0.05, 0.08),
                    Q4: getRandom(2.06, 2.09),
                    Q5: getRandom(0.00, 0.00),
                    Q6: getRandom(1.8, 1.9),
                    Q7: getRandom(0.00, 0.00),
                    Q8: getRandom(0.00, 0.00),
                    Q9: getRandom(0.20, 0.23),
                    Q10: getRandom(0.31, 0.36),
                    I1: getRandom(0.50, 0.55),
                    I2: getRandom(0.00, 0.00),
                    I3: getRandom(53.00, 54.00),
                    I4: getRandom(318.00, 318.50),
                    I5: getRandom(0.00, 0.00),
                    I6: getRandom(414.7, 414.8),
                    I7: getRandom(1.40, 1.45),
                    I8: getRandom(0.00, 0.00),
                    I9: getRandom(32.00, 32.6),
                    I10: getRandom(33.10, 33.20),
                }

                // 用变
                t.yb = {
                    Ua1: getRandom(0.20, 0.29),
                    Ua2: getRandom(0.20, 0.29),
                    Ub1: getRandom(0.20, 0.29),
                    Ub2: getRandom(0.20, 0.29),
                    Uc1: getRandom(0.20, 0.29),
                    Uc2: getRandom(0.20, 0.29),
                    Uab1: getRandom(0.40, 0.40),
                    Uab2: getRandom(0.40, 0.40),
                }
            }

            getData();
            this.timer = setInterval(() => {
                getData();
            }, 1000)
        })





    },
    methods: {
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
        // 当日耗电曲线图
        drawDayEcharts() {
            let dataC1 = this.day.data

            this.dayNum = dataC1[dataC1.length - 1]

            let xData = this.day.time

            let option = {
                backgroundColor: 'transparent',
                grid: {
                    left: '1%',
                    right: '5%',
                    top: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(94, 228, 183, 0.3)',
                    borderColor: 'rgba(94, 228, 183, 0)',
                    padding: [0, 15, 0, 15],
                    borderRadius: 10,
                    formatter: function (params) {
                        //使用formatter函数修改需要的样式
                        let res = ''
                        res +=
                            `<div style="text-align: center; font-size: 14px; color: #5EE4B7; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].axisValue +
                            `</div>` +
                            `<div style="text-align: center; font-size: 14px; color: #D6D9E0; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].data +
                            ` 度</div>`
                        return res
                    }
                },
                xAxis: [
                    {
                        type: 'category',

                        boundaryGap: false,
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        type: 'value',
                        axisLabel: {
                            show: false,
                            formatter: '{value}'
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        stack: '总量',
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 12,
                        itemStyle: {
                            color: '#5EE4B7',
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        lineStyle: {
                            color: '#5EE4B7',
                            width: 4
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                1,
                                0,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(94, 228, 183, 0)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(94, 228, 183, 0.5)'
                                    }
                                ]
                            )
                        },
                        markPoint: {
                            data: [
                                {
                                    name: '耗电量',
                                    yAxis: dataC1[dataC1.length - 1], // y轴就是数据轴，那么标记数据的y轴坐标就是当前显示的数据，this.trenddata[1]是显示的所有数据，他是个数组，通过数组下标的形式获取最后一个数据即可
                                    x: '95%' // 标记数据的x轴的位置，由于是最后一个点，所以这个位置是固定的，用百分比表示该图标内最后一个点的位置即可
                                }
                            ],
                            symbol: 'circle', // 标记图形
                            symbolSize: 10, // 标记图形的大小
                            // 标注点的样式
                            itemStyle: {
                                color: '#5EE4B7' // 标注点颜色
                            }
                        },
                        data: dataC1
                    }
                ]
            }

            this.dayEchart.setOption(option)
            window.addEventListener('resize', this.dayEchart.resize)
        },

        // 本月耗电曲线图
        drawMonthEcharts() {
            let dataC1 = this.month.data

            this.monthNum = dataC1[dataC1.length - 1]

            let xData = this.month.time

            let option = {
                backgroundColor: 'transparent',
                grid: {
                    left: '1%',
                    right: '5%',
                    top: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(228, 167, 94, 0.3)',
                    borderColor: 'rgba(94, 228, 183, 0)',
                    padding: [0, 15, 0, 15],
                    borderRadius: 10,
                    formatter: function (params) {
                        //使用formatter函数修改需要的样式
                        let res = ''
                        res +=
                            `<div style="text-align: center; font-size: 14px; color: #E4A75E; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].axisValue +
                            `</div>` +
                            `<div style="text-align: center; font-size: 14px; color: #D6D9E0; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].data +
                            ` 度</div>`
                        return res
                    }
                },
                xAxis: [
                    {
                        type: 'category',

                        boundaryGap: false,
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        type: 'value',
                        axisLabel: {
                            show: false,
                            formatter: '{value}'
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        stack: '总量',
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 12,
                        itemStyle: {
                            color: '#E4A75E',
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        lineStyle: {
                            color: '#E4A75E',
                            width: 4
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                1,
                                0,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(228, 192, 94, 0)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(228, 189, 94, 0.5)'
                                    }
                                ]
                            )
                        },
                        markPoint: {
                            data: [
                                {
                                    name: '耗电量',
                                    yAxis: dataC1[dataC1.length - 1], // y轴就是数据轴，那么标记数据的y轴坐标就是当前显示的数据，this.trenddata[1]是显示的所有数据，他是个数组，通过数组下标的形式获取最后一个数据即可
                                    x: '95%' // 标记数据的x轴的位置，由于是最后一个点，所以这个位置是固定的，用百分比表示该图标内最后一个点的位置即可
                                }
                            ],
                            symbol: 'circle', // 标记图形
                            symbolSize: 10, // 标记图形的大小
                            // 标注点的样式
                            itemStyle: {
                                color: '#E4A75E' // 标注点颜色
                            }
                        },
                        data: dataC1
                    }
                ]
            }

            this.dayEchart.setOption(option)
            window.addEventListener('resize', this.dayEchart.resize)
        },
        // 本年耗电曲线图
        drawYearEcharts() {
            let dataC1 = this.year.data

            this.yearNum = dataC1[dataC1.length - 1]

            let xData = this.year.time

            let option = {
                backgroundColor: 'transparent',
                grid: {
                    left: '1%',
                    right: '5%',
                    top: '5%',
                    bottom: '0%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(94, 179, 228, 0.3)',
                    borderColor: 'rgba(94, 228, 183, 0)',
                    padding: [0, 15, 0, 15],
                    borderRadius: 10,
                    formatter: function (params) {
                        //使用formatter函数修改需要的样式
                        let res = ''
                        res +=
                            `<div style="text-align: center; font-size: 14px; color: #5EB3E4; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].axisValue +
                            `</div>` +
                            `<div style="text-align: center; font-size: 14px; color: #D6D9E0; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.7); font-family: 'STYuanti-SC-Regular'; line-height: 15px; ">` +
                            params[0].data +
                            ` 度</div>`
                        return res
                    }
                },
                xAxis: [
                    {
                        type: 'category',

                        boundaryGap: false,
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        type: 'value',
                        axisLabel: {
                            show: false,
                            formatter: '{value}'
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        stack: '总量',
                        symbol: 'circle',
                        showSymbol: false,
                        symbolSize: 12,
                        itemStyle: {
                            color: '#5EB3E4',
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        lineStyle: {
                            color: '#5EB3E4',
                            width: 4
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                1,
                                0,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(94, 189, 228, 0)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(94, 192, 228, 0.5)'
                                    }
                                ]
                            )
                        },
                        markPoint: {
                            data: [
                                {
                                    name: '耗电量',
                                    yAxis: dataC1[dataC1.length - 1], // y轴就是数据轴，那么标记数据的y轴坐标就是当前显示的数据，this.trenddata[1]是显示的所有数据，他是个数组，通过数组下标的形式获取最后一个数据即可
                                    x: '95%' // 标记数据的x轴的位置，由于是最后一个点，所以这个位置是固定的，用百分比表示该图标内最后一个点的位置即可
                                }
                            ],
                            symbol: 'circle', // 标记图形
                            symbolSize: 10, // 标记图形的大小
                            // 标注点的样式
                            itemStyle: {
                                color: '#5EB3E4' // 标注点颜色
                            }
                        },
                        data: dataC1
                    }
                ]
            }

            this.dayEchart.setOption(option)
            window.addEventListener('resize', this.dayEchart.resize)
        },
        // 详细点击弹窗
        detailRow(row) {
            this.dialogVisible = true;
            let t = this
            if (this.dialogVisible) {
                this.$nextTick(() => {
                    if (row) {
                        t.$refs.tTable.setCurrentRow(row, true);
                    } else {
                        t.$refs.tTable.setCurrentRow();  // 取消高亮
                    }
                })
            }

        },
    },
    unmounted() {
        if (this.dayEchart) {
            this.dayEchart.dispose()
            this.dayEchart = null
        }

        if (this.monthEchart) {
            this.monthEchart.dispose()
            this.monthEchart = null
        }

        if (this.yearEchart) {
            this.yearEchart.dispose()
            this.yearEchart = null
        }
    },

}
</script>

<style lang="scss" scoped>
.elecContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba($color: #000000, $alpha: 0.7);

    .bgBox {
        width: 355px;
        position: relative;

        .title {
            width: 100%;
            height: 40px;
            line-height: 35px;
            padding-left: 30px;
            background-image: url(../assets/images/titlebj.webp);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            color: #fff;
            font-weight: bold;
            text-shadow: 0px 2px 2px rgba(5, 25, 32, 0.93);
        }

        .message {
            position: absolute;
            left: 0;
            top: 52px;

            .messageTitle {
                font-size: 16px;
                color: #D6D9E0;
                font-weight: bold;
            }

            .messageNum {
                font-size: 14px;
                color: #D6D9E0;
                font-weight: bold;

                span {
                    font-size: 26px;
                }
            }
        }

        .chart-self {
            width: 100%;
            height: 100%;
        }
    }

    .day .messageNum span {
        color: #5EE4B7;
    }

    .month .messageNum span {
        color: #E4C05E;
    }

    .year .messageNum span {
        color: #5EBDE4;
    }





    .left,
    .right {
        width: 359px;
        position: absolute;
        top: 111px;
        z-index: 100;
        margin: 0;
        padding: 0;
        height: 100vh;
        font-family: "STYuanti-SC-Regular";
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

        .leftBox,
        .rightBox {
            width: calc(355px + 4px);
            height: 90%;
            min-height: 850px;
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
            padding-bottom: 100px;
        }

    }

    .left:hover,
    .right:hover {
        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: rgba(148, 148, 148, 0.5);
        }
    }

    .left {
        left: 40px;

        .box {
            width: 100%;
            height: 150px;
            margin-top: 60px;
        }
    }

    .right {
        right: 40px;

        .box {
            width: 100%;
            height: 90vh;
        }
    }


    .center {
        width: 887px;
        height: 610px;
        background-image: url(../assets/images/electric.webp);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 280px;
        left: 60px;
        right: 0;
        margin: auto;
        color: #fff;
        font-weight: bold;
        font-size: 13px;

        .appear {
            width: 485px;
            height: 90px;
            position: absolute;
            left: 36.5%;
            top: -90px;
            margin: auto;

            .centerTitle1 {
                left: 16%;
                bottom: 0;
                position: absolute;
            }

            .centerTitle2 {
                left: 46%;
                bottom: 0;
                position: absolute;
            }
        }

        .generatrix35Top {
            width: 100%;
            height: 160px;
            position: absolute;
            top: 0px;

            .generatrix35Top1 {
                width: 120px;
                height: 130px;
                position: absolute;
                bottom: 0;
                left: 200px;
            }

            .generatrix35Top2 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 455px;
            }

            .generatrix35Top3 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 625px;
            }

            .generatrix35Top4 {
                width: fit-content;
                position: absolute;
                top: 100px;
                left: 645px;
            }
        }

        .generatrix35Bottom {
            width: 100%;
            height: 220px;
            position: absolute;
            top: 150px;

            .generatrix35BottomTitle {
                position: absolute;
                top: -12px;
                left: 110px;
            }

            .generatrix35Bottom1 {
                width: 120px;
                height: 110px;
                position: absolute;
                bottom: 0;
                left: 100px;
            }

            .generatrix35Bottom2 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 300px;
            }

            .generatrix35Bottom3 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 480px;
            }

            .generatrix35Bottom4 {
                width: fit-content;
                position: absolute;
                top: 100px;
                left: 570px;
            }

            .generatrix35Bottom5 {
                width: 89px;
                position: absolute;
                top: 5px;
                left: 590px;

                .el-row {
                    width: 100%;
                }
            }

            .centerTitle4 {
                position: absolute;
                bottom: 10px;
                left: 310px;
            }
        }


        .generatrix6Bottom {
            width: 100%;
            height: 350px;
            position: absolute;
            top: 378px;

            .generatrix6BottomTitle {
                position: absolute;
                top: -12px;
                left: -70px;
            }

            .generatrix6Bottom2Background {
                width: 90%;
                height: 65px;
                position: absolute;
                bottom: 0px;
                left: 50px;
                z-index: 1;

            }

            .el-row {
                .el-col {
                    .el-row {
                        .el-col:nth-child(1) {
                            margin-bottom: 20px;
                        }
                    }
                }
            }

            .generatrix6Bottom1 {
                width: 240px;
                height: 130px;
                position: absolute;
                top: 160px;
                left: -100px;
                transform: scale(0.8);

                .centerTitle5 {
                    position: absolute;
                    top: -25px;
                    left: 20px;
                    font-size: 12px;
                    font-size: 12px;
                    transform: scale(0.8);
                }

                .centerTitle6 {
                    position: absolute;
                    top: -25px;
                    left: 100px;
                    font-size: 12px;
                    font-size: 12px;
                    transform: scale(0.9);
                }

            }

            .generatrix6Bottom2 {
                width: 100%;
                height: 100px;
                position: absolute;
                bottom: 0px;
                left: 0px;
                z-index: 2;
            }

            .generatrix6Bottom3 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 90px;
            }

            .generatrix6Bottom4 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 90px;
            }

            .generatrix6Bottom5 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 172px;
            }

            .generatrix6Bottom6 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 172px;
            }

            .generatrix6Bottom7 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 255px;
            }

            .generatrix6Bottom8 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 255px;
            }

            .generatrix6Bottom9 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 335px;
            }

            .generatrix6Bottom10 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 335px;
            }


            .generatrix6Bottom11 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 370px;
            }

            .generatrix6Bottom12 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 497px;
            }

            .generatrix6Bottom13 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 580px;
            }

            .generatrix6Bottom14 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 580px;
            }

            .generatrix6Bottom15 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 665px;
            }

            .generatrix6Bottom16 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 665px;
            }

            .generatrix6Bottom17 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 745px;
            }

            .generatrix6Bottom18 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 745px;
            }

            .generatrix6Bottom19 {
                width: fit-content;
                position: absolute;
                top: 45px;
                left: 825px;
            }

            .generatrix6Bottom20 {
                width: fit-content;
                position: absolute;
                top: 132px;
                left: 825px;
            }
        }


        .el-row {
            text-align: center;

            .el-col {
                text-align: center;
            }
        }

        .centerTitle {
            width: fit-content;
            height: 22px;
            line-height: 22px;
            font-size: 12px;
            text-shadow: 0px 1px 1px rgba(5, 25, 32, 0.93);
            background: linear-gradient(to right, rgba(0, 255, 120, 0.1) 20%, rgba(0, 217, 133, 0.5) 50%, rgba(0, 255, 120, 0.1) 80%);
            border: 1px solid #ddd;
            border-image: linear-gradient(to right, rgba(69, 219, 150, 0.1) 20%, rgba(255, 255, 255, 0.4) 50%, rgba(69, 219, 150, 0.1) 80%) 50 0;
            font-weight: bold;
        }

    }


    .tableScroll {
        ::v-deep .tableWrap {
            overflow: hidden;
            height: 100%;
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
            color: #00F4F8 !important;

        }

        ::v-deep .tableTop .cell,
        ::v-deep .tableBottom .cell {
            padding: 0;
        }

        ::v-deep .tableBottom {
            height: 100vh;
        }

        ::v-deep .tableBottom .el-table__header-wrapper {
            display: none;
            width: 100%;
        }

        ::v-deep .tableBottom tbody tr {
            background: none;
        }

        ::v-deep .tableBottom tbody tr:hover td {
            background: rgba(255, 255, 255, 0.2) !important;
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



}
</style>


<style lang="scss">
.el-table-warn {
    width: 1492px !important;
    background-image: url(../assets/images/dialog.webp) !important;
    background-repeat: no-repeat !important;
    background-size: 100% 100% !important;

    .el-dialog__header {
        background: none !important;
        text-align: center;
        padding-top: 15px;
        text-shadow: 0px 2px 2px rgba(5, 25, 32, 0.93);
    }

    .el-dialog__body {
        background: none !important;
    }

    .el-table::before {
        height: 0;
    }

    .el-table th.el-table__cell.is-leaf {
        border: none !important;
    }

    .el-table__body-wrapper {
        &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 4px;
            background-color: rgba(14, 39, 77, 0);
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: rgba(148, 148, 148, 0.8);
        }

        tr {
            th {
                border: none !important;
            }
        }

        tr {
            background: none;

            td {
                background: none;
                border: none !important;
                color: #fff !important;
            }

        }
    }

    .el-dialog__close {
        width: 22px;
        height: 22px;
        background-image: url(../assets/images/close.webp);
        background-repeat: no-repeat;
        background-size: 100% 100%;

        svg {
            display: none !important;
        }
    }



    .el-table__body tr.current-row>td {
        background: rgba(255, 217, 45, 0.5) !important;
    }

}
</style>
  
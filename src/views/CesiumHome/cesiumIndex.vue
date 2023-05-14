<template>
  <!-- <Menu @changeMenu="changeMenu"></Menu> -->
  <!-- <div v-loading.fullscreen.lock="fullscreenLoading"> -->
  <!-- 整体底衬 -->

  <div id="cesiumContainer"></div>
  <div class="allback"></div>
  <div class="leftPannel">
    <!-- 总体情况部分 -->
    <div class="Overview" v-show="allFlags.ztqkFlag">
      <DiaContainer :diaTitle="'产量分析'" :diaHeiht="'270px'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in clfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="25">
                <Histogram />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">{{ item.name }}</div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <!-- <DiaContainer :diaTitle="'月产量完成率'" :diaHeiht="'220px'">
        <div class="yclchartBody">
          <div id="yclechartSolt"></div>
        </div>
      </DiaContainer> -->

      <DiaContainer :diaTitle="'安全专题'" :diaHeiht="'400px'">
        <div class="safeTitle">人员</div>
        <div class="safeBody">
          <div class="circle">

            <div class="circleIn">
              <div>总人数</div>
              <div>188</div>
            </div>
          </div>
          <div class="circle">
            <div class="circleIn">
              <div>坑下人数</div>
              <div>88</div>
            </div>
          </div>
          <div class="circle">
            <div class="circleIn">
              <div>坑下占比</div>
              <div>47%</div>
            </div>
          </div>
        </div>
        <div class="safeTitle">边坡</div>
        <div class="safeBody">
          <div class="circle">
            <div class="circleIn">
              <div>边坡测点</div>
              <div>20个</div>
            </div>
          </div>
          <div class="circle">

            <el-popover placement="right" :width="720" trigger="hover">
              <template #reference>
                <div class="circleIn">
                  <div>异常测点</div>
                  <div> <span style="color:red">2</span> 个</div>
                </div>
              </template>
              <el-table :data="gridData" header-row-class-name="tableHeader" header-cell-class-name="headerCell"
                row-class-name="tableRow" cell-class-name="tableCell">
                <el-table-column width="80" property="ponit" label="检测点" />
                <el-table-column width="180" property="time" label="报警时间" />
                <el-table-column width="80" property="level" label="报警等级" />
                <el-table-column width="300" property="message" label="报警等报警内容" />
                <el-table-column align="center" label="操作">
                  <template #default="scope">
                    <el-icon :size="20" color="burlywood" @click="flyScope(scope.row)">
                      <Location />
                    </el-icon>
                  </template>
                </el-table-column>
              </el-table>

            </el-popover>

          </div>
          <div class="circle">
            <div class="circleIn">
              <div>异常占比</div>
              <div>5%</div>
            </div>
          </div>
        </div>
        <div class="safeTitle">水质</div>
        <div class="safeBody">
          <div class="circle">
            <div class="circleIn">
              <div>COD</div>
              <div>1.00mg/L</div>
            </div>
          </div>
          <div class="circle">
            <div class="circleIn">
              <div>NH3-N</div>
              <div>1.00mg/L</div>
            </div>
          </div>
          <div class="circle">
            <div class="circleIn">
              <div>异常消息</div>
              <div>0个</div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'剥离分析'" :diaHeiht="'220px'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in blfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="20">
                <Opportunity />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">{{ item.name }}</div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
            </div>
          </div>
        </div>
      </DiaContainer>
    </div>

    <!-- 人员管理 -->
    <div class="ryglPanel" v-if="allFlags.ryglFlag">
      <DiaContainer :diaTitle="'人员状态列表'" :diaHeiht="'600px'">
        <div class="lineData">
          <div class="lineLeft">当前人员数量</div>
          <div class="lineRight">188人</div>
        </div>

        <div class="searchRow">
          <el-input width="200px" v-model="peopleId" placeholder="请输入姓名" :prefix-icon="Search" />
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </div>

        <div class="peopleTable">
          <div class="tabRow" v-for="item in peopleList" :key="item.id">
            <div class="tabTd1">
              <div class="photo"><img class="personImg" :src="item.photo" alt=""></div>
              <div class="personMess">
                <div>{{ item.name }}</div>
                <div>{{ item.dept }}</div>
              </div>
              <div class="personJob">
                <div>{{ item.job }}</div>
              </div>
            </div>
            <div class="tabTd2" @click="flyCameraTo('people', item)">
              <el-icon :size="20" color="burlywood">
                <Location />
              </el-icon>
              <div>在线</div>
            </div>
          </div>
        </div>
      </DiaContainer>
    </div>


    <!-- 视频监控 -->
    <div class="spjkPanel" v-if="allFlags.spjkFlag">
      <DiaContainer :diaTitle="'实时视频'" :diaHeiht="'450px'">
        <div class="videoTable">
          <div class="tabRow" v-for="item in videoList" :key="item.id">
            <div class="tabTd1">
              <el-icon :size="20">
                <VideoCamera />
              </el-icon>
              <span>{{ item.name }}</span>
            </div>
            <div class="tabTd2" @click="flyCameraTo('video', item)">
              <el-icon :size="20" color="burlywood">
                <Location />
              </el-icon>
              <div>在线</div>
            </div>
          </div>
        </div>
      </DiaContainer>
    </div>

    <!-- 边坡 -->
    <div class="bpPanel" v-if="allFlags.bpFlag">
      <DiaContainer :diaTitle="'边坡'" :diaHeiht="'400px'">
        <div class="videoTable">
          <div class="tabRow" v-for="item in rampList" :key="item.id">
            <div class="tabTd1">
              <span>{{ item.name }}</span>
            </div>
            <div class="tabTd2" @click="flyCameraTo('ramp', item)">
              <el-icon :size="20" color="burlywood">
                <Location />
              </el-icon>
              <div>定位</div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'位移趋势分析'" :diaHeiht="'300px'">
        <div class="bpchartBody">
          <div id="bpchartSolt"></div>
        </div>
      </DiaContainer>
    </div>


    <!-- 车辆管理 -->
    <div class="clglPanel" v-if="allFlags.clglFlag">
      <DiaContainer :diaTitle="'车辆信息'" :diaHeiht="'600px'">
        <!-- <el-button type="primary" size="default" @click="stopAnima">停止</el-button> -->

        <div class="carTable">
          <div class="tabRow" v-for="item in carList" :key="item.id">
            <div class="tabTd1">
              <span>{{ item.name }}</span>
            </div>
            <div class="tabTd2" @click="flyCameraTo('car', item)">
              <el-icon :size="20" color="burlywood">
                <Location />
              </el-icon>
              <div>定位</div>
            </div>
          </div>
        </div>
      </DiaContainer>
    </div>


    <!-- 生产情况 -->
    <div class="clglPanel" v-if="allFlags.scqkFlag">

      <DiaContainer :diaTitle="'采煤统计'">
        <div class="cylinderGroup">
          <div>
            <div class="cylinder">
              <div class="water"></div>
            </div>
            <div>昨日采煤情况</div>
          </div>
          <div>
            <div class="cylinder">
              <div class="water"></div>
            </div>
            <div>今日采煤计划</div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'产量分析'" :diaHeiht="'270px'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in clfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="25">
                <Histogram />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">{{ item.name }}</div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'月产量完成率'" :diaHeiht="'220px'">
        <div class="yclchartBody">
          <div id="yclechartSolt1"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'日产量完成率'" :diaHeiht="'220px'">
        <div class="rclchartBody">
          <div id="rclechartSolt1"></div>
        </div>
      </DiaContainer>
    </div>


    <!-- 经营管理 -->
    <div class="jyglPanel" v-if="allFlags.jyglFlag">
      <DiaContainer :diaTitle="'实际总览'" :diaHeiht="'180px'">
        <div class="statusRow">
          <div class="statusItem">
            <div>260(万吨)</div>
            <div class="statusItemLabel">实际原煤总量</div>
          </div>
          <div class="statusItem">
            <div>994(万m³)</div>
            <div class="statusItemLabel">实际剥离总量</div>
          </div>
          <div class="statusItem">
            <div>135(万吨)</div>
            <div class="statusItemLabel">实际总销量</div>
          </div>
        </div>
      </DiaContainer>
      <DiaContainer :diaTitle="'实际原煤产量趋势'" :diaHeiht="'350px'">
        <div class="ymclqs">
          <div class="btnGroup">
            <el-button type="primary" size="small" @click="x">本月</el-button>
            <el-button type="primary" size="small" @click="x">本年</el-button>
          </div>
        </div>
        <div class="ymclqschartBody">
          <div id="ymclqschartSolt"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'本年度用水趋势'" :diaHeiht="'250px'">
        <div class="ysqschartBody">
          <div id="ysqschartSolt"></div>
        </div>
      </DiaContainer>
    </div>
  </div>


  <!-- 右侧 -->
  <div class="rightPannel">
    <div class="Overview" v-show="allFlags.ztqkFlag">
      <DiaContainer :diaTitle="'销量分析'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in xlfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="20">
                <WalletFilled />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">{{ item.name }}</div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'生产概况'" :diaHeiht="'440px'">
        <div class="blfx">
          <div class="blfxItem">
            <div class="preImg">
              <el-icon :size="20">
                <UserFilled />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">总人数</div>
              <div class="blfxItemValue">188 <span class="unit">人</span></div>
            </div>
          </div>
          <div class="blfxItem">
            <div class="preImg">
              <el-icon :size="20">
                <Management />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">矿车设备数量</div>
              <div class="blfxItemValue">94 <span class="unit">辆</span></div>
            </div>
          </div>
        </div>
        <div class="titleLine">
          车辆分析统计
        </div>
        <div class="cltjchartBody">
          <div id="cltjechartSolt"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'设备状态'" :diaHeiht="'270px'">
        <div class="lineData">
          <div class="lineLeft">筒仓料位</div>
          <div class="lineRight"><span class="detail" @click="showDialog()">详细信息></span></div>
        </div>
        <div class="lineData lineState">
          <div class="lineLeft"><span class="status">运行状态:</span><span class="statusErr">未运行</span></div>
          <div class="lineRight"><span class="status">告警状态:</span><span class="statusErr">异常</span></div>
        </div>
        <div class="lineData">
          <div class="lineLeft">破碎机</div>
          <div class="lineRight"><span class="detail" @click="showDialog()">详细信息></span></div>
        </div>
        <div class="lineData lineState">
          <div class="lineLeft"><span class="status">运行状态:</span><span class="statusErr">未运行</span></div>
          <div class="lineRight"></div>
        </div>
        <div class="lineData ">
          <div class="lineLeft">胶带机</div>
          <div class="lineRight"><span class="detail" @click="showDialog()">详细信息></span></div>
        </div>
        <div class="lineData lineState">
          <div class="lineLeft"><span class="status">运行状态:</span><span class="statusErr">未运行</span></div>
          <div class="lineRight"></div>
        </div>
      </DiaContainer>
    </div>

    <div class="ryglPanel" v-if="allFlags.ryglFlag">
      <DiaContainer :diaTitle="'下坑人员统计分析'" :diaHeiht="'400px'">
        <div class="lineData">
          <div class="lineLeft">人员总数</div>
          <div class="lineRight">188人</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">当前下坑人员</div>
          <div class="lineRight">37人</div>
        </div>
        <div class="circle">
          <div class="circleIn">19.7%</div>
        </div>
        <div class="textLine">
          坑下人员占比
        </div>
      </DiaContainer>
    </div>

    <!-- 边坡 -->
    <div class="bpPanel" v-if="allFlags.bpFlag">

      <DiaContainer :diaTitle="'设备状态统计'" :diaHeiht="'180px'">
        <div class="statusRow">
          <div class="statusItem">
            <div>3527</div>
            <div>正常</div>
          </div>
          <div class="statusItem">
            <div>0</div>
            <div>异常</div>
          </div>
          <div class="statusItem">
            <div>0</div>
            <div>报警</div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'站点状态统计'" :diaHeiht="'180px'">
        <div class="statusRow">
          <div class="statusItem">
            <div>3527</div>
            <div>正常</div>
          </div>
          <div class="statusItem">
            <div>0</div>
            <div>异常</div>
          </div>
          <div class="statusItem">
            <div>0</div>
            <div>报警</div>
          </div>
        </div>
      </DiaContainer>


      <DiaContainer :diaTitle="'报警统计'" :diaHeiht="'400px'">
        <div class="lineData">
          <div class="lineLeft">今日报警</div>
          <div class="lineRight">0次</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">报警累计</div>
          <div class="lineRight">0次</div>
        </div>

        <div class="bjtjchartBody">
          <div id="bjtjchartSolt"></div>
        </div>
      </DiaContainer>
    </div>


    <!-- 车辆管理 -->
    <div class="bpPanel" v-show="allFlags.clglFlag">

      <DiaContainer :diaTitle="'有人车状态分析'" :diaHeiht="'190px'">
        <div class="statusRow">
          <div class="statusItem">
            <div>94</div>
            <div>车辆总数</div>
          </div>
          <div class="statusItem">
            <div>51</div>
            <div>在线车辆</div>
          </div>
          <div class="statusItem">
            <div>43</div>
            <div>离线总数</div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'车辆分类统计分析'" :diaHeiht="'280px'">
        <div class="clfxtjchartBody">
          <div id="clfxtjchartSolt"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'车辆行为统计'" :diaHeiht="'280px'">
        <div class="clxwtjchartBody">
          <div id="clxwtjchartSolt"></div>
        </div>
      </DiaContainer>

    </div>

    <!-- 生产情况 -->
    <div class="clglPanel" v-if="allFlags.scqkFlag">

      <DiaContainer :diaTitle="'剥离统计'">
        <div class="cylinderGroup">
          <div>
            <div class="cylinder">
              <div class="water"></div>
            </div>
            <div>上月剥离情况</div>
          </div>
          <div>
            <div class="cylinder">
              <div class="water"></div>
            </div>
            <div>当月剥离计划</div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'剥离分析'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in blfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="20">
                <Histogram />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemName">{{ item.name }}</div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
            </div>
          </div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'本年度剥离情况计划对比'" :diaHeiht="'240px'">
        <div class="yclchartBody">
          <div id="ndblchartSolt"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'本月剥离情况计划对比'" :diaHeiht="'240px'">
        <div class="rclchartBody">
          <div id="ydblchartSolt"></div>
        </div>
      </DiaContainer>
    </div>

    <!-- 经营管理 -->
    <div class="jyglPanel" v-if="allFlags.jyglFlag">
      <DiaContainer :diaTitle="'销量分析'">
        <div class="blfx">
          <div class="blfxItem" v-for="item in xlfxList" :key="item.id">
            <div class="preImg">
              <el-icon :size="20">
                <PieChart />
              </el-icon>
            </div>
            <div>
              <div class="blfxItemValue">{{ item.value }} <span class="unit">(万吨)</span></div>
              <div class="blfxItemName">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </DiaContainer>
      <DiaContainer :diaTitle="'本年度实际销量计划对比'" :diaHeiht="'270px'">
        <div class="sjxlchartBody">
          <div id="sjxlchartSolt"></div>
        </div>
      </DiaContainer>

      <DiaContainer :diaTitle="'月销量完成率'" :diaHeiht="'270px'">
        <div class="yxlchartBody">
          <div id="yxlchartSolt"></div>
        </div>
      </DiaContainer>
    </div>
  </div>

  <div class="bottomMenu" v-if="btnMenuFlag === 'default'">
    <div class="bottomMenuItem" v-for="item in bottomList" :key="item.id" @click="showOrHideModel(item)">
      <div class="MenuImage"><img :src="item.img"></div>
      <div class="MenuText">{{ item.name }}</div>
    </div>
  </div>
  <div class="bottomMenu" v-else-if="btnMenuFlag === 'animate'">
    <el-button type="primary" size="default" @click="setAnimeOption('play')">播放</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption('stop')">暂停</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption(1)">1x</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption(5)">5x</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption(10)">10x</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption('track')">跟随</el-button>
    <el-button type="primary" size="default" @click="setAnimeOption('close')">关闭</el-button>
  </div>


  <div id="fly_Pop" v-show="flyPopFlag">
    <DiaContainer :diaTitle="'人员详情'" :diaHeiht="'310px'" v-if="flyPopFlag === 'people'">
      <div class="lineData">
        <div class="lineLeft">姓名</div>
        <div class="lineRight">{{ popPickRow.name }}</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">职位</div>
        <div class="lineRight">{{ popPickRow.job }}</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">经度</div>
        <div class="lineRight">112.32</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">维度</div>
        <div class="lineRight">39.1236</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">高度</div>
        <div class="lineRight">1500</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">工作部门</div>
        <div class="lineRight">{{ popPickRow.dept }}</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">定位时间</div>
        <div class="lineRight">{{ popPickRow.posiTime }}</div>
      </div>
      <div class="lineData">
        <div class="lineLeft">呼叫</div>
        <div class="lineRight">
          <el-icon class="phoneIcon" @click="call()">
            <Phone />
          </el-icon>
        </div>
      </div>
    </DiaContainer>

    <DiaContainer :diaTitle="'实时视频'" :diaHeiht="'250px'" v-if="flyPopFlag === 'video'">
      <div class="videoDetail">
        <video :src="popPickRow.videoSrc" controls autoplay loop></video>
      </div>
    </DiaContainer>

    <DiaContainer :diaTitle="'边坡详情'" :diaHeiht="'300px'" v-if="flyPopFlag === 'ramp'">
      <div class="rampDetail">
        <div class="lineData">
          <div class="lineLeft">初始X</div>
          <div class="lineRight">{{ popPickRow.initX }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">偏移X</div>
          <div class="lineRight">{{ popPickRow.nowX }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">初始Y</div>
          <div class="lineRight">{{ popPickRow.initY }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">偏移Y</div>
          <div class="lineRight">{{ popPickRow.nowY }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">初始H</div>
          <div class="lineRight">{{ popPickRow.initH }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">偏移H</div>
          <div class="lineRight">{{ popPickRow.nowH }}</div>
        </div>
        <div class="lineData">
          <div class="lineLeft">偏移率</div>
          <div class="lineRight">{{ popPickRow.movePercent }}%</div>
        </div>
      </div>
    </DiaContainer>


    <div class="carPop" v-if="flyPopFlag === 'car'">
      <div class="round"></div>
      <div class="cartop">
        <div>2022-11-06 12:34:45</div>
      </div>
      <div class="carbottom">
        <div class="carbottomLeft">
          <div class='weight'>650</div>
          <div class='unit'>吨数</div>
          <div class='quantity'>13</div>
          <div class='frequency'>车辆次数</div>
          <div class="carbottomLeftBottom">
            <div>
              <div>9.21</div>
              <div>时长(h)</div>
            </div>
            <div>
              <div>156600</div>
              <div>累计路程</div>
            </div>
          </div>
        </div>
        <div class="carbottomMiddle">
          <div class="carbottomMiddleT">
            <div class="carbottomMiddleTBL"></div>
            <div class="carbottomMiddleTBR">
              <div class="TBRlist">装载点:----</div>
              <div class="TBRlist">物料:----</div>
              <div class="TBRlist">车辆状态:在线</div>
              <div class="TBRlist">俯仰:0%</div>
              <div class="TBRlist">横滚:0%</div>
              <div class="TBRlist">方位:332.0</div>
              <div class="TBRlist">高程:516m</div>
            </div>
          </div>
          <div class="carbottomMiddleBottom">
            <div class="caricons" title="轨迹回放">
              <el-icon @click="start">
                <Van />
              </el-icon>
            </div>
            <div class="caricons">
              <el-icon>
                <HelpFilled />
              </el-icon>
            </div>
            <div class="caricons">
              <el-icon>
                <ChatLineRound />
              </el-icon>
            </div>
            <div class="caricons">
              <el-icon>
                <Microphone />
              </el-icon>
            </div>
          </div>
        </div>
        <div class="carbottomRight">
          <div class="carbottomRightT">
            <div class="carbottomRightTl">
              <div class="textDom">
                <div>120</div>
                <div style="margin-top:8px">km/h</div>
              </div>
              <!-- <div id="RightTlSolt"></div> -->
            </div>
            <div class="carbottomRightTR">
              <div class="textDom">
                <div style="margin-left:4px">60</div>
                <div style="margin-top:8px">km/h</div>
              </div>
              <!-- <div id="RightTRSolt"></div> -->
            </div>
          </div>
          <div class="carbottomRightB">
            <div class="carbottomRightBL">
              <img src="/images/zhengjian1.webp" alt="">
            </div>
            <div class="carbottomRightBR">
              <div class="line">
                <span>李军</span>
                <div>安全驾驶</div>
              </div>
              <div class="line">
                <span>白班</span>
                <div>指挥调度</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="tileModelTool" v-if="tileModelToolVisiable">
      <p>比例：</p>
      <el-input-number v-model="tileModelTool.scale" label="描述文字" @change="update3dtilesMaxtrix()" :step="0.1">
      </el-input-number>
      <p>经度：</p>
      <el-input-number v-model="tileModelTool.longitude" label="描述文字" @change="update3dtilesMaxtrix()" :step="0.00001">
      </el-input-number>
      <p>纬度：</p>
      <el-input-number v-model="tileModelTool.latitude" label="描述文字" @change="update3dtilesMaxtrix()" :step="0.00001">
      </el-input-number>
      <p>高度：</p>
      <el-slider v-model="tileModelTool.height" @input="update3dtilesMaxtrix" :min="-1000" :max="1000"></el-slider>
      <p>以x轴旋转</p>
      <el-slider v-model="tileModelTool.rx" @input="update3dtilesMaxtrix" :min="-100" :max="100"></el-slider>
      <p>以y轴旋转</p>
      <el-slider v-model="tileModelTool.ry" @input="update3dtilesMaxtrix" :min="-100" :max="100"></el-slider>
      <p>以z轴旋转</p>
      <el-slider v-model="tileModelTool.rz" @input="update3dtilesMaxtrix" :min="-100" :max="100"></el-slider>
      <p>透明度</p>
      <el-slider v-model="tileModelTool.alpha" @input="update3dtilesMaxtrix" :min="0" :max="1" :step="0.1"></el-slider
      <el-button @click="zoomTo()">
        聚焦
      </el-button>
      <el-button @click="cameraPosi()">
        获取相机位置
      </el-button>
      <el-button @click="addModel('/model/GroundVehicle.glb', 0)">
        添加模型
      </el-button>
      <el-button @click="start()">
        开始运行
      </el-button>

    </div>

 <el-button @click="cameraPosi()" style="position:absolute;top:0px;left:0px">
    获取相机位置
  </el-button> -->
  <!-- </div> -->

  <!-- 35kv -->
  <div v-if="allFlags.swkvFlag">
    <Electric></Electric>
  </div>

  <!-- 厂区漫游 -->
  <div v-if="allFlags.cqmyFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/cqmy.mp4" controls autoplay loop></video>
  </div>
  <!-- 三级下钻 -->
  <div v-if="allFlags.sjxzFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/sjxz.mp4" controls autoplay loop></video>
  </div>
  <!-- 人员一条线 -->
  <div v-if="allFlags.ryytxFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/ryytx.mp4" controls autoplay loop></video>
  </div>
  <!-- 水泵房漫游 -->
  <div v-if="allFlags.sbfmyFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/sbfmy.mp4" controls autoplay loop></video>
  </div>
  <!-- 皮带运输管控 -->
  <div v-if="allFlags.pdysgkFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/pdysgk.mp4" controls autoplay loop></video>
  </div>
  <!-- 皮带运输漫游 -->
  <div v-if="allFlags.pdysmyFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/pdysmy.mp4" controls autoplay loop></video>
  </div>
  <!-- 供电漫游巡检 -->
  <div v-if="allFlags.gdmyxjFlag">
    <video class="allScreenVideo" src="http://192.168.1.224/test/video/gdmyxj.mp4" controls autoplay loop></video>
  </div>
  <!-- 成本管控 -->
  <div v-if="allFlags.cbgkFlag">
    <img class="allScreenImg" src="../../assets/images/cbgk.png" />
    <!-- <video class="allScreenVideo" src="http://192.168.1.224/test/video/video.mp4" controls autoplay loop></video> -->
  </div>
  <el-dialog v-model="dialogTableVisible" title="设备状态">
    <el-table :data="gridData1">
      <el-table-column width="100" property="ponit" label="报警点" />
      <el-table-column width="200" property="time" label="报警时间" />
      <el-table-column width="100" property="level" label="报警等级" />
      <el-table-column width="840" property="message" label="报警等报警内容" />
    </el-table>
  </el-dialog>
</template>
<script>
import * as echarts from 'echarts'
import { useMenuStore } from '@/store/useMenuStore'
import { ElMessage } from 'element-plus'
import DiaContainer from '@/components/DiaContainer.vue'
import Electric from '@/components/Electric.vue'
import { Search } from '@element-plus/icons-vue'



var Cesium = window.Cesium
var widgets = window.widgets
//=============原生部分=================//
let _vue;
let viewer;
let tileset;
let pop;//弹窗
//播动画的
let animeEntity
let positionProperty
let objectsToExclude
//播动画的

//监听器 
let clockListen
let renderListen
let carEntitys = [], peopleEntitys = [], videoEntitys = [], rampEntitys = [];
let scene
let clock

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

//设置viewer
function setViewerSetting() {
  console.log('setViewerSetting');
  viewer = new Cesium.Viewer("cesiumContainer", {
    // geocoder: false,//地理位置查询定位控件，默认使用bing地图服务
    homeButton: false,//默认相机位置
    sceneModePicker: false, //是否显示投影方式控件//3D、2D和哥伦布模式的切换按钮
    baseLayerPicker: false,  //是否显示图层选择控件//选择地形、影像等图层
    navigationHelpButton: false, //是否显示帮助信息控件//显示默认的相机控制提示
    geocoder: false, //是否显示地名查找控件
    animation: false, //是否显示动画控件//控制场景动画的播放速度.
    // timeline: false, //是否显示时间线控件
    fullscreenButton: false,//是否全屏显示
    vrButton: false,
    shadows: false, //影子
    infoBox: false, //是否显示点击要素之后显示的信息
  });
  scene = viewer.scene
  clock = viewer.clock
  scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
  scene.moon.show = false;
  scene.skyBox.show = false;//关闭天空盒，否则会显示天空颜色
  scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
  scene.skyBox = new Cesium.SkyBox({
    sources: {
      positiveX: '/skyBox/dark-s-px.webp',
      negativeX: '/skyBox/dark-s-nx.webp',
      positiveY: '/skyBox/dark-s-ny.webp',
      negativeY: '/skyBox/dark-s-py.webp',
      positiveZ: '/skyBox/dark-s-pz.webp',
      negativeZ: '/skyBox/dark-s-nz.webp'
    }
  });
  // Cesium开启地形检测，防止entity随着场景转动产生漂移的情形
  // viewer.scene.globe.depthTestAgainstTerrain = true;

  //设置相机 
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 20;//相机的高度的最小值
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;  //禁止相机进入地下
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 15000;  //相机高度的最大值
  // viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; // 设置相机缩小时的速率
  // viewer.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000    //设置相机放大时的速率

  viewer.scene.screenSpaceCameraController.enableTilt = true;  //滚轮旋转

}

//设置鼠标事件
function initEvent() {
  console.log('initEvent');
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {

    _vue.flyPopFlag = false;
    let cartesian = scene.pickPosition(movement.position);
    let promise = scene.clampToHeightMostDetailed(cartesian)
    promise.then(updatedCartesians => {
      console.log(updatedCartesians)
      _vue.updatedCartesians = updatedCartesians
    })
    //拾取物体
    let pickObj = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickObj)) {
      if (pickObj.id && pickObj.id instanceof Cesium.Entity) {//点击entity
        console.log(pickObj)
      }
      if (pickObj.primitive instanceof Cesium.Primitive) {//点击primitive
        console.log('primitive');
        //primitive相关操作
      }
      if (pickObj.primitive instanceof Cesium.Model) {//点击gltf/glb模型
        console.log('glb');
        //模型gltf/glb相关操作
      }
      if (pickObj instanceof Cesium.Cesium3DTileFeature) {//点击3DTile
        //3dTiles的子模型属性
        let propertyNames = pickObj.getPropertyNames();
        propertyNames.forEach(item => {
          console.log(item); //属性名
          console.log(pickObj.getProperty(item));//属性值
        })
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);




  // //鼠标滚轮按下监听
  // handler.setInputAction(function (movement) {
  //   console.log('MIDDLE_DOWN');
  // }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

  //设置帧渲染监听
  renderListen = scene.postRender.addEventListener(() => {
    let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, _vue.pickPosition);
    if (windowCoord && pop !== undefined && pop.offsetWidth && pop.offsetHeight) {
      let x = Number(windowCoord.x) - pop.offsetWidth / 2;
      let y = Number(windowCoord.y) - pop.offsetHeight;
      pop.style.left = ` ${Math.round(x)}px`
      pop.style.top = ` ${Math.round(y)}px`
    }
    if (animeEntity !== undefined && animeEntity != null) {
      animeEntity.position = scene.clampToHeight(positionProperty.getValue(clock.currentTime), objectsToExclude);
    }

  });



}
//加载航模
function addTileset() {
  tileset = new Cesium.Cesium3DTileset({
    //模型相对路径，我这里是放的根目录
    url: 'http:/localhost/model/tileset/tileset.json',
    maximumMemoryUsage: 3072,//可使用内存
    skipLevelOfDetail: true,//优化选项。确定是否应在遍历期间应用详细级别跳过。
    preferLeaves: true,///优化选项。最好先装载叶子。
    preloadFlightDestinations: true,//优化选项。在相机飞行时在相机的飞行目的地预加载图块。
    cullWithChildrenBounds: true,//优化选项。是否使用子边界体积的并集来剔除瓦片。
    cullRequestsWhileMoving: true//优化选项。不要请求由于相机移动而在返回时可能未使用的图块。这种优化只适用于静止的瓦片集。
  });


  tileset.readyPromise
    .then(function (currentModel) {
      // this.$nextTick(() => {

      // })
      // _vue.loadingInstance1.close();
      scene.primitives.add(tileset);
      viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(-0.5, -0.5, 1185.6010874608414)
      );

      //修改3dtiles位置，input，range组件的change事件绑定此函数
      _vue.update3dtilesMaxtrix();

      _vue.tileModelToolVisiable = true; //显示3dtiles调整工具
    }).catch(function (error) {
      console.log(error);
    });

  // tileset.allTilesLoaded.addEventListener(function () {
  //   _vue.selectedMenu.loadingInstance1.close();
  // });
}
/**
 * 笛卡尔坐标转WGS84
 * @param Cartesian3 单个点或点数组
  */
function Cartesian3ToWGS84(Cartesian3) {
  if (!Cartesian3 || !Cartesian3.x) {
    throw "Error in parameters";
  }
  let _cartesian3 = new Cesium.Cartesian3(Cartesian3.x, Cartesian3.y, Cartesian3.z);
  let _cartographic = Cesium.Cartographic.fromCartesian(_cartesian3);
  let _lat = Cesium.Math.toDegrees(_cartographic.latitude);
  let _lng = Cesium.Math.toDegrees(_cartographic.longitude);
  let _alt = _cartographic.height;
  return { lng: _lng, lat: _lat, alt: _alt };
}


// =====VUE======VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========VUE=========//

export default {
  components: {
    // Menu,
    DiaContainer,
    Electric
  },
  data() {
    return {
      gridData: [
        { ponit: '10001', time: '2022-11-25 16:28:50', level: '一级', message: '10001监测点产生一级报警,报警内容X偏移80mm/d, 当前为-268.9mm/d, 请火速处理！！！' },
        { ponit: '10002', time: '2022-11-25 18:28:50', level: '一级', message: '10002监测点产生一级报警,报警内容H偏移速度大于288mm/d, 当前为511.5mm/d, 请火速处理！！！' }
      ],
      gridData1: [
        { ponit: '点位1', time: '2022-11-25 16:28:50', level: '一级', message: '减料仓位1,发生异常' },
        { ponit: '点位2', time: '2022-11-25 18:28:50', level: '一级', message: '减料仓位2,发生异常' }
      ],
      czmlJson: [
        {
          "id": "document",
          "version": "1.0",
          "clock": {
            "interval": "2018-07-20T15:18:00Z/2018-07-20T15:19:30Z",
            "currentTime": "2018-07-20T15:18:00Z",
            "multiplier": 3,
            "range": "CLAMPED",
            "step": "SYSTEM_CLOCK_MULTIPLIER"
          }
        },
        {
          "id": "CesiumMilkTruck",
          // 添加文字描述
          label: {
            fillColor: [
              {
                interval: "2018-07-20T15:18:00Z/2018-07-20T15:19:30Z",
                rgba: [255, 255, 0, 255],
              },
            ],
            font: 'bold 10pt Segoe UI Semibold',
            horizontalOrigin: 'CENTER',
            outlineColor: {
              rgba: [0, 0, 0, 255],
            },
            pixelOffset: {
              cartesian2: [50, -117],
            },
            scale: 1.0,
            text: '运煤车',
            verticalOrigin: 'CENTER',
            backgroundColor: {
              rgba: [53, 88, 160, 255]
            },//背景色
            showBackground: true,
          },

          "model": {
            "gltf": "/model/GroundVehicle.glb"
          },
          "position": {
            "interpolationAlgorithm": "LINEAR",
            "forwardExtrapolationType": "HOLD",
            "cartesian": [
              "2018-07-20T15:18:00Z", -1994390.177583992, 3647435.8189883693, 4820978.09610042,
              "2018-07-20T15:18:10Z", -1994320.4498646683, 3647372.2611742453, 4821065.472747224,
              "2018-07-20T15:18:15Z", -1994297.1188346597, 3647338.6865902953, 4821102.982827776,
              "2018-07-20T15:18:45Z", -1994516.5781486155, 3647477.836148564, 4820907.775453164,
              "2018-07-20T15:19:00Z", -1994527.548460911, 3647573.9351524822, 4820829.606633771,
              "2018-07-20T15:19:15Z", -1994544.4234437514, 3647630.7069740808, 4820780.8292851485,
              "2018-07-20T15:19:30Z", -1994549.0868165935, 3647680.90834923, 4820744.338545548
            ]
          },
          "orientation": {
            "velocityReference": "#position"
          },
          "viewFrom": {
            "cartesian": [50, 50, 50],
          },
        },
        {
          "id": "Polyline",
          "polyline": {
            "positions": {
              "cartesian": [
                -1994390.177583992, 3647435.8189883693, 4820978.09610042,
                -1994320.4498646683, 3647372.2611742453, 4821065.472747224,
                -1994297.1188346597, 3647338.6865902953, 4821102.982827776,
                -1994516.5781486155, 3647477.836148564, 4820907.775453164,
                -1994527.548460911, 3647573.9351524822, 4820829.606633771,
                -1994544.4234437514, 3647630.7069740808, 4820780.8292851485,
                -1994549.0868165935, 3647680.90834923, 4820744.338545548
              ]
            },
            "material": {
              "polylineOutline": {
                "color": {
                  "rgba": [255, 255, 0, 100]
                },
                "outlineColor": {
                  "rgba": [0, 0, 0, 255]
                },
                "outlineWidth": 2
              }
            },
            "width": 10,
            "clampToGround": true
          }
        }
      ],
      selectedMenu: useMenuStore(),
      pickPosition: { x: 0, y: 0, z: 0 }, //当前拾取的坐标
      popPickRow: {}, //相机飞行目标数据
      peopleId: "",

      btnMenuFlag: "default",//下方过滤按钮
      flyPopFlag: false, //人员详细信息弹窗flag
      allFlags: {
        ztqkFlag: true,   //总体情况内容flag
        bpFlag: false,
        spjkFlag: false,  //视频监控
        clglFlag: false,  //车辆管理
        ryglFlag: false,  //人员管理
        scqkFlag: false,  //生产情况
        jyglFlag: false,  //经营管理
        swkvFlag: false,  //35kv
        cqmyFlag: false,  //厂区漫游
        sjxzFlag: false,  //三级下钻
        ryytxFlag: false,  //人员一条线
        sbfmyFlag: false,  //水泵房漫游
        pdysgkFlag: false,  //皮带运输管控
        pdysmyFlag: false,  //皮带运输漫游
        gdmyxjFlag: false,  //供电漫游巡检
        cbgkFlag: false,  //成本管控
      },

      //边坡初始数据
      rampList: [
        { id: 'ramp1', type: 'ramp', model: '', name: "10001", position: { 0: undefined, x: -1993325.1250457384, y: 3647687.881900211, z: 4821257.332844055 }, initX: 0.1, initY: 2, initH: 3.4, nowX: 1, nowY: 2.2, nowH: 3, movePercent: 1.5 },
        { id: 'ramp2', type: 'ramp', model: '', name: "10002", position: { 0: undefined, x: -1993562.2792253417, y: 3647320.821466247, z: 4821465.227658859 }, initX: 0.2, initY: 2, initH: 2, nowX: 12, nowY: 2, nowH: 3.4, movePercent: 1.8 },
        { id: 'ramp3', type: 'ramp', model: '', name: "10003", position: { 0: undefined, x: -1993807.7099056004, y: 3647138.0813396154, z: 4821498.872873737 }, initX: 0.2, initY: 2, initH: 3, nowX: 1, nowY: 2, nowH: 3.1, movePercent: 2.5 },
        { id: 'ramp4', type: 'ramp', model: '', name: "10004", position: { 0: undefined, x: -1994330.0396206083, y: 3647225.7804566207, z: 4821231.145113414 }, initX: 1.5, initY: 2.2, initH: 0.3, nowX: 1.2, nowY: 2.6, nowH: 3, movePercent: 3.3 },
        { id: 'ramp5', type: 'ramp', model: '', name: "10005", position: { 0: undefined, x: -1992751.0721041136, y: 3648683.335058069, z: 4820750.668828201 }, initX: 1.8, initY: 2.6, initH: 3.5, nowX: 1.5, nowY: 2, nowH: 3, movePercent: 2.5 },
      ],
      //视频初始数据   url: 'https://192.168.1.224/test/video/video.mp4',
      videoList: [
        { id: 'video1', type: 'video', videoSrc: 'http://192.168.1.224/test/video/video.mp4', model: '', name: "监控#1", position: { 0: undefined, x: -1994847.8065935655, y: 3647573.341621833, z: 4820800.3998805415 } },
        { id: 'video2', type: 'video', videoSrc: 'http://192.168.1.224/test/video/video.mp4', model: '', name: "监控#2", position: { 0: undefined, x: -1994917.4412263657, y: 3647677.414252256, z: 4820690.741403412 } },
        { id: 'video3', type: 'video', videoSrc: 'http://192.168.1.224/test/video/video.mp4', model: '', name: "监控#3", position: { 0: undefined, x: -1993928.6410106786, y: 3646943.4631946497, z: 4821648.806712822 } },
        { id: 'video4', type: 'video', videoSrc: 'http://192.168.1.224/test/video/video.mp4', model: '', name: "监控#4", position: { 0: undefined, x: -1994831.50416823, y: 3647497.894546769, z: 4820862.247871422 } },
        { id: 'video5', type: 'video', videoSrc: 'http://192.168.1.224/test/video/video.mp4', model: '', name: "监控#5", position: { 0: undefined, x: -1994987.3566708756, y: 3647563.01651477, z: 4820749.299661685 } },
      ],
      //cesium用初始化车辆 
      carList: [
        { id: 'car1', type: 'car', photo: '/images/kache.webp', driveName: '刘小平', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#1", position: { 0: undefined, x: -1994390.177583992, y: 3647435.8189883693, z: 4820978.09610042 } },
        { id: 'car2', type: 'car', photo: '/images/waji.webp', driveName: '杨兴旺', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#2", position: { 0: undefined, x: -1994174.6448001352, y: 3648520.3631994124, z: 4820376.571579468 } },
        { id: 'car3', type: 'car', photo: '/images/chanche.webp', driveName: '董大龙', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#3", position: { 0: undefined, x: -1993716.169284811, y: 3648529.98815606, z: 4820544.1648138445 } },
        { id: 'car4', type: 'car', photo: '/images/waji.webp', driveName: '温文君', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#4", position: { 0: undefined, x: -1993828.364807088, y: 3648220.5829854426, z: 4820707.50946886 } },
        { id: 'car5', type: 'car', photo: '/images/kache.webp', driveName: '张  星', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#5", position: { 0: undefined, x: -1993881.3483399735, y: 3648069.5027036266, z: 4820782.579117324 } },
        { id: 'car6', type: 'car', photo: '/images/waji.webp', driveName: '王  炯', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#6", position: { 0: undefined, x: -1994535.7140216688, y: 3648265.9138968852, z: 4820384.133663339 } },
        { id: 'car7', type: 'car', photo: '/images/chanche.webp', driveName: '田鑫鑫', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#7", position: { 0: undefined, x: -1993907.9207442799, y: 3648682.435612525, z: 4820376.998994252 } },
        { id: 'car8', type: 'car', photo: '/images/person.webp', driveName: '朱之文', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#8", position: { 0: undefined, x: -1993594.3356826764, y: 3648161.245430279, z: 4820797.04866415 } },
        { id: 'car9', type: 'car', photo: '/images/chanche.webp', driveName: '郎  溪', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#9", position: { 0: undefined, x: -1993519.0518301956, y: 3648079.6700488576, z: 4820855.137426485 } },
        { id: 'car10', type: 'car', photo: '/images/waji.webp', driveName: '单雄心', drivePhoto: '/images/zhengjian1.webp', model: '/model/GroundVehicle.glb', name: "运煤车#10", position: { 0: undefined, x: -1993472.073915436, y: 3648066.65101841, z: 4820868.445582478 } }
      ],

      //cesium用初始化人员 
      peopleList: [
        { id: 'people1', photo: '/images/person.jpeg', dept: '二组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "刘小平", position: { 0: undefined, x: -1994157.8129179133, y: 3648243.5322952555, z: 4820554.535900206 } },
        { id: 'people2', photo: '/images/person.jpeg', dept: '一组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "杨兴旺", position: { 0: undefined, x: -1994539.9373200424, y: 3648305.1564928493, z: 4820352.380521748 } },
        { id: 'people3', photo: '/images/person.jpeg', dept: '安全部', job: '安全部副矿长', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "董大龙", position: { 0: undefined, x: -1994620.513952768, y: 3648534.500437653, z: 4820157.564748863 } },
        { id: 'people4', photo: '/images/person.jpeg', dept: '一组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "温文君", position: { 0: undefined, x: -1993075.153125314, y: 3648367.9066276397, z: 4820782.665471399 } },
        { id: 'people5', photo: '/images/person.jpeg', dept: '二组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "张  星", position: { 0: undefined, x: -1994580.875861692, y: 3648570.0721108126, z: 4820146.8848488415 } },
        { id: 'people6', photo: '/images/person.jpeg', dept: '三组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "王  炯", position: { 0: undefined, x: -1993104.4360556162, y: 3648379.565159762, z: 4820762.195832909 } },
        { id: 'people7', photo: '/images/person.jpeg', dept: '二组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "田鑫鑫", position: { 0: undefined, x: -1994210.8457238434, y: 3647745.0209570825, z: 4820829.560838792 } },
        { id: 'people8', photo: '/images/person.jpeg', dept: '二组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "朱之文", position: { 0: undefined, x: -1994368.3044646922, y: 3647856.0967456494, z: 4820682.210378203 } },
        { id: 'people9', photo: '/images/person.jpeg', dept: '三组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "郎  溪", position: { 0: undefined, x: -1993508.455862073, y: 3648902.9447108964, z: 4820363.259199762 } },
        { id: 'people10', photo: '/images/person.jpeg', dept: '一组', job: '司机', type: 'people', posiTime: '2022-11-16 11:36', model: '/model/gongrend.glb', name: "单雄心", position: { 0: undefined, x: -1993790.5377062785, y: 3648627.2798227253, z: 4820459.255469401 } }
      ],
      //底部过滤菜单
      bottomList: [
        { id: 'bottomItem1', img: '/images/kuangche.png', name: "矿车", type: 'car', isShow: true },
        { id: 'bottomItem2', img: '/images/renyuan.png', name: "人员", type: 'people', isShow: true },
        { id: 'bottomItem3', img: '/images/shipin.png', name: "视频", type: 'video', isShow: true },
        { id: 'bottomItem4', img: '/images/bianpo.png', name: "边坡", type: 'ramp', isShow: true }
      ],
      //产量分析数据
      clfxList: [
        { id: 'clfx1', value: 511.4, name: "年度计划原煤产量" },
        { id: 'clfx4', value: 530.7, name: "年实际原煤产量" },
        { id: 'clfx2', value: 50, name: "月度计划原煤产量" },
        { id: 'clfx5', value: 48, name: "月实际原煤产量" },
        { id: 'clfx3', value: 2, name: "日计划原煤产量" },
        { id: 'clfx6', value: 2.6, name: "日实际原煤产量" },
      ],
      //玻璃分析数据
      blfxList: [
        { id: 'blfx1', value: 18.2, name: "年度剥离计划" },
        { id: 'blfx2', value: 0, name: "月度剥离计划" },
        { id: 'blfx3', value: 104.2, name: "年度剥离实际" },
        { id: 'blfx4', value: 0, name: "月度剥离实际" },

      ],
      //销量分析数据
      xlfxList: [
        { id: 'xlfx1', value: 200, name: "年度销量计划" },
        { id: 'xlfx2', value: 30, name: "月度销量计划" },
        { id: 'xlfx3', value: 180, name: "年度销量实际" },
        { id: 'xlfx4', value: 38, name: "月度销量实际" },
      ],


      //月产量完成率echart
      yclChart: null,
      yclChart1: null,
      //日产量完成率echart
      rclChart: null,
      rclChart1: null,
      //车辆统计echart
      cltjChart: null,
      //边坡位移趋势echart
      bpChart: null,
      //报警统计echart
      bjtjChart: null,

      //年度剥离echart
      ndbljChart: null,

      //月度剥离echart
      ydblchart: null,

      //原煤产量趋势echart
      ymclqsChart: null,

      //车辆分析统计echart
      clfxtjChart: null,

      //车辆行为统计echart
      clxwtjChart: null,

      //用水趋势echart
      ysqsChart: null,

      //实际销量echart
      sjxlchart: null,

      //月销量echart
      yxlChart: null,

      //仪表1
      RightTlChart: null,

      //仪表2
      RightTRChart: null,

      //拾取的点位
      updatedCartesians: { 0: undefined, x: -1993845.3912495777, y: 3648181.0709577706, z: 4820730.167428281 },
      database: '',
      tileModelToolVisiable: true,
      modelEntitys: null,

      //dialog
      dialogTableVisible: false,
      //loading
      // loadingInstance1: null,

      //调试参数
      tileModelTool: {
        scale: 1.0,
        longitude: 118.658595904537,
        latitude: 49.4148436165025,
        height: 0, //修改高度
        rx: 0,
        ry: 0,
        rz: 33.5, //修改旋转
        alpha: 0.5
      }
    }
  },


  mounted() {
    _vue = this;

    // this.loadingInstance1 = ElLoading.service({ fullscreen: true, text: '加载中...' })
    // this.loadingInstance1 = this.$loading({ fullscreen: true, text: '加载中...' })
    this.init()
    this.changeMenu(this.selectedMenu.selectedMenu);
    //store监听切换菜单
    this.selectedMenu.$subscribe((mutation, state) => {
      this.changeMenu(state.selectedMenu);
      // console.log(mutation, state.selectedMenu);
    })
  },

  beforeUnmount() {
    viewer && viewer.destroy()
    renderListen();
    viewer = null

    if (this.yclChart && this.yclChart != null) {
      this.yclChart.dispose()
      this.yclChart = null
    }

    if (this.yclChart1 && this.yclChart1 != null) {
      this.yclChart1.dispose()
      this.yclChart1 = null
    }
    if (this.rclChart && this.rclChart != null) {
      this.rclChart.dispose()
      this.rclChart = null
    }
    if (this.rclChart1 && this.rclChart1 != null) {
      this.rclChart1.dispose()
      this.rclChart1 = null
    }
    if (this.cltjChart && this.cltjChart != null) {
      this.cltjChart.dispose()
      this.cltjChart = null
    }
    if (this.bpChart && this.bpChart != null) {
      this.bpChart.dispose()
      this.bpChart = null
    }
    if (this.bjtjChart && this.bjtjChart != null) {
      this.bjtjChart.dispose()
      this.bjtjChart = null
    }

    if (this.ndbljChart && this.ndbljChart != null) {
      this.ndbljChart.dispose()
      this.ndbljChart = null
    }
    if (this.ydblchart && this.ydblchart != null) {
      this.ydblchart.dispose()
      this.ydblchart = null
    }
    if (this.ymclqsChart && this.ymclqsChart != null) {
      this.ymclqsChart.dispose()
      this.ymclqsChart = null
    }

    if (this.clfxtjChart && this.clfxtjChart != null) {
      this.clfxtjChart.dispose()
      this.clfxtjChart = null
    }

    if (this.clxwtjChart && this.clxwtjChart != null) {
      this.clxwtjChart.dispose()
      this.clxwtjChart = null
    }

    if (this.ysqsChart && this.ysqsChart != null) {
      this.ysqsChart.dispose()
      this.ysqsChart = null
    }

    if (this.sjxlchart && this.sjxlchart != null) {
      this.sjxlchart.dispose()
      this.sjxlchart = null
    }

    if (this.yxlChart && this.yxlChart != null) {
      this.yxlChart.dispose()
      this.yxlChart = null
    }
  },
  methods: {
    //动画播放设置
    setAnimeOption(args) {
      if (args === 'play') {
        clock.shouldAnimate = true
      } else if (args === 'stop') {
        clock.shouldAnimate = false
      } else if (typeof args === 'number') {
        clock.multiplier = args
      } else if (args === 'close') {
        this.onAnimeStop()
      } else if (args === 'track') {
        viewer.trackedEntity = animeEntity;
      }

      // clock.shouldAnimate = false;
      // console.log(clock);
    },
    showDialog() {
      this.flyPopFlag = false
      this.dialogTableVisible = true
    },
    //呼叫
    call() {
      ElMessage({
        message: '呼叫成功',
        type: 'success',
      })
    },
    //边坡假数据飞行
    flyScope(row) {
      console.log(row);
      if (row.ponit === '10001') {
        this.flyCameraTo('ramp', { id: 'ramp1' })
      } else {
        this.flyCameraTo('ramp', { id: 'ramp2' })
      }
    },
    //初始化
    init() {
      //设置cesium视图
      setViewerSetting()
      //添加瓦片模型
      addTileset()
      //初始化场景
      this.initScene()
      //初始化鼠标事件
      initEvent()
      //初始化echart
      // this.yclinitChart() //月产量
      // this.rclinitChart() //日产量
      this.cltjinitChart() //车辆统计、

    },
    //动画停止回调
    onAnimeStop() {
      clock.shouldAnimate = false
      this.allFlags.clglFlag = true;
      this.btnMenuFlag = 'default'
      viewer.dataSources.removeAll();
      this.doShowHidden(false, carEntitys)
      this.doShowHidden(false, peopleEntitys)
      this.doShowHidden(false, videoEntitys)
      this.doShowHidden(false, rampEntitys)
      //清楚监听器
      clockListen();

    },
    //隐藏所有flag
    hiddenAllFlag() {
      for (const key in this.allFlags) {
        this.allFlags[key] = false;
      }
    },
    //切换菜单
    changeMenu(menu) {
      //先把所有弹窗隐藏
      this.hiddenAllFlag();
      this.btnMenuFlag = 'default' //开启下方过滤按钮
      //放开所选页面
      switch (menu) {
        case 'swkv':
          this.allFlags.swkvFlag = true;
          this.btnMenuFlag = '' //关闭下方过滤按钮
          break;
        case 'ztqk':
          this.allFlags.ztqkFlag = true;
          break;
        case 'bianpo':
          this.allFlags.bpFlag = true;
          this.$nextTick(() => {
            this.bpinitChart() //车辆统计
            this.bjtjinitChart() //报警统计
          })
          break;
        case 'shipinjiankong':
          this.allFlags.spjkFlag = true;
          break;
        case 'renyuanguanli':
          this.allFlags.ryglFlag = true;
          break;
        case 'cheliangguanli':
          this.allFlags.clglFlag = true;
          this.$nextTick(() => {
            if (!this.clfxtjChart) {
              this.clfxtjinitChart() //车辆分类统计分析
            }
            if (!this.clxwtjChart) {
              this.clxwtjinitChart() //车辆行为统计
            }
          })
          break;
        case 'shengchanqingkuang':
          this.allFlags.scqkFlag = true;
          this.$nextTick(() => {
            this.rclinitChart1() //日产量
            this.yclinitChart1() //月产量
            this.ndblinitchart() //年度剥离
            this.ydblinitchart() //月度剥离
          })
          break;

        case 'jygl':
          this.allFlags.jyglFlag = true;
          this.$nextTick(() => {
            this.ymclqsinitchart() //原煤产量趋势
            this.ysqsinitChart() //用水趋势
            this.yxlinitchart() //月销量
            this.sjxlinitchart() //实际销量销量
          })
          break;
        case 'cqmy':
          this.allFlags.cqmyFlag = true;
          break;
        case 'sjxz':
          this.allFlags.sjxzFlag = true;
          break;
        case 'ryytx':
          this.allFlags.ryytxFlag = true;
          break;
        case 'sbfmy':
          this.allFlags.sbfmyFlag = true;
          break;
        case 'pdysgk':
          this.allFlags.pdysgkFlag = true;
          break;
        case 'pdysmy':
          this.allFlags.pdysmyFlag = true;
          break;
        case 'gdmyxj':
          this.allFlags.gdmyxjFlag = true;
          break;
        case 'cbgk':
          this.allFlags.cbgkFlag = true;
          break;
        default:
          break;
      }
    },


    //底部菜单点击
    showOrHideModel(row) {
      if (row.type === 'car') {
        this.doShowHidden(row.isShow, carEntitys)
      } else if (row.type === 'people') {
        this.doShowHidden(row.isShow, peopleEntitys)
      } else if (row.type === 'video') {
        this.doShowHidden(row.isShow, videoEntitys)
      } else if (row.type === 'ramp') {
        this.doShowHidden(row.isShow, rampEntitys)
      }
      row.isShow = !row.isShow
    },


    //显示隐藏模型
    doShowHidden(flag, entitys) {
      if (flag) {
        for (const iterator of entitys) {
          if (iterator.model) {
            iterator.model.show = false;
          }
          iterator.label.show = false;
        }

      } else {
        for (const iterator of entitys) {
          if (iterator.model) {
            iterator.model.show = true;
          }
          iterator.label.show = true;
        }
      }
    },
    //播动画
    start(row) {

      this.flyPopFlag = false //关闭飞行结束弹窗
      this.btnMenuFlag = 'animate' //关闭下方过滤按钮

      //隐藏所有entity
      this.doShowHidden(true, carEntitys)
      this.doShowHidden(true, peopleEntitys)
      this.doShowHidden(true, videoEntitys)
      this.doShowHidden(true, rampEntitys)
      //隐藏所有左右数据展示
      this.hiddenAllFlag()


      clockListen = viewer.clock.onStop.addEventListener((tick) => {
        console.log(tick, 'stop')

        // 动画执行到结束时间时调用
        // 逻辑代码 removeEventListener => onTick
        this.onAnimeStop()
      })

      // const redline = viewer.entities.add({
      //   polyline: {
      //     show: true, // 线是否可见
      //     positions: [
      //       new Cesium.Cartesian3(-1994390.177583992, 3647435.8189883693, 4820978.09610042),
      //       new Cesium.Cartesian3(-1994320.4498646683, 3647372.2611742453, 4821065.472747224,),
      //       new Cesium.Cartesian3(-1994297.1188346597, 3647338.6865902953, 4821102.982827776,),
      //       new Cesium.Cartesian3(-1994516.5781486155, 3647477.836148564, 4820907.775453164)
      //     ], // 格式为世界坐标的线位置数组
      //     width: 50, // 线的宽度
      //     outlineColor: new Cesium.Color(255, 255, 0, 255),
      //     material: new Cesium.PolylineOutlineMaterialProperty({
      //       color: Cesium.Color.YELLOW,
      //     }),
      //     clampToGround: true, //线是否固定在地面
      //   },
      // });

      viewer.dataSources.removeAll();
      const dataSourcePromise = Cesium.CzmlDataSource.load(
        this.czmlJson
      );

      viewer.dataSources.add(dataSourcePromise).then(function (dataSource) {
        animeEntity = dataSource.entities.getById("CesiumMilkTruck");
        clock.shouldAnimate = true;
        positionProperty = animeEntity.position;
        objectsToExclude = [animeEntity];
        animeEntity.orientation = new Cesium.VelocityOrientationProperty(animeEntity.position);
      });
    },


    //获取摄像机位置
    cameraPosi() {
      var head = scene.camera.heading
      var pitch = scene.camera.pitch
      var roll = scene.camera.roll
      var info = { 'head': head, 'pitch': pitch, 'roll': roll };
      // 获取位置 wgs84的地心坐标系，x,y坐标值以弧度来表示
      var position = scene.camera.positionCartographic //with longitude and latitude expressed in radians and height in meters.
      var longitude = Cesium.Math.toDegrees(position.longitude).toFixed(6)
      var latitude = Cesium.Math.toDegrees(position.latitude).toFixed(6)
      var height = position.height
      console.log({ lng: longitude, lat: latitude, h: height, mat: info });
      return { lng: longitude, lat: latitude, h: height, mat: info }
    },

    //驾驶1
    RightTlinitChart() {
      this.RightTlChart = echarts.init(document.getElementById('RightTlSolt'))
      let option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 10,
              fontWeight: 'bolder',
              formatter: '{value} km/h',
              color: '#000'
            },
            data: [
              {
                value: 20
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 20
              }
            ]
          }
        ]
      };
      option && this.RightTlChart.setOption(option)
      window.addEventListener('resize', this.RightTlChart.resize)
    },
    //驾驶2
    RightTRinitChart() {

      this.RightTRChart = echarts.init(document.getElementById('RightTRSolt'))
      let option = option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 10,
              fontWeight: 'bolder',
              formatter: '{value} km/h',
              color: '#000'
            },
            data: [
              {
                value: 20
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 20
              }
            ]
          }
        ]
      };
      option && this.RightTRChart.setOption(option)
      window.addEventListener('resize', this.RightTRChart.resize)
    },
    //原煤产量
    ymclqsinitchart() {
      this.ymclqsChart = echarts.init(document.getElementById('ymclqschartSolt'))
      let option = {
        xAxis: {
          type: 'category',
          data: ['第一周', '第二周', '第三周', '第四周'],
          axisLabel: {
            color: '#fff'

          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'

          },
        },
        series: [
          {
            data: [120, 11, 150, 55],
            type: 'line',
            symbol: 'triangle',
            symbolSize: 20,
            lineStyle: {
              color: '#5470C6',
              width: 4,
              type: 'dashed'
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#EE6666',
              color: 'yellow'
            }
          }
        ]
      };
      option && this.ymclqsChart.setOption(option)
      window.addEventListener('resize', this.ymclqsChart.resize)
    },


    //实际销量
    sjxlinitchart() {
      this.sjxlchart = echarts.init(document.getElementById('sjxlchartSolt'))
      let option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          // orient: 'vertical',
          // right: 'right',
          data: ['计划销售', '实际销售']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },

        xAxis: {
          type: 'category',

          axisLabel: {
            color: '#fff'

          },
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          name: 'm³',
          nameTextStyle: { color: "#fff", fontSize: 12, },
          axisLabel: {
            color: '#fff'

          },
        },

        series: [
          {
            name: '计划销售',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
          },
          {
            name: '实际销售',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
          }

        ]
      };
      option && this.sjxlchart.setOption(option)
      window.addEventListener('resize', this.sjxlchart.resize)
    },
    //月销量
    yxlinitchart() {
      this.yxlChart = echarts.init(document.getElementById('yxlchartSolt'))
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      let option = {
        legend: {
          data: ['实际销售', '计划销售'],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          top: '-2%',
          right: '5%'
        },
        tooltip: {},
        xAxis: {
          data: ['一月', '二月', '三月'],
          axisLabel: {
            color: '#fff'
          },
        },
        yAxis: {
          axisLabel: {
            color: '#fff'
          },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%'
          // bottom: 100
        },
        series: [
          {
            name: '实际销售',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [1, 2, 3]
          },
          {
            name: '计划销售',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [10, 9, 8]
          },
        ]
      };

      option && this.yxlChart.setOption(option)
      window.addEventListener('resize', this.yxlChart.resize)
    },
    //月度剥离echart
    ydblinitchart() {
      this.ydbljChart = echarts.init(document.getElementById('ydblchartSolt'))
      let option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          // orient: 'vertical',
          // right: 'right',
          data: ['计划剥离', '实际剥离']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },

        xAxis: {
          type: 'category',

          axisLabel: {
            color: '#fff'

          },
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          name: 'm³',
          nameTextStyle: { color: "#fff", fontSize: 12, },
          axisLabel: {
            color: '#fff'

          },
        },

        series: [
          {
            name: '计划剥离',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
          },
          {
            name: '实际剥离',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
          }

        ]
      };
      option && this.ydbljChart.setOption(option)
      window.addEventListener('resize', this.ydbljChart.resize)
    },
    //年度剥离计划
    ndblinitchart() {
      this.ndbljChart = echarts.init(document.getElementById('ndblchartSolt'))
      let option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          // orient: 'vertical',
          // right: 'right',
          data: ['计划剥离', '实际剥离']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },

        xAxis: {
          type: 'category',

          axisLabel: {
            color: '#fff'

          },
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          name: 'm³',
          nameTextStyle: { color: "#fff", fontSize: 12, },
          axisLabel: {
            color: '#fff'

          },
        },

        series: [
          {
            name: '计划剥离',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
          },
          {
            name: '实际剥离',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210]
          }

        ]
      };
      option && this.ndbljChart.setOption(option)
      window.addEventListener('resize', this.ndbljChart.resize)
    },
    //用水趋势echart
    ysqsinitChart() {
      this.ysqsChart = echarts.init(document.getElementById('ysqschartSolt'))
      let option = {

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },

        xAxis: {
          type: 'category',

          axisLabel: {
            color: '#fff'

          },
          data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          name: 'm³',
          nameTextStyle: { color: "#fff", fontSize: 12, },
          axisLabel: {
            color: '#fff'

          },
        },

        series: [
          {
            name: '用水量',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
          }
        ]
      };
      option && this.ysqsChart.setOption(option)
      window.addEventListener('resize', this.ysqsChart.resize)
    },
    //车辆行为统计echart
    clxwtjinitChart() {
      this.clxwtjChart = echarts.init(document.getElementById('clxwtjchartSolt'))
      let option = {

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '车辆行为',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 10, name: '车距过近预警' },
              { value: 5, name: '前向碰撞预警' },
              { value: 5, name: '注意力分散报警' },
              { value: 4, name: '接打电话报警' },
              { value: 3, name: '抽烟报警' },
              { value: 20, name: '异常报警' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && this.clxwtjChart.setOption(option)
      window.addEventListener('resize', this.clxwtjChart.resize)
    },
    //车辆分类统计分析echart
    clfxtjinitChart() {
      this.clfxtjChart = echarts.init(document.getElementById('clfxtjchartSolt'))

      let option = {

        tooltip: {
          trigger: 'item'
        },
        legend: {
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          orient: 'vertical',
          right: 'right',
          top: '30%'
        },
        grid: {
          left: '0%',
          right: '4%',
          top: '0%',
          containLabel: true
        },
        series: [
          {
            name: '车辆分系统计',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 10, name: '装载车' },
              { value: 50, name: '运输车' },
              { value: 20, name: '辅助车' },
              { value: 14, name: '指挥车' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && this.clfxtjChart.setOption(option)
      window.addEventListener('resize', this.clfxtjChart.resize)

    },
    //报警统计echart
    bjtjinitChart() {
      this.bjtjChart = echarts.init(document.getElementById('bjtjchartSolt'))
      let base = +new Date(2022, 11, 16);
      let oneDay = 24 * 3600 * 1000;
      let data = [[base, 0]];
      for (let i = 1; i < 150; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.floor(Math.random() * 10)]);
      }
      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '近一月边坡报警次数分析',
          textStyle: {
            fontWeight: 'bolder',
            color: '#cccccc'
          },
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            color: '#fff'

          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: '#fff'

          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
          }
        ]
      };
      option && this.bjtjChart.setOption(option)
      window.addEventListener('resize', this.bjtjChart.resize)
    },



    //边坡位移分析chart
    bpinitChart() {

      this.bpChart = echarts.init(document.getElementById('bpchartSolt'))
      let option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          data: ['x', 'y', 'h']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#fff'

            },
            data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'

            }
          }

        ],
        series: [
          {
            name: 'x',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [0.14, 0.232, 0.101, 0.264, 0.90, 0.34, 0.25]
          },
          {
            name: 'y',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [0.12, 0.28, 0.111, 0.234, 0.220, 0.34, 0.31]
          },
          {
            name: 'h',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [0.32, 0.132, 0.201, 0.334, 0.190, 0.13, 0.22]
          },
        ]

      };
      option && this.bpChart.setOption(option)
      window.addEventListener('resize', this.bpChart.resize)
    },

    //车辆统计chart
    cltjinitChart() {
      this.cltjChart = echarts.init(document.getElementById('cltjechartSolt'))

      let option = option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            '装载车',
            '运输车',
            '辅助车',
            '指挥车',
          ],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#fff'
          },
        },
        series: [
          {
            name: '车辆分析',
            type: 'pie',
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 40, name: '装载车' },
              { value: 33, name: '运输车' },
              { value: 28, name: '辅助车' },
              { value: 22, name: '指挥车' },
            ]
          }
        ]
      };
      option && this.cltjChart.setOption(option)
      window.addEventListener('resize', this.cltjChart.resize)
    },
    //月产量chart
    yclinitChart() {
      this.yclChart = echarts.init(document.getElementById('yclechartSolt'))
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      let option = {
        legend: {
          data: ['实际完成', '计划完成'],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          top: '-2%',
          right: '5%'

        },


        tooltip: {},
        xAxis: {
          data: ['一月', '二月', '三月'],
          axisLabel: {
            color: '#fff'

          },
        },
        yAxis: {
          axisLabel: {
            color: '#fff'

          },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%'
          // bottom: 100
        },
        series: [
          {
            name: '实际完成',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [1, 2, 3]
          },
          {
            name: '计划完成',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [10, 9, 8]
          },
        ]
      };

      option && this.yclChart.setOption(option)
      window.addEventListener('resize', this.yclChart.resize)
    },
    yclinitChart1() {
      this.yclChart1 = echarts.init(document.getElementById('yclechartSolt1'))
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      let option = {
        legend: {
          data: ['实际完成', '计划完成'],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          top: '-2%',
          right: '5%'

        },


        tooltip: {},
        xAxis: {
          data: ['一月', '二月', '三月'],
          axisLabel: {
            color: '#fff'

          },
        },
        yAxis: {
          axisLabel: {
            color: '#fff'

          },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%'
          // bottom: 100
        },
        series: [
          {
            name: '实际完成',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [1, 2, 3]
          },
          {
            name: '计划完成',
            type: 'bar',
            stack: 'one',
            barWidth: '25px',
            emphasis: emphasisStyle,
            data: [10, 9, 8]
          },
        ]
      };

      option && this.yclChart1.setOption(option)
      window.addEventListener('resize', this.yclChart1.resize)
    },
    //日产量chart
    rclinitChart() {
      this.rclChart = echarts.init(document.getElementById('rclechartSolt'))
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      let option = {
        legend: {
          data: ['实际完成', '计划完成'],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          top: '-2%',
          right: '5%'
        },


        tooltip: {},
        xAxis: {
          data: ['昨日', '今日', '明日'],
          axisLabel: {
            color: '#fff'

          },
        },
        yAxis: {
          axisLabel: {
            color: '#fff'

          },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%'
          // bottom: 100
        },
        series: [
          {
            name: '实际完成',
            type: 'bar',
            barWidth: '25px',
            stack: 'one',
            emphasis: emphasisStyle,
            data: [1, 2, 0]
          },
          {
            name: '计划完成',
            type: 'bar',
            barWidth: '25px',
            stack: 'one',
            emphasis: emphasisStyle,
            data: [10, 9, 8]
          },
        ]
      };

      option && this.rclChart.setOption(option)
      window.addEventListener('resize', this.rclChart.resize)
    },
    //日产量chart
    rclinitChart1() {
      this.rclChart1 = echarts.init(document.getElementById('rclechartSolt1'))
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      };
      let option = {
        legend: {
          data: ['实际完成', '计划完成'],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#cccccc'
          },
          top: '-2%',
          right: '5%'
        },


        tooltip: {},
        xAxis: {
          data: ['昨日', '今日', '明日'],
          axisLabel: {
            color: '#fff'

          },
        },
        yAxis: {
          axisLabel: {
            color: '#fff'

          },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '5%'
          // bottom: 100
        },
        series: [
          {
            name: '实际完成',
            type: 'bar',
            barWidth: '25px',
            stack: 'one',
            emphasis: emphasisStyle,
            data: [1, 2, 0]
          },
          {
            name: '计划完成',
            type: 'bar',
            barWidth: '25px',
            stack: 'one',
            emphasis: emphasisStyle,
            data: [10, 9, 8]
          },
        ]
      };

      option && this.rclChart1.setOption(option)
      window.addEventListener('resize', this.rclChart1.resize)
    },
    //移动相机
    flyCameraTo(flag, clickitem) {
      this.flyPopFlag = false
      this.popPickRow = clickitem
      if (flag === 'people') {
        let res = peopleEntitys.find((obj) => { return obj.id === clickitem.id });
        this.pickPosition = res.label.position._value
      } else if (flag === 'video') {
        let res = videoEntitys.find((obj) => { return obj.id === clickitem.id });
        this.pickPosition = res.label.position._value
      } else if (flag === 'ramp') {
        let res = rampEntitys.find((obj) => { return obj.id === clickitem.id });
        this.pickPosition = res.label.position._value
      } else if (flag === 'car') {
        let res = carEntitys.find((obj) => { return obj.id === clickitem.id });
        this.pickPosition = res.label.position._value

      }

      scene.camera.flyTo({
        destination: new Cesium.Cartesian3(this.pickPosition.x - 40, this.pickPosition.y + 70, this.pickPosition.z - 10),
        orientation:
        {
          head: 5.783276378473148, pitch: -0.5001628629047881, roll: 3.9163149168075506e-8
        }
        ,
        duration: 5,
        complete: () => {
          // checkedflyPopFlag = flag
          _vue.flyPopFlag = flag
          pop = document.getElementById("fly_Pop");
          viewer.container.append(pop);

          console.log(this.flyPopFlag);
          console.log(_vue.flyPopFlag);
          // if (flag === 'car') {
          //   this.$nextTick(() => {
          //     this.RightTlinitChart() //驾驶1
          //     this.RightTRinitChart() //驾驶2
          //   })
          // }
        }
      });
    },
    //初始化场景
    initScene() {
      console.log('initScene');
      // 添加车
      for (const iterator of this.carList) {
        this.addModel(iterator)
      }
      // 添加人
      for (const iterator of this.peopleList) {
        this.addModel(iterator)
      }
      // 添加边坡
      for (const iterator of this.rampList) {
        this.addModel(iterator)
      }
      // // 添加视频
      for (const iterator of this.videoList) {
        this.addModel(iterator)
      }
    },

    //聚焦
    zoomTo() {
      viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(-0.5, -0.5, 1185.6010874608414)
      );
    },
    //加载模型
    addModel(row) {
      // viewer.entities.removeAll();
      // console.log(this.updatedCartesians);

      const heading = Cesium.Math.toRadians(135);
      const pitch = 0;
      const roll = 0;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        row.position,
        hpr
      );
      let scale = row.type === 'people' ? 0.05 : 1.0
      let entity;
      if (row.model) {
        entity = viewer.entities.add({
          name: row.name,
          position: row.position,
          orientation: orientation,
          // orientation: new Cesium.VelocityOrientationProperty(row.position),//根据位置移动自动计算方向。
          model: {
            uri: row.model,
            scale: scale//放大模型
          },
        });
      }

      //添加Billboard 添加顶部标签

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d')
      canvas.width = 113
      canvas.height = 80
      if (row.type === 'people') {
        ctx.fillStyle = "white"
      } else if (row.type === 'car') {
        ctx.fillStyle = "black"
      } else if (row.type === 'ramp') {
        ctx.fillStyle = "yellow"
      } else if (row.type === 'video') {
        ctx.fillStyle = "blue"
      }

      ctx.font = 'bold 20px Arial';

      var img = new Image();
      img.src = '/images/pop.webp';
      img.onload = function () {
        ctx.fillText(row.name, 15, 25);
        ctx.drawImage(img, 0, 0);
        let modelLabel = viewer.entities.add({

          position: row.position,
          billboard: {
            // image: "/images/kuangche.png", // default: undefined
            image: canvas,
            show: true, // default
            // pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
            scale: 0.8, // default: 1.0
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              10.0,
              5000.0
            ),
            eyeOffset: new Cesium.Cartesian3(0, 3, 0),
          },
        });
        let itemObj = {}
        itemObj.id = row.id
        itemObj.model = entity
        itemObj.label = modelLabel
        if (row.type === 'car') {
          carEntitys.push(itemObj)
        } else if (row.type === 'people') {
          peopleEntitys.push(itemObj)

        } else if (row.type === 'video') {
          videoEntitys.push(itemObj)

        } else if (row.type === 'ramp') {
          rampEntitys.push(itemObj)
        }
      }

      // console.log(123);
      // let modelLabel = viewer.entities.add({
      //   position: row.position,
      //   billboard: {
      //     // image: "/images/kuangche.png", // default: undefined
      //     image: "/images/pop.webp",
      //     show: true, // default
      //     // pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
      //     // eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
      //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
      //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
      //     scale: 0.5, // default: 1.0
      //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      //       10.0,
      //       5000.0
      //     ),
      //     eyeOffset: new Cesium.Cartesian3(0, 3, 0),
      //     // color: Cesium.Color.LIME, // default: WHITE
      //     // rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
      //     // alignedAxis: Cesium.Cartesian3.ZERO, // default
      //     // width: 100, // default: undefined
      //     // height: 25, // default: undefined
      //   },
      // });
      // let itemObj = {}
      // itemObj.id = row.id
      // itemObj.model = entity
      // itemObj.label = modelLabel
      // if (row.type === 'car') {
      //   carEntitys.push(itemObj)
      // } else if (row.type === 'people') {
      //   peopleEntitys.push(itemObj)

      // } else if (row.type === 'video') {
      //   videoEntitys.push(itemObj)

      // } else if (row.type === 'ramp') {
      //   rampEntitys.push(itemObj)
      // }
      // console.log('carEntitys', carEntitys);
      // console.log('peopleEntitys', peopleEntitys);
      // , , videoEntitys, rampEntitys;
      //焦点设置到模型上
      // viewer.trackedEntity = entity;
      // console.log(entity);
      // viewer.zoomTo(
      //   entity
      // );
    },

    //调试 旋转位置
    update3dtilesMaxtrix() {
      var mx = Cesium.Matrix3.fromRotationX(
        Cesium.Math.toRadians(this.tileModelTool.rx)
      );
      var my = Cesium.Matrix3.fromRotationY(
        Cesium.Math.toRadians(this.tileModelTool.ry)
      );
      var mz = Cesium.Matrix3.fromRotationZ(
        Cesium.Math.toRadians(this.tileModelTool.rz)
      );
      var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
      var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
      var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
      //平移 修改经纬度
      var position = Cesium.Cartesian3.fromDegrees(
        this.tileModelTool.longitude,
        this.tileModelTool.latitude,
        this.tileModelTool.height
      );
      var m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      //旋转、平移矩阵相乘
      Cesium.Matrix4.multiply(m, rotationX, m);
      Cesium.Matrix4.multiply(m, rotationY, m);
      Cesium.Matrix4.multiply(m, rotationZ, m);
      //缩放 修改缩放比例
      var scale = Cesium.Matrix4.fromUniformScale(_vue.tileModelTool.scale);
      Cesium.Matrix4.multiply(m, scale, m);
      //赋值给tileset
      tileset._root.transform = m;
    }
  }
}
</script>
<style lang="scss" scoped>
.serachform {
  width: 100%;
  height: 50px;
  background-color: aquamarine;
}

.tileModelTool {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 0px;
  left: 0px;
  color: #fff;
}


#cesiumContainer {
  width: 100%;
  height: 100%;
}

.leftPannel {
  width: 355px;
  height: 100%;
  // background-color: #fff;
  z-index: 99;
  position: absolute;
  left: 10px;
  top: 110px;
  // pointer-events: none;
}

.rightPannel {
  width: 415px;
  height: 100%;
  // background-color: #fff;
  z-index: 99;
  position: absolute;
  right: 10px;
  top: 110px
}

.clfx {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;

  .clfxItem {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 115px;
    margin-right: 10px;

    .clfxItemValue {
      font-size: 20px;

      .unit {
        font-size: 14px;
      }
    }

    .clfxItemName {
      color: rgb(180, 170, 170);

    }
  }
}


.blfx {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;

  .blfxItem {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 160px;
    margin-right: 12px;
    text-align: center;
    font-family: Microsoft YaHei;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .preImg {
      width: 45px;
      height: 45px;
      background-image: url(../../assets/images/iconBorder.webp);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 30px;
      color: rgb(0, 175, 175);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .blfxItemValue {
      font-family: DS-Digital;
      font-weight: 400;
      font-size: 25px;
      color: #FFFFFF;
      text-align: right;

      .unit {
        font-size: 14px;
        color: #00F4F8;
      }
    }

    .blfxItemName {
      text-align: right;
      font-weight: bold;
      color: #00F4F8;
    }
  }
}

.lineState {
  height: 20px !important;
  background: rgba(0, 159, 161, 0.2);
  margin-bottom: 7px;
  padding-left: 25px;
  padding-right: 25px;
}

.lineData {
  height: 35px;
  color: #00F4F8;
  font-weight: bold;
  font-size: 14px;
  padding: 0px 10px;

  .lineLeft {
    // display: inline-block;
    float: left;

    .status {
      color: #fff;
    }

    .statusErr {

      font-weight: bold;
      color: #EF027D;
    }
  }

  .lineRight {
    // display: inline-block;
    float: right;
    cursor: pointer;

    .status {
      color: #fff;
    }

    .statusErr {

      font-weight: bold;
      color: #EF027D;
    }

    .detail {
      color: #00F4F8;
    }
  }
}

.titleLine {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #00F4F8;
}

#yclechartSolt {
  width: 370px;
  height: 160px;

}

#yclechartSolt1 {
  width: 370px;
  height: 160px;

}

#bpchartSolt {
  width: 370px;
  height: 200px;
}

#rclechartSolt {
  width: 370px;
  height: 160px;
}

#rclechartSolt1 {
  width: 370px;
  height: 160px;
}

#cltjechartSolt {
  width: 370px;
  height: 260px;
}

#bjtjchartSolt {
  width: 370px;
  height: 260px;
}

#clfxtjchartSolt {
  width: 370px;
  height: 200px;
}

#clxwtjchartSolt {
  width: 370px;
  height: 200px;
}

#ndblchartSolt {
  width: 370px;
  height: 180px;
}

#ydblchartSolt {
  width: 370px;
  height: 180px;
}

#ysqschartSolt {
  width: 370px;
  height: 180px;
}

#ymclqschartSolt {
  width: 370px;
  height: 300px;
}

#sjxlchartSolt {
  width: 370px;
  height: 200px;
}

#yxlchartSolt {
  width: 370px;
  height: 200px;
}

#RightTlSolt {
  width: 75px;
  height: 75px;
}

#RightTRSolt {
  width: 75px;
  height: 75px;
}

.bottomMenu {
  width: 100%;
  height: 80px;
  position: absolute;
  // background-color: #fff;
  bottom: 40px;
  display: flex;
  justify-content: center;

  .bottomMenuItem {
    margin-right: 40px;

    .MenuImage {
      img {
        width: 45px;
        height: 45px;
      }

    }

    .MenuText {
      text-align: center;
      color: chartreuse;
    }
  }
}

.searchRow {
  display: flex;
}


.peopleTable {
  height: 455px;
  overflow-y: auto;

  &::-webkit-scrollbar-track-piece {
    background-color: unset;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 148, 148, 0.5);
  }

  .tabRow {
    height: 80px;
    margin-top: 15px;
    // background-color: #fff;
    display: flex;
    justify-content: space-between;

    .tabTd1 {
      display: flex;

      .personMess {
        margin-left: 10px;
      }

      .personJob {
        text-align: center;
        width: auto;
        min-width: 60px;
        height: 25px;
        border: 1px solid burlywood;
        border-radius: 5px;
        color: burlywood;
        margin-left: 10px;
      }

      .photo {
        .personImg {
          height: 80px;
          width: 80px;
        }
      }
    }

    .tabTd2 {
      cursor: pointer;
      width: 50px;
      text-align: center;
      color: burlywood;
      // float: right;
    }

  }
}


.videoTable {
  height: 590px;
  overflow-y: auto;

  &::-webkit-scrollbar-track-piece {
    background-color: unset;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 148, 148, 0.5);
  }

  .tabRow {
    height: 45px;
    margin-top: 15px;
    // background-color: #fff;
    border-bottom: 1px solid rgba(184, 182, 182, 0.5);
    display: flex;
    justify-content: space-between;

    .tabTd1 {
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }

    .tabTd2 {
      cursor: pointer;
      width: 50px;
      text-align: center;
      color: burlywood;
      // float: right;
    }

  }
}

.carTable {
  height: 550px;
  overflow-y: auto;

  &::-webkit-scrollbar-track-piece {
    background-color: unset;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 148, 148, 0.5);
  }

  .tabRow {
    height: 45px;
    margin-top: 15px;
    // background-color: #fff;
    border-bottom: 1px solid rgba(184, 182, 182, 0.5);
    display: flex;
    justify-content: space-between;

    .tabTd1 {
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }

    .tabTd2 {
      cursor: pointer;
      width: 50px;
      text-align: center;
      color: burlywood;
      // float: right;
    }

  }
}

#fly_Pop {
  width: 250px;
  height: 350px;
  // background-color: rgba(20, 45, 70, 0.8);
  border-radius: 15px;
  position: absolute;
  top: 400;
  left: 800;
}

.circle {
  width: 200px;
  height: 200px;
  border: 1px solid burlywood;
  border-radius: 100px;
  margin: auto;
  background: linear-gradient(to top right, #a7a8a3, #aab79a, #e2d98c);
  display: flex;
  align-items: center;
  justify-content: center;

  .circleIn {
    width: 180px;
    height: 180px;
    border: 1px solid burlywood;
    border-radius: 90px;
    margin: auto;
    background: rgba(20, 45, 70, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: burlywood;
    font-weight: bold;
  }
}

.textLine {
  color: burlywood;
  text-align: center;
  margin-top: 15px;

}

.videoDetail {
  video {
    height: 160px;
    width: 100%;
  }
}

.statusRow {
  display: flex;
  height: 100px;
  align-items: center;

  .statusItem {
    color: burlywood;
    font-size: 23px;
    width: 120px;
    text-align: center;

    .statusItemLabel {
      margin-top: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
}

.carPop {
  width: 650px;
  height: 235px;
  background-image: url(../../assets/images/carpop.webp);
  color: #fff;
  border-radius: 20px;
  position: relative;
  right: 230px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  .round {
    width: 80px;
    height: 80px;
    background-image: url(../../assets/images/round.webp);
    position: absolute;
    top: -30px;
    left: -35px;
    -webkit-animation: round 5s linear infinite;
  }

  @keyframes round {
    from {
      transform: rotate(0deg);
    }

    /*旋转开始角度*/
    to {
      transform: rotate(360deg);
    }

    /*旋转结束角度*/
  }

  .cartop {
    height: 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;

    div {
      margin-top: 14px;
      margin-left: 40px;
    }
  }

  .carbottom {
    height: 195px;
    width: 650px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .carbottomLeft {
      background-image: url(../../assets/images/carbottomLeft.webp);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 165px;
      height: 165px;
      text-align: center;

      .weight {
        font-size: 40px;
        margin-top: 10px;
      }

      .quantity {

        margin-top: 10px;
      }

      .frequency {
        width: 87px;
        height: 20px;
        background: rgba(255, 217, 45, 0.75);
        border-radius: 5px;
        margin: auto;
      }

      .carbottomLeftBottom {
        margin-top: 5px;
        display: flex;
        justify-content: space-around;
        font-size: 13px;
      }
    }

    .carbottomMiddle {
      background-image: url(../../assets/images/carbottomMiddle.webp);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 242px;
      height: 165px;

      .carbottomMiddleT {
        display: flex;

        .carbottomMiddleTBL {
          width: 115px;
          height: 120px;
        }

        .carbottomMiddleTBR {
          width: 120px;
          height: 120px;
          margin-top: 15px;

          .TBRlist {
            font-size: 12px;
            margin-top: 1px;
            margin-left: 15px;
          }
        }
      }

      .carbottomMiddleBottom {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }

    }

    .carbottomRight {
      width: 155px;
      height: 165px;

      .carbottomRightT {
        height: 75px;
        display: flex;
        font-size: 12px;

        .carbottomRightTl {
          background-image: url(../../assets/images/dirve.webp);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          height: 75px;
          width: 75px;
          position: relative;

          .textDom {
            position: absolute;
            top: 33px;
            left: 25px;


          }

          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        .carbottomRightTR {
          background-image: url(../../assets/images/dirve.webp);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          height: 75px;
          width: 75px;
          position: relative;

          .textDom {
            position: absolute;
            top: 33px;
            left: 25px;


          }

        }
      }

      .carbottomRightB {
        height: 90px;
        background-image: url(../../assets/images/peopleMess.webp);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;

        .carbottomRightBL {
          width: 45px;
          height: 80px;
          display: flex;
          align-items: center;
          margin-top: 8px;
          margin-left: 12px;

          img {
            width: 33px;
            height: 47px;
          }
        }

        .carbottomRightBR {
          width: 100px;
          height: 80px;
          font-size: 12px;

          .line {
            display: flex;
            margin-top: 20px;

            span {
              margin-left: 2px;
            }

            div {
              width: 56px;
              background: rgba(0, 228, 231, 0.75);
              border-radius: 3px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

}

.backAnime {
  position: absolute;
  bottom: 30px;
  right: 20px;
}

.cylinderGroup {
  display: flex;
  justify-content: space-around;
}

.cylinder {
  position: relative;
  overflow: hidden;
  // margin: 0 auto;
  width: 100px;
  height: 110px;
  border-radius: 50px/25px;
  background-color: rgba(160, 160, 160, 0.5);
}

.cylinder:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 50px;
  border-radius: 50px/25px;
  background-color: rgba(160, 160, 160, 0.2);
  content: '';
}

.cylinder:after {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 50px;
  border-radius: 50px/25px;
  background-color: rgba(160, 160, 160, 0.4);
  content: '';
}

.water {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 10px;
  padding-top: 50px;
  border-radius: 50px/25px;
  background-color: rgba(7, 91, 164, 0.5);
  transition: 0.3s linear;
}

.water:before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 50px;
  border-radius: 50px/25px;
  background-color: rgba(7, 91, 164, 0.5);
  content: '';
}

.water:after {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 50px;
  border-radius: 50px/25px;
  background-color: rgba(7, 91, 164, 0.5);
  content: '';
}

.ymclqs {
  position: relative;

  .btnGroup {
    position: absolute;
    display: flex;
    top: 0px;
    right: 0px;
  }
}

.allback {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/allback.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  pointer-events: none;
}

.safeTitle {
  height: 30px;
  font-weight: bold;
  color: #00F4F8;
}

.safeBody {
  height: 85px;
  display: flex;

  .circle {
    width: 85px;
    height: 85px;
    border: 1px solid rgb(237, 227, 213);
    border-radius: 100px;
    margin: auto;
    background: rgba(0, 175, 175, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;

    .circleIn {
      width: 70px;
      height: 70px;
      border: 1px solid rgb(237, 227, 213);
      border-radius: 90px;
      margin: auto;
      background: rgba(20, 50, 50, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      flex-direction: column;
    }
  }
}

.caricons {
  cursor: pointer;
}

.el-button--primary {
  background-color: rgb(0, 175, 175) !important;
}

.phoneIcon {
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: yellow;
  }
}

.allScreenVideo {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 5;
}

.allScreenImg {
  position: absolute;
  width: 100%;
  height: 90%;
  left: 0px;
  bottom: 0px;
  z-index: 5;
}
</style> 
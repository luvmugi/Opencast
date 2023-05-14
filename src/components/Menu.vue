<template>
  <el-menu default-active="ztqk" class="el-menu-demo" mode="horizontal" background-color="unset" @select="handleSelect">
    <el-sub-menu index="1">
      <template #title>总体情况</template>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="ztqk">总体情况</el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="cqmy">厂区漫游</el-menu-item>
      </router-link>
      <!-- <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="sjxz">三级下钻</el-menu-item>
      </router-link> -->
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>安全专题</template>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="bianpo">边坡</el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="shipinjiankong">视频监控</el-menu-item>
      </router-link>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>生产调度</template>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="renyuanguanli">人员管理</el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="cheliangguanli">车辆管理</el-menu-item>
      </router-link>
      <!-- <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="shengchanqingkuang">
          生产情况
        </el-menu-item>
      </router-link> -->
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="ryytx">
          人员一条线
        </el-menu-item>
      </router-link>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>采矿专题</template>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="shengchanqingkuang">采剥情况</el-menu-item>
      </router-link>
      .
      <router-link to="/water" style="color: #fff; text-decoration:none;">
        <el-menu-item index="kxps">智能排水</el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="sbfmy">
          水泵房漫游
        </el-menu-item>
      </router-link>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>机电管理</template>
      <!-- <router-link to="/water" style="color: #fff; text-decoration:none;">
        <el-menu-item index="kxps">
          坑下排水
        </el-menu-item>
      </router-link> -->
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="pdysgk">
          皮带运输管控
        </el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="pdysmy">
          皮带运输漫游
        </el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="gdmyxj">
          供电漫游巡检
        </el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="swkv">
          35KV
        </el-menu-item>
      </router-link>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>经营管理</template>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="jygl">
          经营管理
        </el-menu-item>
      </router-link>
      <router-link to="/CesiumHome" style="color: #fff; text-decoration:none;">
        <el-menu-item index="cbgk">
          成本管控
        </el-menu-item>
      </router-link>
    </el-sub-menu>
    <el-sub-menu index="7">
      <template #title>综合报表</template>
    </el-sub-menu>
  </el-menu>
</template>
<script>

export default {
  name: 'menu',
  // mounted() {
  // 	console.log(process.env.VUE_APP_BASE_API)
  // },
  methods: {
    handleSelect(index) {
      this.$emit('changeMenu', index)
    }
  }
}
</script>

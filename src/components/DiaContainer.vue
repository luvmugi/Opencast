<template>
    <el-card :style="'height:' + diaHeiht" class="box-card">
        <template #header>
            <!-- <div class="card-header"> -->
            <!-- <div class="orage"></div> -->
            <span class="titleText">{{ diaTitle }}</span>
            <!-- </div> -->
        </template>
        <div style="margin:auto">
            <slot></slot>
        </div>
    </el-card>
</template>
<script>

export default {
    props: {
        "diaHeiht": { type: String, default: "200px" },
        "diaTitle": { type: String, default: "默认标题" },
    },
    name: 'diaContainer',
    // mounted() {
    // 	console.log(process.env.VUE_APP_BASE_API)
    // },
}
</script>

<style lang="scss" scoped>
.box-card {
    background-color: unset;
}

.el-card {
    font-family: Microsoft YaHei !important;
    border: unset;
    margin-bottom: 15px;

    ::v-deep .el-card__header {
        height: 40px;
        background-image: url(../assets/images/titlebj.webp);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        // padding: 8px;
        padding-left: 30px;
        border-bottom: unset;
        margin: auto 0px;
        font-size: 20px;
        color: #FFFFFF;
        // display: flex;
        // align-items: center;
    }
}

.titleText {
    position: relative;
    bottom: 14px;
}

// .orage {
//     width: 5px;
//     height: 15px;
//     display: inline-block;
//     background-color: rgb(242, 242, 214);
//     margin-right: 15px;
// }
</style>
  
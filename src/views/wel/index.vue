<template>
  <div>
    <basic-container>
      <el-row :gutter="20">
        <el-col :span="7">
          <avue-card :option="option" :data="card_data" @row-click="handleUser">
            <template slot="menu" slot-scope="scope">
              <div class="user-task" @click.stop="handleTask(scope.row,scope.index)">
                <div>待处理任务 <span class="user-task_count">4</span></div>
                <div>>></div>
              </div>
            </template>
          </avue-card>
        </el-col>
        <el-col :span="7">
          <div class="shortcuts">
            <div class="shortcuts-item">
              <el-button class="shortcuts-icon" type="primary" icon="el-icon-edit"></el-button>
              <div>快捷方式</div>
            </div>
            <div class="shortcuts-item">
              <el-button class="shortcuts-icon" type="primary" icon="el-icon-edit"></el-button>
              <div>快捷方式</div>
            </div>
            <div class="shortcuts-item">
              <el-button class="shortcuts-icon" type="primary" icon="el-icon-edit"></el-button>
              <div>快捷方式</div>
            </div>
            <div class="shortcuts-item">
              <el-button class="shortcuts-icon" type="primary" icon="el-icon-edit"></el-button>
              <div>快捷方式</div>
            </div>
            <div class="shortcuts-item">
              <el-button class="shortcuts-icon" type="primary" icon="el-icon-edit"></el-button>
              <div>快捷方式</div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="message-box">
            <el-row>
              <el-col :span="20" class="message-title">通知</el-col>
              <el-col :span="4" class="message-more"><span  @click="handleMessageMore">更多 >></span></el-col>
            </el-row>
            <el-row class="message-item" v-for="item,index in noticeList" v-bind:key='index'>
              <el-col :span="18" class="message-item_title">{{item.categoryName}}{{item.title}}{{item.content}}</el-col>
              <el-col :span="6" class="message-item_date">{{item.releaseTime}}</el-col>
            </el-row>
             <!-- <el-row class="message-item">
              <el-col :span="20" class="message-item_title">谁谁谁谁，发布了什么什么谁谁谁谁，发布了什么什么什么谁谁谁谁，发布了什么什么什么谁谁谁谁，发布了什么什么什么什么</el-col>
              <el-col :span="4" class="message-item_date">2022-09-09</el-col>
            </el-row>
             <el-row class="message-item">
              <el-col :span="20" class="message-item_title">谁谁谁谁，发布了什么什么什么</el-col>
              <el-col :span="4" class="message-item_date">2022-09-09</el-col>
            </el-row>
             <el-row class="message-item">
              <el-col :span="20" class="message-item_title">谁谁谁谁，发布了什么什么什么</el-col>
              <el-col :span="4" class="message-item_date">2022-09-09</el-col>
            </el-row>
             <el-row class="message-item">
              <el-col :span="20" class="message-item_title">谁谁谁谁，发布了什么什么什么</el-col>
              <el-col :span="4" class="message-item_date">2022-09-09</el-col>
            </el-row>
             <el-row class="message-item">
              <el-col :span="20" class="message-item_title">谁谁谁谁，发布了什么什么什么谁谁谁谁，发布了什么什么什么</el-col>
              <el-col :span="4" class="message-item_date">2022-09-09</el-col>
            </el-row> -->
          </div>
        </el-col>
      </el-row>
       <el-row :gutter="20">
          <el-col :span="16">
            <div class="document-box">
              <div class="document-item">
                <img class="document-item_img" />
                <div class="document-item_count">123</div>
                <div class="document-item_title">文档数量</div>
              </div>
              <div class="document-item">
                <img class="document-item_img" />
                <div class="document-item_count">123</div>
                <div class="document-item_title">产品数</div>
              </div>
               <div class="document-item">
                <img class="document-item_img" />
                <div class="document-item_count">123</div>
                <div class="document-item_title">产品数</div>
              </div>
               <div class="document-item">
                <img class="document-item_img" />
                <div class="document-item_count">123</div>
                <div class="document-item_title">产品数</div>
              </div>
               <div class="document-item">
                <img class="document-item_img" />
                <div class="document-item_count">123</div>
                <div class="document-item_title">产品数</div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div id="document-box-pie" class="document-box-pie"></div>
          </el-col>
       </el-row>
       <el-row :gutter="20">
        <el-col :span="24">
          <div id="document-box-line" class="document-box-line"></div>
        </el-col>
       </el-row>
    </basic-container>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
  import {getList} from "@/api/dept/notice";
  import * as echarts from 'echarts';
 
  var option;
  option = {
    title: {
      text: '文档分类占比',
      subtext: '',
      left: 20,
      top: 15,
      textStyle:{
        fontWeight:100,
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top:"center",
      right:15,
      itemWidth:20,
      itemHeight:20,
      textStyle:{
        fontSize:14
      }
    },
    
  };
  var series = [
    {
      type: 'pie',
      radius: '70%',
      left:'-10%',
      data: [
        { value: 1048, name: '设计文档' },
        { value: 735, name: '工艺文档' },
        { value: 580, name: '管理文档' },
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
var document_year_line_option = {
  title: {
    text: '年度数量变化趋势',
    left: 20,
    top: 15,
    textStyle:{
      fontWeight:100,
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    orient: 'vertical',
    top:"center",
    right:15,
    itemWidth:20,
    itemHeight:20,
    textStyle:{
      fontSize:14
    },
    data: ['文档数', '产品数', '零部件数'],
  },
  grid: {
    left: '3%',
    right: '10%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2019', '2020', '2021', '2022', '2023']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '文档数',
      type: 'line',
      
      data: [101, 134, 90, 230, 210]
    },
    {
      name: '产品数',
      type: 'line',
      
      data: [191, 234, 290, 330, 310]
    },
    {
      name: '零部件数',
      type: 'line',
      
      data: [201, 154, 190, 330, 410]
    },
  ]
};
  export default {
    name: "wel",
    data() {
      return {
        option: {
            addBtn:false,
            span:24,
            props: {
              img: 'img',
              title: 'title',
              info: 'info',
            }
          },
      };
    },
    computed: {
      ...mapGetters(["userInfo","noticeList"]),
      card_data(){
        return [{
          title:this.userInfo.userName,
          info:'早上好',
          img:this.userInfo.avatar
        }]
      },
    },
    async created() {
      console.log(this.userInfo)
      const {data} = await getList()
      this.refreshNoticeList()
      var document_pie_dom = document.getElementById('document-box-pie');
      var document_pie = echarts.init(document_pie_dom);
      option && document_pie.setOption(option);
      document_pie.setOption({series});
      var document_line_dom = document.getElementById('document-box-line');
      var document_line  = echarts.init(document_line_dom)
      document_line.setOption(document_year_line_option)
      window.addEventListener('resize', function() {
        document_pie.resize();
        document_line.resize();
      });
    },
    methods: {
      ...mapActions({
        refreshNoticeList:'notice/REFRESH_NOTICELIST'
      }),
      handleChange(val) {
        console.log(val);
      },
      handleUser(row, index){
        console.log('点击用户')
      },
      handleTask(row, index){
        console.log('点击待处理任务')
      },
      //点击更多通知
      handleMessageMore(){
        console.log('点击更多通知')
        console.log('noticeList',this.noticeList)
        this.$router.push('/notice/index')
      }
    }
  };
</script>

<style lang="scss">
  $border:1px solid #e8e8e8;
  .el-divider--horizontal {
    margin: 12px 0 !important;
  }

  .el-font-size {
    font-size: 14px;
  }
  .user-task{
    width:100%;
    display: flex;
    padding:0 20px;
    justify-content: space-between;
    .user-task_count{
      font-size:23px;
      font-weight: bold;
    }
  }
  
  .avue-card__item{
    margin-bottom:0px !important;
  }

  .shortcuts{
    border:$border;
    height:200px;
    padding:0 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .shortcuts-item{ 
      width:33%;
      box-sizing: border-box;
      margin-top:23px;
      text-align: center;
      font-size:14px;
      cursor: pointer;
      .shortcuts-icon{
        padding:12px;
      }
    }
  }
  .message-box{
    border:$border;
    box-sizing: border-box;
    height:200px;
    padding:20px 15px;
    overflow: hidden;
    .message-more{
      cursor: pointer;
      text-align: right;
    }
    .message-item{
      line-height: 22px;
      .message-item_title{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .message-item_date{
        text-align: right;
      }
    }
  }
  .document-box{
    border:$border;
    padding:20px;
    height:260px;
    box-sizing: border-box;
    align-items: center;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .document-item_img{
      width:60px;height:60px;
      background:#ccc;
    }
    .document-item_count{
      font-size:28px;
    }
  }
  .document-box-pie{
    border:$border;
    height:260px;
  }
  .document-box-line{
    border:$border;
    height:260px;
    margin-top:5px;
  }
</style>


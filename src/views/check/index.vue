<template>
  <basic-container>
    <avue-crud class="check_module" 
    :option="option" 
    :permission="permissionList"
    :table-loading="loading"
    :data="data" 
    :page="page"
    :before-open="beforeOpen">
      <template slot-scope="{ row }" slot="check_status">
        <el-tag>{{ row.$check_status }}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  data() {
    return {
      form: {},
      query: {},
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 20,
      },
      option: {
        height: "auto",
        calcHeight: 210,
        searchShow: true,
        tip: false,
        border: true,
        index: true,
        indexLabel: "序号",
        labelWidth: "150",
        addBtn:false,
        viewBtn: true,
        editBtn: true,
        editBtnText:"审核",
        editTitle:'审核',
        delBtn: false,
        header:true,
        emptyBtnText:'重置',
        emptyBtnIcon:'el-icon-refresh',
        searchMenuSpan:4,
        searchMenuPosition:'right',
        span: 24,
        dialogWidth:'30%',
        column: [
          {
            label: "产品/零部件名称",
            labelWidth: "150",
            prop: "pruduct_name",
            editDisplay:false
          },
          {
            label: "审核事项",
            prop: "check_func",
            editDisplay:false
          },
          {
            label: "申请类型",
            prop: "check_type",
            editDisplay:false,
            search: true,
          },
          {
            label: "影响产品数",
            prop: "emit_count",
            editDisplay:false
          },
          {
            label: "任务状态",
            prop: "check_status",
            type: "select",
            dicUrl:"/api/blade-system/dict/dictionary?code=check",
            props: {
              label: "dictValue",
              value: "dictKey",
            },
             slot: true,
            
            search: true,
            rules: [
              {
                required: true,
                message: "请输入通知类型",
                trigger: "blur",
              },
            ],
          },
          {
            label: "时间",
            prop: "check_date",
            editDisplay:false
          },
          {
            label: "发起人",
            prop: "check_person",
            editDisplay:false
          },
        ],
      },
      data: [
        {
          pruduct_name: "产品名称1",
          check_func: "审核事项1",
          check_type: "申请类型1",
          emit_count: "123",
          check_status: 1,
          check_date: "时间1",
          check_person: "发起人1",
        },
      ],
    };
  },
  computed:{
    ...mapGetters(["permission"]),
      permissionList() {
        return {
          viewBtn: this.vaildData(this.permission.check_view, false),
          editBtn: this.vaildData(this.permission.check_edit, false)
        };
      },
  },
  mounted(){
    console.log(this.permission)
  },
  methods: {
    beforeOpen(done,type){
      console.log(type)
     
      done()
    },
    //审批
    check(row, index) {
      console.log(row,index);
      
    },
     checked(row) {
      console.log(row);
    },
  },
};
</script>

<style>
.check_module .avue-form__group{
  justify-content: end;
}
</style>
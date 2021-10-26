<!-- 确认框 -->
<template>
  <div class="confirm">
    <van-popup
      v-model:show="show"
      :close-on-click-overlay="false"
      :close-on-popstate="true"
    >
      <div class="modal">
        <div class="top">
          {{ title }}
          <div class="close" @click="onClose">
            <van-icon name="cross" color="#fff" />
          </div>
        </div>
        <div class="middle">{{ content }}</div>
        <div class="bottom">
          <div class="left" @click="onEnsure">{{ okText }}</div>
          <div class="right" @click="onClose">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang='ts'>
import { reactive, ref, onBeforeMount, onMounted, defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "标题",
    },
    content: {
      type: String,
      default: "",
    },
    okText: {
      type: String,
      default: "确认",
    },
    callback: {
      type: Function,
      default: () => {},
    },
    destory: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const show = ref(true);
    //点击确定
    const onEnsure = () => {
      props.callback();
      props.destory(); //销毁组件
    };

    //关闭弹出框
    const onClose = () => {
      props.destory(); //销毁组件
    };

    return {
      show,
      onEnsure,
      onClose,
    };
  },
});
</script>
<style scoped lang="less">
.confirm {
  & /deep/ .van-popup {
    border-radius: 20px;
  }
  .modal {
    width: 612px;
    margin: 0 auto;
    border-radius: 10px;
    .top {
      height: 84px;
      line-height: 84px;
      text-align: center;
      color: #fff;
      font-size: 32px;
      background-color: rgb(63, 192, 174);
      position: relative;
      .close {
        position: absolute;
        right: 32px;
        top: 28px;
        display: flex;
      }
    }
    .middle {
      height: 208px;
      background-color: #fff;
      padding-left: 45px;
      padding-right: 45px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: rgb(80, 85, 104);
      border-bottom: 1px solid rgb(204, 204, 204);
    }
    .bottom {
      height: 92px;
      font-size: 35px;
      display: flex;
      .left,
      .right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .left {
        border-right: 1px solid rgb(204, 204, 204);
        color: rgb(63, 192, 172);
      }
    }
  }
}
</style>
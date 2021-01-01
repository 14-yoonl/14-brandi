<template>
  <div class="headerContainer">
    <div class="title">
      <slot name="title">
        <h1 class="mainTitle">메인 타이틀</h1>
        <span class="subTitle">서브 타이틀</span>
      </slot>
    </div>
    <div>
      <slot name="notice">
        <p class="notice">
          ( 공지사항 내용 중 첫번째 줄)
        </p>
        <p class="notice">
          ( 공지사항 내용 중 두번째 줄)
        </p>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminHeader",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.headerContainer {
  background-color: white;
  padding: 10px 10px 0 10px;
  border-radius: 10px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  .title {
    display: flex;
    align-items: center;
    margin: 5px;

    .mainTitle {
      font-size: 28px;
    }

    .subTitle {
      margin-left: 5px;
      margin-bottom: -10px;
      font-size: 16px;
    }
  }

  .notice {
    margin: 5px;
    color: #888888;
    font-size: 13px;
  }
}
</style>

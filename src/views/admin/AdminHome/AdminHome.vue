<template>
  <div class="AdminHome">
    <div class="wrap">
      <div class="processContainer">
        <div class="salesProcessBox">
          <div class="productPrepare">
            <span>상품 준비 : </span>
            <span>0건</span>
          </div>
          <div class="deliveryPrepare">
            <span>배송 준비 : </span>
            <span>0건</span>
          </div>
          <div class="deliveryOnGoing">
            <span>배송 중 : </span>
            <span>0건</span>
          </div>
          <div class="deliveryCompleted">
            <span>배송 완료 : </span>
            <span>0건</span>
          </div>
          <div class="orderConfirm">
            <span>구매 확정 : </span>
            <span>0건</span>
          </div>
        </div>
        <div class="refundProcessBox">
          <div class="reqeustRefund">
            <span>환불 요청 : </span>
            <span>0건</span>
          </div>
          <div class="returnOnGoing">
            <span>반품 진행 : </span>
            <span>0건</span>
          </div>
          <div class="cancelOrder">
            <span>주문 취소중 : </span>
            <span>0건</span>
          </div>
          <div class="confirmRefund">
            <span>환불 승인중 : </span>
            <span>0건</span>
          </div>
        </div>
        <div class="productBox">
          <div class="bookmarkedCount">
            <span>즐겨찾기 수 : </span>
            <span>0건</span>
          </div>
          <div class="allProductCount">
            <span>전체 상품 수 : </span>
            <span>0건</span>
          </div>
          <div class="showProductCount">
            <span>노출 상품 수 : </span>
            <span>0건</span>
          </div>
        </div>
      </div>
      <div class="statisticsContainer">
        <div class="orderQuantityCountBox"></div>
        <div class="orderRevenueCountBox"></div>
      </div>
      <div class="etcContainer">
        <div class="qnaBox"></div>
        <div class="noticeBox"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "adminHome",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.AdminHome {
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 10px;
  border-radius: 10px 0 0 10px / 10px 0 0 10px;
  background-color: #f3f4f7;

  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    border: 1px solid red;
  }
}
</style>

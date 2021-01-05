<template>
  <div class="container">
    <div class="senderContainer">
      <div class="senderTitle">
        <h2>주문자 정보</h2>
      </div>
      <div class="senderBox">
        <div class="senderWrap">
          <div class="senderInfo">이름</div>
          <div class="contact nameInput">
            <input type="text" class="senderName" placeholder="이름" maxlength="8"/>
          </div>
        </div>
        <div class="senderWrap">
          <div class="senderInfo">전화번호</div>
          <div class="contact phoneInput">
            <input type="tel" name="phone1" maxlength="3" />
            <span>-</span>
            <input type="tel" name="phone2" maxlength="4" />
            <span>-</span>
            <input type="tel" name="phone2" maxlength="4" />
          </div>
        </div>
        <div class="senderWrap">
          <div class="senderInfo emailInput">이메일</div>
          <div class="contact">
            <input type="text" name="email1" maxlength="3" />
            <span>@</span>
            <input type="text" name="email2" maxlength="4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.senderContainer{
  width: 100%;
  color: #1e1e1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .senderTitle{
    width: 1240px;
    margin: 90px 0 0 0;
    border-bottom: 1px solid #000000;
    h2{
      font-size: 26px;
    }
  }
  .senderBox{
    &:last-child{border-bottom: 2px solid #000000}
    width: 1240px;
    .senderWrap {
      border-bottom: 1px solid #bdbdbd;
      .senderInfo {
        width: 248px;
        height: 100%;
        font-size: 15.6px;
        font-weight: bold;
        padding: 15px 10px 15px 10px;
        display: inline-block;
      }
      .contact {
        padding: 10px 15px 15px 10px;
        display: inline-block;
      }
      .nameInput{
        width: 980px;
        .senderName{
          width: 950px;
        }
      }
      input {
        background-color: #f5f5f5;
        margin: 3px 0;
        padding: 13px;
        border: none;
      }
    }
  }
}
</style>

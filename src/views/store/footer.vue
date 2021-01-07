<template>
  <div class="footerFrame">
    <div class="footerContainer">
      <div class="footerWrap">
        <div class="footerTop">
          <div class="topLeft">
            <div>고객센터 1566-6575</div>
            <p>영업시간 : AM 10:00 ~ PM 17:00 (주말 및 공휴일 휴무)</p>
            <p>점심시간 : PM 12:30 ~ PM 13:30</p>
          </div>
          <div class="topRight">
            <div>
              <a href="https://www.brandi.co.kr/faq">
                <img
                  src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_01.png"
                  alt="고객센터"
                />자주 묻는 질문
              </a>
            </div>
            <div>
              <a href="https://pf.kakao.com/_xexkxcxkl">
                <img
                  src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_02.png"
                  alt="고객센터"
                />카카오톡 플러스 친구</a
              >
            </div>
            <div>
              <a href="https://www.facebook.com/brandiapp/">
                <img
                  src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_03.png"
                  alt="고객센터"
                />페이스북</a
              >
            </div>
            <div>
              <a href="https://www.instagram.com/brandi__official/">
                <img
                  src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_04.png"
                  alt="고객센터"
                />인스타그램</a
              >
            </div>
          </div>
        </div>
        <div class="footerBottom">
          <div class="bottomLeft"></div>
          <div class="bottomRight">
            <a href="/admin/home"
              ><img
                src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_05.png"
                alt=""
              /><span>셀러어드민</span></a
            >
            <a href="http://www.brandiinc.com/brandi">
              <img
                src="https://www.brandi.co.kr/static/20.09.01/images/icon_footer_06.png"
                alt=""
              />
              <span>입점문의</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footerFrame {
  display: block;
  width: 100%;
  margin-top: 50px;
  padding: 20px 0;
  background-color: black;
  color: white;
  border: 1px solid white;

  a {
    text-decoration: none;
    color: white;
  }
  .footerContainer {
    width: 100%;
    padding: 20px 0;
    border: 1px solid purple;

    .footerWrap {
      margin: 0 auto;
      padding: 0 30px;

      .footerTop {
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;

        .topLeft {
          font-size: 13px;

          div {
            font-size: 33px;
            font-weight: 900;
          }

          p {
            padding: 0;
            margin: 0;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
          }
        }

        .topRight {
          display: flex;
          div {
            img {
              width: 25px;
            }
          }
        }
      }

      .footerBottom {
        display: flex;
        justify-content: space-between;
        padding: 40px 0;
      }
    }
  }
}
</style>

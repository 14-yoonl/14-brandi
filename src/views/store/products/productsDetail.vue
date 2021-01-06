<template>
  <div class="productsDetails">
    <NavBar class="nav"></NavBar>
    <div class="detailFrame">
      <div class="productDetail">
        <!-- 위쪽 사진 & 정보 -->
        <div class="datailTop">
          <!-- 왼쪽 사진-->
          <div class="thumbnails">
            <div class="mainImg">
              <img
                src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                alt=""
              />
            </div>
            <div class="postPictures">
              <ul>
                <li v-for="picture in postPictures" :key="picture.image_id">
                  <img :src="picture.image_url" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 오른쪽 상세정보 & 옵션 선택창 -->
          <div class="productOptions">
            <div class="detailSeller">{{ detail.seller_name }}</div>
            <div class="detailTitle">{{ detail.product_name }}</div>
            <div class="price">
              <div class="detailDiscount">
                {{ detail.discount_rate * 100 }}%
              </div>
              <div class="detailPrice">{{ detail.discounted_price }}원</div>
              <div class="originPrice">{{ detail.origin_price }}원</div>
            </div>

            <div class="options">
              <select v-model="pickColor">
                <option v-for="option in items" :key="option.color_name">{{
                  option.color_name
                }}</option>
              </select>
              <select v-model="pickSize">
                <option v-for="option in size" :key="option.size_id"
                  >{{ option.size_name }}
                </option>
              </select>
            </div>
            <div class="pickedOption">
              <div>{{ pickColor }}</div>
              <div>{{ pickSize }}</div>
              <div>{{ detail.discounted_price }}원</div>
            </div>
            <div class="detailTotalPrice">
              <span>총 상품 금액</span
              ><span> {{ detail.discounted_price }}원</span>
            </div>
            <div class="detailBuySection">
              <router-link to="/">바로 구매</router-link>
            </div>
          </div>
          <!-- 하단 상세 정보 및 사진들 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../navBar";
import axios from "axios";
export default {
  props: ["product_id"],
  state: [],
  data() {
    return {
      detail: {},
      items: [],
      size: [],
      pickColor: "",
      pickSize: "",
      postPictures: []
    };
  },
  mounted() {
    axios
      .get(
        `http://192.168.40.118:5000/products/${this.$router.history.current.params.id}`,

        {
          Authorization: localStorage.getItem("token")
        }
      )

      .then(res => {
        (this.$data["detail"] = res.data.result),
          (this.items = res.data.result.colors),
          (this.size = res.data.result.sizes),
          (this.postPictures = res.data.result.images);
      });
  },
  components: {
    NavBar: NavBar
  }
};
</script>

<style lang="scss" scoped>
.productsDetails {
  width: 100%;
  .nav {
    margin: 0 auto;
  }
  .detailFrame {
    width: 100%;

    padding: 0 150px;
    .productDetail {
      width: 100%;

      .datailTop {
        display: flex;

        justify-content: space-between;
        .thumbnails {
          width: 50%;
          height: 725px;
          margin: 0 15px;

          .mainImg {
            width: 100%;
            height: 80%;

            img {
              width: 100%;
              height: 100%;
            }
          }
          .postPictures {
            width: 100%;
            height: 20%;

            ul {
              display: flex;
              padding: 0;
              text-decoration: none;
              list-style: none;

              li {
                padding: 2px;
                margin: 2px;
                width: 85px;
                height: 85px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }

        .productOptions {
          width: 50%;
          margin: 0 15px;
          padding: 0 20px;
          font-weight: 500;

          .detailSeller {
            font-size: 26px;
          }

          .detailTitle {
            font-size: 30px;
          }

          .price {
            display: flex;
            padding-bottom: 25px;
            margin-bottom: 10px;
            border-bottom: 1px solid #c5c5c5;

            div {
              margin-right: 5px;
            }

            .detailDiscount {
              font-size: 34px;
              font-weight: 900;
              color: red;
            }

            .detailPrice {
              font-size: 34px;
              font-weight: 900;
            }

            .originPrice {
              padding-top: 17px;
              font-size: 20px;
              color: #c5c5c5;
              text-decoration-line: line-through;
            }
          }

          .options {
            display: flex;
            flex-direction: column;
            padding: 0;
            border-bottom: 1px solid #c5c5c5;

            select {
              margin: 5px 0;
              height: 50px;
              border: 1px solid #c5c5c5;
              border-radius: 5px;

              &:last-child {
                margin-bottom: 15px;
              }
            }
          }

          .pickedOption {
            margin-top: 30px;
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}
</style>

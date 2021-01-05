<template>
  <div class="ProductSalesInfo">
    <DataTable>
      <template v-slot:header>판매 정보</template>
      <template v-slot:body>
        <tr>
          <td>
            판매가
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <div class="price">
              <div class="inputForm">
                <v-text-field
                  v-model="originPriceValidate"
                  placeholder="판매가를 입력해주세요."
                  reverse
                ></v-text-field>
                <span>원</span>
              </div>
              <div class="notice">
                <v-icon small>mdi-alert</v-icon>판매가는 원화기준 10원 이상이며
                가격 입력 시 10원 단위로 입력해 주세요.
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>할인정보</td>
          <td>
            <table>
              <tbody>
                <tr>
                  <td>할인율</td>
                  <td>
                    <div class="price">
                      <div class="inputForm">
                        <v-text-field
                          type="number"
                          placeholder="할인율 (%)"
                          reverse
                          max="100"
                          min="0"
                          @input="setData('discountRate', Number($event))"
                        ></v-text-field>
                        <span>%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>할인가</td>
                  <td>
                    <div class="price">
                      <div class="inputForm">
                        <v-text-field
                          readonly
                          :value="discountPrice | comma"
                          placeholder="할인판매를 눌러주세요"
                        ></v-text-field>
                        <span>원</span>
                      </div>
                      <v-btn
                        depressed
                        color="primary"
                        @click="salesCalculation"
                      >
                        할인판매
                      </v-btn>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>할인 판매가</td>
                  <td>
                    <div class="price">
                      <div class="inputForm">
                        <v-text-field
                          :value="discountedPrice | comma"
                          readonly
                          placeholder="할인판매를 눌러주세요"
                        ></v-text-field>
                        <span>원</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>할인 기간</td>
                  <td>
                    <v-radio-group
                      row
                      :value="discountState"
                      @change="$emit('update:discountState', $event)"
                    >
                      <v-radio :label="`무기한`" :value="false"></v-radio>
                      <v-radio :label="`기한설정`" :value="true"> </v-radio>
                    </v-radio-group>
                    <div v-if="discountState">
                      <DateTimePicker
                        :setDate.sync="setStartDate"
                        :label="'시작날짜'"
                      ></DateTimePicker>
                      <DateTimePicker
                        :setDate.sync="setEndDate"
                        :label="'종료날짜'"
                      ></DateTimePicker>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon> 할인판매가 = 판매가 * 할인율
            </div>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>할인 판매가 적용 버튼을 클릭
              하시면 판매가 정보가 자동 계산되어집니다.
            </div>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>할인 판매가는 원화기준 10원 단위로
              자동 반올림됩니다.
            </div>
          </td>
        </tr>
        <tr>
          <td>최소판매수량</td>
          <td>
            <v-radio-group :value="minimumQuantityType" row>
              <v-radio
                :label="` 1 개 이 상`"
                :value="false"
                @change="setData(`minimumQuantity`, 0)"
              ></v-radio>
              <v-radio
                :value="true"
                @change="setData(`minimumQuantity`, $refs.minOthers.value)"
              >
                <template v-slot:label>
                  <v-text-field
                    ref="minOthers"
                    type="number"
                    single-line
                    outlined
                    :value="minimumQuantity"
                    @input="setData(`minimumQuantity`, Number($event))"
                  ></v-text-field>
                  개 이상</template
                >
              </v-radio>
            </v-radio-group>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>20개를 초과하여 설정하실 수
              없습니다
            </div>
          </td>
        </tr>
        <tr>
          <td>최대판매수량</td>
          <td>
            <v-radio-group :value="maximumQuantityType" row>
              <v-radio
                :label="`20개 이하`"
                :value="false"
                @change="setData(`maximumQuantity`, 0)"
              ></v-radio>
              <v-radio
                :value="true"
                @change="setData(`maximumQuantity`, $refs.maxOthers.value)"
              >
                <template v-slot:label>
                  <v-text-field
                    ref="maxOthers"
                    type="number"
                    single-line
                    outlined
                    :value="maximumQuantity"
                    @input="setData(`maximumQuantity`, Number($event))"
                  ></v-text-field>
                  개 이하</template
                >
              </v-radio>
            </v-radio-group>
            <div class="notice">
              <v-icon small>mdi-alert</v-icon>20개를 초과하여 설정하실 수
              없습니다
            </div>
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "../../../components/common/DataTable";
import DateTimePicker from "../../../components/common/DateTimePicker";

export default {
  props: {
    originPrice: { type: Number },
    discountedPrice: { type: Number },
    discountStartDate: { type: String },
    discountEndDate: { type: String },
    discountRate: { type: Number },
    maximumQuantity: { type: Number },
    minimumQuantity: { type: Number },
    discountState: { type: Boolean }
  },

  components: {
    DataTable,
    DateTimePicker
  },

  mounted() {
    this.maximumQuantityType = this.maximumQuantity ? true : false;
    this.minimumQuantityType = this.minimumQuantity ? true : false;
  },

  data() {
    return {
      maximumState: true,
      minimumState: true,
      discountPrice: "",
      maximumQuantityType: false,
      minimumQuantityType: false
    };
  },
  methods: {
    salesCalculation(e) {
      if (!this.originPrice) {
        alert("판매가 입력은 필수 입니다");
        event.stoppropagation();
      }

      if (!this.discountRate > 0 || this.discountRate > 101) {
        alert("할인은 0 ~ 100% 사이입니다");
        event.stoppropagation();
      }

      this.discountPrice = Math.floor(
        (this.originPrice / 100) * this.discountRate
      );

      this.setData("discountedPrice", this.originPrice - this.discountPrice);
    }
  },
  computed: {
    //데이터 부모로 보내기 위한 함수
    setData() {
      return (param, value) => this.$emit(`update:${param}`, value);
    },

    setStartDate: {
      get: function() {
        return this.discountStartDate;
      },
      set: function(value) {
        this.$emit("update:discountStartDate", value);
      }
    },

    setEndDate: {
      get: function() {
        return this.discountEndDate;
      },
      set: function(value) {
        this.$emit("update:discountEndDate", value);
      }
    },

    //판매가 유효성 체크
    originPriceValidate: {
      get: function() {
        return String(this.originPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set: function(value) {
        this.setData("originPrice", Number(value.replace(/[^\d]+/g, "")));
      }
    }
  },

  //천단위 계산 함수
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
<style lang="scss" scoped>
.ProductSalesInfo {
  tr {
    td {
      .price {
        display: flex;

        .inputForm {
          display: flex;
          align-items: center;
          width: 170px;

          >>> .v-text-field--reverse {
            padding: 0 !important;
          }
        }

        span {
          margin: 0 10px;
          font-size: 15px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      >>> .v-input__slot {
        fieldset {
          margin: auto;
          height: 40px;
          width: 100px;
        }

        .v-text-field__slot {
          width: 100px;
          input {
            text-align: center;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            appearance: none;
            margin: 0;
          }
        }
      }

      .notice {
        display: flex;
        align-items: center;
        margin-top: 3px;
        color: #1e90ff;
        font-size: 12px;
        font-weight: 500;

        i {
          position: relative;
          top: -2px;
          margin-right: 5px;
          color: #1e90ff;
        }
      }
    }
  }
}
</style>

<template>
  <div class="ProductSalesInfo">
    <DataTable>
      <template v-slot:header>판매 정보</template>
      <template v-slot:body>
        <tr>
          <td>판매가</td>
          <td>
            <div class="price">
              <div class="inputForm">
                <v-text-field
                  placeholder="판매가를 입력해주세요."
                  reverse
                ></v-text-field>
                <span>원</span>
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
                          placeholder="할인율 (%)"
                          reverse
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
                          placeholder="할인판매를 눌러주세요"
                        ></v-text-field>
                        <span>원</span>
                      </div>
                      <v-btn depressed color="primary">
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
                    <v-radio-group v-model="orderMax.min_1" row>
                      <v-radio :label="`무기한`" :value="false"></v-radio>
                      <v-radio :label="`기한설정`" :value="true"> </v-radio>
                    </v-radio-group>
                    <DateTimePicker :label="'시작날짜'"></DateTimePicker>
                    <DateTimePicker :label="'종료날짜'"></DateTimePicker>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>최소판매수량</td>
          <td>
            <v-radio-group v-model="orderMax.min_1" row>
              <v-radio :label="` 1  개 이상`" :value="true"></v-radio>
              <v-radio :value="false">
                <template v-slot:label>
                  <v-text-field
                    single-line
                    outlined
                    v-model="orderMin.count"
                  ></v-text-field>
                  개 이상</template
                >
              </v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <td>최대판매수량</td>
          <td>
            <v-radio-group v-model="orderMax.max_20" row>
              <v-radio :label="`20개 이하`" :value="true"></v-radio>
              <v-radio :value="false">
                <template v-slot:label>
                  <v-text-field
                    single-line
                    outlined
                    v-model="orderMax.count"
                  ></v-text-field>
                  개 이하</template
                >
              </v-radio>
            </v-radio-group>
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
  components: {
    DataTable,
    DateTimePicker
  },
  data() {
    return {
      orderMax: { max_20: true, count: "" },
      orderMin: { min_1: true, count: "" }
    };
  },
  methods: {}
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
        }
      }
    }
  }
}
</style>

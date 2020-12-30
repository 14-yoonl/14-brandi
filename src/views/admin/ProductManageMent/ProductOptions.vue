<template>
  <div class="ProductOptions">
    <DataTable>
      <template v-slot:header>옵션 정보</template>
      <template v-slot:body>
        <tr>
          <td>옵션 설정</td>
          <td>
            <v-radio-group v-model="option" row>
              <v-radio :label="`기본옵션`" :value="1"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <td>옵션 정보</td>
          <td>
            <table class="setOptions">
              <thead>
                <tr>
                  <th>옵션항목</th>
                  <th>상품옵션명</th>
                  <th>옵션값 추가/삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cnt, index) in optionsList.color">
                  <th :rowspan="optionsList.color.length" v-if="index === 0">
                    색상
                  </th>
                  <td>
                    <v-select
                      v-model="optionsList.color[index]"
                      :items="$store.getters.getOptions.color"
                      item-value="pk"
                      item-text="value"
                      label="색상 옵션을 선택해 주세요."
                      dense
                    ></v-select>
                  </td>
                  <td class="actionButtons">
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="addOptionList(`color`, index)"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="removeOptionList(`color`, index)"
                      v-if="optionsList.color.length > 1"
                    >
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr v-for="(cnt, index) in optionsList.size">
                  <th :rowspan="optionsList.size.length" v-if="index === 0">
                    사이즈
                  </th>
                  <td>
                    <v-select
                      v-model="optionsList.size[index]"
                      :items="$store.getters.getOptions.size"
                      item-value="pk"
                      item-text="value"
                      label="사이즈 옵션을 선택해 주세요."
                      dense
                    ></v-select>
                  </td>
                  <td class="actionButtons">
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="addOptionList(`size`, index)"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      x-small
                      color="primary"
                      @click="removeOptionList(`size`, index)"
                      v-if="optionsList.size.length > 1"
                    >
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>재고관리여부</th>
                  <td colspan="2">
                    <v-radio-group v-model="optionsList.stock" row>
                      <v-radio
                        :label="`재고 수량 관리안함`"
                        :value="false"
                      ></v-radio>
                      <v-radio
                        :label="`재고 수량 관리`"
                        :value="true"
                      ></v-radio>
                    </v-radio-group>
                  </td>
                </tr>
              </tfoot>
            </table>
            <v-btn class="ma-2" color="success" @click="addOptionItemInfo">
              적용
              <v-icon dark>
                mdi-check-circle
              </v-icon>
            </v-btn>
            <table class="optionItemInfoTable">
              <thead>
                <tr>
                  <th colspan="2">상품옵션정보</th>
                  <th rowspan="2">일반재고</th>
                  <th rowspan="2">제거</th>
                </tr>
                <tr>
                  <th>색상</th>
                  <th>사이즈</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, index) in productsInfo">
                  <td>
                    <v-select
                      v-model="info.color"
                      :items="$store.getters.getOptions.color"
                      item-value="pk"
                      item-text="value"
                      label="색상 옵션을 선택해 주세요."
                      dense
                    ></v-select>
                  </td>
                  <td>
                    <v-select
                      v-model="info.size"
                      :items="$store.getters.getOptions.size"
                      item-value="pk"
                      item-text="value"
                      label="사이즈 옵션을 선택해 주세요."
                      dense
                    ></v-select>
                  </td>
                  <td>
                    <v-radio-group v-model="info.stock" row>
                      <v-radio
                        :label="`재고관리 안함`"
                        :value="false"
                      ></v-radio>
                      <v-radio :value="true">
                        <template v-slot:label>
                          <v-text-field
                            single-line
                            outlined
                            v-model="info.stockValue"
                          ></v-text-field>
                          개</template
                        >
                      </v-radio>
                    </v-radio-group>
                  </td>
                  <td>
                    <v-btn color="error" @click="removeOptionItemInfo(index)">
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "../../../components/common/DataTable";
import ImagePriview from "../../../components/common/ImagePriview";

export default {
  components: {
    DataTable,
    ImagePriview
  },
  data() {
    return {
      optionsList: {
        color: [3, 1, 3, 4],
        size: [2, 2, 3, 4],
        stock: false
      },
      productsInfo: [
        { color: 3, size: 5, stock: false, stockValue: "" },
        { color: 1, size: 1, stock: false, stockValue: "" },
        { color: 5, size: 2, stock: false, stockValue: "" }
      ]
    };
  },
  methods: {
    addOptionList(type, count) {
      this.optionsList[type].splice(count + 1, 0, 0);
    },
    removeOptionList(type, count) {
      this.optionsList[type].splice(count, 1);
    },
    removeOptionItemInfo(count) {
      this.productsInfo.splice(count, 1);
    },
    addOptionItemInfo() {
      const { color, size } = this.optionsList;
      const productsInfo = [];
      let result = true;

      result = color.some(color => {
        return color;
      });

      console.log(result);
      console.log(productsInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
.ProductOptions {
  .setOptions {
    height: 130px;
    thead {
      tr {
        height: 30px;

        th {
          &:nth-child(1) {
            width: 20%;
          }
          &:nth-child(2) {
            width: 50%;
          }
          &:nth-child(3) {
            width: 14%;
          }
        }
      }
    }
    tbody {
      tr {
        height: 47px !important;
        background-color: white !important;
        border: 1px solid #ccc;

        th {
          border: 1px solid #ccc;
          background: #eeeeee;
        }

        td {
          width: auto !important;
          position: relative;
          border: 1px solid #ccc;
          vertical-align: middle;
        }

        .actionButtons {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          border: none !important;

          button {
            margin: 0 5px;
          }
        }
      }
    }
  }

  .optionItemInfoTable {
    thead {
      background-color: #eee;
      border: 1px solid;

      tr {
        height: 33px !important;

        th {
          border: 1px solid #ccc;
        }
      }
    }

    tbody {
      tr {
        td {
          height: 50px;
          border: 1px solid #ccc;
          background-color: white;

          &:nth-child(1) {
            width: 30%;
          }
          &:nth-child(2) {
            width: 30%;
          }
          &:nth-child(3) {
            width: 23%;
          }
          &:nth-child(4) {
            width: 17%;
            text-align: center;
          }

          >>> .v-input--radio-group__input {
            justify-content: center;
          }

          >>> .v-radio {
            .v-input--selection-controls__input {
              margin: 0;
            }

            .v-input {
              height: 40px;
              width: 100px;

              .v-input--radio-group__input {
                justify-content: center;
              }

              .v-input__control {
                position: relative;
                top: -12px;
                width: 30px;
                height: auto !important;

                .v-input__slot {
                  fieldset {
                    margin: auto;
                    height: 40px;
                    width: 100px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  >>> .v-input {
    top: 3px !important;
    margin: 0 3px;

    .v-input__slot {
      .v-text-field__slot {
        input {
          font-size: 13px;
          text-align: center;
        }
      }
    }

    .v-label {
      position: relative;
      left: 50% !important;
      transform: translate(-50%);
      font-size: 13px;
    }

    .v-label--active {
      top: -50%;
      line-height: 100%;
      font-size: 11px !important;
    }

    .v-select__selection {
      position: relative;
      left: 50%;
      transform: translate(-50%);
      font-size: 13px;
    }
  }
}
</style>

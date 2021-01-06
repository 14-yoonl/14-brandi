<template>
  <div class="ProductOptions">
    <DataTable>
      <template v-slot:header>옵션 정보</template>
      <template v-slot:body>
        <tr>
          <td>
            옵션 설정
            <v-icon x-small color="red">
              mdi-star
            </v-icon>
          </td>
          <td>
            <v-radio-group v-model="optionType" row>
              <v-radio :label="`기본옵션`" :value="0"></v-radio>
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <td>옵션 정보</td>
          <td>
            <table class="setOptions" v-if="!$route.params.productKey">
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
                    <v-autocomplete
                      v-model="optionsList.color[index]"
                      :items="getOptions('color_list')"
                      item-value="color_id"
                      item-text="color_name"
                      :label="
                        optionsList.color[index]
                          ? ''
                          : `색상 옵션을 선택해 주세요.`
                      "
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="
                              duplicateList($event, data.item.color_id, `color`)
                            "
                            v-text="data.item.color_name"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
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
                    <v-autocomplete
                      v-model="optionsList.size[index]"
                      :items="getOptions('size_list')"
                      :label="
                        optionsList.size[index]
                          ? ``
                          : `사이즈 옵션을 선택해 주세요.`
                      "
                      item-text="size_name"
                      item-value="size_id"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="
                              duplicateList($event, data.item.size_id, `size`)
                            "
                            v-text="data.item.size_name"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
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
                    <v-radio-group v-model="optionsList.isStockManage" row>
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
            <v-btn
              class="ma-2"
              color="success"
              @click="addOptionItemInfo"
              v-if="!$route.params.productKey"
            >
              적용
              <v-icon dark>
                mdi-check-circle
              </v-icon>
            </v-btn>
            <v-btn
              class="ma-2"
              color="success"
              @click="addOptionItemUpdateInfo"
              v-if="$route.params.productKey"
            >
              추가
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
                <tr v-if="!options.length && true">
                  <td colspan="4">
                    옵션정보를 입력 후 [적용] 버튼을 눌러주세요.
                  </td>
                </tr>
                <tr v-for="(info, index) in options">
                  <td>
                    <v-autocomplete
                      v-model="info.color"
                      :items="getOptions('color_list')"
                      item-value="color_id"
                      item-text="color_name"
                      :label="info.color ? '' : `색상 옵션을 선택해 주세요.`"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="
                              duplicateCrossList(
                                $event,
                                data.item.color_id,
                                `color`
                              )
                            "
                            v-text="data.item.color_name"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </td>
                  <td>
                    <v-autocomplete
                      v-model="info.size"
                      :items="getOptions('size_list')"
                      :label="info.size ? `` : `사이즈 옵션을 선택해 주세요.`"
                      item-text="size_name"
                      item-value="size_id"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="
                              duplicateCrossList(
                                $event,
                                data.item.size_id,
                                `size`
                              )
                            "
                            v-text="data.item.size_name"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </td>
                  <td>
                    <div class="stock">
                      <v-radio-group v-model="info.isStockManage" row>
                        <v-radio
                          :label="`재고관리 안함`"
                          :value="false"
                        ></v-radio>
                        <v-radio :value="true">
                          <template v-slot:label>
                            <v-text-field
                              single-line
                              outlined
                              v-model="info.remain"
                            ></v-text-field>
                            개</template
                          >
                        </v-radio>
                      </v-radio-group>
                    </div>
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
  props: {
    options: {
      type: Array
    }
  },
  data() {
    return {
      optionType: 0, //기본 옵션
      optionsList: {
        color: [0],
        size: [0],
        isStockManage: false
      }
    };
  },
  computed: {
    getOptions() {
      return type => this.$store.getters.getOptions[type];
    }
  },
  methods: {
    addOptionList(type, count) {
      this.optionsList[type].splice(count + 1, 0, 0);
    },
    removeOptionList(type, count) {
      this.optionsList[type].splice(count, 1);
    },
    removeOptionItemInfo(count) {
      const arr = this.options.filter((list, index) => index !== count);
      this.$emit("update:options", arr);
    },
    addOptionItemInfo(e) {
      const { color, size } = this.optionsList;
      const result = [];

      //null이 있을 경우 true
      const colorNullData = color.some(value => value === 0);
      const sizeNullData = size.some(value => value === 0);

      if (colorNullData || sizeNullData) {
        alert("색상 및 사이즈 선택은 필수 입니다.");
        consle.log(e.stopPropagation());
      }

      color.forEach(color =>
        size.forEach(size => {
          result.push({
            color,
            size,
            isStockManage: this.optionsList.isStockManage,
            remain: 0
          });
        })
      );
      this.$emit("update:options", result);
    },
    addOptionItemUpdateInfo() {
      const result = [
        ...this.options,
        { color: 0, size: 0, isStockManage: false, remain: 0 }
      ];
      this.$emit("update:options", result);
    },
    duplicateList(event, pk, state) {
      // 중복일 떄 true
      const result = this.optionsList[state].some(list => list === pk);
      result && (alert("이미 선택된 옵션 입니다."), event.stopPropagation());
    },
    duplicateCrossList(event, pk, state) {
      console.log(event, pk, state, "||||||||||||||||");
      // 중복일 떄 true
      const result = this.options.some(list => list[state] === pk);
      result && (alert("이미 선택된 옵션 입니다."), event.stopPropagation());
    }
  }
};
</script>
<style lang="scss" scoped>
.ProductOptions {
  >>> .v-select__slot {
    input {
      text-align: center;
    }
  }

  .setOptions {
    height: 130px;
    thead {
      tr {
        height: 35px;

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
        height: 53px !important;
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
          height: 53px;
          border: 1px solid #ccc;
          background-color: white;
          text-align: center;

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

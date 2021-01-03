<template>
  <div class="DataListTable">
    <div class="filters">
      <slot name="tableRow"></slot>
    </div>
    <div class="filterListTable">
      <div class="tableTool">
        <slot name="tableSetOption"><!-- 테이블 header --></slot>
      </div>
      <div class="tableBody">
        <table>
          <thead>
            <tr>
              <slot name="header"><!-- 테이블 header --></slot>
            </tr>
          </thead>
          <tbody>
            <slot name="content"><!-- 테이블 content --></slot>
          </tbody>
        </table>
      </div>
      <div class="tableContainerFooterBtns">
        <!-- <v-pagination v-model="currentPage" :length="5"></v-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.DataListTable {
  margin: 10px auto;
  padding: 10px;
  background-color: white;
  border-radius: 10px;

  .filters {
    .rowAll {
      display: flex;
      align-items: center;

      span {
        width: 100px;
        text-align: center;
      }
    }

    >>> .v-input {
      margin: 0 10px;
    }
  }

  .filterListTable {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px 0;
    background-color: #fafafa;

    .tableHeader {
      display: flex;
      justify-content: space-between;
      padding: 6px 8px;
      color: #333;
      background-color: #eeeeee;
    }

    .tableTool {
      font-size: 14px;
    }

    .tableBody {
      background-color: #f9f9f9;

      table {
        margin: 0 15px;
        text-align: center;
        font-size: 13px;
        border-collapse: collapse;
        border: 1px solid #ddd;

        thead {
          tr {
            background-color: #eee;
            th {
              width: auto;

              >>> .v-input--selection-controls {
                margin: 0;
                padding: 0;

                .v-input--selection-controls__input {
                  margin: 0 auto;
                }
              }
            }
          }
        }

        tbody {
          tr {
            td {
              min-width: 100px;
              border: 1px solid #ddd;

              >>> .v-input--selection-controls {
                margin: 0;
                padding: 0;

                .v-input--selection-controls__input {
                  margin: 0 auto;
                }
              }
            }
            &:hover {
              background-color: #f5f5f5;
            }

            &:nth-child(odd) {
              background-color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>

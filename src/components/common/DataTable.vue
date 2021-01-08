<template>
  <div class="dataTable">
    <div class="tableHeader">
      <slot name="header"><!-- 테이블 헤더 --></slot>
    </div>
    <div class="tableBody">
      <table>
        <tbody>
          <slot name="body">
            <!-- 입력 데이터형식 -->
            <!-- 
              <tr>
                <td>항목 이름</td>
                <td>내용</td>
              </tr> 
            -->
          </slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.dataTable {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;

  .tableHeader {
    padding: 6px 8px;
    color: #333;
    background-color: #eeeeee;
  }

  .tableBody {
    padding: 15px 10px;
    background-color: #f9f9f9;

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #ccc;
      font-size: 13px;

      tr {
        width: 100%;

        &:nth-child(odd) {
          background-color: #eeeeee;
        }

        td {
          &:nth-child(1) {
            width: 15%;
            padding: 5px;
            border: 1px solid #ccc;
          }

          &:nth-child(2) {
            width: 85%;
            padding: 5px;
            border: 1px solid #ccc;
          }
        }
      }
    }
  }
}
</style>

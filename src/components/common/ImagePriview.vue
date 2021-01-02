<template>
  <div class="imagePriview">
    <div class="priviewList">
      <div class="priviewImg" v-for="(file, index) in setImages">
        <v-icon class="removeImageBtn" @click="removeImage" :name="index"
          >mdi-close-circle-outline</v-icon
        >
        <img :src="file.preview" />
      </div>
      <div
        class="isnertImgForm"
        v-if="
          (type === `nomal` && setImages.length < 1) ||
            (type !== `nomal` && setImages.length < 5)
        "
      >
        <v-icon x-large>mdi-file-image-outline</v-icon>
        <div class="formHeade">
          <span v-if="setImages.length < 1">대표</span>
          이미지 업로드
        </div>
        <div class="formContent">
          640 * 720 사이즈 이상 가능하며<br />
          확장자는 jpg 만 등록 가능합니다.
        </div>
        <v-btn class="insertBtn" tag="label" color="primary">
          사진 등록
          <input
            type="file"
            ref="files"
            @change="imageUpload"
            multiple
            accept=".jpg"
          />
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    setImages: {
      type: Array
    },
    type: {
      type: String,
      default: "multiple"
    }
  },
  data() {
    return {
      imageFiles: [] //이미지파일
    };
  },
  methods: {
    imageUpload() {
      const imageList = this.$refs.files.files; //Object List
      let imageFiles = [...this.setImages];

      Object.keys(imageList).forEach(imageNumber => {
        if (this.type !== "nomal" && imageFiles.length < 5) {
          imageFiles.push({
            file: imageList[imageNumber],
            preview: URL.createObjectURL(imageList[imageNumber])
          });
        }
      });
      this.$emit("update:setImages", imageFiles);
    },

    removeImage({ target }) {
      const filterImage = this.setImages.filter((file, fileIndex) => {
        return fileIndex !== Number(target.getAttribute("name"));
      });
      this.$emit("update:setImages", filterImage);
    }
  }
};
</script>
<style lang="scss" scoped>
.imagePriview {
  .isnertImgForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    border: 1px solid #ddd;
    background-color: white;

    i {
      margin: 10px 0;
    }

    .formHeade {
      color: black;
    }

    .formContent {
      text-align: center;
      font-size: 12px;
      color: #1e90ff;
    }

    >>> .insertBtn {
      widows: auto;
      height: auto;
      padding: 0;
      margin: 10px;
      cursor: pointer;

      span {
        padding: 5px 10px;
        font-size: 12px;
      }

      input[type="file"] {
        display: none;
      }
    }
  }
  .priviewList {
    display: flex;
    flex-direction: row;

    .priviewImg {
      position: relative;
      width: 180px;
      height: 180px;
      margin-right: 5px;
      border: 1px solid #ddd;
      background: white;
      overflow: hidden;

      .removeImageBtn {
        position: absolute;
        right: 0;
        margin: 3px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: white;
        }
      }

      img {
        width: 180px;
        height: 180px;
        object-fit: cover;
      }
    }
  }
}
</style>

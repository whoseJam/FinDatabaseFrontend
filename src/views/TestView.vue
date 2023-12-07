<template>
    <el-upload class="upload-demo" action="" drag :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>

    </el-upload>
    <el-dialog id="cropDialog" v-model="isVisible" width="70%" height="50%">
        <div class="container">
            <img id="cropImg">
        </div>
        <div class="bottom">
            <div class="previewBox"></div>
            <div class="upload"><button @click="upload">上传</button></div>
        </div>
    </el-dialog>
    <img :src="photoUrl
        " alt="">
</template>

<script >
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
    data() {
        return {
            isVisible: false,
            cropperInstance: null,
            photoUrl: "",
        }
    },
    methods: {
        changeUpload(file, fileList) {
            let reader = new FileReader();
            this.isVisible = true
            console.log(file.raw)
            reader.readAsDataURL(file.raw)
            reader.onload = (e) => {
                let dataURL = reader.result;

                // this.option.img = dataURL
                document.querySelector('#cropImg').src = dataURL;
                if (this.cropperInstance) {
                    this.cropperInstance.destroy();
                }
                // this.$refs.cropImg.src = dataURL;
                const image = document.getElementById('cropImg');
                this.cropperInstance = new Cropper(image, {
                    aspectRatio: 16 / 16,
                    viewMode: 0,
                    minContainerWidth: 20,
                    minContainerHeight: 20,
                    dragMode: 'move',
                    preview: [document.querySelector('.previewBox')]

                })

            }
            // this.option.img = require(file.url)
            this.isVisible = true

        },
        upload() {
            this.cropperInstance.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            }).toBlob((blob) => {
                console.log(blob)
                const data = new FormData()
                data.append("photo", blob, '1.jpg')
                data.append("userId", 1)
                let self = this;
                this.$http({
                    method: 'post',
                    url: '/user/upload/photo',
                    data: data,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (res) {
                    res = res.data;
                    if (res.success) {

                        alert(1)
                        self.isVisible = false;
                        const newdata = new FormData()
                        newdata.append("userId", 1)
                        self.$http({
                            method: 'post',
                            url: 'user/getPhoto',
                            data: newdata,
                            headers: { 'Content-Type': 'multipart/form-data' }
                        }).then(function (res) {
                            res = res.data
                            self.photoUrl = res.image_url
                            console.log(self.photoUrl)
                        })

                    }
                })


            })
        }

    },
}

</script>

<style scoped>
.previewBox {
    box-shadow: 0 0 5px #adadad;
    width: 200px;
    height: 200px;
    margin-top: 30px;
    overflow: hidden;
    /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
}

.container {
    width: 100%;
    height: 40vh
}

.bottom {
    display: flex;
    width: 100%;
}

.upload {
    align-self: center;
    /* 垂直居中 */
    position: relative;
    margin-left: 40%;
}
</style>
<template>
  <el-dialog class="register-dialog" width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form status-icon :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <!-- imageUrl有值，显示图片 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- imageUrl没有值 显示的是i标签 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="register-box">
            <!-- 图片验证码 -->
            <img @click="changeCode" class="register-code" :src="codeURL" alt="" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 点击获取 短信验证码 -->
            <el-button :disabled="delay != 0" @click="getSMS">
              {{ delay == 0 ? '点击获取验证码' : `还有${delay}秒继续获取` }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 axios
// import axios from 'axios';

// 导入 接口
import { sendsms } from '../../../api/register.js';

// 定义校验函数 - 邮箱
const checkEmail = (rule, value, callback) => {
  // 获取数据 value
  // 定义正则表达式 定义了一个正则对象
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 校验方法 test 方法 是正则对象
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error('邮箱的格式不对哦'));
  }
};
// 定义校验函数 - 手机
const checkPhone = (rule, value, callback) => {
  // 获取数据 value
  // 定义正则表达式 定义了一个正则对象
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 校验方法 test 方法 是正则对象
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error('手机的格式不对哦'));
  }
};

export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单数据
      form: {
        // 昵称
        username: '',
        // 密码
        password: '',
        // 手机
        phone: '',
        // 邮箱
        email: '',
        // 图片验证码
        code: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '用户名长度为 6 到 12 位', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为 6 到 12 位', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 左侧的文本宽度
      formLabelWidth: '62px',
      // 验证码图片地址
      codeURL: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      // 倒计时时间
      delay: 0,
      // 本地图片预览地址
      imageUrl: '',
      // 头像上传的接口地址
      uploadUrl: process.env.VUE_APP_URL + '/uploads'
    };
  },
  // 方法
  methods: {
    // 上传成功
    handleAvatarSuccess(res, file) {
      window.console.log(res);
      // URL.createObjectURL 生成的是本地的临时路径，刷新就没用了
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      // 1024*1024 1mb
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 获取短信验证码
    getSMS() {
      // 如果为0开启倒计时
      if (this.delay == 0) {
        this.delay = 60;
        const interId = setInterval(() => {
          // 时间的递减
          this.delay--;
          if (this.delay == 0) {
            // 清除定时器
            clearInterval(interId);
          }
        }, 100);
        // 调用接口
        // axios({
        //   url: process.env.VUE_APP_URL + '/sendsms',
        //   method: 'post',
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   // 是否跨域携带cookie 默认是false
        //   withCredentials: true
        // })
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          // window.console.log(res)
          if (res.data.code === 200) {
            this.$message.success('验证码获取成功:' + res.data.data.captcha);
          } else if (res.data.code === 0) {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    // 重新生成验证码
    changeCode() {
      // 随机数
      // this.codeURL = process.env.VUE_APP_URL+"/captcha?type=sendsms&"+Math.random()
      // // 时间戳 用的更为频繁
      // this.codeURL = process.env.VUE_APP_URL+"/captcha?type=sendsms&"+Date.now()
      // 如果要更为规范 t= 或者其他的 键值都可以 t是time的缩写
      this.codeURL = process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now();
    }
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #0dbfef, #1792f8);
  }
  .el-dialog__title {
    color: white;
  }
  .register-box {
    height: 40.8px;
  }
  .register-code {
    height: 40.8px;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

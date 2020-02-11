// 抽取并暴露 验证手机号的逻辑
export const checkPhone = (rule, value, callback) => {
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

// 抽取并暴露 验证邮箱的逻辑
export const checkEmail = (rule, value, callback) => {
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

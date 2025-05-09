if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$d = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: [String, null],
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-5de67484"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _sfc_main$c = {
    name: "u-toast",
    props: {
      // z-index值
      zIndex: {
        type: [Number, String],
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        timer: null,
        // 定时器
        config: {
          params: {},
          // URL跳转的参数，对象
          title: "",
          // 显示文本
          type: "",
          // 主题类型，primary，success，error，warning，black
          duration: 2e3,
          // 显示的时间，毫秒
          isTab: false,
          // 是否跳转tab页面
          url: "",
          // toast消失后是否跳转页面，有则跳转，优先级高于back参数
          icon: true,
          // 显示的图标
          position: "center",
          // toast出现的位置
          callback: null,
          // 执行完后的回调函数
          back: false
          // 结束toast是否自动返回上一页
        },
        tmpConfig: {}
        // 将用户配置和内置配置合并后的临时配置变量
      };
    },
    computed: {
      iconName() {
        if (["error", "warning", "success", "info"].indexOf(this.tmpConfig.type) >= 0 && this.tmpConfig.icon) {
          let icon = this.$u.type2icon(this.tmpConfig.type);
          return icon;
        }
      },
      uZIndex() {
        return this.isShow ? this.zIndex ? this.zIndex : this.$u.zIndex.toast : "999999";
      }
    },
    methods: {
      // 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
      show(options) {
        this.tmpConfig = this.$u.deepMerge(this.config, options);
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.isShow = true;
        this.timer = setTimeout(() => {
          this.isShow = false;
          clearTimeout(this.timer);
          this.timer = null;
          typeof this.tmpConfig.callback === "function" && this.tmpConfig.callback();
          this.timeEnd();
        }, this.tmpConfig.duration);
      },
      // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
      hide() {
        this.isShow = false;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
      // 倒计时结束之后，进行的一些操作
      timeEnd() {
        if (this.tmpConfig.url) {
          if (this.tmpConfig.url[0] != "/")
            this.tmpConfig.url = "/" + this.tmpConfig.url;
          if (Object.keys(this.tmpConfig.params).length) {
            let query = "";
            if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
              query = this.$u.queryParams(this.tmpConfig.params, false);
              this.tmpConfig.url = this.tmpConfig.url + "&" + query;
            } else {
              query = this.$u.queryParams(this.tmpConfig.params);
              this.tmpConfig.url += query;
            }
          }
          if (this.tmpConfig.isTab) {
            uni.switchTab({
              url: this.tmpConfig.url
            });
          } else {
            uni.navigateTo({
              url: this.tmpConfig.url
            });
          }
        } else if (this.tmpConfig.back) {
          this.$u.route({
            type: "back"
          });
        }
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-toast", [$data.isShow ? "u-show" : "", "u-type-" + $data.tmpConfig.type, "u-position-" + $data.tmpConfig.position]]),
        style: vue.normalizeStyle({
          zIndex: $options.uZIndex
        })
      },
      [
        vue.createElementVNode("view", { class: "u-icon-wrap" }, [
          $data.tmpConfig.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
            key: 0,
            class: "u-icon",
            name: $options.iconName,
            size: 30,
            color: $data.tmpConfig.type
          }, null, 8, ["name", "color"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode(
          "text",
          { class: "u-text" },
          vue.toDisplayString($data.tmpConfig.title),
          1
          /* TEXT */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-dcb3ce67"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-toast/u-toast.vue"]]);
  function broadcast(componentName, eventName, params) {
  }
  const Emitter = {
    methods: {
      /**
       * 派发 (向上查找) (一个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params);
        }
      },
      /**
       * 广播 (向下查找) (广播多个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  const _sfc_main$b = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "confirm", "clear", "blur", "focus", "click", "touchstart"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框的类型，textarea，text，number
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      // 输入框的自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获得焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 密码类型时，是否显示右侧的密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // input|textarea是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框的边框颜色
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
      // open-打开，close-关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 高度，单位rpx
      height: {
        type: [Number, String],
        default: ""
      },
      // 是否可清空
      clearable: {
        type: [Boolean, String]
      },
      // 指定光标与键盘的距离，单位 px
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      // 是否自动去除两端的空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方带有”完成“按钮那一栏
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      // 弹出键盘时是否自动调节高度，uni-app默认值是true
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // input的背景色
      backgroundColor: {
        type: String
      },
      // input的padding
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        // input的高度
        textareaHeight: 100,
        // textarea的高度
        validateState: false,
        // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: false,
        // 当前是否处于获得焦点的状态
        showPassword: false,
        // 是否预览密码
        lastValue: "",
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
        uForm: {
          inputAlign: "",
          clearable: ""
        },
        showCover: false
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      },
      defaultValue(nVal, oVal) {
        if (nVal && nVal.length > this.maxlength) {
          setTimeout(() => {
            nVal = nVal.substring(0, this.maxlength);
            this.handleInput({
              detail: {
                value: nVal
              }
            });
          }, 0);
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
        style = Object.assign(style, this.customStyle);
        return style;
      },
      //
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      // 光标起始位置
      uSelectionStart() {
        return String(this.selectionStart);
      },
      // 光标结束位置
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      /**
       * change 事件
       * @param event
       */
      handleInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.$u.trim(value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.defaultValue = value;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value);
        }, 40);
      },
      /**
       * blur 事件
       * @param event
       */
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        let value = event.detail.value;
        this.$emit("blur", value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", {
          "u-input--border": $props.border,
          "u-input--error": $data.validateState
        }]),
        style: vue.normalizeStyle({
          padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
          borderColor: $props.borderColor,
          textAlign: $options.inputAlignCom,
          backgroundColor: $props.backgroundColor
        }),
        onClick: _cache[11] || (_cache[11] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
      },
      [
        $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 0,
          class: "u-input__input u-input__textarea",
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          fixed: $props.fixed,
          focus: $props.focus,
          maxlength: -1,
          autoHeight: $props.autoHeight,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "cursor-spacing": $options.getCursorSpacing,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing", "show-confirm-bar", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          class: vue.normalizeClass(["u-input__input", "u-input__" + $props.type]),
          type: $props.type == "password" ? "text" : $props.type,
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          maxlength: 1e4,
          password: $props.type == "password" && !$data.showPassword,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled || $props.type === "select" && !$data.showCover,
          focus: $props.focus,
          confirmType: $props.confirmType,
          "cursor-spacing": $options.getCursorSpacing,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 46, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start", "show-confirm-bar", "adjust-position"])),
        $props.type === "select" && $data.showCover ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "cover-input",
          onClick: _cache[8] || (_cache[8] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
          $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__right-icon__clear u-input__right-icon__item",
            onClick: _cache[9] || (_cache[9] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: "close-circle-fill",
              color: "#c0c4cc"
            })
          ])) : vue.createCommentVNode("v-if", true),
          $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__right-icon__clear u-input__right-icon__item"
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: !$data.showPassword ? "eye" : "eye-fill",
              color: "#c0c4cc",
              onClick: _cache[10] || (_cache[10] = ($event) => $data.showPassword = !$data.showPassword)
            }, null, 8, ["name"])
          ])) : vue.createCommentVNode("v-if", true),
          $props.type == "select" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
                "u-input__right-icon--select--reverse": $props.selectOpen
              }])
            },
            [
              vue.createVNode(_component_u_icon, {
                name: "arrow-down-fill",
                size: "26",
                color: "#c0c4cc"
              })
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-dc846cb1"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
  const _sfc_main$a = {
    name: "u-button",
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "chooseavatar"],
    props: {
      // 是否细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，default，primary，error，warning，success
      type: {
        type: String,
        default: "default"
      },
      // 按钮尺寸，default，medium，mini
      size: {
        type: String,
        default: "default"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: false
      },
      // 手指按（触摸）按钮时按钮时的背景颜色
      hoverBgColor: {
        type: String,
        default: ""
      },
      // 水波纹的背景颜色
      rippleBgColor: {
        type: String,
        default: ""
      },
      // 是否开启水波纹效果
      ripple: {
        type: Boolean,
        default: false
      },
      // 按下的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 500
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 20
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 150
      },
      timerId: {
        type: [String, Number]
      }
    },
    computed: {
      // 当没有传bgColor变量时，按钮按下去的颜色类名
      getHoverClass() {
        if (this.loading || this.disabled || this.ripple || this.hoverClass)
          return "";
        let hoverClass = "";
        hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
        return hoverClass;
      },
      // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
      showHairLineBorder() {
        if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
          return "";
        } else {
          return "u-hairline-border";
        }
      }
    },
    data() {
      let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
      return {
        btnTimerId,
        rippleTop: 0,
        // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: 0,
        // 水波纹起点X坐标到按钮左边界的距离
        fields: {},
        // 波纹按钮节点信息
        waveActive: false
        // 激活水波纹
      };
    },
    methods: {
      // 按钮点击
      click(e) {
        this.$u.throttle(() => {
          if (this.loading === true || this.disabled === true)
            return;
          if (this.ripple) {
            this.waveActive = false;
            this.$nextTick(function() {
              this.getWaveQuery(e);
            });
          }
          this.$emit("click", e);
        }, this.throttleTime, true, this.btnTimerId);
      },
      // 查询按钮的节点信息
      getWaveQuery(e) {
        this.getElQuery().then((res) => {
          let data = res[0];
          if (!data.width || !data.width)
            return;
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth)
            return;
          this.fields = data;
          let touchesX = "", touchesY = "";
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      // 获取节点信息
      getElQuery() {
        return new Promise((resolve) => {
          let queryInfo = "";
          queryInfo = uni.createSelectorQuery().in(this);
          queryInfo.select(".u-btn").boundingClientRect();
          queryInfo.exec((data) => {
            resolve(data);
          });
        });
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      },
      chooseavatar(res) {
        this.$emit("chooseavatar", res);
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: "u-wave-btn",
      class: vue.normalizeClass(["u-btn u-line-1 u-fix-ios-appearance", [
        "u-size-" + $props.size,
        $props.plain ? "u-btn--" + $props.type + "--plain" : "",
        $props.loading ? "u-loading" : "",
        $props.shape == "circle" ? "u-round-circle" : "",
        $props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + $props.type,
        $props.disabled ? `u-btn--${$props.type}--disabled` : ""
      ]]),
      "hover-start-time": Number($props.hoverStartTime),
      "hover-stay-time": Number($props.hoverStayTime),
      disabled: $props.disabled,
      "form-type": $props.formType,
      "open-type": $props.openType,
      "app-parameter": $props.appParameter,
      "hover-stop-propagation": $props.hoverStopPropagation,
      "send-message-title": $props.sendMessageTitle,
      "send-message-path": "sendMessagePath",
      lang: $props.lang,
      "data-name": $props.dataName,
      "session-from": $props.sessionFrom,
      "send-message-img": $props.sendMessageImg,
      "show-message-card": $props.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      onChooseavatar: _cache[5] || (_cache[5] = (...args) => $options.chooseavatar && $options.chooseavatar(...args)),
      style: vue.normalizeStyle([$props.customStyle, {
        overflow: $props.ripple ? "hidden" : "visible"
      }]),
      onClick: _cache[6] || (_cache[6] = vue.withModifiers(($event) => $options.click($event), ["stop"])),
      "hover-class": $options.getHoverClass,
      loading: $props.loading
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.ripple ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["u-wave-ripple", [$data.waveActive ? "u-wave-active" : ""]]),
          style: vue.normalizeStyle({
            top: $data.rippleTop + "px",
            left: $data.rippleLeft + "px",
            width: $data.fields.targetWidth + "px",
            height: $data.fields.targetWidth + "px",
            "background-color": $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ], 46, ["hover-start-time", "hover-stay-time", "disabled", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class", "loading"]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-097def2b"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$9 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code2 = this.icons.find((v) => v.font_class === this.type);
        if (code2) {
          return code2.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-d31e1c47"], ["__file", "E:/git/wordPrompt/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject$1(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign$2 = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray$1 = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$1 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray$1(val) || isPlainObject$1(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* BEFORE_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      0
      /* BEFORE_PATH */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* IN_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      1
      /* IN_PATH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* BEFORE_IDENT */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    3
    /* IN_IDENT */
  ] = {
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "w"
      /* WORKSPACE */
    ]: [
      1,
      1
      /* PUSH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2,
      1
      /* PUSH */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      1
      /* PUSH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7,
      1
      /* PUSH */
    ]
  };
  pathStateMachine[
    4
    /* IN_SUB_PATH */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      5,
      0
      /* APPEND */
    ],
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      2
      /* INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* RIGHT_BRACKET */
    ]: [
      1,
      3
      /* PUSH_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      4,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    5
    /* IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      5,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    6
    /* IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      6,
      0
      /* APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code2 = ch.charCodeAt(0);
    switch (code2) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c = path[index];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap[
        "l"
        /* ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(
        "."
        /* DOT */
      )) {
        if (isObject(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(
          "."
          /* DOT */
        );
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages2) => messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject$1(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject$1(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject$1(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      [
        "list"
        /* LIST */
      ]: list,
      [
        "named"
        /* NAMED */
      ]: named,
      [
        "plural"
        /* PLURAL */
      ]: plural,
      [
        "linked"
        /* LINKED */
      ]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      [
        "message"
        /* MESSAGE */
      ]: message,
      [
        "type"
        /* TYPE */
      ]: type,
      [
        "interpolate"
        /* INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* NORMALIZE */
      ]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    // tokenizer error messages
    [
      0
      /* EXPECTED_TOKEN */
    ]: `Expected token: '{0}'`,
    [
      1
      /* INVALID_TOKEN_IN_PLACEHOLDER */
    ]: `Invalid token in placeholder: '{0}'`,
    [
      2
      /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
    ]: `Unterminated single quote in placeholder`,
    [
      3
      /* UNKNOWN_ESCAPE_SEQUENCE */
    ]: `Unknown escape sequence: \\{0}`,
    [
      4
      /* INVALID_UNICODE_ESCAPE_SEQUENCE */
    ]: `Invalid unicode escape sequence: {0}`,
    [
      5
      /* UNBALANCED_CLOSING_BRACE */
    ]: `Unbalanced closing brace`,
    [
      6
      /* UNTERMINATED_CLOSING_BRACE */
    ]: `Unterminated closing brace`,
    [
      7
      /* EMPTY_PLACEHOLDER */
    ]: `Empty placeholder`,
    [
      8
      /* NOT_ALLOW_NEST_PLACEHOLDER */
    ]: `Not allowed nest placeholder`,
    [
      9
      /* INVALID_LINKED_FORMAT */
    ]: `Invalid linked format`,
    // parser error messages
    [
      10
      /* MUST_HAVE_MESSAGES_IN_PLURAL */
    ]: `Plural must have messages`,
    [
      11
      /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
    ]: `Unexpected empty linked modifier`,
    [
      12
      /* UNEXPECTED_EMPTY_LINKED_KEY */
    ]: `Unexpected empty linked key`,
    [
      13
      /* UNEXPECTED_LEXICAL_ANALYSIS */
    ]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code2, loc, options = {}) {
    const { domain, messages: messages2, args } = options;
    const msg = format((messages2 || errorMessages$2)[code2] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code2;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version2, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n: i18n2,
      version: version2,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [
      0
      /* NOT_FOUND_KEY */
    ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [
      1
      /* FALLBACK_TO_TRANSLATE */
    ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [
      2
      /* CANNOT_FORMAT_NUMBER */
    ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [
      3
      /* FALLBACK_TO_NUMBER_FORMAT */
    ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [
      4
      /* CANNOT_FORMAT_DATE */
    ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [
      5
      /* FALLBACK_TO_DATE_FORMAT */
    ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code2, ...args) {
    return format(warnMessages$1[code2], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version2 = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages2 = isPlainObject$1(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign$2({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject$1(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version: version2,
      cid: _cid,
      locale,
      fallbackLocale,
      messages: messages2,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version2, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray$1(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray$1(fallback) ? fallback : isPlainObject$1(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray$1(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray$1(blocks) || isPlainObject$1(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code2) {
    return createCompileError(code2, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [
      14
      /* INVALID_ARGUMENT */
    ]: "Invalid arguments",
    [
      15
      /* INVALID_DATE_ARGUMENT */
    ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [
      16
      /* INVALID_ISO_DATE_ARGUMENT */
    ]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages: messages2 } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages2[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign$2({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray$1(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages: messages2, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message = messages2[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject$1(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray$1(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject$1(arg3)) {
      assign$2(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(
        4
        /* CANNOT_FORMAT_DATE */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject$1(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign$2({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(
          15
          /* INVALID_DATE_ARGUMENT */
        );
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number$1(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(
        2
        /* CANNOT_FORMAT_NUMBER */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject$1(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign$2({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const value = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  function getDevtoolsGlobalHook$1() {
    return getTarget$1().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget$1() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable$1 = typeof Proxy === "function";
  const HOOK_SETUP$1 = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET$1 = "plugin:settings:set";
  let ApiProxy$1 = class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET$1, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  };
  function setupDevtoolsPlugin$1(pluginDescriptor, setupFn) {
    const target = getTarget$1();
    const hook = getDevtoolsGlobalHook$1();
    const enableProxy = isProxyAvailable$1 && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP$1, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy$1(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    [
      "vue-devtools-plugin-vue-i18n"
      /* PLUGIN */
    ]: "Vue I18n devtools",
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "I18n Resources",
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [
      6
      /* FALLBACK_TO_ROOT */
    ]: `Fall back to {type} '{key}' with root locale.`,
    [
      7
      /* NOT_SUPPORTED_PRESERVE */
    ]: `Not supported 'preserve'.`,
    [
      8
      /* NOT_SUPPORTED_FORMATTER */
    ]: `Not supported 'formatter'.`,
    [
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ]: `Not supported 'preserveDirectiveContent'.`,
    [
      10
      /* NOT_SUPPORTED_GET_CHOICE_INDEX */
    ]: `Not supported 'getChoiceIndex'.`,
    [
      11
      /* COMPONENT_NAME_LEGACY_COMPATIBLE */
    ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [
      12
      /* NOT_FOUND_PARENT_SCOPE */
    ]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code2, ...args) {
    return format(warnMessages[code2], ...args);
  }
  function createI18nError(code2, ...args) {
    return createCompileError(code2, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [
      14
      /* UNEXPECTED_RETURN_TYPE */
    ]: "Unexpected return type in composer",
    [
      15
      /* INVALID_ARGUMENT */
    ]: "Invalid argument",
    [
      16
      /* MUST_BE_CALL_SETUP_TOP */
    ]: "Must be called at the top of a `setup` function",
    [
      17
      /* NOT_INSLALLED */
    ]: "Need to install with `app.use` function",
    [
      22
      /* UNEXPECTED_ERROR */
    ]: "Unexpected error",
    [
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    ]: "Not available in legacy mode",
    [
      19
      /* REQUIRED_VALUE */
    ]: `Required in value: {0}`,
    [
      20
      /* INVALID_VALUE */
    ]: `Invalid value`,
    [
      21
      /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
    ]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages: messages2, __i18n } = options;
    const ret = isPlainObject$1(messages2) ? messages2 : isArray$1(__i18n) ? {} : { [locale]: {} };
    if (isArray$1(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
    );
    const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject$1(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject$1(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages2 = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(
          14
          /* UNEXPECTED_RETURN_TYPE */
        );
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      return t(...[arg1, arg2, assign$2({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number$1(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps(
        (context) => {
          let ret;
          const _context2 = context;
          try {
            _context2.processor = processor;
            ret = translate(_context2, ...args);
          } finally {
            _context2.processor = null;
          }
          return ret;
        },
        () => parseTranslateArgs(...args),
        "translate",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[TransrateVNodeSymbol](...args),
        (key) => [vue.createVNode(vue.Text, null, key, 0)],
        (val) => isArray$1(val)
      );
    }
    function numberParts(...args) {
      return wrapWithDeps(
        (context) => number$1(context, ...args),
        () => parseNumberArgs(...args),
        "number format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[NumberPartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray$1(val)
      );
    }
    function datetimeParts(...args) {
      return wrapWithDeps(
        (context) => datetime(context, ...args),
        () => parseDateTimeArgs(...args),
        "datetime format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[DatetimePartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray$1(val)
      );
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages22 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages22 = messageValue;
          break;
        }
      }
      return messages22;
    }
    function tm(key) {
      const messages22 = resolveMessages(key);
      return messages22 != null ? messages22 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign$2(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign$2(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages: messages2,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject$1(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    }
    let messages2 = options.messages;
    if (isPlainObject$1(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages2 = locales.reduce((messages22, locale2) => {
        const message = messages22[locale2] || (messages22[locale2] = {});
        assign$2(message, sharedMessages[locale2]);
        return messages22;
      }, messages2 || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages: messages2,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray$1(arg2)) {
          list = arg2;
        } else if (isPlainObject$1(arg2)) {
          named = arg2;
        }
        if (isArray$1(arg3)) {
          list = arg3;
        } else if (isPlainObject$1(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray$1(arg2)) {
          list = arg2;
        } else if (isPlainObject$1(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray$1(arg3)) {
          list = arg3;
        } else if (isPlainObject$1(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      // d
      d(...args) {
        return composer.d(...args);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      // n
      n(...args) {
        return composer.n(...args);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(
          10
          /* NOT_SUPPORTED_GET_CHOICE_INDEX */
        ));
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    /* eslint-disable */
    name: "i18n-t",
    props: assign$2({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign$2({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$1(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign$2({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray$1(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign$2({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    /* eslint-disable */
    name: "i18n-n",
    props: assign$2({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    /* eslint-disable */
    name: "i18n-d",
    props: assign$2({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  };
  function getComposer$2(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n2.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const composer = getComposer$2(i18n2, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(
          7
          /* NOT_SUPPORTED_PRESERVE */
        ));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject$1(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n2, ...options) {
    const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n2));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  async function enableDevTools(app, i18n2) {
    return new Promise((resolve, reject) => {
      try {
        setupDevtoolsPlugin$1({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels[
            "vue-devtools-plugin-vue-i18n"
            /* PLUGIN */
          ],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n2);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n2.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n2);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n2);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n2);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels[
              "vue-i18n-timeline"
              /* TIMELINE */
            ],
            color: VueDevToolsTimelineColors[
              "vue-i18n-timeline"
              /* TIMELINE */
            ]
          });
          resolve(true);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n2) {
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages2) {
    const value = {};
    Object.keys(messages2).forEach((key) => {
      const v = messages2[key];
      if (isFunction(v) && "source" in v) {
        value[key] = getMessageFunctionDetails(v);
      } else if (isObject$1(v)) {
        value[key] = getLocaleMessageValue(v);
      } else {
        value[key] = v;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func2) {
    const argString = func2.source ? `("${escape(func2.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>ƒ</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n2) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    for (const [keyInstance, instance] of i18n2.__instances) {
      const composer = i18n2.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n2) {
    if (nodeId === "global") {
      return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    } else {
      const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n2.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n2) {
    const composer = getComposer$1(payload.nodeId, i18n2);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray$1(payload.state.value) || isObject$1(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n2.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n2.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages2 = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages2).forEach((locale) => root.mergeLocaleMessage(locale, messages2[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n2 = {
      // mode
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(
              21
              /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
            );
          }
          const emitter = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      // @internal
      __instances,
      // @internal
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      // @internal
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      // @internal
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(
        16
        /* MUST_BE_CALL_SETUP_TOP */
      );
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(
        17
        /* NOT_INSLALLED */
      );
    }
    const i18n2 = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n2) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages2 = isObject$1(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages2 = getLocaleMessages(global2.locale.value, {
          messages: messages2,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages2);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages2[locale]);
        });
      }
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(
            12
            /* NOT_FOUND_PARENT_SCOPE */
          ));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n2.mode === "legacy") {
      throw createI18nError(
        18
        /* NOT_AVAILABLE_IN_LEGACY_MODE */
      );
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign$2({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n2, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n2, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n2 = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n2;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url2, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url2) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url2, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url2 = reader.result;
        if (typeof url2 !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url2 = isChromeIOS ? url2 : url2.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url2;
        } else {
          location.assign(url2);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url2 = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url2);
      else
        location.href = url2;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url2);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text: text2, file } = result;
      loadStoresState(pinia, JSON.parse(text2));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache2[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const text = `基本信息
白客，本名罗宏明，1988年7月9日出生于山东省泰安市，毕业于南京传媒学院，中国内地影视男演员、配音演员、编剧、导演 [1] [60] [102] [116] [134]。
2012年，参演的微电影《老魔术师》上映，这是他首次接触演员工作 [2]。2013年，在叫兽易小星执导的搞笑网剧《万万没想到》中饰演男主“王大锤”，从而走进观众视野；随后，参演万合天宜出品的轻喜剧《报告老板》播出 [3] [104]。2014年，主演的喜剧《万万没想到：小兵过年》在湖南卫视播出，剧中饰演王大锤；同年，客串韩寒执导的公路电影《后会无期》 [4]。2016年，凭借奇幻喜剧电影《万万没想到》获得“首届亚洲新媒体电影节最佳男演员奖” [97-98]，2017年，凭借在贺岁档大片《大闹天竺》中的表现，首次获得中澳国际电影节的提名，并最终荣获“最佳新人奖” [101]。2018年，主演由顾长卫导演执导的爱情喜剧《遇见你真好》，剧中饰演张文生 [8]。2019年，在爱情电影《被光抓走的人》中饰演筷子 [10]。2021年，在爱情片《合法伴侣》中饰演金天，参演的电影《门锁》中，饰演郑飞 [39-40] [66]。2023年，与苗苗、张颂文共同领衔主演的励志影片《不止不休》播出，剧中饰演实习记者韩东 [119] [135]，同年，在年代剧《问苍茫》中饰演蒋介石 [95]；12月，与董成鹏、庄达菲共同领衔主演的喜剧电影《年会不能停！》上映，剧中饰演马杰 [91]。 2024年，凭借电影《年会不能停！》获得第37届中国电影金鸡奖最佳男配角提名。 [152]12月，获得2024爱奇艺尖叫之夜年度男配角 [156]。2025年，领衔主演的电影《唐探1900》上映； [159]3月，与辛芷蕾共同主演的电视剧《仁心俱乐部》播出 [133] [164]。
艺    名白客
本    名罗宏明 [102]
外文名White. K [139]
Bai ke
Hongming Luo
性    别男
民    族汉族
国    籍中国
出生地山东省泰安市 [102]
出生日期1988年7月9日 [102]
毕业院校南京传媒学院 [60] [102]
星    座巨蟹座 [139]
血    型O型 [139]
身    高178 cm [139]
体    重75 kg [139]
经纪公司北京万合天宜影视文化有限公司 [136]（2014年）
代表作品万万没想到、江照黎明、报告老板、被光抓走的人、大闹天竺、不止不休、年会不能停！
职    业演员 [139]
主要成就2020腾讯娱乐年度盛典年度电影潜力演员 [38]
早年经历
播报
编辑
1988年7月9日出生于山东省泰安市，因喜欢郑渊洁的童话《白客》而把艺名取为白客 [116]。
2010年，在中国传媒大学南广学院（现南京传媒学院）学习播音与主持艺术专业的白客即将大学毕业，和同寝室成员组成“cucn201”本地配音组，为《搞笑漫画日和》制作中文版的配音，作品发出的一周时间点击率便超过了一百多万 [1] [11] [60] [103]。
2012年春节后，白客辞去扬州某台的主持工作，选择“北漂”，与叫兽小星、小爱、子墨等“初创成员”一同在北京大望路的一间小屋里成立网络短剧团队 [117]。
演艺经历
播报
编辑
初露锋芒
2012年8月，由席中中执导的爱情题材微电影《老魔术师》在七夕情人节前夕上映，白客首次接触演员工作，在影片中饰演年轻时候的“魔术师” [2] [12]；同年，与小爱共同担任编剧，并主演的喜剧电影《那些年狂追我的女孩》上映，白客在其中饰演主人公“小白” [12]。
2013年，参演叫兽易小星执导的Mini剧《万万没想到》在湖南卫视与优酷、土豆热播，剧中饰演呆呆木木的屌丝王大锤 [13]；随后，参演《万万没想到》原班人马参与制作的网络迷你剧《报告老板》播出 [14]。
2014年春节期间，主演的贺岁搞笑剧《万万没想到：小兵过年》在湖南卫视播出，剧中饰演王大锤，该片第一集上线仅48小时播放量突破500万；随后，与撒贝宁、王冠一同担任2014年央视网络春晚主持；1月4日，百事贺岁微电影《把乐带回家2014》首映，片中饰演了大反派副店长阿豪，颠覆了以往呆萌无害的衰男形象 [15] [106]；5月，客串爱奇艺网络剧《高科技少女喵》，饰演少年汪 [16] [105]；同年，《万万没想到第二季》在优酷播出，白客继续出演王大锤一角 [17]；7月，客串出演韩寒执导的公路电影《后会无期》，出演的是与以往表演风格完全不同的一个角色，剧中形象上邋遢而不修边幅，短短几句台词便让观众直呼惊艳 [18] [107-108]；同年11月，主演的系列网络剧《报告老板！贺岁篇》播出，作为电影中的原班人马“重操旧业”，再度饰演小蘑菇一角 [19]。
2015年2月25日，由万合天宜、优酷联合出品的首部古装推理单元喜剧《名侦探狄仁杰》播出，在该剧中白客扮演狄仁杰的助手兼好友白元芳 [20]；同年12月18日，奇幻喜剧电影《万万没想到》上映，片中饰演的王大锤是自诩为妖王的小妖，该片累计票房2.78亿（截止12月21日） [5] [109]。`;
  const useScriptStore = defineStore("script", {
    state: () => ({
      text,
      title: "",
      id: null,
      createdAt: null
    }),
    actions: {
      setText(text2) {
        this.text = text2;
      },
      setTitle(title2) {
        this.title = title2;
      },
      async saveScript() {
        try {
          const scripts = await this.getScripts();
          const newScript = {
            id: Date.now().toString(),
            title: this.title || "Untitled",
            text: this.text,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          scripts.push(newScript);
          uni.setStorageSync("scripts", JSON.stringify(scripts));
          return newScript;
        } catch (error) {
          formatAppLog("error", "at stores/script.js:34", "Error saving script:", error);
          throw error;
        }
      },
      async getScripts() {
        try {
          const scriptsStr = uni.getStorageSync("scripts");
          return scriptsStr ? JSON.parse(scriptsStr) : [];
        } catch (error) {
          formatAppLog("error", "at stores/script.js:44", "Error getting scripts:", error);
          return [];
        }
      },
      async loadScript(scriptId) {
        try {
          const scripts = await this.getScripts();
          const script = scripts.find((s) => s.id === scriptId);
          if (script) {
            this.text = script.text;
            this.title = script.title;
            this.id = script.id;
            this.createdAt = script.createdAt;
            return script.text;
          }
          return "";
        } catch (error) {
          formatAppLog("error", "at stores/script.js:62", "Error loading script:", error);
          return "";
        }
      },
      async deleteScript(scriptId) {
        try {
          const scripts = await this.getScripts();
          const updatedScripts = scripts.filter((s) => s.id !== scriptId);
          uni.setStorageSync("scripts", JSON.stringify(updatedScripts));
        } catch (error) {
          formatAppLog("error", "at stores/script.js:73", "Error deleting script:", error);
          throw error;
        }
      }
    }
  });
  const fontList = [
    { name: "微软雅黑", value: "Microsoft YaHei" },
    { name: "宋体", value: "SimSun" },
    { name: "黑体", value: "SimHei" },
    { name: "楷体", value: "KaiTi" },
    { name: "仿宋", value: "FangSong" },
    { name: "方正硬笔行书简体", value: "FZHardPen" },
    { name: "迷你简超粗圆", value: "MiniJianChaoCuYuan" }
  ];
  const kApplicationVersion = "0.1.0";
  const kSupportedLocales = [
    ["English", "en-US"],
    ["简体中文", "zh-CN"]
  ];
  const _sfc_main$8 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const { t } = useI18n();
      const scriptStore = useScriptStore();
      const scriptText = vue.ref("");
      const uToast1 = vue.ref(null);
      vue.onMounted(() => {
        scriptText.value = scriptStore.text;
      });
      const storeText = vue.computed(() => scriptStore.text);
      vue.watch(storeText, (newValue) => {
        scriptText.value = newValue;
      });
      const startPrompter = () => {
        scriptStore.setText(scriptText.value);
        uni.navigateTo({
          url: "/pages/prompter/prompter"
        });
      };
      const openFile = () => {
        uni.navigateTo({
          url: "/pages/open-file/open-file"
        });
      };
      const showSaveDialog = () => {
        scriptStore.setText(scriptText.value);
        uni.showModal({
          title: t("HomeScreen.BottomSheet.Text_Title"),
          editable: true,
          placeholderText: t("HomeScreen.BottomSheet.TextField_hintText"),
          success: (res) => {
            if (res.confirm && res.content) {
              uToast1.value.show({
                title: t("HomeScreen.Text_Saved"),
                type: "success"
              });
              scriptStore.setTitle(res.content);
              scriptStore.saveScript();
            }
          }
        });
      };
      const goToSettings = () => {
        uni.navigateTo({
          url: "/pages/settings/settings"
        });
      };
      const showAboutDialog = () => {
        uni.showModal({
          title: t("HomeScreen.IconButton_About"),
          content: `WordPrompt ${kApplicationVersion}`,
          showCancel: false
        });
      };
      const __returned__ = { t, scriptStore, scriptText, uToast1, storeText, startPrompter, openFile, showSaveDialog, goToSettings, showAboutDialog, ref: vue.ref, onMounted: vue.onMounted, watch: vue.watch, computed: vue.computed, get useI18n() {
        return useI18n;
      }, get useScriptStore() {
        return useScriptStore;
      }, get kApplicationVersion() {
        return kApplicationVersion;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_toast = resolveEasycom(vue.resolveDynamicComponent("u-toast"), __easycom_0$4);
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_1$1);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$3);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-screen" }, [
      vue.createVNode(
        _component_u_toast,
        { ref: "uToast1" },
        null,
        512
        /* NEED_PATCH */
      ),
      vue.createElementVNode("view", { class: "input-area" }, [
        vue.createVNode(_component_u_input, {
          type: "textarea",
          modelValue: $setup.scriptText,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.scriptText = $event),
          clearable: "",
          maxlength: 99999,
          "adjust-position": "",
          border: "",
          "auto-height": false,
          height: "900",
          placeholder: _ctx.$t("HomeScreen.TextField_hintText"),
          class: "script-input"
        }, null, 8, ["modelValue", "placeholder"])
      ]),
      vue.createElementVNode("view", { class: "u-button-group" }, [
        vue.createVNode(_component_u_button, { onClick: $setup.startPrompter }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.$t("HomeScreen.ElevatedButton_Start")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_u_button, { onClick: $setup.openFile }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.$t("HomeScreen.ElevatedButton_Select")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_u_button, { onClick: $setup.showSaveDialog }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.$t("HomeScreen.ElevatedButton_Save")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "bottom-bar" }, [
        vue.createElementVNode("view", { class: "icon-group" }, [
          vue.createElementVNode("view", { onClick: $setup.goToSettings }, [
            vue.createVNode(_component_uni_icons, {
              type: "gear",
              size: "24"
            })
          ]),
          vue.createElementVNode("view", { onClick: $setup.showAboutDialog }, [
            vue.createVNode(_component_uni_icons, {
              type: "info",
              size: "24"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/git/wordPrompt/pages/index/index.vue"]]);
  const useSettingsStore = defineStore("settings", {
    state: () => ({
      scrollSpeed: 3.5,
      fontSize: 40,
      alignment: "center",
      fontFamily: "Microsoft YaHei",
      mirroredX: false,
      mirroredY: false,
      transparentBackground: true,
      sideMargin: 4,
      lineHeightRate: 1.5,
      countdownDuration: 3
    }),
    actions: {
      setScrollSpeed(speed) {
        this.scrollSpeed = speed;
      },
      setFontSize(size) {
        this.fontSize = size;
      },
      setAlignment(alignment) {
        this.alignment = alignment;
      },
      setFontFamily(family) {
        this.fontFamily = family;
      },
      setMirroredX(mirrored) {
        this.mirroredX = mirrored;
      },
      setMirroredY(mirrored) {
        this.mirroredY = mirrored;
      },
      setSideMargin(margin) {
        this.sideMargin = margin;
      },
      setCountdownDuration(duration) {
        this.countdownDuration = duration;
      },
      setCountdownLineHeight(f) {
        this.lineHeightRate = f;
      },
      setTransparentBackground(transparent) {
        this.transparentBackground = transparent;
      },
      resetSettings() {
        this.$reset();
      }
    }
  });
  const btns = [
    {
      text: "字体",
      icon: "edit-pen-fill",
      action: "font"
    },
    {
      text: "速度减",
      icon: "minus",
      action: "minus"
    },
    {
      text: "开始",
      icon: "play-right-fill",
      action: "play"
    },
    {
      text: "速度加",
      icon: "plus",
      action: "plus"
    },
    {
      text: "设置",
      icon: "setting",
      action: "setting"
    }
  ];
  const _sfc_main$7 = {
    name: "u-mask",
    emits: ["click"],
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
      zoom: {
        type: Boolean,
        default: true
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [Number, String],
        default: 300
      },
      // 是否可以通过点击遮罩进行关闭
      maskClickAble: {
        type: Boolean,
        default: true
      },
      // 遮罩的模糊度
      blur: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        zoomStyle: {
          transform: ""
        },
        scale: "scale(1.2, 1.2)"
      };
    },
    watch: {
      show(n) {
        if (n && this.zoom) {
          this.zoomStyle.transform = "scale(1, 1)";
        } else if (!n && this.zoom) {
          this.zoomStyle.transform = this.scale;
        }
      }
    },
    computed: {
      maskStyle() {
        let style = {};
        style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        if (this.show)
          style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
        else
          style.zIndex = -1;
        style.transition = `all ${this.duration / 1e3}s ease-in-out`;
        if (Object.keys(this.customStyle).length)
          style = {
            ...style,
            ...this.customStyle
          };
        return style;
      },
      filterStyle() {
        let { blur } = this;
        let style = {};
        if (blur) {
          style.backdropFilter = `blur(${blur}rpx)`;
        }
        return style;
      }
    },
    methods: {
      click() {
        if (!this.maskClickAble)
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-mask", {
          "u-mask-zoom": $props.zoom,
          "u-mask-show": $props.show
        }]),
        "hover-stop-propagation": "",
        style: vue.normalizeStyle([$options.maskStyle, $data.zoomStyle, $options.filterStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
        onTouchmove: vue.withModifiers(() => {
        }, ["stop", "prevent"])
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-b3b508a8"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
  const _sfc_main$6 = {
    name: "u-popup",
    emits: ["update:modelValue", "input", "open", "close"],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      /**
       * 显示状态
       */
      show: {
        type: Boolean,
        default: false
      },
      /**
       * 弹出方向，left|right|top|bottom|center
       */
      mode: {
        type: String,
        default: "left"
      },
      /**
       * 是否显示遮罩
       */
      mask: {
        type: Boolean,
        default: true
      },
      // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度
      length: {
        type: [Number, String],
        default: "auto"
      },
      // 是否开启缩放动画，只在mode=center时有效
      zoom: {
        type: Boolean,
        default: true
      },
      // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否可以通过点击遮罩进行关闭
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 用户自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
      // 对v-model双向绑定多层调用造成报错不能修改props值的问题
      popup: {
        type: Boolean,
        default: true
      },
      // 显示显示弹窗的圆角，单位rpx
      borderRadius: {
        type: [Number, String],
        default: 0
      },
      zIndex: {
        type: [Number, String],
        default: ""
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 关闭图标的名称，只能uView的内置图标
      closeIcon: {
        type: String,
        default: "close"
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // 关闭图标的颜色
      closeIconColor: {
        type: String,
        default: "#909399"
      },
      // 关闭图标的大小，单位rpx
      closeIconSize: {
        type: [String, Number],
        default: "30"
      },
      // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      width: {
        type: String,
        default: ""
      },
      // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
      // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
      height: {
        type: String,
        default: ""
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // 遮罩的样式，一般用于修改遮罩的透明度
      maskCustomStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 遮罩打开或收起的动画过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 250
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        visibleSync: false,
        showDrawer: false,
        timer: null,
        closeFromInner: false
        // value的值改变，是发生在内部还是外部
      };
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
      style() {
        let style = {};
        if (this.mode == "left" || this.mode == "right") {
          style = {
            width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
            height: "100%",
            transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
          };
        } else if (this.mode == "top" || this.mode == "bottom") {
          style = {
            width: "100%",
            height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
            transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
          };
        }
        style.zIndex = this.uZindex;
        if (this.borderRadius) {
          switch (this.mode) {
            case "left":
              style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
              break;
            case "top":
              style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
              break;
            case "right":
              style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
              break;
            case "bottom":
              style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
              break;
          }
          style.overflow = "hidden";
        }
        if (this.duration)
          style.transition = `all ${this.duration / 1e3}s linear`;
        return style;
      },
      // 中部弹窗的特有样式
      centerStyle() {
        let style = {};
        style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
        style.height = this.height ? this.getUnitValue(this.height) : "auto";
        style.zIndex = this.uZindex;
        style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
        if (this.borderRadius) {
          style.borderRadius = `${this.borderRadius}rpx`;
          style.overflow = "hidden";
        }
        return style;
      },
      // 计算整理后的z-index值
      uZindex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    watch: {
      valueCom: {
        handler(val) {
          if (val) {
            this.open();
          } else if (!this.closeFromInner) {
            this.close();
          }
          this.closeFromInner = false;
        }
      }
    },
    mounted() {
      if (this.valueCom) {
        this.open();
      }
    },
    methods: {
      // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
      getUnitValue(val) {
        if (/(%|px|rpx|auto)$/.test(val))
          return val;
        else
          return val + "rpx";
      },
      // 遮罩被点击
      maskClick() {
        this.close();
      },
      close() {
        this.closeFromInner = true;
        this.change("showDrawer", "visibleSync", false);
      },
      // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
      // 让其只在mode=center时起作用
      modeCenterClose(mode) {
        if (mode != "center" || !this.maskCloseAble)
          return;
        this.close();
      },
      open() {
        this.change("visibleSync", "showDrawer", true);
      },
      // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
      // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
      change(param1, param2, status) {
        if (this.popup == true) {
          this.$emit("input", status);
          this.$emit("update:modelValue", status);
        }
        this[param1] = status;
        if (status) {
          this.$nextTick(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          });
        } else {
          this.timer = setTimeout(() => {
            this[param2] = status;
            this.$emit(status ? "open" : "close");
          }, this.duration);
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_mask = resolveEasycom(vue.resolveDynamicComponent("u-mask"), __easycom_0$2);
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$5);
    return $data.visibleSync ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        style: vue.normalizeStyle([$props.customStyle, {
          zIndex: $options.uZindex - 1
        }]),
        class: "u-drawer",
        "hover-stop-propagation": ""
      },
      [
        vue.createVNode(_component_u_mask, {
          blur: $props.blur,
          duration: $props.duration,
          "custom-style": $props.maskCustomStyle,
          maskClickAble: $props.maskCloseAble,
          "z-index": $options.uZindex - 2,
          show: $data.showDrawer && $props.mask,
          onClick: $options.maskClick
        }, null, 8, ["blur", "duration", "custom-style", "maskClickAble", "z-index", "show", "onClick"]),
        vue.createCommentVNode(" 移除	@tap.stop.prevent "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-drawer-content", [
              $props.safeAreaInsetBottom ? "safe-area-inset-bottom" : "",
              "u-drawer-" + $props.mode,
              $data.showDrawer ? "u-drawer-content-visible" : "",
              $props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""
            ]]),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.modeCenterClose($props.mode)),
            onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            style: vue.normalizeStyle([$options.style])
          },
          [
            $props.mode == "center" ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-mode-center-box",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([$options.centerStyle])
              },
              [
                $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  onClick: $options.close,
                  class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]]),
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["onClick", "class", "name", "color", "size"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("scroll-view", {
                  class: "u-drawer__scroll-view",
                  "scroll-y": "true"
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 1,
              class: "u-drawer__scroll-view",
              "scroll-y": "true"
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])),
            vue.createElementVNode(
              "view",
              {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args)),
                class: vue.normalizeClass(["u-close", ["u-close--" + $props.closeIconPos]])
              },
              [
                $props.mode != "center" && $props.closeable ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                  key: 0,
                  name: $props.closeIcon,
                  color: $props.closeIconColor,
                  size: $props.closeIconSize
                }, null, 8, ["name", "color", "size"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-c93a8fd2"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
  const _sfc_main$5 = {
    __name: "prompterPopup",
    props: {
      showPopup: {
        type: Boolean,
        default: false
      }
    },
    emits: ["update:showPopup"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const settingsStore = useSettingsStore();
      const fontSize = vue.computed(() => settingsStore.fontSize);
      const showPopup = vue.computed({
        get: () => props.showPopup,
        set: (value) => {
          emit("update:showPopup", value);
        }
      });
      const setFontSize = (type) => {
        type == "plus" ? settingsStore.setFontSize(fontSize.value + 2) : settingsStore.setFontSize(fontSize.value - 2);
      };
      const setsideMargin = (type) => {
        type == "plus" ? settingsStore.setSideMargin(settingsStore.sideMargin + 2) : settingsStore.setSideMargin(settingsStore.sideMargin - 2);
      };
      const setsideCountdownDuration = (type) => {
        type == "plus" ? settingsStore.setCountdownDuration(settingsStore.countdownDuration + 1) : settingsStore.setCountdownDuration(settingsStore.countdownDuration - 1);
      };
      const __returned__ = { props, emit, settingsStore, fontSize, showPopup, setFontSize, setsideMargin, setsideCountdownDuration, computed: vue.computed, get useSettingsStore() {
        return useSettingsStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$5);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$3);
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$1);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      modelValue: $setup.showPopup,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.showPopup = $event),
      mode: "bottom",
      "mask-close-able": "",
      length: "25%",
      "border-radius": "14"
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { style: { "padding": "20px", "width": "80vw" } }, [
          vue.createElementVNode("view", { class: "font-size-buttons" }, [
            vue.createElementVNode("text", { class: "draw-text-width" }, "字体大小"),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.setFontSize("minus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "minus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode(
              "text",
              { style: { "font-size": "16px" } },
              vue.toDisplayString($setup.fontSize),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.setFontSize("plus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "plus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createElementVNode("view", { class: "font-size-buttons" }, [
            vue.createElementVNode("text", { class: "draw-text-width" }, "与边缘的宽度"),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.setsideMargin("minus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "minus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode(
              "text",
              { style: { "font-size": "16px" } },
              vue.toDisplayString($setup.settingsStore.sideMargin),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.setsideMargin("plus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "plus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createElementVNode("view", { class: "font-size-buttons" }, [
            vue.createElementVNode("text", { class: "draw-text-width" }, "提词器倒计时"),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[4] || (_cache[4] = ($event) => $setup.setsideCountdownDuration("minus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "minus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode(
              "text",
              { style: { "font-size": "16px" } },
              vue.toDisplayString($setup.settingsStore.countdownDuration),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_u_button, {
              type: "primary",
              size: "mini",
              shape: "circle",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.setsideCountdownDuration("plus"))
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "plus",
                  size: "30"
                })
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue"]);
  }
  const prompterPopup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-33627759"], ["__file", "E:/git/wordPrompt/pages/prompter/prompterPopup.vue"]]);
  const _sfc_main$4 = {
    __name: "prompter",
    setup(__props, { expose: __expose }) {
      __expose();
      const scriptStore = useScriptStore();
      const settingsStore = useSettingsStore();
      const isPlaying = vue.ref(false);
      const scrollTop = vue.ref(0);
      const controlsVisible = vue.ref(true);
      const showCountdown = vue.ref(false);
      const countdownValue = vue.ref(3);
      const showPopup = vue.ref(false);
      let scrollInterval = null;
      const containerStyle = vue.computed(() => ({
        background: settingsStore.transparentBackground ? "transparent" : "#000",
        color: settingsStore.transparentBackground ? "#000" : "#fff",
        transform: `scaleX(${settingsStore.mirroredX ? -1 : 1}) scaleY(${settingsStore.mirroredY ? -1 : 1})`
      }));
      const fontSize = vue.computed(() => settingsStore.fontSize);
      const textStyle = vue.computed(() => ({
        fontSize: `${fontSize.value}rpx`,
        fontFamily: settingsStore.fontFamily,
        textAlign: settingsStore.alignment,
        padding: `0 ${settingsStore.sideMargin}%`,
        boxSizing: "border-box",
        lineHeight: `${fontSize.value * settingsStore.lineHeightRate}rpx`
      }));
      const updateProgress = (count) => {
        const progressRing = document.getElementById("progressRing");
        const progress = count / settingsStore.countdownDuration * 360;
        progressRing.style.setProperty("--progress", `${progress}deg`);
      };
      const startScrolling = () => {
        if (settingsStore.countdownDuration > 0) {
          showCountdown.value = true;
          countdownValue.value = settingsStore.countdownDuration;
          const countdownInterval = setInterval(() => {
            countdownValue.value--;
            countdownValue.value > 0 && updateProgress(countdownValue.value);
            if (countdownValue.value <= 0) {
              clearInterval(countdownInterval);
              showCountdown.value = false;
              startAutoScroll();
            }
          }, 1e3);
        } else {
          startAutoScroll();
        }
      };
      const startAutoScroll = () => {
        isPlaying.value = true;
        scrollInterval = setInterval(() => {
          scrollTop.value += settingsStore.scrollSpeed * 0.2;
        }, 50);
      };
      const stopScrolling = () => {
        isPlaying.value = false;
        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
      };
      const togglePlayPause = () => {
        if (isPlaying.value) {
          stopScrolling();
        } else {
          startScrolling();
        }
      };
      const toggleControls = () => {
        controlsVisible.value = !controlsVisible.value;
      };
      const handleIconClick = (action) => {
        switch (action) {
          case "list":
            break;
          case "minus":
            settingsStore.setScrollSpeed(settingsStore.scrollSpeed - 0.5);
            break;
          case "play":
            togglePlayPause();
            break;
          case "plus":
            settingsStore.setScrollSpeed(settingsStore.scrollSpeed + 0.5);
            break;
          case "font":
            showPopup.value = true;
            break;
          case "setting":
            uni.navigateTo({
              url: "/pages/settings/settings"
            });
            break;
        }
      };
      vue.onMounted(() => {
        if (uni.setKeepScreenOn) {
          uni.setKeepScreenOn({ keepScreenOn: true });
        }
      });
      vue.onUnmounted(() => {
        stopScrolling();
        if (uni.setKeepScreenOn) {
          uni.setKeepScreenOn({ keepScreenOn: false });
        }
      });
      const isDragging = vue.ref(false);
      const handleTouchStart = (e) => {
        stopScrolling();
        isDragging.value = true;
      };
      const handleTouchMove = (e) => {
        if (isDragging.value) {
          vue.nextTick(function() {
            scrollTop.value = e.detail.scrollTop;
          });
        }
      };
      const handleTouchEnd = () => {
        isDragging.value = false;
      };
      const __returned__ = { scriptStore, settingsStore, isPlaying, scrollTop, controlsVisible, showCountdown, countdownValue, showPopup, get scrollInterval() {
        return scrollInterval;
      }, set scrollInterval(v) {
        scrollInterval = v;
      }, containerStyle, fontSize, textStyle, updateProgress, startScrolling, startAutoScroll, stopScrolling, togglePlayPause, toggleControls, handleIconClick, isDragging, handleTouchStart, handleTouchMove, handleTouchEnd, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted, nextTick: vue.nextTick, get useScriptStore() {
        return useScriptStore;
      }, get useSettingsStore() {
        return useSettingsStore;
      }, get btns() {
        return btns;
      }, get prompterPopup() {
        return prompterPopup;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$5);
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "prompter-screen" }, [
      vue.createElementVNode("view", { class: "safe-area-top" }),
      vue.createElementVNode("view", {
        class: "text-content",
        onClick: $setup.toggleControls
      }, [
        vue.createElementVNode(
          "view",
          {
            style: vue.normalizeStyle($setup.containerStyle)
          },
          [
            vue.createElementVNode("scroll-view", {
              "scroll-y": true,
              "scroll-top": $setup.scrollTop,
              class: "scrollable-text",
              style: vue.normalizeStyle([$setup.textStyle, { "height": "calc(100vh - 44px)" }]),
              onScroll: $setup.handleTouchMove,
              onTouchstart: $setup.handleTouchStart,
              onTouchend: $setup.handleTouchEnd,
              "scroll-with-animation": false,
              "enable-flex": true
            }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($setup.scriptStore.text),
                1
                /* TEXT */
              )
            ], 44, ["scroll-top"])
          ],
          4
          /* STYLE */
        ),
        $setup.controlsVisible ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "controls"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.btns, (btn) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: btn.action
              }, [
                vue.createVNode(_component_u_button, {
                  type: "primary",
                  size: "mini",
                  shape: "circle",
                  onClick: ($event) => $setup.handleIconClick(btn.action),
                  customStyle: {
                    background: "transparent",
                    border: "none",
                    padding: 0
                  }
                }, {
                  default: vue.withCtx(() => [
                    btn.action == "play" ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                      key: 0,
                      name: $setup.isPlaying ? "pause" : "play-right-fill",
                      size: "30"
                    }, null, 8, ["name"])) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
                      key: 1,
                      name: btn.icon,
                      size: "30"
                    }, null, 8, ["name"]))
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : vue.createCommentVNode("v-if", true),
        $setup.showCountdown ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "countdown"
        }, [
          vue.createElementVNode("view", { class: "countdown-container" }, [
            vue.createElementVNode("div", { class: "progress-background" }),
            vue.createElementVNode("div", {
              class: "progress-ring",
              id: "progressRing"
            }),
            vue.createElementVNode(
              "text",
              { class: "countdown-text" },
              vue.toDisplayString($setup.countdownValue),
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createVNode($setup["prompterPopup"], {
        showPopup: $setup.showPopup,
        "onUpdate:showPopup": _cache[0] || (_cache[0] = ($event) => $setup.showPopup = $event)
      }, null, 8, ["showPopup"])
    ]);
  }
  const PagesPrompterPrompter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-be540b17"], ["__file", "E:/git/wordPrompt/pages/prompter/prompter.vue"]]);
  const provinces = [
    {
      code: "110000",
      name: "北京市"
    },
    {
      code: "120000",
      name: "天津市"
    },
    {
      code: "130000",
      name: "河北省"
    },
    {
      code: "140000",
      name: "山西省"
    },
    {
      code: "150000",
      name: "内蒙古自治区"
    },
    {
      code: "210000",
      name: "辽宁省"
    },
    {
      code: "220000",
      name: "吉林省"
    },
    {
      code: "230000",
      name: "黑龙江省"
    },
    {
      code: "310000",
      name: "上海市"
    },
    {
      code: "320000",
      name: "江苏省"
    },
    {
      code: "330000",
      name: "浙江省"
    },
    {
      code: "340000",
      name: "安徽省"
    },
    {
      code: "350000",
      name: "福建省"
    },
    {
      code: "360000",
      name: "江西省"
    },
    {
      code: "370000",
      name: "山东省"
    },
    {
      code: "410000",
      name: "河南省"
    },
    {
      code: "420000",
      name: "湖北省"
    },
    {
      code: "430000",
      name: "湖南省"
    },
    {
      code: "440000",
      name: "广东省"
    },
    {
      code: "450000",
      name: "广西壮族自治区"
    },
    {
      code: "460000",
      name: "海南省"
    },
    {
      code: "500000",
      name: "重庆市"
    },
    {
      code: "510000",
      name: "四川省"
    },
    {
      code: "520000",
      name: "贵州省"
    },
    {
      code: "530000",
      name: "云南省"
    },
    {
      code: "540000",
      name: "西藏自治区"
    },
    {
      code: "610000",
      name: "陕西省"
    },
    {
      code: "620000",
      name: "甘肃省"
    },
    {
      code: "630000",
      name: "青海省"
    },
    {
      code: "640000",
      name: "宁夏回族自治区"
    },
    {
      code: "650000",
      name: "新疆维吾尔自治区"
    },
    {
      code: "710000",
      name: "台湾省"
    },
    {
      code: "810000",
      name: "香港特别行政区"
    },
    {
      code: "820000",
      name: "澳门特别行政区"
    }
  ];
  const citys = [
    [
      {
        code: "110100",
        name: "北京市"
      }
    ],
    [
      {
        code: "120100",
        name: "天津市"
      }
    ],
    [
      {
        code: "130100",
        name: "石家庄市"
      },
      {
        code: "130200",
        name: "唐山市"
      },
      {
        code: "130300",
        name: "秦皇岛市"
      },
      {
        code: "130400",
        name: "邯郸市"
      },
      {
        code: "130500",
        name: "邢台市"
      },
      {
        code: "130600",
        name: "保定市"
      },
      {
        code: "130700",
        name: "张家口市"
      },
      {
        code: "130800",
        name: "承德市"
      },
      {
        code: "130900",
        name: "沧州市"
      },
      {
        code: "131000",
        name: "廊坊市"
      },
      {
        code: "131100",
        name: "衡水市"
      }
    ],
    [
      {
        code: "140100",
        name: "太原市"
      },
      {
        code: "140200",
        name: "大同市"
      },
      {
        code: "140300",
        name: "阳泉市"
      },
      {
        code: "140400",
        name: "长治市"
      },
      {
        code: "140500",
        name: "晋城市"
      },
      {
        code: "140600",
        name: "朔州市"
      },
      {
        code: "140700",
        name: "晋中市"
      },
      {
        code: "140800",
        name: "运城市"
      },
      {
        code: "140900",
        name: "忻州市"
      },
      {
        code: "141000",
        name: "临汾市"
      },
      {
        code: "141100",
        name: "吕梁市"
      }
    ],
    [
      {
        code: "150100",
        name: "呼和浩特市"
      },
      {
        code: "150200",
        name: "包头市"
      },
      {
        code: "150300",
        name: "乌海市"
      },
      {
        code: "150400",
        name: "赤峰市"
      },
      {
        code: "150500",
        name: "通辽市"
      },
      {
        code: "150600",
        name: "鄂尔多斯市"
      },
      {
        code: "150700",
        name: "呼伦贝尔市"
      },
      {
        code: "150800",
        name: "巴彦淖尔市"
      },
      {
        code: "150900",
        name: "乌兰察布市"
      },
      {
        code: "152200",
        name: "兴安盟"
      },
      {
        code: "152500",
        name: "锡林郭勒盟"
      },
      {
        code: "152900",
        name: "阿拉善盟"
      }
    ],
    [
      {
        code: "210100",
        name: "沈阳市"
      },
      {
        code: "210200",
        name: "大连市"
      },
      {
        code: "210300",
        name: "鞍山市"
      },
      {
        code: "210400",
        name: "抚顺市"
      },
      {
        code: "210500",
        name: "本溪市"
      },
      {
        code: "210600",
        name: "丹东市"
      },
      {
        code: "210700",
        name: "锦州市"
      },
      {
        code: "210800",
        name: "营口市"
      },
      {
        code: "210900",
        name: "阜新市"
      },
      {
        code: "211000",
        name: "辽阳市"
      },
      {
        code: "211100",
        name: "盘锦市"
      },
      {
        code: "211200",
        name: "铁岭市"
      },
      {
        code: "211300",
        name: "朝阳市"
      },
      {
        code: "211400",
        name: "葫芦岛市"
      }
    ],
    [
      {
        code: "220100",
        name: "长春市"
      },
      {
        code: "220200",
        name: "吉林市"
      },
      {
        code: "220300",
        name: "四平市"
      },
      {
        code: "220400",
        name: "辽源市"
      },
      {
        code: "220500",
        name: "通化市"
      },
      {
        code: "220600",
        name: "白山市"
      },
      {
        code: "220700",
        name: "松原市"
      },
      {
        code: "220800",
        name: "白城市"
      },
      {
        code: "222400",
        name: "延边朝鲜族自治州"
      }
    ],
    [
      {
        code: "230100",
        name: "哈尔滨市"
      },
      {
        code: "230200",
        name: "齐齐哈尔市"
      },
      {
        code: "230300",
        name: "鸡西市"
      },
      {
        code: "230400",
        name: "鹤岗市"
      },
      {
        code: "230500",
        name: "双鸭山市"
      },
      {
        code: "230600",
        name: "大庆市"
      },
      {
        code: "230700",
        name: "伊春市"
      },
      {
        code: "230800",
        name: "佳木斯市"
      },
      {
        code: "230900",
        name: "七台河市"
      },
      {
        code: "231000",
        name: "牡丹江市"
      },
      {
        code: "231100",
        name: "黑河市"
      },
      {
        code: "231200",
        name: "绥化市"
      },
      {
        code: "232700",
        name: "大兴安岭地区"
      }
    ],
    [
      {
        code: "310100",
        name: "上海市"
      }
    ],
    [
      {
        code: "320100",
        name: "南京市"
      },
      {
        code: "320200",
        name: "无锡市"
      },
      {
        code: "320300",
        name: "徐州市"
      },
      {
        code: "320400",
        name: "常州市"
      },
      {
        code: "320500",
        name: "苏州市"
      },
      {
        code: "320600",
        name: "南通市"
      },
      {
        code: "320700",
        name: "连云港市"
      },
      {
        code: "320800",
        name: "淮安市"
      },
      {
        code: "320900",
        name: "盐城市"
      },
      {
        code: "321000",
        name: "扬州市"
      },
      {
        code: "321100",
        name: "镇江市"
      },
      {
        code: "321200",
        name: "泰州市"
      },
      {
        code: "321300",
        name: "宿迁市"
      }
    ],
    [
      {
        code: "330100",
        name: "杭州市"
      },
      {
        code: "330200",
        name: "宁波市"
      },
      {
        code: "330300",
        name: "温州市"
      },
      {
        code: "330400",
        name: "嘉兴市"
      },
      {
        code: "330500",
        name: "湖州市"
      },
      {
        code: "330600",
        name: "绍兴市"
      },
      {
        code: "330700",
        name: "金华市"
      },
      {
        code: "330800",
        name: "衢州市"
      },
      {
        code: "330900",
        name: "舟山市"
      },
      {
        code: "331000",
        name: "台州市"
      },
      {
        code: "331100",
        name: "丽水市"
      }
    ],
    [
      {
        code: "340100",
        name: "合肥市"
      },
      {
        code: "340200",
        name: "芜湖市"
      },
      {
        code: "340300",
        name: "蚌埠市"
      },
      {
        code: "340400",
        name: "淮南市"
      },
      {
        code: "340500",
        name: "马鞍山市"
      },
      {
        code: "340600",
        name: "淮北市"
      },
      {
        code: "340700",
        name: "铜陵市"
      },
      {
        code: "340800",
        name: "安庆市"
      },
      {
        code: "341000",
        name: "黄山市"
      },
      {
        code: "341100",
        name: "滁州市"
      },
      {
        code: "341200",
        name: "阜阳市"
      },
      {
        code: "341300",
        name: "宿州市"
      },
      {
        code: "341500",
        name: "六安市"
      },
      {
        code: "341600",
        name: "亳州市"
      },
      {
        code: "341700",
        name: "池州市"
      },
      {
        code: "341800",
        name: "宣城市"
      }
    ],
    [
      {
        code: "350100",
        name: "福州市"
      },
      {
        code: "350200",
        name: "厦门市"
      },
      {
        code: "350300",
        name: "莆田市"
      },
      {
        code: "350400",
        name: "三明市"
      },
      {
        code: "350500",
        name: "泉州市"
      },
      {
        code: "350600",
        name: "漳州市"
      },
      {
        code: "350700",
        name: "南平市"
      },
      {
        code: "350800",
        name: "龙岩市"
      },
      {
        code: "350900",
        name: "宁德市"
      }
    ],
    [
      {
        code: "360100",
        name: "南昌市"
      },
      {
        code: "360200",
        name: "景德镇市"
      },
      {
        code: "360300",
        name: "萍乡市"
      },
      {
        code: "360400",
        name: "九江市"
      },
      {
        code: "360500",
        name: "新余市"
      },
      {
        code: "360600",
        name: "鹰潭市"
      },
      {
        code: "360700",
        name: "赣州市"
      },
      {
        code: "360800",
        name: "吉安市"
      },
      {
        code: "360900",
        name: "宜春市"
      },
      {
        code: "361000",
        name: "抚州市"
      },
      {
        code: "361100",
        name: "上饶市"
      }
    ],
    [
      {
        code: "370100",
        name: "济南市"
      },
      {
        code: "370200",
        name: "青岛市"
      },
      {
        code: "370300",
        name: "淄博市"
      },
      {
        code: "370400",
        name: "枣庄市"
      },
      {
        code: "370500",
        name: "东营市"
      },
      {
        code: "370600",
        name: "烟台市"
      },
      {
        code: "370700",
        name: "潍坊市"
      },
      {
        code: "370800",
        name: "济宁市"
      },
      {
        code: "370900",
        name: "泰安市"
      },
      {
        code: "371000",
        name: "威海市"
      },
      {
        code: "371100",
        name: "日照市"
      },
      {
        code: "371200",
        name: "莱芜市"
      },
      {
        code: "371300",
        name: "临沂市"
      },
      {
        code: "371400",
        name: "德州市"
      },
      {
        code: "371500",
        name: "聊城市"
      },
      {
        code: "371600",
        name: "滨州市"
      },
      {
        code: "371700",
        name: "菏泽市"
      }
    ],
    [
      {
        code: "410100",
        name: "郑州市"
      },
      {
        code: "410200",
        name: "开封市"
      },
      {
        code: "410300",
        name: "洛阳市"
      },
      {
        code: "410400",
        name: "平顶山市"
      },
      {
        code: "410500",
        name: "安阳市"
      },
      {
        code: "410600",
        name: "鹤壁市"
      },
      {
        code: "410700",
        name: "新乡市"
      },
      {
        code: "410800",
        name: "焦作市"
      },
      {
        code: "410900",
        name: "濮阳市"
      },
      {
        code: "411000",
        name: "许昌市"
      },
      {
        code: "411100",
        name: "漯河市"
      },
      {
        code: "411200",
        name: "三门峡市"
      },
      {
        code: "411300",
        name: "南阳市"
      },
      {
        code: "411400",
        name: "商丘市"
      },
      {
        code: "411500",
        name: "信阳市"
      },
      {
        code: "411600",
        name: "周口市"
      },
      {
        code: "411700",
        name: "驻马店市"
      },
      {
        code: "419000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "420100",
        name: "武汉市"
      },
      {
        code: "420200",
        name: "黄石市"
      },
      {
        code: "420300",
        name: "十堰市"
      },
      {
        code: "420500",
        name: "宜昌市"
      },
      {
        code: "420600",
        name: "襄阳市"
      },
      {
        code: "420700",
        name: "鄂州市"
      },
      {
        code: "420800",
        name: "荆门市"
      },
      {
        code: "420900",
        name: "孝感市"
      },
      {
        code: "421000",
        name: "荆州市"
      },
      {
        code: "421100",
        name: "黄冈市"
      },
      {
        code: "421200",
        name: "咸宁市"
      },
      {
        code: "421300",
        name: "随州市"
      },
      {
        code: "422800",
        name: "恩施土家族苗族自治州"
      },
      {
        code: "429000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "430100",
        name: "长沙市"
      },
      {
        code: "430200",
        name: "株洲市"
      },
      {
        code: "430300",
        name: "湘潭市"
      },
      {
        code: "430400",
        name: "衡阳市"
      },
      {
        code: "430500",
        name: "邵阳市"
      },
      {
        code: "430600",
        name: "岳阳市"
      },
      {
        code: "430700",
        name: "常德市"
      },
      {
        code: "430800",
        name: "张家界市"
      },
      {
        code: "430900",
        name: "益阳市"
      },
      {
        code: "431000",
        name: "郴州市"
      },
      {
        code: "431100",
        name: "永州市"
      },
      {
        code: "431200",
        name: "怀化市"
      },
      {
        code: "431300",
        name: "娄底市"
      },
      {
        code: "433100",
        name: "湘西土家族苗族自治州"
      }
    ],
    [
      {
        code: "440100",
        name: "广州市"
      },
      {
        code: "440200",
        name: "韶关市"
      },
      {
        code: "440300",
        name: "深圳市"
      },
      {
        code: "440400",
        name: "珠海市"
      },
      {
        code: "440500",
        name: "汕头市"
      },
      {
        code: "440600",
        name: "佛山市"
      },
      {
        code: "440700",
        name: "江门市"
      },
      {
        code: "440800",
        name: "湛江市"
      },
      {
        code: "440900",
        name: "茂名市"
      },
      {
        code: "441200",
        name: "肇庆市"
      },
      {
        code: "441300",
        name: "惠州市"
      },
      {
        code: "441400",
        name: "梅州市"
      },
      {
        code: "441500",
        name: "汕尾市"
      },
      {
        code: "441600",
        name: "河源市"
      },
      {
        code: "441700",
        name: "阳江市"
      },
      {
        code: "441800",
        name: "清远市"
      },
      {
        code: "441900",
        name: "东莞市"
      },
      {
        code: "442000",
        name: "中山市"
      },
      {
        code: "445100",
        name: "潮州市"
      },
      {
        code: "445200",
        name: "揭阳市"
      },
      {
        code: "445300",
        name: "云浮市"
      }
    ],
    [
      {
        code: "450100",
        name: "南宁市"
      },
      {
        code: "450200",
        name: "柳州市"
      },
      {
        code: "450300",
        name: "桂林市"
      },
      {
        code: "450400",
        name: "梧州市"
      },
      {
        code: "450500",
        name: "北海市"
      },
      {
        code: "450600",
        name: "防城港市"
      },
      {
        code: "450700",
        name: "钦州市"
      },
      {
        code: "450800",
        name: "贵港市"
      },
      {
        code: "450900",
        name: "玉林市"
      },
      {
        code: "451000",
        name: "百色市"
      },
      {
        code: "451100",
        name: "贺州市"
      },
      {
        code: "451200",
        name: "河池市"
      },
      {
        code: "451300",
        name: "来宾市"
      },
      {
        code: "451400",
        name: "崇左市"
      }
    ],
    [
      {
        code: "460100",
        name: "海口市"
      },
      {
        code: "460200",
        name: "三亚市"
      },
      {
        code: "460300",
        name: "三沙市"
      },
      {
        code: "460400",
        name: "儋州市"
      },
      {
        code: "469000",
        name: "省直辖县级行政区划"
      }
    ],
    [
      {
        code: "500100",
        name: "重庆市"
      },
      {
        code: "500200",
        name: "县"
      }
    ],
    [
      {
        code: "510100",
        name: "成都市"
      },
      {
        code: "510300",
        name: "自贡市"
      },
      {
        code: "510400",
        name: "攀枝花市"
      },
      {
        code: "510500",
        name: "泸州市"
      },
      {
        code: "510600",
        name: "德阳市"
      },
      {
        code: "510700",
        name: "绵阳市"
      },
      {
        code: "510800",
        name: "广元市"
      },
      {
        code: "510900",
        name: "遂宁市"
      },
      {
        code: "511000",
        name: "内江市"
      },
      {
        code: "511100",
        name: "乐山市"
      },
      {
        code: "511300",
        name: "南充市"
      },
      {
        code: "511400",
        name: "眉山市"
      },
      {
        code: "511500",
        name: "宜宾市"
      },
      {
        code: "511600",
        name: "广安市"
      },
      {
        code: "511700",
        name: "达州市"
      },
      {
        code: "511800",
        name: "雅安市"
      },
      {
        code: "511900",
        name: "巴中市"
      },
      {
        code: "512000",
        name: "资阳市"
      },
      {
        code: "513200",
        name: "阿坝藏族羌族自治州"
      },
      {
        code: "513300",
        name: "甘孜藏族自治州"
      },
      {
        code: "513400",
        name: "凉山彝族自治州"
      }
    ],
    [
      {
        code: "520100",
        name: "贵阳市"
      },
      {
        code: "520200",
        name: "六盘水市"
      },
      {
        code: "520300",
        name: "遵义市"
      },
      {
        code: "520400",
        name: "安顺市"
      },
      {
        code: "520500",
        name: "毕节市"
      },
      {
        code: "520600",
        name: "铜仁市"
      },
      {
        code: "522300",
        name: "黔西南布依族苗族自治州"
      },
      {
        code: "522600",
        name: "黔东南苗族侗族自治州"
      },
      {
        code: "522700",
        name: "黔南布依族苗族自治州"
      }
    ],
    [
      {
        code: "530100",
        name: "昆明市"
      },
      {
        code: "530300",
        name: "曲靖市"
      },
      {
        code: "530400",
        name: "玉溪市"
      },
      {
        code: "530500",
        name: "保山市"
      },
      {
        code: "530600",
        name: "昭通市"
      },
      {
        code: "530700",
        name: "丽江市"
      },
      {
        code: "530800",
        name: "普洱市"
      },
      {
        code: "530900",
        name: "临沧市"
      },
      {
        code: "532300",
        name: "楚雄彝族自治州"
      },
      {
        code: "532500",
        name: "红河哈尼族彝族自治州"
      },
      {
        code: "532600",
        name: "文山壮族苗族自治州"
      },
      {
        code: "532800",
        name: "西双版纳傣族自治州"
      },
      {
        code: "532900",
        name: "大理白族自治州"
      },
      {
        code: "533100",
        name: "德宏傣族景颇族自治州"
      },
      {
        code: "533300",
        name: "怒江傈僳族自治州"
      },
      {
        code: "533400",
        name: "迪庆藏族自治州"
      }
    ],
    [
      {
        code: "540100",
        name: "拉萨市"
      },
      {
        code: "540200",
        name: "日喀则市"
      },
      {
        code: "540300",
        name: "昌都市"
      },
      {
        code: "540400",
        name: "林芝市"
      },
      {
        code: "540500",
        name: "山南市"
      },
      {
        code: "542400",
        name: "那曲地区"
      },
      {
        code: "542500",
        name: "阿里地区"
      }
    ],
    [
      {
        code: "610100",
        name: "西安市"
      },
      {
        code: "610200",
        name: "铜川市"
      },
      {
        code: "610300",
        name: "宝鸡市"
      },
      {
        code: "610400",
        name: "咸阳市"
      },
      {
        code: "610500",
        name: "渭南市"
      },
      {
        code: "610600",
        name: "延安市"
      },
      {
        code: "610700",
        name: "汉中市"
      },
      {
        code: "610800",
        name: "榆林市"
      },
      {
        code: "610900",
        name: "安康市"
      },
      {
        code: "611000",
        name: "商洛市"
      }
    ],
    [
      {
        code: "620100",
        name: "兰州市"
      },
      {
        code: "620200",
        name: "嘉峪关市"
      },
      {
        code: "620300",
        name: "金昌市"
      },
      {
        code: "620400",
        name: "白银市"
      },
      {
        code: "620500",
        name: "天水市"
      },
      {
        code: "620600",
        name: "武威市"
      },
      {
        code: "620700",
        name: "张掖市"
      },
      {
        code: "620800",
        name: "平凉市"
      },
      {
        code: "620900",
        name: "酒泉市"
      },
      {
        code: "621000",
        name: "庆阳市"
      },
      {
        code: "621100",
        name: "定西市"
      },
      {
        code: "621200",
        name: "陇南市"
      },
      {
        code: "622900",
        name: "临夏回族自治州"
      },
      {
        code: "623000",
        name: "甘南藏族自治州"
      }
    ],
    [
      {
        code: "630100",
        name: "西宁市"
      },
      {
        code: "630200",
        name: "海东市"
      },
      {
        code: "632200",
        name: "海北藏族自治州"
      },
      {
        code: "632300",
        name: "黄南藏族自治州"
      },
      {
        code: "632500",
        name: "海南藏族自治州"
      },
      {
        code: "632600",
        name: "果洛藏族自治州"
      },
      {
        code: "632700",
        name: "玉树藏族自治州"
      },
      {
        code: "632800",
        name: "海西蒙古族藏族自治州"
      }
    ],
    [
      {
        code: "640100",
        name: "银川市"
      },
      {
        code: "640200",
        name: "石嘴山市"
      },
      {
        code: "640300",
        name: "吴忠市"
      },
      {
        code: "640400",
        name: "固原市"
      },
      {
        code: "640500",
        name: "中卫市"
      }
    ],
    [
      {
        code: "650100",
        name: "乌鲁木齐市"
      },
      {
        code: "650200",
        name: "克拉玛依市"
      },
      {
        code: "650400",
        name: "吐鲁番市"
      },
      {
        code: "650500",
        name: "哈密市"
      },
      {
        code: "652300",
        name: "昌吉回族自治州"
      },
      {
        code: "652700",
        name: "博尔塔拉蒙古自治州"
      },
      {
        code: "652800",
        name: "巴音郭楞蒙古自治州"
      },
      {
        code: "652900",
        name: "阿克苏地区"
      },
      {
        code: "653000",
        name: "克孜勒苏柯尔克孜自治州"
      },
      {
        code: "653100",
        name: "喀什地区"
      },
      {
        code: "653200",
        name: "和田地区"
      },
      {
        code: "654000",
        name: "伊犁哈萨克自治州"
      },
      {
        code: "654200",
        name: "塔城地区"
      },
      {
        code: "654300",
        name: "阿勒泰地区"
      },
      {
        code: "659000",
        name: "自治区直辖县级行政区划"
      }
    ],
    [
      {
        code: "710100",
        name: "台北市"
      },
      {
        code: "710200",
        name: "高雄市"
      },
      {
        code: "710300",
        name: "台南市"
      },
      {
        code: "710400",
        name: "台中市"
      },
      {
        code: "710600",
        name: "南投县"
      },
      {
        code: "710700",
        name: "基隆市"
      },
      {
        code: "710800",
        name: "新竹市"
      },
      {
        code: "710900",
        name: "嘉义市"
      },
      {
        code: "711100",
        name: "新北市"
      },
      {
        code: "711200",
        name: "宜兰县"
      },
      {
        code: "711300",
        name: "新竹县"
      },
      {
        code: "711400",
        name: "桃园市"
      },
      {
        code: "711500",
        name: "苗栗县"
      },
      {
        code: "711700",
        name: "彰化县"
      },
      {
        code: "711900",
        name: "嘉义县"
      },
      {
        code: "712100",
        name: "云林县"
      },
      {
        code: "712400",
        name: "屏东县"
      },
      {
        code: "712500",
        name: "台东县"
      },
      {
        code: "712600",
        name: "花莲县"
      },
      {
        code: "712700",
        name: "澎湖县"
      }
    ],
    [
      {
        code: "810100",
        name: "香港特别行政区"
      }
    ],
    [
      {
        code: "820100",
        name: "澳门特别行政区"
      }
    ]
  ];
  const areas = [
    [
      [
        {
          code: "110101",
          name: "东城区"
        },
        {
          code: "110102",
          name: "西城区"
        },
        {
          code: "110105",
          name: "朝阳区"
        },
        {
          code: "110106",
          name: "丰台区"
        },
        {
          code: "110107",
          name: "石景山区"
        },
        {
          code: "110108",
          name: "海淀区"
        },
        {
          code: "110109",
          name: "门头沟区"
        },
        {
          code: "110111",
          name: "房山区"
        },
        {
          code: "110112",
          name: "通州区"
        },
        {
          code: "110113",
          name: "顺义区"
        },
        {
          code: "110114",
          name: "昌平区"
        },
        {
          code: "110115",
          name: "大兴区"
        },
        {
          code: "110116",
          name: "怀柔区"
        },
        {
          code: "110117",
          name: "平谷区"
        },
        {
          code: "110118",
          name: "密云区"
        },
        {
          code: "110119",
          name: "延庆区"
        }
      ]
    ],
    [
      [
        {
          code: "120101",
          name: "和平区"
        },
        {
          code: "120102",
          name: "河东区"
        },
        {
          code: "120103",
          name: "河西区"
        },
        {
          code: "120104",
          name: "南开区"
        },
        {
          code: "120105",
          name: "河北区"
        },
        {
          code: "120106",
          name: "红桥区"
        },
        {
          code: "120110",
          name: "东丽区"
        },
        {
          code: "120111",
          name: "西青区"
        },
        {
          code: "120112",
          name: "津南区"
        },
        {
          code: "120113",
          name: "北辰区"
        },
        {
          code: "120114",
          name: "武清区"
        },
        {
          code: "120115",
          name: "宝坻区"
        },
        {
          code: "120116",
          name: "滨海新区"
        },
        {
          code: "120117",
          name: "宁河区"
        },
        {
          code: "120118",
          name: "静海区"
        },
        {
          code: "120119",
          name: "蓟州区"
        }
      ]
    ],
    [
      [
        {
          code: "130102",
          name: "长安区"
        },
        {
          code: "130104",
          name: "桥西区"
        },
        {
          code: "130105",
          name: "新华区"
        },
        {
          code: "130107",
          name: "井陉矿区"
        },
        {
          code: "130108",
          name: "裕华区"
        },
        {
          code: "130109",
          name: "藁城区"
        },
        {
          code: "130110",
          name: "鹿泉区"
        },
        {
          code: "130111",
          name: "栾城区"
        },
        {
          code: "130121",
          name: "井陉县"
        },
        {
          code: "130123",
          name: "正定县"
        },
        {
          code: "130125",
          name: "行唐县"
        },
        {
          code: "130126",
          name: "灵寿县"
        },
        {
          code: "130127",
          name: "高邑县"
        },
        {
          code: "130128",
          name: "深泽县"
        },
        {
          code: "130129",
          name: "赞皇县"
        },
        {
          code: "130130",
          name: "无极县"
        },
        {
          code: "130131",
          name: "平山县"
        },
        {
          code: "130132",
          name: "元氏县"
        },
        {
          code: "130133",
          name: "赵县"
        },
        {
          code: "130181",
          name: "辛集市"
        },
        {
          code: "130183",
          name: "晋州市"
        },
        {
          code: "130184",
          name: "新乐市"
        }
      ],
      [
        {
          code: "130202",
          name: "路南区"
        },
        {
          code: "130203",
          name: "路北区"
        },
        {
          code: "130204",
          name: "古冶区"
        },
        {
          code: "130205",
          name: "开平区"
        },
        {
          code: "130207",
          name: "丰南区"
        },
        {
          code: "130208",
          name: "丰润区"
        },
        {
          code: "130209",
          name: "曹妃甸区"
        },
        {
          code: "130223",
          name: "滦县"
        },
        {
          code: "130224",
          name: "滦南县"
        },
        {
          code: "130225",
          name: "乐亭县"
        },
        {
          code: "130227",
          name: "迁西县"
        },
        {
          code: "130229",
          name: "玉田县"
        },
        {
          code: "130281",
          name: "遵化市"
        },
        {
          code: "130283",
          name: "迁安市"
        }
      ],
      [
        {
          code: "130302",
          name: "海港区"
        },
        {
          code: "130303",
          name: "山海关区"
        },
        {
          code: "130304",
          name: "北戴河区"
        },
        {
          code: "130306",
          name: "抚宁区"
        },
        {
          code: "130321",
          name: "青龙满族自治县"
        },
        {
          code: "130322",
          name: "昌黎县"
        },
        {
          code: "130324",
          name: "卢龙县"
        }
      ],
      [
        {
          code: "130402",
          name: "邯山区"
        },
        {
          code: "130403",
          name: "丛台区"
        },
        {
          code: "130404",
          name: "复兴区"
        },
        {
          code: "130406",
          name: "峰峰矿区"
        },
        {
          code: "130407",
          name: "肥乡区"
        },
        {
          code: "130408",
          name: "永年区"
        },
        {
          code: "130423",
          name: "临漳县"
        },
        {
          code: "130424",
          name: "成安县"
        },
        {
          code: "130425",
          name: "大名县"
        },
        {
          code: "130426",
          name: "涉县"
        },
        {
          code: "130427",
          name: "磁县"
        },
        {
          code: "130430",
          name: "邱县"
        },
        {
          code: "130431",
          name: "鸡泽县"
        },
        {
          code: "130432",
          name: "广平县"
        },
        {
          code: "130433",
          name: "馆陶县"
        },
        {
          code: "130434",
          name: "魏县"
        },
        {
          code: "130435",
          name: "曲周县"
        },
        {
          code: "130481",
          name: "武安市"
        }
      ],
      [
        {
          code: "130502",
          name: "桥东区"
        },
        {
          code: "130503",
          name: "桥西区"
        },
        {
          code: "130521",
          name: "邢台县"
        },
        {
          code: "130522",
          name: "临城县"
        },
        {
          code: "130523",
          name: "内丘县"
        },
        {
          code: "130524",
          name: "柏乡县"
        },
        {
          code: "130525",
          name: "隆尧县"
        },
        {
          code: "130526",
          name: "任县"
        },
        {
          code: "130527",
          name: "南和县"
        },
        {
          code: "130528",
          name: "宁晋县"
        },
        {
          code: "130529",
          name: "巨鹿县"
        },
        {
          code: "130530",
          name: "新河县"
        },
        {
          code: "130531",
          name: "广宗县"
        },
        {
          code: "130532",
          name: "平乡县"
        },
        {
          code: "130533",
          name: "威县"
        },
        {
          code: "130534",
          name: "清河县"
        },
        {
          code: "130535",
          name: "临西县"
        },
        {
          code: "130581",
          name: "南宫市"
        },
        {
          code: "130582",
          name: "沙河市"
        }
      ],
      [
        {
          code: "130602",
          name: "竞秀区"
        },
        {
          code: "130606",
          name: "莲池区"
        },
        {
          code: "130607",
          name: "满城区"
        },
        {
          code: "130608",
          name: "清苑区"
        },
        {
          code: "130609",
          name: "徐水区"
        },
        {
          code: "130623",
          name: "涞水县"
        },
        {
          code: "130624",
          name: "阜平县"
        },
        {
          code: "130626",
          name: "定兴县"
        },
        {
          code: "130627",
          name: "唐县"
        },
        {
          code: "130628",
          name: "高阳县"
        },
        {
          code: "130629",
          name: "容城县"
        },
        {
          code: "130630",
          name: "涞源县"
        },
        {
          code: "130631",
          name: "望都县"
        },
        {
          code: "130632",
          name: "安新县"
        },
        {
          code: "130633",
          name: "易县"
        },
        {
          code: "130634",
          name: "曲阳县"
        },
        {
          code: "130635",
          name: "蠡县"
        },
        {
          code: "130636",
          name: "顺平县"
        },
        {
          code: "130637",
          name: "博野县"
        },
        {
          code: "130638",
          name: "雄县"
        },
        {
          code: "130681",
          name: "涿州市"
        },
        {
          code: "130682",
          name: "定州市"
        },
        {
          code: "130683",
          name: "安国市"
        },
        {
          code: "130684",
          name: "高碑店市"
        }
      ],
      [
        {
          code: "130702",
          name: "桥东区"
        },
        {
          code: "130703",
          name: "桥西区"
        },
        {
          code: "130705",
          name: "宣化区"
        },
        {
          code: "130706",
          name: "下花园区"
        },
        {
          code: "130708",
          name: "万全区"
        },
        {
          code: "130709",
          name: "崇礼区"
        },
        {
          code: "130722",
          name: "张北县"
        },
        {
          code: "130723",
          name: "康保县"
        },
        {
          code: "130724",
          name: "沽源县"
        },
        {
          code: "130725",
          name: "尚义县"
        },
        {
          code: "130726",
          name: "蔚县"
        },
        {
          code: "130727",
          name: "阳原县"
        },
        {
          code: "130728",
          name: "怀安县"
        },
        {
          code: "130730",
          name: "怀来县"
        },
        {
          code: "130731",
          name: "涿鹿县"
        },
        {
          code: "130732",
          name: "赤城县"
        }
      ],
      [
        {
          code: "130802",
          name: "双桥区"
        },
        {
          code: "130803",
          name: "双滦区"
        },
        {
          code: "130804",
          name: "鹰手营子矿区"
        },
        {
          code: "130821",
          name: "承德县"
        },
        {
          code: "130822",
          name: "兴隆县"
        },
        {
          code: "130824",
          name: "滦平县"
        },
        {
          code: "130825",
          name: "隆化县"
        },
        {
          code: "130826",
          name: "丰宁满族自治县"
        },
        {
          code: "130827",
          name: "宽城满族自治县"
        },
        {
          code: "130828",
          name: "围场满族蒙古族自治县"
        },
        {
          code: "130881",
          name: "平泉市"
        }
      ],
      [
        {
          code: "130902",
          name: "新华区"
        },
        {
          code: "130903",
          name: "运河区"
        },
        {
          code: "130921",
          name: "沧县"
        },
        {
          code: "130922",
          name: "青县"
        },
        {
          code: "130923",
          name: "东光县"
        },
        {
          code: "130924",
          name: "海兴县"
        },
        {
          code: "130925",
          name: "盐山县"
        },
        {
          code: "130926",
          name: "肃宁县"
        },
        {
          code: "130927",
          name: "南皮县"
        },
        {
          code: "130928",
          name: "吴桥县"
        },
        {
          code: "130929",
          name: "献县"
        },
        {
          code: "130930",
          name: "孟村回族自治县"
        },
        {
          code: "130981",
          name: "泊头市"
        },
        {
          code: "130982",
          name: "任丘市"
        },
        {
          code: "130983",
          name: "黄骅市"
        },
        {
          code: "130984",
          name: "河间市"
        }
      ],
      [
        {
          code: "131002",
          name: "安次区"
        },
        {
          code: "131003",
          name: "广阳区"
        },
        {
          code: "131022",
          name: "固安县"
        },
        {
          code: "131023",
          name: "永清县"
        },
        {
          code: "131024",
          name: "香河县"
        },
        {
          code: "131025",
          name: "大城县"
        },
        {
          code: "131026",
          name: "文安县"
        },
        {
          code: "131028",
          name: "大厂回族自治县"
        },
        {
          code: "131081",
          name: "霸州市"
        },
        {
          code: "131082",
          name: "三河市"
        }
      ],
      [
        {
          code: "131102",
          name: "桃城区"
        },
        {
          code: "131103",
          name: "冀州区"
        },
        {
          code: "131121",
          name: "枣强县"
        },
        {
          code: "131122",
          name: "武邑县"
        },
        {
          code: "131123",
          name: "武强县"
        },
        {
          code: "131124",
          name: "饶阳县"
        },
        {
          code: "131125",
          name: "安平县"
        },
        {
          code: "131126",
          name: "故城县"
        },
        {
          code: "131127",
          name: "景县"
        },
        {
          code: "131128",
          name: "阜城县"
        },
        {
          code: "131182",
          name: "深州市"
        }
      ]
    ],
    [
      [
        {
          code: "140105",
          name: "小店区"
        },
        {
          code: "140106",
          name: "迎泽区"
        },
        {
          code: "140107",
          name: "杏花岭区"
        },
        {
          code: "140108",
          name: "尖草坪区"
        },
        {
          code: "140109",
          name: "万柏林区"
        },
        {
          code: "140110",
          name: "晋源区"
        },
        {
          code: "140121",
          name: "清徐县"
        },
        {
          code: "140122",
          name: "阳曲县"
        },
        {
          code: "140123",
          name: "娄烦县"
        },
        {
          code: "140181",
          name: "古交市"
        }
      ],
      [
        {
          code: "140202",
          name: "城区"
        },
        {
          code: "140203",
          name: "矿区"
        },
        {
          code: "140211",
          name: "南郊区"
        },
        {
          code: "140212",
          name: "新荣区"
        },
        {
          code: "140221",
          name: "阳高县"
        },
        {
          code: "140222",
          name: "天镇县"
        },
        {
          code: "140223",
          name: "广灵县"
        },
        {
          code: "140224",
          name: "灵丘县"
        },
        {
          code: "140225",
          name: "浑源县"
        },
        {
          code: "140226",
          name: "左云县"
        },
        {
          code: "140227",
          name: "大同县"
        }
      ],
      [
        {
          code: "140302",
          name: "城区"
        },
        {
          code: "140303",
          name: "矿区"
        },
        {
          code: "140311",
          name: "郊区"
        },
        {
          code: "140321",
          name: "平定县"
        },
        {
          code: "140322",
          name: "盂县"
        }
      ],
      [
        {
          code: "140402",
          name: "城区"
        },
        {
          code: "140411",
          name: "郊区"
        },
        {
          code: "140421",
          name: "长治县"
        },
        {
          code: "140423",
          name: "襄垣县"
        },
        {
          code: "140424",
          name: "屯留县"
        },
        {
          code: "140425",
          name: "平顺县"
        },
        {
          code: "140426",
          name: "黎城县"
        },
        {
          code: "140427",
          name: "壶关县"
        },
        {
          code: "140428",
          name: "长子县"
        },
        {
          code: "140429",
          name: "武乡县"
        },
        {
          code: "140430",
          name: "沁县"
        },
        {
          code: "140431",
          name: "沁源县"
        },
        {
          code: "140481",
          name: "潞城市"
        }
      ],
      [
        {
          code: "140502",
          name: "城区"
        },
        {
          code: "140521",
          name: "沁水县"
        },
        {
          code: "140522",
          name: "阳城县"
        },
        {
          code: "140524",
          name: "陵川县"
        },
        {
          code: "140525",
          name: "泽州县"
        },
        {
          code: "140581",
          name: "高平市"
        }
      ],
      [
        {
          code: "140602",
          name: "朔城区"
        },
        {
          code: "140603",
          name: "平鲁区"
        },
        {
          code: "140621",
          name: "山阴县"
        },
        {
          code: "140622",
          name: "应县"
        },
        {
          code: "140623",
          name: "右玉县"
        },
        {
          code: "140624",
          name: "怀仁县"
        }
      ],
      [
        {
          code: "140702",
          name: "榆次区"
        },
        {
          code: "140721",
          name: "榆社县"
        },
        {
          code: "140722",
          name: "左权县"
        },
        {
          code: "140723",
          name: "和顺县"
        },
        {
          code: "140724",
          name: "昔阳县"
        },
        {
          code: "140725",
          name: "寿阳县"
        },
        {
          code: "140726",
          name: "太谷县"
        },
        {
          code: "140727",
          name: "祁县"
        },
        {
          code: "140728",
          name: "平遥县"
        },
        {
          code: "140729",
          name: "灵石县"
        },
        {
          code: "140781",
          name: "介休市"
        }
      ],
      [
        {
          code: "140802",
          name: "盐湖区"
        },
        {
          code: "140821",
          name: "临猗县"
        },
        {
          code: "140822",
          name: "万荣县"
        },
        {
          code: "140823",
          name: "闻喜县"
        },
        {
          code: "140824",
          name: "稷山县"
        },
        {
          code: "140825",
          name: "新绛县"
        },
        {
          code: "140826",
          name: "绛县"
        },
        {
          code: "140827",
          name: "垣曲县"
        },
        {
          code: "140828",
          name: "夏县"
        },
        {
          code: "140829",
          name: "平陆县"
        },
        {
          code: "140830",
          name: "芮城县"
        },
        {
          code: "140881",
          name: "永济市"
        },
        {
          code: "140882",
          name: "河津市"
        }
      ],
      [
        {
          code: "140902",
          name: "忻府区"
        },
        {
          code: "140921",
          name: "定襄县"
        },
        {
          code: "140922",
          name: "五台县"
        },
        {
          code: "140923",
          name: "代县"
        },
        {
          code: "140924",
          name: "繁峙县"
        },
        {
          code: "140925",
          name: "宁武县"
        },
        {
          code: "140926",
          name: "静乐县"
        },
        {
          code: "140927",
          name: "神池县"
        },
        {
          code: "140928",
          name: "五寨县"
        },
        {
          code: "140929",
          name: "岢岚县"
        },
        {
          code: "140930",
          name: "河曲县"
        },
        {
          code: "140931",
          name: "保德县"
        },
        {
          code: "140932",
          name: "偏关县"
        },
        {
          code: "140981",
          name: "原平市"
        }
      ],
      [
        {
          code: "141002",
          name: "尧都区"
        },
        {
          code: "141021",
          name: "曲沃县"
        },
        {
          code: "141022",
          name: "翼城县"
        },
        {
          code: "141023",
          name: "襄汾县"
        },
        {
          code: "141024",
          name: "洪洞县"
        },
        {
          code: "141025",
          name: "古县"
        },
        {
          code: "141026",
          name: "安泽县"
        },
        {
          code: "141027",
          name: "浮山县"
        },
        {
          code: "141028",
          name: "吉县"
        },
        {
          code: "141029",
          name: "乡宁县"
        },
        {
          code: "141030",
          name: "大宁县"
        },
        {
          code: "141031",
          name: "隰县"
        },
        {
          code: "141032",
          name: "永和县"
        },
        {
          code: "141033",
          name: "蒲县"
        },
        {
          code: "141034",
          name: "汾西县"
        },
        {
          code: "141081",
          name: "侯马市"
        },
        {
          code: "141082",
          name: "霍州市"
        }
      ],
      [
        {
          code: "141102",
          name: "离石区"
        },
        {
          code: "141121",
          name: "文水县"
        },
        {
          code: "141122",
          name: "交城县"
        },
        {
          code: "141123",
          name: "兴县"
        },
        {
          code: "141124",
          name: "临县"
        },
        {
          code: "141125",
          name: "柳林县"
        },
        {
          code: "141126",
          name: "石楼县"
        },
        {
          code: "141127",
          name: "岚县"
        },
        {
          code: "141128",
          name: "方山县"
        },
        {
          code: "141129",
          name: "中阳县"
        },
        {
          code: "141130",
          name: "交口县"
        },
        {
          code: "141181",
          name: "孝义市"
        },
        {
          code: "141182",
          name: "汾阳市"
        }
      ]
    ],
    [
      [
        {
          code: "150102",
          name: "新城区"
        },
        {
          code: "150103",
          name: "回民区"
        },
        {
          code: "150104",
          name: "玉泉区"
        },
        {
          code: "150105",
          name: "赛罕区"
        },
        {
          code: "150121",
          name: "土默特左旗"
        },
        {
          code: "150122",
          name: "托克托县"
        },
        {
          code: "150123",
          name: "和林格尔县"
        },
        {
          code: "150124",
          name: "清水河县"
        },
        {
          code: "150125",
          name: "武川县"
        }
      ],
      [
        {
          code: "150202",
          name: "东河区"
        },
        {
          code: "150203",
          name: "昆都仑区"
        },
        {
          code: "150204",
          name: "青山区"
        },
        {
          code: "150205",
          name: "石拐区"
        },
        {
          code: "150206",
          name: "白云鄂博矿区"
        },
        {
          code: "150207",
          name: "九原区"
        },
        {
          code: "150221",
          name: "土默特右旗"
        },
        {
          code: "150222",
          name: "固阳县"
        },
        {
          code: "150223",
          name: "达尔罕茂明安联合旗"
        }
      ],
      [
        {
          code: "150302",
          name: "海勃湾区"
        },
        {
          code: "150303",
          name: "海南区"
        },
        {
          code: "150304",
          name: "乌达区"
        }
      ],
      [
        {
          code: "150402",
          name: "红山区"
        },
        {
          code: "150403",
          name: "元宝山区"
        },
        {
          code: "150404",
          name: "松山区"
        },
        {
          code: "150421",
          name: "阿鲁科尔沁旗"
        },
        {
          code: "150422",
          name: "巴林左旗"
        },
        {
          code: "150423",
          name: "巴林右旗"
        },
        {
          code: "150424",
          name: "林西县"
        },
        {
          code: "150425",
          name: "克什克腾旗"
        },
        {
          code: "150426",
          name: "翁牛特旗"
        },
        {
          code: "150428",
          name: "喀喇沁旗"
        },
        {
          code: "150429",
          name: "宁城县"
        },
        {
          code: "150430",
          name: "敖汉旗"
        }
      ],
      [
        {
          code: "150502",
          name: "科尔沁区"
        },
        {
          code: "150521",
          name: "科尔沁左翼中旗"
        },
        {
          code: "150522",
          name: "科尔沁左翼后旗"
        },
        {
          code: "150523",
          name: "开鲁县"
        },
        {
          code: "150524",
          name: "库伦旗"
        },
        {
          code: "150525",
          name: "奈曼旗"
        },
        {
          code: "150526",
          name: "扎鲁特旗"
        },
        {
          code: "150581",
          name: "霍林郭勒市"
        }
      ],
      [
        {
          code: "150602",
          name: "东胜区"
        },
        {
          code: "150603",
          name: "康巴什区"
        },
        {
          code: "150621",
          name: "达拉特旗"
        },
        {
          code: "150622",
          name: "准格尔旗"
        },
        {
          code: "150623",
          name: "鄂托克前旗"
        },
        {
          code: "150624",
          name: "鄂托克旗"
        },
        {
          code: "150625",
          name: "杭锦旗"
        },
        {
          code: "150626",
          name: "乌审旗"
        },
        {
          code: "150627",
          name: "伊金霍洛旗"
        }
      ],
      [
        {
          code: "150702",
          name: "海拉尔区"
        },
        {
          code: "150703",
          name: "扎赉诺尔区"
        },
        {
          code: "150721",
          name: "阿荣旗"
        },
        {
          code: "150722",
          name: "莫力达瓦达斡尔族自治旗"
        },
        {
          code: "150723",
          name: "鄂伦春自治旗"
        },
        {
          code: "150724",
          name: "鄂温克族自治旗"
        },
        {
          code: "150725",
          name: "陈巴尔虎旗"
        },
        {
          code: "150726",
          name: "新巴尔虎左旗"
        },
        {
          code: "150727",
          name: "新巴尔虎右旗"
        },
        {
          code: "150781",
          name: "满洲里市"
        },
        {
          code: "150782",
          name: "牙克石市"
        },
        {
          code: "150783",
          name: "扎兰屯市"
        },
        {
          code: "150784",
          name: "额尔古纳市"
        },
        {
          code: "150785",
          name: "根河市"
        }
      ],
      [
        {
          code: "150802",
          name: "临河区"
        },
        {
          code: "150821",
          name: "五原县"
        },
        {
          code: "150822",
          name: "磴口县"
        },
        {
          code: "150823",
          name: "乌拉特前旗"
        },
        {
          code: "150824",
          name: "乌拉特中旗"
        },
        {
          code: "150825",
          name: "乌拉特后旗"
        },
        {
          code: "150826",
          name: "杭锦后旗"
        }
      ],
      [
        {
          code: "150902",
          name: "集宁区"
        },
        {
          code: "150921",
          name: "卓资县"
        },
        {
          code: "150922",
          name: "化德县"
        },
        {
          code: "150923",
          name: "商都县"
        },
        {
          code: "150924",
          name: "兴和县"
        },
        {
          code: "150925",
          name: "凉城县"
        },
        {
          code: "150926",
          name: "察哈尔右翼前旗"
        },
        {
          code: "150927",
          name: "察哈尔右翼中旗"
        },
        {
          code: "150928",
          name: "察哈尔右翼后旗"
        },
        {
          code: "150929",
          name: "四子王旗"
        },
        {
          code: "150981",
          name: "丰镇市"
        }
      ],
      [
        {
          code: "152201",
          name: "乌兰浩特市"
        },
        {
          code: "152202",
          name: "阿尔山市"
        },
        {
          code: "152221",
          name: "科尔沁右翼前旗"
        },
        {
          code: "152222",
          name: "科尔沁右翼中旗"
        },
        {
          code: "152223",
          name: "扎赉特旗"
        },
        {
          code: "152224",
          name: "突泉县"
        }
      ],
      [
        {
          code: "152501",
          name: "二连浩特市"
        },
        {
          code: "152502",
          name: "锡林浩特市"
        },
        {
          code: "152522",
          name: "阿巴嘎旗"
        },
        {
          code: "152523",
          name: "苏尼特左旗"
        },
        {
          code: "152524",
          name: "苏尼特右旗"
        },
        {
          code: "152525",
          name: "东乌珠穆沁旗"
        },
        {
          code: "152526",
          name: "西乌珠穆沁旗"
        },
        {
          code: "152527",
          name: "太仆寺旗"
        },
        {
          code: "152528",
          name: "镶黄旗"
        },
        {
          code: "152529",
          name: "正镶白旗"
        },
        {
          code: "152530",
          name: "正蓝旗"
        },
        {
          code: "152531",
          name: "多伦县"
        }
      ],
      [
        {
          code: "152921",
          name: "阿拉善左旗"
        },
        {
          code: "152922",
          name: "阿拉善右旗"
        },
        {
          code: "152923",
          name: "额济纳旗"
        }
      ]
    ],
    [
      [
        {
          code: "210102",
          name: "和平区"
        },
        {
          code: "210103",
          name: "沈河区"
        },
        {
          code: "210104",
          name: "大东区"
        },
        {
          code: "210105",
          name: "皇姑区"
        },
        {
          code: "210106",
          name: "铁西区"
        },
        {
          code: "210111",
          name: "苏家屯区"
        },
        {
          code: "210112",
          name: "浑南区"
        },
        {
          code: "210113",
          name: "沈北新区"
        },
        {
          code: "210114",
          name: "于洪区"
        },
        {
          code: "210115",
          name: "辽中区"
        },
        {
          code: "210123",
          name: "康平县"
        },
        {
          code: "210124",
          name: "法库县"
        },
        {
          code: "210181",
          name: "新民市"
        }
      ],
      [
        {
          code: "210202",
          name: "中山区"
        },
        {
          code: "210203",
          name: "西岗区"
        },
        {
          code: "210204",
          name: "沙河口区"
        },
        {
          code: "210211",
          name: "甘井子区"
        },
        {
          code: "210212",
          name: "旅顺口区"
        },
        {
          code: "210213",
          name: "金州区"
        },
        {
          code: "210214",
          name: "普兰店区"
        },
        {
          code: "210224",
          name: "长海县"
        },
        {
          code: "210281",
          name: "瓦房店市"
        },
        {
          code: "210283",
          name: "庄河市"
        }
      ],
      [
        {
          code: "210302",
          name: "铁东区"
        },
        {
          code: "210303",
          name: "铁西区"
        },
        {
          code: "210304",
          name: "立山区"
        },
        {
          code: "210311",
          name: "千山区"
        },
        {
          code: "210321",
          name: "台安县"
        },
        {
          code: "210323",
          name: "岫岩满族自治县"
        },
        {
          code: "210381",
          name: "海城市"
        }
      ],
      [
        {
          code: "210402",
          name: "新抚区"
        },
        {
          code: "210403",
          name: "东洲区"
        },
        {
          code: "210404",
          name: "望花区"
        },
        {
          code: "210411",
          name: "顺城区"
        },
        {
          code: "210421",
          name: "抚顺县"
        },
        {
          code: "210422",
          name: "新宾满族自治县"
        },
        {
          code: "210423",
          name: "清原满族自治县"
        }
      ],
      [
        {
          code: "210502",
          name: "平山区"
        },
        {
          code: "210503",
          name: "溪湖区"
        },
        {
          code: "210504",
          name: "明山区"
        },
        {
          code: "210505",
          name: "南芬区"
        },
        {
          code: "210521",
          name: "本溪满族自治县"
        },
        {
          code: "210522",
          name: "桓仁满族自治县"
        }
      ],
      [
        {
          code: "210602",
          name: "元宝区"
        },
        {
          code: "210603",
          name: "振兴区"
        },
        {
          code: "210604",
          name: "振安区"
        },
        {
          code: "210624",
          name: "宽甸满族自治县"
        },
        {
          code: "210681",
          name: "东港市"
        },
        {
          code: "210682",
          name: "凤城市"
        }
      ],
      [
        {
          code: "210702",
          name: "古塔区"
        },
        {
          code: "210703",
          name: "凌河区"
        },
        {
          code: "210711",
          name: "太和区"
        },
        {
          code: "210726",
          name: "黑山县"
        },
        {
          code: "210727",
          name: "义县"
        },
        {
          code: "210781",
          name: "凌海市"
        },
        {
          code: "210782",
          name: "北镇市"
        }
      ],
      [
        {
          code: "210802",
          name: "站前区"
        },
        {
          code: "210803",
          name: "西市区"
        },
        {
          code: "210804",
          name: "鲅鱼圈区"
        },
        {
          code: "210811",
          name: "老边区"
        },
        {
          code: "210881",
          name: "盖州市"
        },
        {
          code: "210882",
          name: "大石桥市"
        }
      ],
      [
        {
          code: "210902",
          name: "海州区"
        },
        {
          code: "210903",
          name: "新邱区"
        },
        {
          code: "210904",
          name: "太平区"
        },
        {
          code: "210905",
          name: "清河门区"
        },
        {
          code: "210911",
          name: "细河区"
        },
        {
          code: "210921",
          name: "阜新蒙古族自治县"
        },
        {
          code: "210922",
          name: "彰武县"
        }
      ],
      [
        {
          code: "211002",
          name: "白塔区"
        },
        {
          code: "211003",
          name: "文圣区"
        },
        {
          code: "211004",
          name: "宏伟区"
        },
        {
          code: "211005",
          name: "弓长岭区"
        },
        {
          code: "211011",
          name: "太子河区"
        },
        {
          code: "211021",
          name: "辽阳县"
        },
        {
          code: "211081",
          name: "灯塔市"
        }
      ],
      [
        {
          code: "211102",
          name: "双台子区"
        },
        {
          code: "211103",
          name: "兴隆台区"
        },
        {
          code: "211104",
          name: "大洼区"
        },
        {
          code: "211122",
          name: "盘山县"
        }
      ],
      [
        {
          code: "211202",
          name: "银州区"
        },
        {
          code: "211204",
          name: "清河区"
        },
        {
          code: "211221",
          name: "铁岭县"
        },
        {
          code: "211223",
          name: "西丰县"
        },
        {
          code: "211224",
          name: "昌图县"
        },
        {
          code: "211281",
          name: "调兵山市"
        },
        {
          code: "211282",
          name: "开原市"
        }
      ],
      [
        {
          code: "211302",
          name: "双塔区"
        },
        {
          code: "211303",
          name: "龙城区"
        },
        {
          code: "211321",
          name: "朝阳县"
        },
        {
          code: "211322",
          name: "建平县"
        },
        {
          code: "211324",
          name: "喀喇沁左翼蒙古族自治县"
        },
        {
          code: "211381",
          name: "北票市"
        },
        {
          code: "211382",
          name: "凌源市"
        }
      ],
      [
        {
          code: "211402",
          name: "连山区"
        },
        {
          code: "211403",
          name: "龙港区"
        },
        {
          code: "211404",
          name: "南票区"
        },
        {
          code: "211421",
          name: "绥中县"
        },
        {
          code: "211422",
          name: "建昌县"
        },
        {
          code: "211481",
          name: "兴城市"
        }
      ]
    ],
    [
      [
        {
          code: "220102",
          name: "南关区"
        },
        {
          code: "220103",
          name: "宽城区"
        },
        {
          code: "220104",
          name: "朝阳区"
        },
        {
          code: "220105",
          name: "二道区"
        },
        {
          code: "220106",
          name: "绿园区"
        },
        {
          code: "220112",
          name: "双阳区"
        },
        {
          code: "220113",
          name: "九台区"
        },
        {
          code: "220122",
          name: "农安县"
        },
        {
          code: "220182",
          name: "榆树市"
        },
        {
          code: "220183",
          name: "德惠市"
        }
      ],
      [
        {
          code: "220202",
          name: "昌邑区"
        },
        {
          code: "220203",
          name: "龙潭区"
        },
        {
          code: "220204",
          name: "船营区"
        },
        {
          code: "220211",
          name: "丰满区"
        },
        {
          code: "220221",
          name: "永吉县"
        },
        {
          code: "220281",
          name: "蛟河市"
        },
        {
          code: "220282",
          name: "桦甸市"
        },
        {
          code: "220283",
          name: "舒兰市"
        },
        {
          code: "220284",
          name: "磐石市"
        }
      ],
      [
        {
          code: "220302",
          name: "铁西区"
        },
        {
          code: "220303",
          name: "铁东区"
        },
        {
          code: "220322",
          name: "梨树县"
        },
        {
          code: "220323",
          name: "伊通满族自治县"
        },
        {
          code: "220381",
          name: "公主岭市"
        },
        {
          code: "220382",
          name: "双辽市"
        }
      ],
      [
        {
          code: "220402",
          name: "龙山区"
        },
        {
          code: "220403",
          name: "西安区"
        },
        {
          code: "220421",
          name: "东丰县"
        },
        {
          code: "220422",
          name: "东辽县"
        }
      ],
      [
        {
          code: "220502",
          name: "东昌区"
        },
        {
          code: "220503",
          name: "二道江区"
        },
        {
          code: "220521",
          name: "通化县"
        },
        {
          code: "220523",
          name: "辉南县"
        },
        {
          code: "220524",
          name: "柳河县"
        },
        {
          code: "220581",
          name: "梅河口市"
        },
        {
          code: "220582",
          name: "集安市"
        }
      ],
      [
        {
          code: "220602",
          name: "浑江区"
        },
        {
          code: "220605",
          name: "江源区"
        },
        {
          code: "220621",
          name: "抚松县"
        },
        {
          code: "220622",
          name: "靖宇县"
        },
        {
          code: "220623",
          name: "长白朝鲜族自治县"
        },
        {
          code: "220681",
          name: "临江市"
        }
      ],
      [
        {
          code: "220702",
          name: "宁江区"
        },
        {
          code: "220721",
          name: "前郭尔罗斯蒙古族自治县"
        },
        {
          code: "220722",
          name: "长岭县"
        },
        {
          code: "220723",
          name: "乾安县"
        },
        {
          code: "220781",
          name: "扶余市"
        }
      ],
      [
        {
          code: "220802",
          name: "洮北区"
        },
        {
          code: "220821",
          name: "镇赉县"
        },
        {
          code: "220822",
          name: "通榆县"
        },
        {
          code: "220881",
          name: "洮南市"
        },
        {
          code: "220882",
          name: "大安市"
        }
      ],
      [
        {
          code: "222401",
          name: "延吉市"
        },
        {
          code: "222402",
          name: "图们市"
        },
        {
          code: "222403",
          name: "敦化市"
        },
        {
          code: "222404",
          name: "珲春市"
        },
        {
          code: "222405",
          name: "龙井市"
        },
        {
          code: "222406",
          name: "和龙市"
        },
        {
          code: "222424",
          name: "汪清县"
        },
        {
          code: "222426",
          name: "安图县"
        }
      ]
    ],
    [
      [
        {
          code: "230102",
          name: "道里区"
        },
        {
          code: "230103",
          name: "南岗区"
        },
        {
          code: "230104",
          name: "道外区"
        },
        {
          code: "230108",
          name: "平房区"
        },
        {
          code: "230109",
          name: "松北区"
        },
        {
          code: "230110",
          name: "香坊区"
        },
        {
          code: "230111",
          name: "呼兰区"
        },
        {
          code: "230112",
          name: "阿城区"
        },
        {
          code: "230113",
          name: "双城区"
        },
        {
          code: "230123",
          name: "依兰县"
        },
        {
          code: "230124",
          name: "方正县"
        },
        {
          code: "230125",
          name: "宾县"
        },
        {
          code: "230126",
          name: "巴彦县"
        },
        {
          code: "230127",
          name: "木兰县"
        },
        {
          code: "230128",
          name: "通河县"
        },
        {
          code: "230129",
          name: "延寿县"
        },
        {
          code: "230183",
          name: "尚志市"
        },
        {
          code: "230184",
          name: "五常市"
        }
      ],
      [
        {
          code: "230202",
          name: "龙沙区"
        },
        {
          code: "230203",
          name: "建华区"
        },
        {
          code: "230204",
          name: "铁锋区"
        },
        {
          code: "230205",
          name: "昂昂溪区"
        },
        {
          code: "230206",
          name: "富拉尔基区"
        },
        {
          code: "230207",
          name: "碾子山区"
        },
        {
          code: "230208",
          name: "梅里斯达斡尔族区"
        },
        {
          code: "230221",
          name: "龙江县"
        },
        {
          code: "230223",
          name: "依安县"
        },
        {
          code: "230224",
          name: "泰来县"
        },
        {
          code: "230225",
          name: "甘南县"
        },
        {
          code: "230227",
          name: "富裕县"
        },
        {
          code: "230229",
          name: "克山县"
        },
        {
          code: "230230",
          name: "克东县"
        },
        {
          code: "230231",
          name: "拜泉县"
        },
        {
          code: "230281",
          name: "讷河市"
        }
      ],
      [
        {
          code: "230302",
          name: "鸡冠区"
        },
        {
          code: "230303",
          name: "恒山区"
        },
        {
          code: "230304",
          name: "滴道区"
        },
        {
          code: "230305",
          name: "梨树区"
        },
        {
          code: "230306",
          name: "城子河区"
        },
        {
          code: "230307",
          name: "麻山区"
        },
        {
          code: "230321",
          name: "鸡东县"
        },
        {
          code: "230381",
          name: "虎林市"
        },
        {
          code: "230382",
          name: "密山市"
        }
      ],
      [
        {
          code: "230402",
          name: "向阳区"
        },
        {
          code: "230403",
          name: "工农区"
        },
        {
          code: "230404",
          name: "南山区"
        },
        {
          code: "230405",
          name: "兴安区"
        },
        {
          code: "230406",
          name: "东山区"
        },
        {
          code: "230407",
          name: "兴山区"
        },
        {
          code: "230421",
          name: "萝北县"
        },
        {
          code: "230422",
          name: "绥滨县"
        }
      ],
      [
        {
          code: "230502",
          name: "尖山区"
        },
        {
          code: "230503",
          name: "岭东区"
        },
        {
          code: "230505",
          name: "四方台区"
        },
        {
          code: "230506",
          name: "宝山区"
        },
        {
          code: "230521",
          name: "集贤县"
        },
        {
          code: "230522",
          name: "友谊县"
        },
        {
          code: "230523",
          name: "宝清县"
        },
        {
          code: "230524",
          name: "饶河县"
        }
      ],
      [
        {
          code: "230602",
          name: "萨尔图区"
        },
        {
          code: "230603",
          name: "龙凤区"
        },
        {
          code: "230604",
          name: "让胡路区"
        },
        {
          code: "230605",
          name: "红岗区"
        },
        {
          code: "230606",
          name: "大同区"
        },
        {
          code: "230621",
          name: "肇州县"
        },
        {
          code: "230622",
          name: "肇源县"
        },
        {
          code: "230623",
          name: "林甸县"
        },
        {
          code: "230624",
          name: "杜尔伯特蒙古族自治县"
        }
      ],
      [
        {
          code: "230702",
          name: "伊春区"
        },
        {
          code: "230703",
          name: "南岔区"
        },
        {
          code: "230704",
          name: "友好区"
        },
        {
          code: "230705",
          name: "西林区"
        },
        {
          code: "230706",
          name: "翠峦区"
        },
        {
          code: "230707",
          name: "新青区"
        },
        {
          code: "230708",
          name: "美溪区"
        },
        {
          code: "230709",
          name: "金山屯区"
        },
        {
          code: "230710",
          name: "五营区"
        },
        {
          code: "230711",
          name: "乌马河区"
        },
        {
          code: "230712",
          name: "汤旺河区"
        },
        {
          code: "230713",
          name: "带岭区"
        },
        {
          code: "230714",
          name: "乌伊岭区"
        },
        {
          code: "230715",
          name: "红星区"
        },
        {
          code: "230716",
          name: "上甘岭区"
        },
        {
          code: "230722",
          name: "嘉荫县"
        },
        {
          code: "230781",
          name: "铁力市"
        }
      ],
      [
        {
          code: "230803",
          name: "向阳区"
        },
        {
          code: "230804",
          name: "前进区"
        },
        {
          code: "230805",
          name: "东风区"
        },
        {
          code: "230811",
          name: "郊区"
        },
        {
          code: "230822",
          name: "桦南县"
        },
        {
          code: "230826",
          name: "桦川县"
        },
        {
          code: "230828",
          name: "汤原县"
        },
        {
          code: "230881",
          name: "同江市"
        },
        {
          code: "230882",
          name: "富锦市"
        },
        {
          code: "230883",
          name: "抚远市"
        }
      ],
      [
        {
          code: "230902",
          name: "新兴区"
        },
        {
          code: "230903",
          name: "桃山区"
        },
        {
          code: "230904",
          name: "茄子河区"
        },
        {
          code: "230921",
          name: "勃利县"
        }
      ],
      [
        {
          code: "231002",
          name: "东安区"
        },
        {
          code: "231003",
          name: "阳明区"
        },
        {
          code: "231004",
          name: "爱民区"
        },
        {
          code: "231005",
          name: "西安区"
        },
        {
          code: "231025",
          name: "林口县"
        },
        {
          code: "231081",
          name: "绥芬河市"
        },
        {
          code: "231083",
          name: "海林市"
        },
        {
          code: "231084",
          name: "宁安市"
        },
        {
          code: "231085",
          name: "穆棱市"
        },
        {
          code: "231086",
          name: "东宁市"
        }
      ],
      [
        {
          code: "231102",
          name: "爱辉区"
        },
        {
          code: "231121",
          name: "嫩江县"
        },
        {
          code: "231123",
          name: "逊克县"
        },
        {
          code: "231124",
          name: "孙吴县"
        },
        {
          code: "231181",
          name: "北安市"
        },
        {
          code: "231182",
          name: "五大连池市"
        }
      ],
      [
        {
          code: "231202",
          name: "北林区"
        },
        {
          code: "231221",
          name: "望奎县"
        },
        {
          code: "231222",
          name: "兰西县"
        },
        {
          code: "231223",
          name: "青冈县"
        },
        {
          code: "231224",
          name: "庆安县"
        },
        {
          code: "231225",
          name: "明水县"
        },
        {
          code: "231226",
          name: "绥棱县"
        },
        {
          code: "231281",
          name: "安达市"
        },
        {
          code: "231282",
          name: "肇东市"
        },
        {
          code: "231283",
          name: "海伦市"
        }
      ],
      [
        {
          code: "232701",
          name: "加格达奇区"
        },
        {
          code: "232702",
          name: "松岭区"
        },
        {
          code: "232703",
          name: "新林区"
        },
        {
          code: "232704",
          name: "呼中区"
        },
        {
          code: "232721",
          name: "呼玛县"
        },
        {
          code: "232722",
          name: "塔河县"
        },
        {
          code: "232723",
          name: "漠河县"
        }
      ]
    ],
    [
      [
        {
          code: "310101",
          name: "黄浦区"
        },
        {
          code: "310104",
          name: "徐汇区"
        },
        {
          code: "310105",
          name: "长宁区"
        },
        {
          code: "310106",
          name: "静安区"
        },
        {
          code: "310107",
          name: "普陀区"
        },
        {
          code: "310109",
          name: "虹口区"
        },
        {
          code: "310110",
          name: "杨浦区"
        },
        {
          code: "310112",
          name: "闵行区"
        },
        {
          code: "310113",
          name: "宝山区"
        },
        {
          code: "310114",
          name: "嘉定区"
        },
        {
          code: "310115",
          name: "浦东新区"
        },
        {
          code: "310116",
          name: "金山区"
        },
        {
          code: "310117",
          name: "松江区"
        },
        {
          code: "310118",
          name: "青浦区"
        },
        {
          code: "310120",
          name: "奉贤区"
        },
        {
          code: "310151",
          name: "崇明区"
        }
      ]
    ],
    [
      [
        {
          code: "320102",
          name: "玄武区"
        },
        {
          code: "320104",
          name: "秦淮区"
        },
        {
          code: "320105",
          name: "建邺区"
        },
        {
          code: "320106",
          name: "鼓楼区"
        },
        {
          code: "320111",
          name: "浦口区"
        },
        {
          code: "320113",
          name: "栖霞区"
        },
        {
          code: "320114",
          name: "雨花台区"
        },
        {
          code: "320115",
          name: "江宁区"
        },
        {
          code: "320116",
          name: "六合区"
        },
        {
          code: "320117",
          name: "溧水区"
        },
        {
          code: "320118",
          name: "高淳区"
        }
      ],
      [
        {
          code: "320205",
          name: "锡山区"
        },
        {
          code: "320206",
          name: "惠山区"
        },
        {
          code: "320211",
          name: "滨湖区"
        },
        {
          code: "320213",
          name: "梁溪区"
        },
        {
          code: "320214",
          name: "新吴区"
        },
        {
          code: "320281",
          name: "江阴市"
        },
        {
          code: "320282",
          name: "宜兴市"
        }
      ],
      [
        {
          code: "320302",
          name: "鼓楼区"
        },
        {
          code: "320303",
          name: "云龙区"
        },
        {
          code: "320305",
          name: "贾汪区"
        },
        {
          code: "320311",
          name: "泉山区"
        },
        {
          code: "320312",
          name: "铜山区"
        },
        {
          code: "320321",
          name: "丰县"
        },
        {
          code: "320322",
          name: "沛县"
        },
        {
          code: "320324",
          name: "睢宁县"
        },
        {
          code: "320381",
          name: "新沂市"
        },
        {
          code: "320382",
          name: "邳州市"
        }
      ],
      [
        {
          code: "320402",
          name: "天宁区"
        },
        {
          code: "320404",
          name: "钟楼区"
        },
        {
          code: "320411",
          name: "新北区"
        },
        {
          code: "320412",
          name: "武进区"
        },
        {
          code: "320413",
          name: "金坛区"
        },
        {
          code: "320481",
          name: "溧阳市"
        }
      ],
      [
        {
          code: "320505",
          name: "虎丘区"
        },
        {
          code: "320506",
          name: "吴中区"
        },
        {
          code: "320507",
          name: "相城区"
        },
        {
          code: "320508",
          name: "姑苏区"
        },
        {
          code: "320509",
          name: "吴江区"
        },
        {
          code: "320581",
          name: "常熟市"
        },
        {
          code: "320582",
          name: "张家港市"
        },
        {
          code: "320583",
          name: "昆山市"
        },
        {
          code: "320585",
          name: "太仓市"
        }
      ],
      [
        {
          code: "320602",
          name: "崇川区"
        },
        {
          code: "320611",
          name: "港闸区"
        },
        {
          code: "320612",
          name: "通州区"
        },
        {
          code: "320621",
          name: "海安县"
        },
        {
          code: "320623",
          name: "如东县"
        },
        {
          code: "320681",
          name: "启东市"
        },
        {
          code: "320682",
          name: "如皋市"
        },
        {
          code: "320684",
          name: "海门市"
        }
      ],
      [
        {
          code: "320703",
          name: "连云区"
        },
        {
          code: "320706",
          name: "海州区"
        },
        {
          code: "320707",
          name: "赣榆区"
        },
        {
          code: "320722",
          name: "东海县"
        },
        {
          code: "320723",
          name: "灌云县"
        },
        {
          code: "320724",
          name: "灌南县"
        }
      ],
      [
        {
          code: "320803",
          name: "淮安区"
        },
        {
          code: "320804",
          name: "淮阴区"
        },
        {
          code: "320812",
          name: "清江浦区"
        },
        {
          code: "320813",
          name: "洪泽区"
        },
        {
          code: "320826",
          name: "涟水县"
        },
        {
          code: "320830",
          name: "盱眙县"
        },
        {
          code: "320831",
          name: "金湖县"
        }
      ],
      [
        {
          code: "320902",
          name: "亭湖区"
        },
        {
          code: "320903",
          name: "盐都区"
        },
        {
          code: "320904",
          name: "大丰区"
        },
        {
          code: "320921",
          name: "响水县"
        },
        {
          code: "320922",
          name: "滨海县"
        },
        {
          code: "320923",
          name: "阜宁县"
        },
        {
          code: "320924",
          name: "射阳县"
        },
        {
          code: "320925",
          name: "建湖县"
        },
        {
          code: "320981",
          name: "东台市"
        }
      ],
      [
        {
          code: "321002",
          name: "广陵区"
        },
        {
          code: "321003",
          name: "邗江区"
        },
        {
          code: "321012",
          name: "江都区"
        },
        {
          code: "321023",
          name: "宝应县"
        },
        {
          code: "321081",
          name: "仪征市"
        },
        {
          code: "321084",
          name: "高邮市"
        }
      ],
      [
        {
          code: "321102",
          name: "京口区"
        },
        {
          code: "321111",
          name: "润州区"
        },
        {
          code: "321112",
          name: "丹徒区"
        },
        {
          code: "321181",
          name: "丹阳市"
        },
        {
          code: "321182",
          name: "扬中市"
        },
        {
          code: "321183",
          name: "句容市"
        }
      ],
      [
        {
          code: "321202",
          name: "海陵区"
        },
        {
          code: "321203",
          name: "高港区"
        },
        {
          code: "321204",
          name: "姜堰区"
        },
        {
          code: "321281",
          name: "兴化市"
        },
        {
          code: "321282",
          name: "靖江市"
        },
        {
          code: "321283",
          name: "泰兴市"
        }
      ],
      [
        {
          code: "321302",
          name: "宿城区"
        },
        {
          code: "321311",
          name: "宿豫区"
        },
        {
          code: "321322",
          name: "沭阳县"
        },
        {
          code: "321323",
          name: "泗阳县"
        },
        {
          code: "321324",
          name: "泗洪县"
        }
      ]
    ],
    [
      [
        {
          code: "330102",
          name: "上城区"
        },
        {
          code: "330105",
          name: "拱墅区"
        },
        {
          code: "330106",
          name: "西湖区"
        },
        {
          code: "330108",
          name: "滨江区"
        },
        {
          code: "330109",
          name: "萧山区"
        },
        {
          code: "330110",
          name: "余杭区"
        },
        {
          code: "330111",
          name: "富阳区"
        },
        {
          code: "330112",
          name: "临安区"
        },
        {
          code: "330113",
          name: "临平区"
        },
        {
          code: "330114",
          name: "钱塘区"
        },
        {
          code: "330122",
          name: "桐庐县"
        },
        {
          code: "330127",
          name: "淳安县"
        },
        {
          code: "330182",
          name: "建德市"
        }
      ],
      [
        {
          code: "330203",
          name: "海曙区"
        },
        {
          code: "330205",
          name: "江北区"
        },
        {
          code: "330206",
          name: "北仑区"
        },
        {
          code: "330211",
          name: "镇海区"
        },
        {
          code: "330212",
          name: "鄞州区"
        },
        {
          code: "330213",
          name: "奉化区"
        },
        {
          code: "330225",
          name: "象山县"
        },
        {
          code: "330226",
          name: "宁海县"
        },
        {
          code: "330281",
          name: "余姚市"
        },
        {
          code: "330282",
          name: "慈溪市"
        }
      ],
      [
        {
          code: "330302",
          name: "鹿城区"
        },
        {
          code: "330303",
          name: "龙湾区"
        },
        {
          code: "330304",
          name: "瓯海区"
        },
        {
          code: "330305",
          name: "洞头区"
        },
        {
          code: "330324",
          name: "永嘉县"
        },
        {
          code: "330326",
          name: "平阳县"
        },
        {
          code: "330327",
          name: "苍南县"
        },
        {
          code: "330328",
          name: "文成县"
        },
        {
          code: "330329",
          name: "泰顺县"
        },
        {
          code: "330381",
          name: "瑞安市"
        },
        {
          code: "330382",
          name: "乐清市"
        }
      ],
      [
        {
          code: "330402",
          name: "南湖区"
        },
        {
          code: "330411",
          name: "秀洲区"
        },
        {
          code: "330421",
          name: "嘉善县"
        },
        {
          code: "330424",
          name: "海盐县"
        },
        {
          code: "330481",
          name: "海宁市"
        },
        {
          code: "330482",
          name: "平湖市"
        },
        {
          code: "330483",
          name: "桐乡市"
        }
      ],
      [
        {
          code: "330502",
          name: "吴兴区"
        },
        {
          code: "330503",
          name: "南浔区"
        },
        {
          code: "330521",
          name: "德清县"
        },
        {
          code: "330522",
          name: "长兴县"
        },
        {
          code: "330523",
          name: "安吉县"
        }
      ],
      [
        {
          code: "330602",
          name: "越城区"
        },
        {
          code: "330603",
          name: "柯桥区"
        },
        {
          code: "330604",
          name: "上虞区"
        },
        {
          code: "330624",
          name: "新昌县"
        },
        {
          code: "330681",
          name: "诸暨市"
        },
        {
          code: "330683",
          name: "嵊州市"
        }
      ],
      [
        {
          code: "330702",
          name: "婺城区"
        },
        {
          code: "330703",
          name: "金东区"
        },
        {
          code: "330723",
          name: "武义县"
        },
        {
          code: "330726",
          name: "浦江县"
        },
        {
          code: "330727",
          name: "磐安县"
        },
        {
          code: "330781",
          name: "兰溪市"
        },
        {
          code: "330782",
          name: "义乌市"
        },
        {
          code: "330783",
          name: "东阳市"
        },
        {
          code: "330784",
          name: "永康市"
        }
      ],
      [
        {
          code: "330802",
          name: "柯城区"
        },
        {
          code: "330803",
          name: "衢江区"
        },
        {
          code: "330822",
          name: "常山县"
        },
        {
          code: "330824",
          name: "开化县"
        },
        {
          code: "330825",
          name: "龙游县"
        },
        {
          code: "330881",
          name: "江山市"
        }
      ],
      [
        {
          code: "330902",
          name: "定海区"
        },
        {
          code: "330903",
          name: "普陀区"
        },
        {
          code: "330921",
          name: "岱山县"
        },
        {
          code: "330922",
          name: "嵊泗县"
        }
      ],
      [
        {
          code: "331002",
          name: "椒江区"
        },
        {
          code: "331003",
          name: "黄岩区"
        },
        {
          code: "331004",
          name: "路桥区"
        },
        {
          code: "331022",
          name: "三门县"
        },
        {
          code: "331023",
          name: "天台县"
        },
        {
          code: "331024",
          name: "仙居县"
        },
        {
          code: "331081",
          name: "温岭市"
        },
        {
          code: "331082",
          name: "临海市"
        },
        {
          code: "331083",
          name: "玉环市"
        }
      ],
      [
        {
          code: "331102",
          name: "莲都区"
        },
        {
          code: "331121",
          name: "青田县"
        },
        {
          code: "331122",
          name: "缙云县"
        },
        {
          code: "331123",
          name: "遂昌县"
        },
        {
          code: "331124",
          name: "松阳县"
        },
        {
          code: "331125",
          name: "云和县"
        },
        {
          code: "331126",
          name: "庆元县"
        },
        {
          code: "331127",
          name: "景宁畲族自治县"
        },
        {
          code: "331181",
          name: "龙泉市"
        }
      ]
    ],
    [
      [
        {
          code: "340102",
          name: "瑶海区"
        },
        {
          code: "340103",
          name: "庐阳区"
        },
        {
          code: "340104",
          name: "蜀山区"
        },
        {
          code: "340111",
          name: "包河区"
        },
        {
          code: "340121",
          name: "长丰县"
        },
        {
          code: "340122",
          name: "肥东县"
        },
        {
          code: "340123",
          name: "肥西县"
        },
        {
          code: "340124",
          name: "庐江县"
        },
        {
          code: "340181",
          name: "巢湖市"
        }
      ],
      [
        {
          code: "340202",
          name: "镜湖区"
        },
        {
          code: "340203",
          name: "弋江区"
        },
        {
          code: "340207",
          name: "鸠江区"
        },
        {
          code: "340208",
          name: "三山区"
        },
        {
          code: "340221",
          name: "芜湖县"
        },
        {
          code: "340222",
          name: "繁昌县"
        },
        {
          code: "340223",
          name: "南陵县"
        },
        {
          code: "340225",
          name: "无为县"
        }
      ],
      [
        {
          code: "340302",
          name: "龙子湖区"
        },
        {
          code: "340303",
          name: "蚌山区"
        },
        {
          code: "340304",
          name: "禹会区"
        },
        {
          code: "340311",
          name: "淮上区"
        },
        {
          code: "340321",
          name: "怀远县"
        },
        {
          code: "340322",
          name: "五河县"
        },
        {
          code: "340323",
          name: "固镇县"
        }
      ],
      [
        {
          code: "340402",
          name: "大通区"
        },
        {
          code: "340403",
          name: "田家庵区"
        },
        {
          code: "340404",
          name: "谢家集区"
        },
        {
          code: "340405",
          name: "八公山区"
        },
        {
          code: "340406",
          name: "潘集区"
        },
        {
          code: "340421",
          name: "凤台县"
        },
        {
          code: "340422",
          name: "寿县"
        }
      ],
      [
        {
          code: "340503",
          name: "花山区"
        },
        {
          code: "340504",
          name: "雨山区"
        },
        {
          code: "340506",
          name: "博望区"
        },
        {
          code: "340521",
          name: "当涂县"
        },
        {
          code: "340522",
          name: "含山县"
        },
        {
          code: "340523",
          name: "和县"
        }
      ],
      [
        {
          code: "340602",
          name: "杜集区"
        },
        {
          code: "340603",
          name: "相山区"
        },
        {
          code: "340604",
          name: "烈山区"
        },
        {
          code: "340621",
          name: "濉溪县"
        }
      ],
      [
        {
          code: "340705",
          name: "铜官区"
        },
        {
          code: "340706",
          name: "义安区"
        },
        {
          code: "340711",
          name: "郊区"
        },
        {
          code: "340722",
          name: "枞阳县"
        }
      ],
      [
        {
          code: "340802",
          name: "迎江区"
        },
        {
          code: "340803",
          name: "大观区"
        },
        {
          code: "340811",
          name: "宜秀区"
        },
        {
          code: "340822",
          name: "怀宁县"
        },
        {
          code: "340824",
          name: "潜山县"
        },
        {
          code: "340825",
          name: "太湖县"
        },
        {
          code: "340826",
          name: "宿松县"
        },
        {
          code: "340827",
          name: "望江县"
        },
        {
          code: "340828",
          name: "岳西县"
        },
        {
          code: "340881",
          name: "桐城市"
        }
      ],
      [
        {
          code: "341002",
          name: "屯溪区"
        },
        {
          code: "341003",
          name: "黄山区"
        },
        {
          code: "341004",
          name: "徽州区"
        },
        {
          code: "341021",
          name: "歙县"
        },
        {
          code: "341022",
          name: "休宁县"
        },
        {
          code: "341023",
          name: "黟县"
        },
        {
          code: "341024",
          name: "祁门县"
        }
      ],
      [
        {
          code: "341102",
          name: "琅琊区"
        },
        {
          code: "341103",
          name: "南谯区"
        },
        {
          code: "341122",
          name: "来安县"
        },
        {
          code: "341124",
          name: "全椒县"
        },
        {
          code: "341125",
          name: "定远县"
        },
        {
          code: "341126",
          name: "凤阳县"
        },
        {
          code: "341181",
          name: "天长市"
        },
        {
          code: "341182",
          name: "明光市"
        }
      ],
      [
        {
          code: "341202",
          name: "颍州区"
        },
        {
          code: "341203",
          name: "颍东区"
        },
        {
          code: "341204",
          name: "颍泉区"
        },
        {
          code: "341221",
          name: "临泉县"
        },
        {
          code: "341222",
          name: "太和县"
        },
        {
          code: "341225",
          name: "阜南县"
        },
        {
          code: "341226",
          name: "颍上县"
        },
        {
          code: "341282",
          name: "界首市"
        }
      ],
      [
        {
          code: "341302",
          name: "埇桥区"
        },
        {
          code: "341321",
          name: "砀山县"
        },
        {
          code: "341322",
          name: "萧县"
        },
        {
          code: "341323",
          name: "灵璧县"
        },
        {
          code: "341324",
          name: "泗县"
        }
      ],
      [
        {
          code: "341502",
          name: "金安区"
        },
        {
          code: "341503",
          name: "裕安区"
        },
        {
          code: "341504",
          name: "叶集区"
        },
        {
          code: "341522",
          name: "霍邱县"
        },
        {
          code: "341523",
          name: "舒城县"
        },
        {
          code: "341524",
          name: "金寨县"
        },
        {
          code: "341525",
          name: "霍山县"
        }
      ],
      [
        {
          code: "341602",
          name: "谯城区"
        },
        {
          code: "341621",
          name: "涡阳县"
        },
        {
          code: "341622",
          name: "蒙城县"
        },
        {
          code: "341623",
          name: "利辛县"
        }
      ],
      [
        {
          code: "341702",
          name: "贵池区"
        },
        {
          code: "341721",
          name: "东至县"
        },
        {
          code: "341722",
          name: "石台县"
        },
        {
          code: "341723",
          name: "青阳县"
        }
      ],
      [
        {
          code: "341802",
          name: "宣州区"
        },
        {
          code: "341821",
          name: "郎溪县"
        },
        {
          code: "341822",
          name: "广德县"
        },
        {
          code: "341823",
          name: "泾县"
        },
        {
          code: "341824",
          name: "绩溪县"
        },
        {
          code: "341825",
          name: "旌德县"
        },
        {
          code: "341881",
          name: "宁国市"
        }
      ]
    ],
    [
      [
        {
          code: "350102",
          name: "鼓楼区"
        },
        {
          code: "350103",
          name: "台江区"
        },
        {
          code: "350104",
          name: "仓山区"
        },
        {
          code: "350105",
          name: "马尾区"
        },
        {
          code: "350111",
          name: "晋安区"
        },
        {
          code: "350112",
          name: "长乐区"
        },
        {
          code: "350121",
          name: "闽侯县"
        },
        {
          code: "350122",
          name: "连江县"
        },
        {
          code: "350123",
          name: "罗源县"
        },
        {
          code: "350124",
          name: "闽清县"
        },
        {
          code: "350125",
          name: "永泰县"
        },
        {
          code: "350128",
          name: "平潭县"
        },
        {
          code: "350181",
          name: "福清市"
        }
      ],
      [
        {
          code: "350203",
          name: "思明区"
        },
        {
          code: "350205",
          name: "海沧区"
        },
        {
          code: "350206",
          name: "湖里区"
        },
        {
          code: "350211",
          name: "集美区"
        },
        {
          code: "350212",
          name: "同安区"
        },
        {
          code: "350213",
          name: "翔安区"
        }
      ],
      [
        {
          code: "350302",
          name: "城厢区"
        },
        {
          code: "350303",
          name: "涵江区"
        },
        {
          code: "350304",
          name: "荔城区"
        },
        {
          code: "350305",
          name: "秀屿区"
        },
        {
          code: "350322",
          name: "仙游县"
        }
      ],
      [
        {
          code: "350404",
          name: "三元区"
        },
        {
          code: "350405",
          name: "沙县区"
        },
        {
          code: "350421",
          name: "明溪县"
        },
        {
          code: "350423",
          name: "清流县"
        },
        {
          code: "350424",
          name: "宁化县"
        },
        {
          code: "350425",
          name: "大田县"
        },
        {
          code: "350426",
          name: "尤溪县"
        },
        {
          code: "350428",
          name: "将乐县"
        },
        {
          code: "350429",
          name: "泰宁县"
        },
        {
          code: "350430",
          name: "建宁县"
        },
        {
          code: "350481",
          name: "永安市"
        }
      ],
      [
        {
          code: "350502",
          name: "鲤城区"
        },
        {
          code: "350503",
          name: "丰泽区"
        },
        {
          code: "350504",
          name: "洛江区"
        },
        {
          code: "350505",
          name: "泉港区"
        },
        {
          code: "350521",
          name: "惠安县"
        },
        {
          code: "350524",
          name: "安溪县"
        },
        {
          code: "350525",
          name: "永春县"
        },
        {
          code: "350526",
          name: "德化县"
        },
        {
          code: "350527",
          name: "金门县"
        },
        {
          code: "350581",
          name: "石狮市"
        },
        {
          code: "350582",
          name: "晋江市"
        },
        {
          code: "350583",
          name: "南安市"
        }
      ],
      [
        {
          code: "350602",
          name: "芗城区"
        },
        {
          code: "350603",
          name: "龙文区"
        },
        {
          code: "350604",
          name: "龙海区"
        },
        {
          code: "350605",
          name: "长泰区"
        },
        {
          code: "350622",
          name: "云霄县"
        },
        {
          code: "350623",
          name: "漳浦县"
        },
        {
          code: "350624",
          name: "诏安县"
        },
        {
          code: "350626",
          name: "东山县"
        },
        {
          code: "350627",
          name: "南靖县"
        },
        {
          code: "350628",
          name: "平和县"
        },
        {
          code: "350629",
          name: "华安县"
        }
      ],
      [
        {
          code: "350702",
          name: "延平区"
        },
        {
          code: "350703",
          name: "建阳区"
        },
        {
          code: "350721",
          name: "顺昌县"
        },
        {
          code: "350722",
          name: "浦城县"
        },
        {
          code: "350723",
          name: "光泽县"
        },
        {
          code: "350724",
          name: "松溪县"
        },
        {
          code: "350725",
          name: "政和县"
        },
        {
          code: "350781",
          name: "邵武市"
        },
        {
          code: "350782",
          name: "武夷山市"
        },
        {
          code: "350783",
          name: "建瓯市"
        }
      ],
      [
        {
          code: "350802",
          name: "新罗区"
        },
        {
          code: "350803",
          name: "永定区"
        },
        {
          code: "350821",
          name: "长汀县"
        },
        {
          code: "350823",
          name: "上杭县"
        },
        {
          code: "350824",
          name: "武平县"
        },
        {
          code: "350825",
          name: "连城县"
        },
        {
          code: "350881",
          name: "漳平市"
        }
      ],
      [
        {
          code: "350902",
          name: "蕉城区"
        },
        {
          code: "350921",
          name: "霞浦县"
        },
        {
          code: "350922",
          name: "古田县"
        },
        {
          code: "350923",
          name: "屏南县"
        },
        {
          code: "350924",
          name: "寿宁县"
        },
        {
          code: "350925",
          name: "周宁县"
        },
        {
          code: "350926",
          name: "柘荣县"
        },
        {
          code: "350981",
          name: "福安市"
        },
        {
          code: "350982",
          name: "福鼎市"
        }
      ]
    ],
    [
      [
        {
          code: "360102",
          name: "东湖区"
        },
        {
          code: "360103",
          name: "西湖区"
        },
        {
          code: "360104",
          name: "青云谱区"
        },
        {
          code: "360105",
          name: "湾里区"
        },
        {
          code: "360111",
          name: "青山湖区"
        },
        {
          code: "360112",
          name: "新建区"
        },
        {
          code: "360121",
          name: "南昌县"
        },
        {
          code: "360123",
          name: "安义县"
        },
        {
          code: "360124",
          name: "进贤县"
        }
      ],
      [
        {
          code: "360202",
          name: "昌江区"
        },
        {
          code: "360203",
          name: "珠山区"
        },
        {
          code: "360222",
          name: "浮梁县"
        },
        {
          code: "360281",
          name: "乐平市"
        }
      ],
      [
        {
          code: "360302",
          name: "安源区"
        },
        {
          code: "360313",
          name: "湘东区"
        },
        {
          code: "360321",
          name: "莲花县"
        },
        {
          code: "360322",
          name: "上栗县"
        },
        {
          code: "360323",
          name: "芦溪县"
        }
      ],
      [
        {
          code: "360402",
          name: "濂溪区"
        },
        {
          code: "360403",
          name: "浔阳区"
        },
        {
          code: "360404",
          name: "柴桑区"
        },
        {
          code: "360423",
          name: "武宁县"
        },
        {
          code: "360424",
          name: "修水县"
        },
        {
          code: "360425",
          name: "永修县"
        },
        {
          code: "360426",
          name: "德安县"
        },
        {
          code: "360428",
          name: "都昌县"
        },
        {
          code: "360429",
          name: "湖口县"
        },
        {
          code: "360430",
          name: "彭泽县"
        },
        {
          code: "360481",
          name: "瑞昌市"
        },
        {
          code: "360482",
          name: "共青城市"
        },
        {
          code: "360483",
          name: "庐山市"
        }
      ],
      [
        {
          code: "360502",
          name: "渝水区"
        },
        {
          code: "360521",
          name: "分宜县"
        }
      ],
      [
        {
          code: "360602",
          name: "月湖区"
        },
        {
          code: "360622",
          name: "余江区"
        },
        {
          code: "360681",
          name: "贵溪市"
        }
      ],
      [
        {
          code: "360702",
          name: "章贡区"
        },
        {
          code: "360703",
          name: "南康区"
        },
        {
          code: "360704",
          name: "赣县区"
        },
        {
          code: "360722",
          name: "信丰县"
        },
        {
          code: "360723",
          name: "大余县"
        },
        {
          code: "360724",
          name: "上犹县"
        },
        {
          code: "360725",
          name: "崇义县"
        },
        {
          code: "360726",
          name: "安远县"
        },
        {
          code: "360727",
          name: "龙南县"
        },
        {
          code: "360728",
          name: "定南县"
        },
        {
          code: "360729",
          name: "全南县"
        },
        {
          code: "360730",
          name: "宁都县"
        },
        {
          code: "360731",
          name: "于都县"
        },
        {
          code: "360732",
          name: "兴国县"
        },
        {
          code: "360733",
          name: "会昌县"
        },
        {
          code: "360734",
          name: "寻乌县"
        },
        {
          code: "360735",
          name: "石城县"
        },
        {
          code: "360781",
          name: "瑞金市"
        }
      ],
      [
        {
          code: "360802",
          name: "吉州区"
        },
        {
          code: "360803",
          name: "青原区"
        },
        {
          code: "360821",
          name: "吉安县"
        },
        {
          code: "360822",
          name: "吉水县"
        },
        {
          code: "360823",
          name: "峡江县"
        },
        {
          code: "360824",
          name: "新干县"
        },
        {
          code: "360825",
          name: "永丰县"
        },
        {
          code: "360826",
          name: "泰和县"
        },
        {
          code: "360827",
          name: "遂川县"
        },
        {
          code: "360828",
          name: "万安县"
        },
        {
          code: "360829",
          name: "安福县"
        },
        {
          code: "360830",
          name: "永新县"
        },
        {
          code: "360881",
          name: "井冈山市"
        }
      ],
      [
        {
          code: "360902",
          name: "袁州区"
        },
        {
          code: "360921",
          name: "奉新县"
        },
        {
          code: "360922",
          name: "万载县"
        },
        {
          code: "360923",
          name: "上高县"
        },
        {
          code: "360924",
          name: "宜丰县"
        },
        {
          code: "360925",
          name: "靖安县"
        },
        {
          code: "360926",
          name: "铜鼓县"
        },
        {
          code: "360981",
          name: "丰城市"
        },
        {
          code: "360982",
          name: "樟树市"
        },
        {
          code: "360983",
          name: "高安市"
        }
      ],
      [
        {
          code: "361002",
          name: "临川区"
        },
        {
          code: "361003",
          name: "东乡区"
        },
        {
          code: "361021",
          name: "南城县"
        },
        {
          code: "361022",
          name: "黎川县"
        },
        {
          code: "361023",
          name: "南丰县"
        },
        {
          code: "361024",
          name: "崇仁县"
        },
        {
          code: "361025",
          name: "乐安县"
        },
        {
          code: "361026",
          name: "宜黄县"
        },
        {
          code: "361027",
          name: "金溪县"
        },
        {
          code: "361028",
          name: "资溪县"
        },
        {
          code: "361030",
          name: "广昌县"
        }
      ],
      [
        {
          code: "361102",
          name: "信州区"
        },
        {
          code: "361103",
          name: "广丰区"
        },
        {
          code: "361121",
          name: "上饶县"
        },
        {
          code: "361123",
          name: "玉山县"
        },
        {
          code: "361124",
          name: "铅山县"
        },
        {
          code: "361125",
          name: "横峰县"
        },
        {
          code: "361126",
          name: "弋阳县"
        },
        {
          code: "361127",
          name: "余干县"
        },
        {
          code: "361128",
          name: "鄱阳县"
        },
        {
          code: "361129",
          name: "万年县"
        },
        {
          code: "361130",
          name: "婺源县"
        },
        {
          code: "361181",
          name: "德兴市"
        }
      ]
    ],
    [
      [
        {
          code: "370102",
          name: "历下区"
        },
        {
          code: "370103",
          name: "市中区"
        },
        {
          code: "370104",
          name: "槐荫区"
        },
        {
          code: "370105",
          name: "天桥区"
        },
        {
          code: "370112",
          name: "历城区"
        },
        {
          code: "370113",
          name: "长清区"
        },
        {
          code: "370114",
          name: "章丘区"
        },
        {
          code: "370124",
          name: "平阴县"
        },
        {
          code: "370125",
          name: "济阳县"
        },
        {
          code: "370126",
          name: "商河县"
        }
      ],
      [
        {
          code: "370202",
          name: "市南区"
        },
        {
          code: "370203",
          name: "市北区"
        },
        {
          code: "370211",
          name: "黄岛区"
        },
        {
          code: "370212",
          name: "崂山区"
        },
        {
          code: "370213",
          name: "李沧区"
        },
        {
          code: "370214",
          name: "城阳区"
        },
        {
          code: "370215",
          name: "即墨区"
        },
        {
          code: "370281",
          name: "胶州市"
        },
        {
          code: "370283",
          name: "平度市"
        },
        {
          code: "370285",
          name: "莱西市"
        }
      ],
      [
        {
          code: "370302",
          name: "淄川区"
        },
        {
          code: "370303",
          name: "张店区"
        },
        {
          code: "370304",
          name: "博山区"
        },
        {
          code: "370305",
          name: "临淄区"
        },
        {
          code: "370306",
          name: "周村区"
        },
        {
          code: "370321",
          name: "桓台县"
        },
        {
          code: "370322",
          name: "高青县"
        },
        {
          code: "370323",
          name: "沂源县"
        }
      ],
      [
        {
          code: "370402",
          name: "市中区"
        },
        {
          code: "370403",
          name: "薛城区"
        },
        {
          code: "370404",
          name: "峄城区"
        },
        {
          code: "370405",
          name: "台儿庄区"
        },
        {
          code: "370406",
          name: "山亭区"
        },
        {
          code: "370481",
          name: "滕州市"
        }
      ],
      [
        {
          code: "370502",
          name: "东营区"
        },
        {
          code: "370503",
          name: "河口区"
        },
        {
          code: "370505",
          name: "垦利区"
        },
        {
          code: "370522",
          name: "利津县"
        },
        {
          code: "370523",
          name: "广饶县"
        }
      ],
      [
        {
          code: "370602",
          name: "芝罘区"
        },
        {
          code: "370611",
          name: "福山区"
        },
        {
          code: "370612",
          name: "牟平区"
        },
        {
          code: "370613",
          name: "莱山区"
        },
        {
          code: "370634",
          name: "长岛县"
        },
        {
          code: "370681",
          name: "龙口市"
        },
        {
          code: "370682",
          name: "莱阳市"
        },
        {
          code: "370683",
          name: "莱州市"
        },
        {
          code: "370684",
          name: "蓬莱市"
        },
        {
          code: "370685",
          name: "招远市"
        },
        {
          code: "370686",
          name: "栖霞市"
        },
        {
          code: "370687",
          name: "海阳市"
        }
      ],
      [
        {
          code: "370702",
          name: "潍城区"
        },
        {
          code: "370703",
          name: "寒亭区"
        },
        {
          code: "370704",
          name: "坊子区"
        },
        {
          code: "370705",
          name: "奎文区"
        },
        {
          code: "370724",
          name: "临朐县"
        },
        {
          code: "370725",
          name: "昌乐县"
        },
        {
          code: "370781",
          name: "青州市"
        },
        {
          code: "370782",
          name: "诸城市"
        },
        {
          code: "370783",
          name: "寿光市"
        },
        {
          code: "370784",
          name: "安丘市"
        },
        {
          code: "370785",
          name: "高密市"
        },
        {
          code: "370786",
          name: "昌邑市"
        }
      ],
      [
        {
          code: "370811",
          name: "任城区"
        },
        {
          code: "370812",
          name: "兖州区"
        },
        {
          code: "370826",
          name: "微山县"
        },
        {
          code: "370827",
          name: "鱼台县"
        },
        {
          code: "370828",
          name: "金乡县"
        },
        {
          code: "370829",
          name: "嘉祥县"
        },
        {
          code: "370830",
          name: "汶上县"
        },
        {
          code: "370831",
          name: "泗水县"
        },
        {
          code: "370832",
          name: "梁山县"
        },
        {
          code: "370881",
          name: "曲阜市"
        },
        {
          code: "370883",
          name: "邹城市"
        }
      ],
      [
        {
          code: "370902",
          name: "泰山区"
        },
        {
          code: "370911",
          name: "岱岳区"
        },
        {
          code: "370921",
          name: "宁阳县"
        },
        {
          code: "370923",
          name: "东平县"
        },
        {
          code: "370982",
          name: "新泰市"
        },
        {
          code: "370983",
          name: "肥城市"
        }
      ],
      [
        {
          code: "371002",
          name: "环翠区"
        },
        {
          code: "371003",
          name: "文登区"
        },
        {
          code: "371082",
          name: "荣成市"
        },
        {
          code: "371083",
          name: "乳山市"
        }
      ],
      [
        {
          code: "371102",
          name: "东港区"
        },
        {
          code: "371103",
          name: "岚山区"
        },
        {
          code: "371121",
          name: "五莲县"
        },
        {
          code: "371122",
          name: "莒县"
        }
      ],
      [
        {
          code: "371202",
          name: "莱城区"
        },
        {
          code: "371203",
          name: "钢城区"
        }
      ],
      [
        {
          code: "371302",
          name: "兰山区"
        },
        {
          code: "371311",
          name: "罗庄区"
        },
        {
          code: "371312",
          name: "河东区"
        },
        {
          code: "371321",
          name: "沂南县"
        },
        {
          code: "371322",
          name: "郯城县"
        },
        {
          code: "371323",
          name: "沂水县"
        },
        {
          code: "371324",
          name: "兰陵县"
        },
        {
          code: "371325",
          name: "费县"
        },
        {
          code: "371326",
          name: "平邑县"
        },
        {
          code: "371327",
          name: "莒南县"
        },
        {
          code: "371328",
          name: "蒙阴县"
        },
        {
          code: "371329",
          name: "临沭县"
        }
      ],
      [
        {
          code: "371402",
          name: "德城区"
        },
        {
          code: "371403",
          name: "陵城区"
        },
        {
          code: "371422",
          name: "宁津县"
        },
        {
          code: "371423",
          name: "庆云县"
        },
        {
          code: "371424",
          name: "临邑县"
        },
        {
          code: "371425",
          name: "齐河县"
        },
        {
          code: "371426",
          name: "平原县"
        },
        {
          code: "371427",
          name: "夏津县"
        },
        {
          code: "371428",
          name: "武城县"
        },
        {
          code: "371481",
          name: "乐陵市"
        },
        {
          code: "371482",
          name: "禹城市"
        }
      ],
      [
        {
          code: "371502",
          name: "东昌府区"
        },
        {
          code: "371521",
          name: "阳谷县"
        },
        {
          code: "371522",
          name: "莘县"
        },
        {
          code: "371523",
          name: "茌平县"
        },
        {
          code: "371524",
          name: "东阿县"
        },
        {
          code: "371525",
          name: "冠县"
        },
        {
          code: "371526",
          name: "高唐县"
        },
        {
          code: "371581",
          name: "临清市"
        }
      ],
      [
        {
          code: "371602",
          name: "滨城区"
        },
        {
          code: "371603",
          name: "沾化区"
        },
        {
          code: "371621",
          name: "惠民县"
        },
        {
          code: "371622",
          name: "阳信县"
        },
        {
          code: "371623",
          name: "无棣县"
        },
        {
          code: "371625",
          name: "博兴县"
        },
        {
          code: "371626",
          name: "邹平县"
        }
      ],
      [
        {
          code: "371702",
          name: "牡丹区"
        },
        {
          code: "371703",
          name: "定陶区"
        },
        {
          code: "371721",
          name: "曹县"
        },
        {
          code: "371722",
          name: "单县"
        },
        {
          code: "371723",
          name: "成武县"
        },
        {
          code: "371724",
          name: "巨野县"
        },
        {
          code: "371725",
          name: "郓城县"
        },
        {
          code: "371726",
          name: "鄄城县"
        },
        {
          code: "371728",
          name: "东明县"
        }
      ]
    ],
    [
      [
        {
          code: "410102",
          name: "中原区"
        },
        {
          code: "410103",
          name: "二七区"
        },
        {
          code: "410104",
          name: "管城回族区"
        },
        {
          code: "410105",
          name: "金水区"
        },
        {
          code: "410106",
          name: "上街区"
        },
        {
          code: "410108",
          name: "惠济区"
        },
        {
          code: "410122",
          name: "中牟县"
        },
        {
          code: "410181",
          name: "巩义市"
        },
        {
          code: "410182",
          name: "荥阳市"
        },
        {
          code: "410183",
          name: "新密市"
        },
        {
          code: "410184",
          name: "新郑市"
        },
        {
          code: "410185",
          name: "登封市"
        }
      ],
      [
        {
          code: "410202",
          name: "龙亭区"
        },
        {
          code: "410203",
          name: "顺河回族区"
        },
        {
          code: "410204",
          name: "鼓楼区"
        },
        {
          code: "410205",
          name: "禹王台区"
        },
        {
          code: "410212",
          name: "祥符区"
        },
        {
          code: "410221",
          name: "杞县"
        },
        {
          code: "410222",
          name: "通许县"
        },
        {
          code: "410223",
          name: "尉氏县"
        },
        {
          code: "410225",
          name: "兰考县"
        }
      ],
      [
        {
          code: "410302",
          name: "老城区"
        },
        {
          code: "410303",
          name: "西工区"
        },
        {
          code: "410304",
          name: "瀍河回族区"
        },
        {
          code: "410305",
          name: "涧西区"
        },
        {
          code: "410307",
          name: "偃师区"
        },
        {
          code: "410308",
          name: "孟津区"
        },
        {
          code: "410311",
          name: "洛龙区"
        },
        {
          code: "410323",
          name: "新安县"
        },
        {
          code: "410324",
          name: "栾川县"
        },
        {
          code: "410325",
          name: "嵩县"
        },
        {
          code: "410326",
          name: "汝阳县"
        },
        {
          code: "410327",
          name: "宜阳县"
        },
        {
          code: "410328",
          name: "洛宁县"
        },
        {
          code: "410329",
          name: "伊川县"
        }
      ],
      [
        {
          code: "410402",
          name: "新华区"
        },
        {
          code: "410403",
          name: "卫东区"
        },
        {
          code: "410404",
          name: "石龙区"
        },
        {
          code: "410411",
          name: "湛河区"
        },
        {
          code: "410421",
          name: "宝丰县"
        },
        {
          code: "410422",
          name: "叶县"
        },
        {
          code: "410423",
          name: "鲁山县"
        },
        {
          code: "410425",
          name: "郏县"
        },
        {
          code: "410481",
          name: "舞钢市"
        },
        {
          code: "410482",
          name: "汝州市"
        }
      ],
      [
        {
          code: "410502",
          name: "文峰区"
        },
        {
          code: "410503",
          name: "北关区"
        },
        {
          code: "410505",
          name: "殷都区"
        },
        {
          code: "410506",
          name: "龙安区"
        },
        {
          code: "410522",
          name: "安阳县"
        },
        {
          code: "410523",
          name: "汤阴县"
        },
        {
          code: "410526",
          name: "滑县"
        },
        {
          code: "410527",
          name: "内黄县"
        },
        {
          code: "410581",
          name: "林州市"
        }
      ],
      [
        {
          code: "410602",
          name: "鹤山区"
        },
        {
          code: "410603",
          name: "山城区"
        },
        {
          code: "410611",
          name: "淇滨区"
        },
        {
          code: "410621",
          name: "浚县"
        },
        {
          code: "410622",
          name: "淇县"
        }
      ],
      [
        {
          code: "410702",
          name: "红旗区"
        },
        {
          code: "410703",
          name: "卫滨区"
        },
        {
          code: "410704",
          name: "凤泉区"
        },
        {
          code: "410711",
          name: "牧野区"
        },
        {
          code: "410721",
          name: "新乡县"
        },
        {
          code: "410724",
          name: "获嘉县"
        },
        {
          code: "410725",
          name: "原阳县"
        },
        {
          code: "410726",
          name: "延津县"
        },
        {
          code: "410727",
          name: "封丘县"
        },
        {
          code: "410728",
          name: "长垣县"
        },
        {
          code: "410781",
          name: "卫辉市"
        },
        {
          code: "410782",
          name: "辉县市"
        }
      ],
      [
        {
          code: "410802",
          name: "解放区"
        },
        {
          code: "410803",
          name: "中站区"
        },
        {
          code: "410804",
          name: "马村区"
        },
        {
          code: "410811",
          name: "山阳区"
        },
        {
          code: "410821",
          name: "修武县"
        },
        {
          code: "410822",
          name: "博爱县"
        },
        {
          code: "410823",
          name: "武陟县"
        },
        {
          code: "410825",
          name: "温县"
        },
        {
          code: "410882",
          name: "沁阳市"
        },
        {
          code: "410883",
          name: "孟州市"
        }
      ],
      [
        {
          code: "410902",
          name: "华龙区"
        },
        {
          code: "410922",
          name: "清丰县"
        },
        {
          code: "410923",
          name: "南乐县"
        },
        {
          code: "410926",
          name: "范县"
        },
        {
          code: "410927",
          name: "台前县"
        },
        {
          code: "410928",
          name: "濮阳县"
        }
      ],
      [
        {
          code: "411002",
          name: "魏都区"
        },
        {
          code: "411003",
          name: "建安区"
        },
        {
          code: "411024",
          name: "鄢陵县"
        },
        {
          code: "411025",
          name: "襄城县"
        },
        {
          code: "411081",
          name: "禹州市"
        },
        {
          code: "411082",
          name: "长葛市"
        }
      ],
      [
        {
          code: "411102",
          name: "源汇区"
        },
        {
          code: "411103",
          name: "郾城区"
        },
        {
          code: "411104",
          name: "召陵区"
        },
        {
          code: "411121",
          name: "舞阳县"
        },
        {
          code: "411122",
          name: "临颍县"
        }
      ],
      [
        {
          code: "411202",
          name: "湖滨区"
        },
        {
          code: "411203",
          name: "陕州区"
        },
        {
          code: "411221",
          name: "渑池县"
        },
        {
          code: "411224",
          name: "卢氏县"
        },
        {
          code: "411281",
          name: "义马市"
        },
        {
          code: "411282",
          name: "灵宝市"
        }
      ],
      [
        {
          code: "411302",
          name: "宛城区"
        },
        {
          code: "411303",
          name: "卧龙区"
        },
        {
          code: "411321",
          name: "南召县"
        },
        {
          code: "411322",
          name: "方城县"
        },
        {
          code: "411323",
          name: "西峡县"
        },
        {
          code: "411324",
          name: "镇平县"
        },
        {
          code: "411325",
          name: "内乡县"
        },
        {
          code: "411326",
          name: "淅川县"
        },
        {
          code: "411327",
          name: "社旗县"
        },
        {
          code: "411328",
          name: "唐河县"
        },
        {
          code: "411329",
          name: "新野县"
        },
        {
          code: "411330",
          name: "桐柏县"
        },
        {
          code: "411381",
          name: "邓州市"
        }
      ],
      [
        {
          code: "411402",
          name: "梁园区"
        },
        {
          code: "411403",
          name: "睢阳区"
        },
        {
          code: "411421",
          name: "民权县"
        },
        {
          code: "411422",
          name: "睢县"
        },
        {
          code: "411423",
          name: "宁陵县"
        },
        {
          code: "411424",
          name: "柘城县"
        },
        {
          code: "411425",
          name: "虞城县"
        },
        {
          code: "411426",
          name: "夏邑县"
        },
        {
          code: "411481",
          name: "永城市"
        }
      ],
      [
        {
          code: "411502",
          name: "浉河区"
        },
        {
          code: "411503",
          name: "平桥区"
        },
        {
          code: "411521",
          name: "罗山县"
        },
        {
          code: "411522",
          name: "光山县"
        },
        {
          code: "411523",
          name: "新县"
        },
        {
          code: "411524",
          name: "商城县"
        },
        {
          code: "411525",
          name: "固始县"
        },
        {
          code: "411526",
          name: "潢川县"
        },
        {
          code: "411527",
          name: "淮滨县"
        },
        {
          code: "411528",
          name: "息县"
        }
      ],
      [
        {
          code: "411602",
          name: "川汇区"
        },
        {
          code: "411621",
          name: "扶沟县"
        },
        {
          code: "411622",
          name: "西华县"
        },
        {
          code: "411623",
          name: "商水县"
        },
        {
          code: "411624",
          name: "沈丘县"
        },
        {
          code: "411625",
          name: "郸城县"
        },
        {
          code: "411626",
          name: "淮阳县"
        },
        {
          code: "411627",
          name: "太康县"
        },
        {
          code: "411628",
          name: "鹿邑县"
        },
        {
          code: "411681",
          name: "项城市"
        }
      ],
      [
        {
          code: "411702",
          name: "驿城区"
        },
        {
          code: "411721",
          name: "西平县"
        },
        {
          code: "411722",
          name: "上蔡县"
        },
        {
          code: "411723",
          name: "平舆县"
        },
        {
          code: "411724",
          name: "正阳县"
        },
        {
          code: "411725",
          name: "确山县"
        },
        {
          code: "411726",
          name: "泌阳县"
        },
        {
          code: "411727",
          name: "汝南县"
        },
        {
          code: "411728",
          name: "遂平县"
        },
        {
          code: "411729",
          name: "新蔡县"
        }
      ],
      [
        {
          code: "419001",
          name: "济源市"
        }
      ]
    ],
    [
      [
        {
          code: "420102",
          name: "江岸区"
        },
        {
          code: "420103",
          name: "江汉区"
        },
        {
          code: "420104",
          name: "硚口区"
        },
        {
          code: "420105",
          name: "汉阳区"
        },
        {
          code: "420106",
          name: "武昌区"
        },
        {
          code: "420107",
          name: "青山区"
        },
        {
          code: "420111",
          name: "洪山区"
        },
        {
          code: "420112",
          name: "东西湖区"
        },
        {
          code: "420113",
          name: "汉南区"
        },
        {
          code: "420114",
          name: "蔡甸区"
        },
        {
          code: "420115",
          name: "江夏区"
        },
        {
          code: "420116",
          name: "黄陂区"
        },
        {
          code: "420117",
          name: "新洲区"
        }
      ],
      [
        {
          code: "420202",
          name: "黄石港区"
        },
        {
          code: "420203",
          name: "西塞山区"
        },
        {
          code: "420204",
          name: "下陆区"
        },
        {
          code: "420205",
          name: "铁山区"
        },
        {
          code: "420222",
          name: "阳新县"
        },
        {
          code: "420281",
          name: "大冶市"
        }
      ],
      [
        {
          code: "420302",
          name: "茅箭区"
        },
        {
          code: "420303",
          name: "张湾区"
        },
        {
          code: "420304",
          name: "郧阳区"
        },
        {
          code: "420322",
          name: "郧西县"
        },
        {
          code: "420323",
          name: "竹山县"
        },
        {
          code: "420324",
          name: "竹溪县"
        },
        {
          code: "420325",
          name: "房县"
        },
        {
          code: "420381",
          name: "丹江口市"
        }
      ],
      [
        {
          code: "420502",
          name: "西陵区"
        },
        {
          code: "420503",
          name: "伍家岗区"
        },
        {
          code: "420504",
          name: "点军区"
        },
        {
          code: "420505",
          name: "猇亭区"
        },
        {
          code: "420506",
          name: "夷陵区"
        },
        {
          code: "420525",
          name: "远安县"
        },
        {
          code: "420526",
          name: "兴山县"
        },
        {
          code: "420527",
          name: "秭归县"
        },
        {
          code: "420528",
          name: "长阳土家族自治县"
        },
        {
          code: "420529",
          name: "五峰土家族自治县"
        },
        {
          code: "420581",
          name: "宜都市"
        },
        {
          code: "420582",
          name: "当阳市"
        },
        {
          code: "420583",
          name: "枝江市"
        }
      ],
      [
        {
          code: "420602",
          name: "襄城区"
        },
        {
          code: "420606",
          name: "樊城区"
        },
        {
          code: "420607",
          name: "襄州区"
        },
        {
          code: "420624",
          name: "南漳县"
        },
        {
          code: "420625",
          name: "谷城县"
        },
        {
          code: "420626",
          name: "保康县"
        },
        {
          code: "420682",
          name: "老河口市"
        },
        {
          code: "420683",
          name: "枣阳市"
        },
        {
          code: "420684",
          name: "宜城市"
        }
      ],
      [
        {
          code: "420702",
          name: "梁子湖区"
        },
        {
          code: "420703",
          name: "华容区"
        },
        {
          code: "420704",
          name: "鄂城区"
        }
      ],
      [
        {
          code: "420802",
          name: "东宝区"
        },
        {
          code: "420804",
          name: "掇刀区"
        },
        {
          code: "420821",
          name: "京山县"
        },
        {
          code: "420822",
          name: "沙洋县"
        },
        {
          code: "420881",
          name: "钟祥市"
        }
      ],
      [
        {
          code: "420902",
          name: "孝南区"
        },
        {
          code: "420921",
          name: "孝昌县"
        },
        {
          code: "420922",
          name: "大悟县"
        },
        {
          code: "420923",
          name: "云梦县"
        },
        {
          code: "420981",
          name: "应城市"
        },
        {
          code: "420982",
          name: "安陆市"
        },
        {
          code: "420984",
          name: "汉川市"
        }
      ],
      [
        {
          code: "421002",
          name: "沙市区"
        },
        {
          code: "421003",
          name: "荆州区"
        },
        {
          code: "421022",
          name: "公安县"
        },
        {
          code: "421023",
          name: "监利县"
        },
        {
          code: "421024",
          name: "江陵县"
        },
        {
          code: "421081",
          name: "石首市"
        },
        {
          code: "421083",
          name: "洪湖市"
        },
        {
          code: "421087",
          name: "松滋市"
        }
      ],
      [
        {
          code: "421102",
          name: "黄州区"
        },
        {
          code: "421121",
          name: "团风县"
        },
        {
          code: "421122",
          name: "红安县"
        },
        {
          code: "421123",
          name: "罗田县"
        },
        {
          code: "421124",
          name: "英山县"
        },
        {
          code: "421125",
          name: "浠水县"
        },
        {
          code: "421126",
          name: "蕲春县"
        },
        {
          code: "421127",
          name: "黄梅县"
        },
        {
          code: "421181",
          name: "麻城市"
        },
        {
          code: "421182",
          name: "武穴市"
        }
      ],
      [
        {
          code: "421202",
          name: "咸安区"
        },
        {
          code: "421221",
          name: "嘉鱼县"
        },
        {
          code: "421222",
          name: "通城县"
        },
        {
          code: "421223",
          name: "崇阳县"
        },
        {
          code: "421224",
          name: "通山县"
        },
        {
          code: "421281",
          name: "赤壁市"
        }
      ],
      [
        {
          code: "421303",
          name: "曾都区"
        },
        {
          code: "421321",
          name: "随县"
        },
        {
          code: "421381",
          name: "广水市"
        }
      ],
      [
        {
          code: "422801",
          name: "恩施市"
        },
        {
          code: "422802",
          name: "利川市"
        },
        {
          code: "422822",
          name: "建始县"
        },
        {
          code: "422823",
          name: "巴东县"
        },
        {
          code: "422825",
          name: "宣恩县"
        },
        {
          code: "422826",
          name: "咸丰县"
        },
        {
          code: "422827",
          name: "来凤县"
        },
        {
          code: "422828",
          name: "鹤峰县"
        }
      ],
      [
        {
          code: "429004",
          name: "仙桃市"
        },
        {
          code: "429005",
          name: "潜江市"
        },
        {
          code: "429006",
          name: "天门市"
        },
        {
          code: "429021",
          name: "神农架林区"
        }
      ]
    ],
    [
      [
        {
          code: "430102",
          name: "芙蓉区"
        },
        {
          code: "430103",
          name: "天心区"
        },
        {
          code: "430104",
          name: "岳麓区"
        },
        {
          code: "430105",
          name: "开福区"
        },
        {
          code: "430111",
          name: "雨花区"
        },
        {
          code: "430112",
          name: "望城区"
        },
        {
          code: "430121",
          name: "长沙县"
        },
        {
          code: "430181",
          name: "浏阳市"
        },
        {
          code: "430182",
          name: "宁乡市"
        }
      ],
      [
        {
          code: "430202",
          name: "荷塘区"
        },
        {
          code: "430203",
          name: "芦淞区"
        },
        {
          code: "430204",
          name: "石峰区"
        },
        {
          code: "430211",
          name: "天元区"
        },
        {
          code: "430221",
          name: "株洲县"
        },
        {
          code: "430223",
          name: "攸县"
        },
        {
          code: "430224",
          name: "茶陵县"
        },
        {
          code: "430225",
          name: "炎陵县"
        },
        {
          code: "430281",
          name: "醴陵市"
        }
      ],
      [
        {
          code: "430302",
          name: "雨湖区"
        },
        {
          code: "430304",
          name: "岳塘区"
        },
        {
          code: "430321",
          name: "湘潭县"
        },
        {
          code: "430381",
          name: "湘乡市"
        },
        {
          code: "430382",
          name: "韶山市"
        }
      ],
      [
        {
          code: "430405",
          name: "珠晖区"
        },
        {
          code: "430406",
          name: "雁峰区"
        },
        {
          code: "430407",
          name: "石鼓区"
        },
        {
          code: "430408",
          name: "蒸湘区"
        },
        {
          code: "430412",
          name: "南岳区"
        },
        {
          code: "430421",
          name: "衡阳县"
        },
        {
          code: "430422",
          name: "衡南县"
        },
        {
          code: "430423",
          name: "衡山县"
        },
        {
          code: "430424",
          name: "衡东县"
        },
        {
          code: "430426",
          name: "祁东县"
        },
        {
          code: "430481",
          name: "耒阳市"
        },
        {
          code: "430482",
          name: "常宁市"
        }
      ],
      [
        {
          code: "430502",
          name: "双清区"
        },
        {
          code: "430503",
          name: "大祥区"
        },
        {
          code: "430511",
          name: "北塔区"
        },
        {
          code: "430521",
          name: "邵东县"
        },
        {
          code: "430522",
          name: "新邵县"
        },
        {
          code: "430523",
          name: "邵阳县"
        },
        {
          code: "430524",
          name: "隆回县"
        },
        {
          code: "430525",
          name: "洞口县"
        },
        {
          code: "430527",
          name: "绥宁县"
        },
        {
          code: "430528",
          name: "新宁县"
        },
        {
          code: "430529",
          name: "城步苗族自治县"
        },
        {
          code: "430581",
          name: "武冈市"
        }
      ],
      [
        {
          code: "430602",
          name: "岳阳楼区"
        },
        {
          code: "430603",
          name: "云溪区"
        },
        {
          code: "430611",
          name: "君山区"
        },
        {
          code: "430621",
          name: "岳阳县"
        },
        {
          code: "430623",
          name: "华容县"
        },
        {
          code: "430624",
          name: "湘阴县"
        },
        {
          code: "430626",
          name: "平江县"
        },
        {
          code: "430681",
          name: "汨罗市"
        },
        {
          code: "430682",
          name: "临湘市"
        }
      ],
      [
        {
          code: "430702",
          name: "武陵区"
        },
        {
          code: "430703",
          name: "鼎城区"
        },
        {
          code: "430721",
          name: "安乡县"
        },
        {
          code: "430722",
          name: "汉寿县"
        },
        {
          code: "430723",
          name: "澧县"
        },
        {
          code: "430724",
          name: "临澧县"
        },
        {
          code: "430725",
          name: "桃源县"
        },
        {
          code: "430726",
          name: "石门县"
        },
        {
          code: "430781",
          name: "津市市"
        }
      ],
      [
        {
          code: "430802",
          name: "永定区"
        },
        {
          code: "430811",
          name: "武陵源区"
        },
        {
          code: "430821",
          name: "慈利县"
        },
        {
          code: "430822",
          name: "桑植县"
        }
      ],
      [
        {
          code: "430902",
          name: "资阳区"
        },
        {
          code: "430903",
          name: "赫山区"
        },
        {
          code: "430921",
          name: "南县"
        },
        {
          code: "430922",
          name: "桃江县"
        },
        {
          code: "430923",
          name: "安化县"
        },
        {
          code: "430981",
          name: "沅江市"
        }
      ],
      [
        {
          code: "431002",
          name: "北湖区"
        },
        {
          code: "431003",
          name: "苏仙区"
        },
        {
          code: "431021",
          name: "桂阳县"
        },
        {
          code: "431022",
          name: "宜章县"
        },
        {
          code: "431023",
          name: "永兴县"
        },
        {
          code: "431024",
          name: "嘉禾县"
        },
        {
          code: "431025",
          name: "临武县"
        },
        {
          code: "431026",
          name: "汝城县"
        },
        {
          code: "431027",
          name: "桂东县"
        },
        {
          code: "431028",
          name: "安仁县"
        },
        {
          code: "431081",
          name: "资兴市"
        }
      ],
      [
        {
          code: "431102",
          name: "零陵区"
        },
        {
          code: "431103",
          name: "冷水滩区"
        },
        {
          code: "431122",
          name: "东安县"
        },
        {
          code: "431123",
          name: "双牌县"
        },
        {
          code: "431124",
          name: "道县"
        },
        {
          code: "431125",
          name: "江永县"
        },
        {
          code: "431126",
          name: "宁远县"
        },
        {
          code: "431127",
          name: "蓝山县"
        },
        {
          code: "431128",
          name: "新田县"
        },
        {
          code: "431129",
          name: "江华瑶族自治县"
        },
        {
          code: "431181",
          name: "祁阳市"
        }
      ],
      [
        {
          code: "431202",
          name: "鹤城区"
        },
        {
          code: "431221",
          name: "中方县"
        },
        {
          code: "431222",
          name: "沅陵县"
        },
        {
          code: "431223",
          name: "辰溪县"
        },
        {
          code: "431224",
          name: "溆浦县"
        },
        {
          code: "431225",
          name: "会同县"
        },
        {
          code: "431226",
          name: "麻阳苗族自治县"
        },
        {
          code: "431227",
          name: "新晃侗族自治县"
        },
        {
          code: "431228",
          name: "芷江侗族自治县"
        },
        {
          code: "431229",
          name: "靖州苗族侗族自治县"
        },
        {
          code: "431230",
          name: "通道侗族自治县"
        },
        {
          code: "431281",
          name: "洪江市"
        }
      ],
      [
        {
          code: "431302",
          name: "娄星区"
        },
        {
          code: "431321",
          name: "双峰县"
        },
        {
          code: "431322",
          name: "新化县"
        },
        {
          code: "431381",
          name: "冷水江市"
        },
        {
          code: "431382",
          name: "涟源市"
        }
      ],
      [
        {
          code: "433101",
          name: "吉首市"
        },
        {
          code: "433122",
          name: "泸溪县"
        },
        {
          code: "433123",
          name: "凤凰县"
        },
        {
          code: "433124",
          name: "花垣县"
        },
        {
          code: "433125",
          name: "保靖县"
        },
        {
          code: "433126",
          name: "古丈县"
        },
        {
          code: "433127",
          name: "永顺县"
        },
        {
          code: "433130",
          name: "龙山县"
        }
      ]
    ],
    [
      [
        {
          code: "440103",
          name: "荔湾区"
        },
        {
          code: "440104",
          name: "越秀区"
        },
        {
          code: "440105",
          name: "海珠区"
        },
        {
          code: "440106",
          name: "天河区"
        },
        {
          code: "440111",
          name: "白云区"
        },
        {
          code: "440112",
          name: "黄埔区"
        },
        {
          code: "440113",
          name: "番禺区"
        },
        {
          code: "440114",
          name: "花都区"
        },
        {
          code: "440115",
          name: "南沙区"
        },
        {
          code: "440117",
          name: "从化区"
        },
        {
          code: "440118",
          name: "增城区"
        }
      ],
      [
        {
          code: "440203",
          name: "武江区"
        },
        {
          code: "440204",
          name: "浈江区"
        },
        {
          code: "440205",
          name: "曲江区"
        },
        {
          code: "440222",
          name: "始兴县"
        },
        {
          code: "440224",
          name: "仁化县"
        },
        {
          code: "440229",
          name: "翁源县"
        },
        {
          code: "440232",
          name: "乳源瑶族自治县"
        },
        {
          code: "440233",
          name: "新丰县"
        },
        {
          code: "440281",
          name: "乐昌市"
        },
        {
          code: "440282",
          name: "南雄市"
        }
      ],
      [
        {
          code: "440303",
          name: "罗湖区"
        },
        {
          code: "440304",
          name: "福田区"
        },
        {
          code: "440305",
          name: "南山区"
        },
        {
          code: "440306",
          name: "宝安区"
        },
        {
          code: "440307",
          name: "龙岗区"
        },
        {
          code: "440308",
          name: "盐田区"
        },
        {
          code: "440309",
          name: "龙华区"
        },
        {
          code: "440310",
          name: "坪山区"
        }
      ],
      [
        {
          code: "440402",
          name: "香洲区"
        },
        {
          code: "440403",
          name: "斗门区"
        },
        {
          code: "440404",
          name: "金湾区"
        }
      ],
      [
        {
          code: "440507",
          name: "龙湖区"
        },
        {
          code: "440511",
          name: "金平区"
        },
        {
          code: "440512",
          name: "濠江区"
        },
        {
          code: "440513",
          name: "潮阳区"
        },
        {
          code: "440514",
          name: "潮南区"
        },
        {
          code: "440515",
          name: "澄海区"
        },
        {
          code: "440523",
          name: "南澳县"
        }
      ],
      [
        {
          code: "440604",
          name: "禅城区"
        },
        {
          code: "440605",
          name: "南海区"
        },
        {
          code: "440606",
          name: "顺德区"
        },
        {
          code: "440607",
          name: "三水区"
        },
        {
          code: "440608",
          name: "高明区"
        }
      ],
      [
        {
          code: "440703",
          name: "蓬江区"
        },
        {
          code: "440704",
          name: "江海区"
        },
        {
          code: "440705",
          name: "新会区"
        },
        {
          code: "440781",
          name: "台山市"
        },
        {
          code: "440783",
          name: "开平市"
        },
        {
          code: "440784",
          name: "鹤山市"
        },
        {
          code: "440785",
          name: "恩平市"
        }
      ],
      [
        {
          code: "440802",
          name: "赤坎区"
        },
        {
          code: "440803",
          name: "霞山区"
        },
        {
          code: "440804",
          name: "坡头区"
        },
        {
          code: "440811",
          name: "麻章区"
        },
        {
          code: "440823",
          name: "遂溪县"
        },
        {
          code: "440825",
          name: "徐闻县"
        },
        {
          code: "440881",
          name: "廉江市"
        },
        {
          code: "440882",
          name: "雷州市"
        },
        {
          code: "440883",
          name: "吴川市"
        }
      ],
      [
        {
          code: "440902",
          name: "茂南区"
        },
        {
          code: "440904",
          name: "电白区"
        },
        {
          code: "440981",
          name: "高州市"
        },
        {
          code: "440982",
          name: "化州市"
        },
        {
          code: "440983",
          name: "信宜市"
        }
      ],
      [
        {
          code: "441202",
          name: "端州区"
        },
        {
          code: "441203",
          name: "鼎湖区"
        },
        {
          code: "441204",
          name: "高要区"
        },
        {
          code: "441223",
          name: "广宁县"
        },
        {
          code: "441224",
          name: "怀集县"
        },
        {
          code: "441225",
          name: "封开县"
        },
        {
          code: "441226",
          name: "德庆县"
        },
        {
          code: "441284",
          name: "四会市"
        }
      ],
      [
        {
          code: "441302",
          name: "惠城区"
        },
        {
          code: "441303",
          name: "惠阳区"
        },
        {
          code: "441322",
          name: "博罗县"
        },
        {
          code: "441323",
          name: "惠东县"
        },
        {
          code: "441324",
          name: "龙门县"
        }
      ],
      [
        {
          code: "441402",
          name: "梅江区"
        },
        {
          code: "441403",
          name: "梅县区"
        },
        {
          code: "441422",
          name: "大埔县"
        },
        {
          code: "441423",
          name: "丰顺县"
        },
        {
          code: "441424",
          name: "五华县"
        },
        {
          code: "441426",
          name: "平远县"
        },
        {
          code: "441427",
          name: "蕉岭县"
        },
        {
          code: "441481",
          name: "兴宁市"
        }
      ],
      [
        {
          code: "441502",
          name: "城区"
        },
        {
          code: "441521",
          name: "海丰县"
        },
        {
          code: "441523",
          name: "陆河县"
        },
        {
          code: "441581",
          name: "陆丰市"
        }
      ],
      [
        {
          code: "441602",
          name: "源城区"
        },
        {
          code: "441621",
          name: "紫金县"
        },
        {
          code: "441622",
          name: "龙川县"
        },
        {
          code: "441623",
          name: "连平县"
        },
        {
          code: "441624",
          name: "和平县"
        },
        {
          code: "441625",
          name: "东源县"
        }
      ],
      [
        {
          code: "441702",
          name: "江城区"
        },
        {
          code: "441704",
          name: "阳东区"
        },
        {
          code: "441721",
          name: "阳西县"
        },
        {
          code: "441781",
          name: "阳春市"
        }
      ],
      [
        {
          code: "441802",
          name: "清城区"
        },
        {
          code: "441803",
          name: "清新区"
        },
        {
          code: "441821",
          name: "佛冈县"
        },
        {
          code: "441823",
          name: "阳山县"
        },
        {
          code: "441825",
          name: "连山壮族瑶族自治县"
        },
        {
          code: "441826",
          name: "连南瑶族自治县"
        },
        {
          code: "441881",
          name: "英德市"
        },
        {
          code: "441882",
          name: "连州市"
        }
      ],
      [
        {
          code: "441901",
          name: "东城街道"
        },
        {
          code: "441902",
          name: "南城街道"
        },
        {
          code: "441903",
          name: "万江街道"
        },
        {
          code: "441904",
          name: "莞城街道"
        },
        {
          code: "441905",
          name: "石碣镇"
        },
        {
          code: "441906",
          name: "石龙镇"
        },
        {
          code: "441907",
          name: "茶山镇"
        },
        {
          code: "441908",
          name: "石排镇"
        },
        {
          code: "441909",
          name: "企石镇"
        },
        {
          code: "441910",
          name: "横沥镇"
        },
        {
          code: "441911",
          name: "桥头镇"
        },
        {
          code: "441912",
          name: "谢岗镇"
        },
        {
          code: "441913",
          name: "东坑镇"
        },
        {
          code: "441914",
          name: "常平镇"
        },
        {
          code: "441915",
          name: "寮步镇"
        },
        {
          code: "441916",
          name: "樟木头镇"
        },
        {
          code: "441917",
          name: "大朗镇"
        },
        {
          code: "441918",
          name: "黄江镇"
        },
        {
          code: "441919",
          name: "清溪镇"
        },
        {
          code: "441920",
          name: "塘厦镇"
        },
        {
          code: "441921",
          name: "凤岗镇"
        },
        {
          code: "441922",
          name: "大岭山镇"
        },
        {
          code: "441923",
          name: "长安镇"
        },
        {
          code: "441924",
          name: "虎门镇"
        },
        {
          code: "441925",
          name: "厚街镇"
        },
        {
          code: "441926",
          name: "沙田镇"
        },
        {
          code: "441927",
          name: "道滘镇"
        },
        {
          code: "441928",
          name: "洪梅镇"
        },
        {
          code: "441929",
          name: "麻涌镇"
        },
        {
          code: "441930",
          name: "望牛墩镇"
        },
        {
          code: "441931",
          name: "中堂镇"
        },
        {
          code: "441932",
          name: "高埗镇"
        },
        {
          code: "441933",
          name: "松山湖管委会"
        },
        {
          code: "441934",
          name: "虎门港管委会"
        },
        {
          code: "441935",
          name: "东莞生态园"
        }
      ],
      [
        {
          code: "442001",
          name: "石岐区街道"
        },
        {
          code: "442002",
          name: "东区街道"
        },
        {
          code: "442003",
          name: "火炬开发区"
        },
        {
          code: "442004",
          name: "西区街道"
        },
        {
          code: "442005",
          name: "南区街道"
        },
        {
          code: "442006",
          name: "五桂山街道"
        },
        {
          code: "442007",
          name: "小榄镇"
        },
        {
          code: "442008",
          name: "黄圃镇"
        },
        {
          code: "442009",
          name: "民众镇"
        },
        {
          code: "442010",
          name: "东凤镇"
        },
        {
          code: "442011",
          name: "东升镇"
        },
        {
          code: "442012",
          name: "古镇镇"
        },
        {
          code: "442013",
          name: "沙溪镇"
        },
        {
          code: "442014",
          name: "坦洲镇"
        },
        {
          code: "442015",
          name: "港口镇"
        },
        {
          code: "442016",
          name: "三角镇"
        },
        {
          code: "442017",
          name: "横栏镇"
        },
        {
          code: "442018",
          name: "南头镇"
        },
        {
          code: "442019",
          name: "阜沙镇"
        },
        {
          code: "442020",
          name: "南朗镇"
        },
        {
          code: "442021",
          name: "三乡镇"
        },
        {
          code: "442022",
          name: "板芙镇"
        },
        {
          code: "442023",
          name: "大涌镇"
        },
        {
          code: "442024",
          name: "神湾镇"
        }
      ],
      [
        {
          code: "445102",
          name: "湘桥区"
        },
        {
          code: "445103",
          name: "潮安区"
        },
        {
          code: "445122",
          name: "饶平县"
        }
      ],
      [
        {
          code: "445202",
          name: "榕城区"
        },
        {
          code: "445203",
          name: "揭东区"
        },
        {
          code: "445222",
          name: "揭西县"
        },
        {
          code: "445224",
          name: "惠来县"
        },
        {
          code: "445281",
          name: "普宁市"
        }
      ],
      [
        {
          code: "445302",
          name: "云城区"
        },
        {
          code: "445303",
          name: "云安区"
        },
        {
          code: "445321",
          name: "新兴县"
        },
        {
          code: "445322",
          name: "郁南县"
        },
        {
          code: "445381",
          name: "罗定市"
        }
      ]
    ],
    [
      [
        {
          code: "450102",
          name: "兴宁区"
        },
        {
          code: "450103",
          name: "青秀区"
        },
        {
          code: "450105",
          name: "江南区"
        },
        {
          code: "450107",
          name: "西乡塘区"
        },
        {
          code: "450108",
          name: "良庆区"
        },
        {
          code: "450109",
          name: "邕宁区"
        },
        {
          code: "450110",
          name: "武鸣区"
        },
        {
          code: "450123",
          name: "隆安县"
        },
        {
          code: "450124",
          name: "马山县"
        },
        {
          code: "450125",
          name: "上林县"
        },
        {
          code: "450126",
          name: "宾阳县"
        },
        {
          code: "450181",
          name: "横州市"
        }
      ],
      [
        {
          code: "450202",
          name: "城中区"
        },
        {
          code: "450203",
          name: "鱼峰区"
        },
        {
          code: "450204",
          name: "柳南区"
        },
        {
          code: "450205",
          name: "柳北区"
        },
        {
          code: "450206",
          name: "柳江区"
        },
        {
          code: "450222",
          name: "柳城县"
        },
        {
          code: "450223",
          name: "鹿寨县"
        },
        {
          code: "450224",
          name: "融安县"
        },
        {
          code: "450225",
          name: "融水苗族自治县"
        },
        {
          code: "450226",
          name: "三江侗族自治县"
        }
      ],
      [
        {
          code: "450302",
          name: "秀峰区"
        },
        {
          code: "450303",
          name: "叠彩区"
        },
        {
          code: "450304",
          name: "象山区"
        },
        {
          code: "450305",
          name: "七星区"
        },
        {
          code: "450311",
          name: "雁山区"
        },
        {
          code: "450312",
          name: "临桂区"
        },
        {
          code: "450321",
          name: "阳朔县"
        },
        {
          code: "450323",
          name: "灵川县"
        },
        {
          code: "450324",
          name: "全州县"
        },
        {
          code: "450325",
          name: "兴安县"
        },
        {
          code: "450326",
          name: "永福县"
        },
        {
          code: "450327",
          name: "灌阳县"
        },
        {
          code: "450328",
          name: "龙胜各族自治县"
        },
        {
          code: "450329",
          name: "资源县"
        },
        {
          code: "450330",
          name: "平乐县"
        },
        {
          code: "450331",
          name: "荔浦县"
        },
        {
          code: "450332",
          name: "恭城瑶族自治县"
        }
      ],
      [
        {
          code: "450403",
          name: "万秀区"
        },
        {
          code: "450405",
          name: "长洲区"
        },
        {
          code: "450406",
          name: "龙圩区"
        },
        {
          code: "450421",
          name: "苍梧县"
        },
        {
          code: "450422",
          name: "藤县"
        },
        {
          code: "450423",
          name: "蒙山县"
        },
        {
          code: "450481",
          name: "岑溪市"
        }
      ],
      [
        {
          code: "450502",
          name: "海城区"
        },
        {
          code: "450503",
          name: "银海区"
        },
        {
          code: "450512",
          name: "铁山港区"
        },
        {
          code: "450521",
          name: "合浦县"
        }
      ],
      [
        {
          code: "450602",
          name: "港口区"
        },
        {
          code: "450603",
          name: "防城区"
        },
        {
          code: "450621",
          name: "上思县"
        },
        {
          code: "450681",
          name: "东兴市"
        }
      ],
      [
        {
          code: "450702",
          name: "钦南区"
        },
        {
          code: "450703",
          name: "钦北区"
        },
        {
          code: "450721",
          name: "灵山县"
        },
        {
          code: "450722",
          name: "浦北县"
        }
      ],
      [
        {
          code: "450802",
          name: "港北区"
        },
        {
          code: "450803",
          name: "港南区"
        },
        {
          code: "450804",
          name: "覃塘区"
        },
        {
          code: "450821",
          name: "平南县"
        },
        {
          code: "450881",
          name: "桂平市"
        }
      ],
      [
        {
          code: "450902",
          name: "玉州区"
        },
        {
          code: "450903",
          name: "福绵区"
        },
        {
          code: "450921",
          name: "容县"
        },
        {
          code: "450922",
          name: "陆川县"
        },
        {
          code: "450923",
          name: "博白县"
        },
        {
          code: "450924",
          name: "兴业县"
        },
        {
          code: "450981",
          name: "北流市"
        }
      ],
      [
        {
          code: "451002",
          name: "右江区"
        },
        {
          code: "451021",
          name: "田阳县"
        },
        {
          code: "451022",
          name: "田东县"
        },
        {
          code: "451023",
          name: "平果县"
        },
        {
          code: "451024",
          name: "德保县"
        },
        {
          code: "451026",
          name: "那坡县"
        },
        {
          code: "451027",
          name: "凌云县"
        },
        {
          code: "451028",
          name: "乐业县"
        },
        {
          code: "451029",
          name: "田林县"
        },
        {
          code: "451030",
          name: "西林县"
        },
        {
          code: "451031",
          name: "隆林各族自治县"
        },
        {
          code: "451081",
          name: "靖西市"
        }
      ],
      [
        {
          code: "451102",
          name: "八步区"
        },
        {
          code: "451103",
          name: "平桂区"
        },
        {
          code: "451121",
          name: "昭平县"
        },
        {
          code: "451122",
          name: "钟山县"
        },
        {
          code: "451123",
          name: "富川瑶族自治县"
        }
      ],
      [
        {
          code: "451202",
          name: "金城江区"
        },
        {
          code: "451203",
          name: "宜州区"
        },
        {
          code: "451221",
          name: "南丹县"
        },
        {
          code: "451222",
          name: "天峨县"
        },
        {
          code: "451223",
          name: "凤山县"
        },
        {
          code: "451224",
          name: "东兰县"
        },
        {
          code: "451225",
          name: "罗城仫佬族自治县"
        },
        {
          code: "451226",
          name: "环江毛南族自治县"
        },
        {
          code: "451227",
          name: "巴马瑶族自治县"
        },
        {
          code: "451228",
          name: "都安瑶族自治县"
        },
        {
          code: "451229",
          name: "大化瑶族自治县"
        }
      ],
      [
        {
          code: "451302",
          name: "兴宾区"
        },
        {
          code: "451321",
          name: "忻城县"
        },
        {
          code: "451322",
          name: "象州县"
        },
        {
          code: "451323",
          name: "武宣县"
        },
        {
          code: "451324",
          name: "金秀瑶族自治县"
        },
        {
          code: "451381",
          name: "合山市"
        }
      ],
      [
        {
          code: "451402",
          name: "江州区"
        },
        {
          code: "451421",
          name: "扶绥县"
        },
        {
          code: "451422",
          name: "宁明县"
        },
        {
          code: "451423",
          name: "龙州县"
        },
        {
          code: "451424",
          name: "大新县"
        },
        {
          code: "451425",
          name: "天等县"
        },
        {
          code: "451481",
          name: "凭祥市"
        }
      ]
    ],
    [
      [
        {
          code: "460105",
          name: "秀英区"
        },
        {
          code: "460106",
          name: "龙华区"
        },
        {
          code: "460107",
          name: "琼山区"
        },
        {
          code: "460108",
          name: "美兰区"
        }
      ],
      [
        {
          code: "460202",
          name: "海棠区"
        },
        {
          code: "460203",
          name: "吉阳区"
        },
        {
          code: "460204",
          name: "天涯区"
        },
        {
          code: "460205",
          name: "崖州区"
        }
      ],
      [
        {
          code: "460321",
          name: "西沙群岛"
        },
        {
          code: "460322",
          name: "南沙群岛"
        },
        {
          code: "460323",
          name: "中沙群岛的岛礁及其海域"
        }
      ],
      [
        {
          code: "460401",
          name: "那大镇"
        },
        {
          code: "460402",
          name: "和庆镇"
        },
        {
          code: "460403",
          name: "南丰镇"
        },
        {
          code: "460404",
          name: "大成镇"
        },
        {
          code: "460405",
          name: "雅星镇"
        },
        {
          code: "460406",
          name: "兰洋镇"
        },
        {
          code: "460407",
          name: "光村镇"
        },
        {
          code: "460408",
          name: "木棠镇"
        },
        {
          code: "460409",
          name: "海头镇"
        },
        {
          code: "460410",
          name: "峨蔓镇"
        },
        {
          code: "460411",
          name: "三都镇"
        },
        {
          code: "460412",
          name: "王五镇"
        },
        {
          code: "460413",
          name: "白马井镇"
        },
        {
          code: "460414",
          name: "中和镇"
        },
        {
          code: "460415",
          name: "排浦镇"
        },
        {
          code: "460416",
          name: "东成镇"
        },
        {
          code: "460417",
          name: "新州镇"
        },
        {
          code: "460418",
          name: "国营西培农场"
        },
        {
          code: "460419",
          name: "国营西联农场"
        },
        {
          code: "460420",
          name: "国营蓝洋农场"
        },
        {
          code: "460421",
          name: "国营八一农场"
        },
        {
          code: "460422",
          name: "洋浦经济开发区"
        },
        {
          code: "460423",
          name: "华南热作学院"
        },
        {
          code: "460424",
          name: "红岭农场"
        }
      ],
      [
        {
          code: "469001",
          name: "五指山市"
        },
        {
          code: "469002",
          name: "琼海市"
        },
        {
          code: "469005",
          name: "文昌市"
        },
        {
          code: "469006",
          name: "万宁市"
        },
        {
          code: "469007",
          name: "东方市"
        },
        {
          code: "469021",
          name: "定安县"
        },
        {
          code: "469022",
          name: "屯昌县"
        },
        {
          code: "469023",
          name: "澄迈县"
        },
        {
          code: "469024",
          name: "临高县"
        },
        {
          code: "469025",
          name: "白沙黎族自治县"
        },
        {
          code: "469026",
          name: "昌江黎族自治县"
        },
        {
          code: "469027",
          name: "乐东黎族自治县"
        },
        {
          code: "469028",
          name: "陵水黎族自治县"
        },
        {
          code: "469029",
          name: "保亭黎族苗族自治县"
        },
        {
          code: "469030",
          name: "琼中黎族苗族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "500101",
          name: "万州区"
        },
        {
          code: "500102",
          name: "涪陵区"
        },
        {
          code: "500103",
          name: "渝中区"
        },
        {
          code: "500104",
          name: "大渡口区"
        },
        {
          code: "500105",
          name: "江北区"
        },
        {
          code: "500106",
          name: "沙坪坝区"
        },
        {
          code: "500107",
          name: "九龙坡区"
        },
        {
          code: "500108",
          name: "南岸区"
        },
        {
          code: "500109",
          name: "北碚区"
        },
        {
          code: "500110",
          name: "綦江区"
        },
        {
          code: "500111",
          name: "大足区"
        },
        {
          code: "500112",
          name: "渝北区"
        },
        {
          code: "500113",
          name: "巴南区"
        },
        {
          code: "500114",
          name: "黔江区"
        },
        {
          code: "500115",
          name: "长寿区"
        },
        {
          code: "500116",
          name: "江津区"
        },
        {
          code: "500117",
          name: "合川区"
        },
        {
          code: "500118",
          name: "永川区"
        },
        {
          code: "500119",
          name: "南川区"
        },
        {
          code: "500120",
          name: "璧山区"
        },
        {
          code: "500151",
          name: "铜梁区"
        },
        {
          code: "500152",
          name: "潼南区"
        },
        {
          code: "500153",
          name: "荣昌区"
        },
        {
          code: "500154",
          name: "开州区"
        },
        {
          code: "500155",
          name: "梁平区"
        },
        {
          code: "500156",
          name: "武隆区"
        }
      ],
      [
        {
          code: "500229",
          name: "城口县"
        },
        {
          code: "500230",
          name: "丰都县"
        },
        {
          code: "500231",
          name: "垫江县"
        },
        {
          code: "500233",
          name: "忠县"
        },
        {
          code: "500235",
          name: "云阳县"
        },
        {
          code: "500236",
          name: "奉节县"
        },
        {
          code: "500237",
          name: "巫山县"
        },
        {
          code: "500238",
          name: "巫溪县"
        },
        {
          code: "500240",
          name: "石柱土家族自治县"
        },
        {
          code: "500241",
          name: "秀山土家族苗族自治县"
        },
        {
          code: "500242",
          name: "酉阳土家族苗族自治县"
        },
        {
          code: "500243",
          name: "彭水苗族土家族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "510104",
          name: "锦江区"
        },
        {
          code: "510105",
          name: "青羊区"
        },
        {
          code: "510106",
          name: "金牛区"
        },
        {
          code: "510107",
          name: "武侯区"
        },
        {
          code: "510108",
          name: "成华区"
        },
        {
          code: "510112",
          name: "龙泉驿区"
        },
        {
          code: "510113",
          name: "青白江区"
        },
        {
          code: "510114",
          name: "新都区"
        },
        {
          code: "510115",
          name: "温江区"
        },
        {
          code: "510116",
          name: "双流区"
        },
        {
          code: "510117",
          name: "郫都区"
        },
        {
          code: "510121",
          name: "金堂县"
        },
        {
          code: "510129",
          name: "大邑县"
        },
        {
          code: "510131",
          name: "蒲江县"
        },
        {
          code: "510132",
          name: "新津县"
        },
        {
          code: "510181",
          name: "都江堰市"
        },
        {
          code: "510182",
          name: "彭州市"
        },
        {
          code: "510183",
          name: "邛崃市"
        },
        {
          code: "510184",
          name: "崇州市"
        },
        {
          code: "510185",
          name: "简阳市"
        }
      ],
      [
        {
          code: "510302",
          name: "自流井区"
        },
        {
          code: "510303",
          name: "贡井区"
        },
        {
          code: "510304",
          name: "大安区"
        },
        {
          code: "510311",
          name: "沿滩区"
        },
        {
          code: "510321",
          name: "荣县"
        },
        {
          code: "510322",
          name: "富顺县"
        }
      ],
      [
        {
          code: "510402",
          name: "东区"
        },
        {
          code: "510403",
          name: "西区"
        },
        {
          code: "510411",
          name: "仁和区"
        },
        {
          code: "510421",
          name: "米易县"
        },
        {
          code: "510422",
          name: "盐边县"
        }
      ],
      [
        {
          code: "510502",
          name: "江阳区"
        },
        {
          code: "510503",
          name: "纳溪区"
        },
        {
          code: "510504",
          name: "龙马潭区"
        },
        {
          code: "510521",
          name: "泸县"
        },
        {
          code: "510522",
          name: "合江县"
        },
        {
          code: "510524",
          name: "叙永县"
        },
        {
          code: "510525",
          name: "古蔺县"
        }
      ],
      [
        {
          code: "510603",
          name: "旌阳区"
        },
        {
          code: "510604",
          name: "罗江区"
        },
        {
          code: "510623",
          name: "中江县"
        },
        {
          code: "510681",
          name: "广汉市"
        },
        {
          code: "510682",
          name: "什邡市"
        },
        {
          code: "510683",
          name: "绵竹市"
        }
      ],
      [
        {
          code: "510703",
          name: "涪城区"
        },
        {
          code: "510704",
          name: "游仙区"
        },
        {
          code: "510705",
          name: "安州区"
        },
        {
          code: "510722",
          name: "三台县"
        },
        {
          code: "510723",
          name: "盐亭县"
        },
        {
          code: "510725",
          name: "梓潼县"
        },
        {
          code: "510726",
          name: "北川羌族自治县"
        },
        {
          code: "510727",
          name: "平武县"
        },
        {
          code: "510781",
          name: "江油市"
        }
      ],
      [
        {
          code: "510802",
          name: "利州区"
        },
        {
          code: "510811",
          name: "昭化区"
        },
        {
          code: "510812",
          name: "朝天区"
        },
        {
          code: "510821",
          name: "旺苍县"
        },
        {
          code: "510822",
          name: "青川县"
        },
        {
          code: "510823",
          name: "剑阁县"
        },
        {
          code: "510824",
          name: "苍溪县"
        }
      ],
      [
        {
          code: "510903",
          name: "船山区"
        },
        {
          code: "510904",
          name: "安居区"
        },
        {
          code: "510921",
          name: "蓬溪县"
        },
        {
          code: "510922",
          name: "射洪县"
        },
        {
          code: "510923",
          name: "大英县"
        }
      ],
      [
        {
          code: "511002",
          name: "市中区"
        },
        {
          code: "511011",
          name: "东兴区"
        },
        {
          code: "511024",
          name: "威远县"
        },
        {
          code: "511025",
          name: "资中县"
        },
        {
          code: "511083",
          name: "隆昌市"
        }
      ],
      [
        {
          code: "511102",
          name: "市中区"
        },
        {
          code: "511111",
          name: "沙湾区"
        },
        {
          code: "511112",
          name: "五通桥区"
        },
        {
          code: "511113",
          name: "金口河区"
        },
        {
          code: "511123",
          name: "犍为县"
        },
        {
          code: "511124",
          name: "井研县"
        },
        {
          code: "511126",
          name: "夹江县"
        },
        {
          code: "511129",
          name: "沐川县"
        },
        {
          code: "511132",
          name: "峨边彝族自治县"
        },
        {
          code: "511133",
          name: "马边彝族自治县"
        },
        {
          code: "511181",
          name: "峨眉山市"
        }
      ],
      [
        {
          code: "511302",
          name: "顺庆区"
        },
        {
          code: "511303",
          name: "高坪区"
        },
        {
          code: "511304",
          name: "嘉陵区"
        },
        {
          code: "511321",
          name: "南部县"
        },
        {
          code: "511322",
          name: "营山县"
        },
        {
          code: "511323",
          name: "蓬安县"
        },
        {
          code: "511324",
          name: "仪陇县"
        },
        {
          code: "511325",
          name: "西充县"
        },
        {
          code: "511381",
          name: "阆中市"
        }
      ],
      [
        {
          code: "511402",
          name: "东坡区"
        },
        {
          code: "511403",
          name: "彭山区"
        },
        {
          code: "511421",
          name: "仁寿县"
        },
        {
          code: "511423",
          name: "洪雅县"
        },
        {
          code: "511424",
          name: "丹棱县"
        },
        {
          code: "511425",
          name: "青神县"
        }
      ],
      [
        {
          code: "511502",
          name: "翠屏区"
        },
        {
          code: "511503",
          name: "南溪区"
        },
        {
          code: "511521",
          name: "宜宾县"
        },
        {
          code: "511523",
          name: "江安县"
        },
        {
          code: "511524",
          name: "长宁县"
        },
        {
          code: "511525",
          name: "高县"
        },
        {
          code: "511526",
          name: "珙县"
        },
        {
          code: "511527",
          name: "筠连县"
        },
        {
          code: "511528",
          name: "兴文县"
        },
        {
          code: "511529",
          name: "屏山县"
        }
      ],
      [
        {
          code: "511602",
          name: "广安区"
        },
        {
          code: "511603",
          name: "前锋区"
        },
        {
          code: "511621",
          name: "岳池县"
        },
        {
          code: "511622",
          name: "武胜县"
        },
        {
          code: "511623",
          name: "邻水县"
        },
        {
          code: "511681",
          name: "华蓥市"
        }
      ],
      [
        {
          code: "511702",
          name: "通川区"
        },
        {
          code: "511703",
          name: "达川区"
        },
        {
          code: "511722",
          name: "宣汉县"
        },
        {
          code: "511723",
          name: "开江县"
        },
        {
          code: "511724",
          name: "大竹县"
        },
        {
          code: "511725",
          name: "渠县"
        },
        {
          code: "511781",
          name: "万源市"
        }
      ],
      [
        {
          code: "511802",
          name: "雨城区"
        },
        {
          code: "511803",
          name: "名山区"
        },
        {
          code: "511822",
          name: "荥经县"
        },
        {
          code: "511823",
          name: "汉源县"
        },
        {
          code: "511824",
          name: "石棉县"
        },
        {
          code: "511825",
          name: "天全县"
        },
        {
          code: "511826",
          name: "芦山县"
        },
        {
          code: "511827",
          name: "宝兴县"
        }
      ],
      [
        {
          code: "511902",
          name: "巴州区"
        },
        {
          code: "511903",
          name: "恩阳区"
        },
        {
          code: "511921",
          name: "通江县"
        },
        {
          code: "511922",
          name: "南江县"
        },
        {
          code: "511923",
          name: "平昌县"
        }
      ],
      [
        {
          code: "512002",
          name: "雁江区"
        },
        {
          code: "512021",
          name: "安岳县"
        },
        {
          code: "512022",
          name: "乐至县"
        }
      ],
      [
        {
          code: "513201",
          name: "马尔康市"
        },
        {
          code: "513221",
          name: "汶川县"
        },
        {
          code: "513222",
          name: "理县"
        },
        {
          code: "513223",
          name: "茂县"
        },
        {
          code: "513224",
          name: "松潘县"
        },
        {
          code: "513225",
          name: "九寨沟县"
        },
        {
          code: "513226",
          name: "金川县"
        },
        {
          code: "513227",
          name: "小金县"
        },
        {
          code: "513228",
          name: "黑水县"
        },
        {
          code: "513230",
          name: "壤塘县"
        },
        {
          code: "513231",
          name: "阿坝县"
        },
        {
          code: "513232",
          name: "若尔盖县"
        },
        {
          code: "513233",
          name: "红原县"
        }
      ],
      [
        {
          code: "513301",
          name: "康定市"
        },
        {
          code: "513322",
          name: "泸定县"
        },
        {
          code: "513323",
          name: "丹巴县"
        },
        {
          code: "513324",
          name: "九龙县"
        },
        {
          code: "513325",
          name: "雅江县"
        },
        {
          code: "513326",
          name: "道孚县"
        },
        {
          code: "513327",
          name: "炉霍县"
        },
        {
          code: "513328",
          name: "甘孜县"
        },
        {
          code: "513329",
          name: "新龙县"
        },
        {
          code: "513330",
          name: "德格县"
        },
        {
          code: "513331",
          name: "白玉县"
        },
        {
          code: "513332",
          name: "石渠县"
        },
        {
          code: "513333",
          name: "色达县"
        },
        {
          code: "513334",
          name: "理塘县"
        },
        {
          code: "513335",
          name: "巴塘县"
        },
        {
          code: "513336",
          name: "乡城县"
        },
        {
          code: "513337",
          name: "稻城县"
        },
        {
          code: "513338",
          name: "得荣县"
        }
      ],
      [
        {
          code: "513401",
          name: "西昌市"
        },
        {
          code: "513402",
          name: "会理市"
        },
        {
          code: "513422",
          name: "木里藏族自治县"
        },
        {
          code: "513423",
          name: "盐源县"
        },
        {
          code: "513424",
          name: "德昌县"
        },
        {
          code: "513426",
          name: "会东县"
        },
        {
          code: "513427",
          name: "宁南县"
        },
        {
          code: "513428",
          name: "普格县"
        },
        {
          code: "513429",
          name: "布拖县"
        },
        {
          code: "513430",
          name: "金阳县"
        },
        {
          code: "513431",
          name: "昭觉县"
        },
        {
          code: "513432",
          name: "喜德县"
        },
        {
          code: "513433",
          name: "冕宁县"
        },
        {
          code: "513434",
          name: "越西县"
        },
        {
          code: "513435",
          name: "甘洛县"
        },
        {
          code: "513436",
          name: "美姑县"
        },
        {
          code: "513437",
          name: "雷波县"
        }
      ]
    ],
    [
      [
        {
          code: "520102",
          name: "南明区"
        },
        {
          code: "520103",
          name: "云岩区"
        },
        {
          code: "520111",
          name: "花溪区"
        },
        {
          code: "520112",
          name: "乌当区"
        },
        {
          code: "520113",
          name: "白云区"
        },
        {
          code: "520115",
          name: "观山湖区"
        },
        {
          code: "520121",
          name: "开阳县"
        },
        {
          code: "520122",
          name: "息烽县"
        },
        {
          code: "520123",
          name: "修文县"
        },
        {
          code: "520181",
          name: "清镇市"
        }
      ],
      [
        {
          code: "520201",
          name: "钟山区"
        },
        {
          code: "520203",
          name: "六枝特区"
        },
        {
          code: "520221",
          name: "水城县"
        },
        {
          code: "520281",
          name: "盘州市"
        }
      ],
      [
        {
          code: "520302",
          name: "红花岗区"
        },
        {
          code: "520303",
          name: "汇川区"
        },
        {
          code: "520304",
          name: "播州区"
        },
        {
          code: "520322",
          name: "桐梓县"
        },
        {
          code: "520323",
          name: "绥阳县"
        },
        {
          code: "520324",
          name: "正安县"
        },
        {
          code: "520325",
          name: "道真仡佬族苗族自治县"
        },
        {
          code: "520326",
          name: "务川仡佬族苗族自治县"
        },
        {
          code: "520327",
          name: "凤冈县"
        },
        {
          code: "520328",
          name: "湄潭县"
        },
        {
          code: "520329",
          name: "余庆县"
        },
        {
          code: "520330",
          name: "习水县"
        },
        {
          code: "520381",
          name: "赤水市"
        },
        {
          code: "520382",
          name: "仁怀市"
        }
      ],
      [
        {
          code: "520402",
          name: "西秀区"
        },
        {
          code: "520403",
          name: "平坝区"
        },
        {
          code: "520422",
          name: "普定县"
        },
        {
          code: "520423",
          name: "镇宁布依族苗族自治县"
        },
        {
          code: "520424",
          name: "关岭布依族苗族自治县"
        },
        {
          code: "520425",
          name: "紫云苗族布依族自治县"
        }
      ],
      [
        {
          code: "520502",
          name: "七星关区"
        },
        {
          code: "520521",
          name: "大方县"
        },
        {
          code: "520523",
          name: "金沙县"
        },
        {
          code: "520524",
          name: "织金县"
        },
        {
          code: "520525",
          name: "纳雍县"
        },
        {
          code: "520526",
          name: "威宁彝族回族苗族自治县"
        },
        {
          code: "520527",
          name: "赫章县"
        },
        {
          code: "520581",
          name: "黔西市"
        }
      ],
      [
        {
          code: "520602",
          name: "碧江区"
        },
        {
          code: "520603",
          name: "万山区"
        },
        {
          code: "520621",
          name: "江口县"
        },
        {
          code: "520622",
          name: "玉屏侗族自治县"
        },
        {
          code: "520623",
          name: "石阡县"
        },
        {
          code: "520624",
          name: "思南县"
        },
        {
          code: "520625",
          name: "印江土家族苗族自治县"
        },
        {
          code: "520626",
          name: "德江县"
        },
        {
          code: "520627",
          name: "沿河土家族自治县"
        },
        {
          code: "520628",
          name: "松桃苗族自治县"
        }
      ],
      [
        {
          code: "522301",
          name: "兴义市"
        },
        {
          code: "522322",
          name: "兴仁县"
        },
        {
          code: "522323",
          name: "普安县"
        },
        {
          code: "522324",
          name: "晴隆县"
        },
        {
          code: "522325",
          name: "贞丰县"
        },
        {
          code: "522326",
          name: "望谟县"
        },
        {
          code: "522327",
          name: "册亨县"
        },
        {
          code: "522328",
          name: "安龙县"
        }
      ],
      [
        {
          code: "522601",
          name: "凯里市"
        },
        {
          code: "522622",
          name: "黄平县"
        },
        {
          code: "522623",
          name: "施秉县"
        },
        {
          code: "522624",
          name: "三穗县"
        },
        {
          code: "522625",
          name: "镇远县"
        },
        {
          code: "522626",
          name: "岑巩县"
        },
        {
          code: "522627",
          name: "天柱县"
        },
        {
          code: "522628",
          name: "锦屏县"
        },
        {
          code: "522629",
          name: "剑河县"
        },
        {
          code: "522630",
          name: "台江县"
        },
        {
          code: "522631",
          name: "黎平县"
        },
        {
          code: "522632",
          name: "榕江县"
        },
        {
          code: "522633",
          name: "从江县"
        },
        {
          code: "522634",
          name: "雷山县"
        },
        {
          code: "522635",
          name: "麻江县"
        },
        {
          code: "522636",
          name: "丹寨县"
        }
      ],
      [
        {
          code: "522701",
          name: "都匀市"
        },
        {
          code: "522702",
          name: "福泉市"
        },
        {
          code: "522722",
          name: "荔波县"
        },
        {
          code: "522723",
          name: "贵定县"
        },
        {
          code: "522725",
          name: "瓮安县"
        },
        {
          code: "522726",
          name: "独山县"
        },
        {
          code: "522727",
          name: "平塘县"
        },
        {
          code: "522728",
          name: "罗甸县"
        },
        {
          code: "522729",
          name: "长顺县"
        },
        {
          code: "522730",
          name: "龙里县"
        },
        {
          code: "522731",
          name: "惠水县"
        },
        {
          code: "522732",
          name: "三都水族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "530102",
          name: "五华区"
        },
        {
          code: "530103",
          name: "盘龙区"
        },
        {
          code: "530111",
          name: "官渡区"
        },
        {
          code: "530112",
          name: "西山区"
        },
        {
          code: "530113",
          name: "东川区"
        },
        {
          code: "530114",
          name: "呈贡区"
        },
        {
          code: "530115",
          name: "晋宁区"
        },
        {
          code: "530124",
          name: "富民县"
        },
        {
          code: "530125",
          name: "宜良县"
        },
        {
          code: "530126",
          name: "石林彝族自治县"
        },
        {
          code: "530127",
          name: "嵩明县"
        },
        {
          code: "530128",
          name: "禄劝彝族苗族自治县"
        },
        {
          code: "530129",
          name: "寻甸回族彝族自治县"
        },
        {
          code: "530181",
          name: "安宁市"
        }
      ],
      [
        {
          code: "530302",
          name: "麒麟区"
        },
        {
          code: "530303",
          name: "沾益区"
        },
        {
          code: "530321",
          name: "马龙县"
        },
        {
          code: "530322",
          name: "陆良县"
        },
        {
          code: "530323",
          name: "师宗县"
        },
        {
          code: "530324",
          name: "罗平县"
        },
        {
          code: "530325",
          name: "富源县"
        },
        {
          code: "530326",
          name: "会泽县"
        },
        {
          code: "530381",
          name: "宣威市"
        }
      ],
      [
        {
          code: "530402",
          name: "红塔区"
        },
        {
          code: "530403",
          name: "江川区"
        },
        {
          code: "530422",
          name: "澄江县"
        },
        {
          code: "530423",
          name: "通海县"
        },
        {
          code: "530424",
          name: "华宁县"
        },
        {
          code: "530425",
          name: "易门县"
        },
        {
          code: "530426",
          name: "峨山彝族自治县"
        },
        {
          code: "530427",
          name: "新平彝族傣族自治县"
        },
        {
          code: "530428",
          name: "元江哈尼族彝族傣族自治县"
        }
      ],
      [
        {
          code: "530502",
          name: "隆阳区"
        },
        {
          code: "530521",
          name: "施甸县"
        },
        {
          code: "530523",
          name: "龙陵县"
        },
        {
          code: "530524",
          name: "昌宁县"
        },
        {
          code: "530581",
          name: "腾冲市"
        }
      ],
      [
        {
          code: "530602",
          name: "昭阳区"
        },
        {
          code: "530621",
          name: "鲁甸县"
        },
        {
          code: "530622",
          name: "巧家县"
        },
        {
          code: "530623",
          name: "盐津县"
        },
        {
          code: "530624",
          name: "大关县"
        },
        {
          code: "530625",
          name: "永善县"
        },
        {
          code: "530626",
          name: "绥江县"
        },
        {
          code: "530627",
          name: "镇雄县"
        },
        {
          code: "530628",
          name: "彝良县"
        },
        {
          code: "530629",
          name: "威信县"
        },
        {
          code: "530630",
          name: "水富县"
        }
      ],
      [
        {
          code: "530702",
          name: "古城区"
        },
        {
          code: "530721",
          name: "玉龙纳西族自治县"
        },
        {
          code: "530722",
          name: "永胜县"
        },
        {
          code: "530723",
          name: "华坪县"
        },
        {
          code: "530724",
          name: "宁蒗彝族自治县"
        }
      ],
      [
        {
          code: "530802",
          name: "思茅区"
        },
        {
          code: "530821",
          name: "宁洱哈尼族彝族自治县"
        },
        {
          code: "530822",
          name: "墨江哈尼族自治县"
        },
        {
          code: "530823",
          name: "景东彝族自治县"
        },
        {
          code: "530824",
          name: "景谷傣族彝族自治县"
        },
        {
          code: "530825",
          name: "镇沅彝族哈尼族拉祜族自治县"
        },
        {
          code: "530826",
          name: "江城哈尼族彝族自治县"
        },
        {
          code: "530827",
          name: "孟连傣族拉祜族佤族自治县"
        },
        {
          code: "530828",
          name: "澜沧拉祜族自治县"
        },
        {
          code: "530829",
          name: "西盟佤族自治县"
        }
      ],
      [
        {
          code: "530902",
          name: "临翔区"
        },
        {
          code: "530921",
          name: "凤庆县"
        },
        {
          code: "530922",
          name: "云县"
        },
        {
          code: "530923",
          name: "永德县"
        },
        {
          code: "530924",
          name: "镇康县"
        },
        {
          code: "530925",
          name: "双江拉祜族佤族布朗族傣族自治县"
        },
        {
          code: "530926",
          name: "耿马傣族佤族自治县"
        },
        {
          code: "530927",
          name: "沧源佤族自治县"
        }
      ],
      [
        {
          code: "532301",
          name: "楚雄市"
        },
        {
          code: "532302",
          name: "禄丰市"
        },
        {
          code: "532322",
          name: "双柏县"
        },
        {
          code: "532323",
          name: "牟定县"
        },
        {
          code: "532324",
          name: "南华县"
        },
        {
          code: "532325",
          name: "姚安县"
        },
        {
          code: "532326",
          name: "大姚县"
        },
        {
          code: "532327",
          name: "永仁县"
        },
        {
          code: "532328",
          name: "元谋县"
        },
        {
          code: "532329",
          name: "武定县"
        }
      ],
      [
        {
          code: "532501",
          name: "个旧市"
        },
        {
          code: "532502",
          name: "开远市"
        },
        {
          code: "532503",
          name: "蒙自市"
        },
        {
          code: "532504",
          name: "弥勒市"
        },
        {
          code: "532523",
          name: "屏边苗族自治县"
        },
        {
          code: "532524",
          name: "建水县"
        },
        {
          code: "532525",
          name: "石屏县"
        },
        {
          code: "532527",
          name: "泸西县"
        },
        {
          code: "532528",
          name: "元阳县"
        },
        {
          code: "532529",
          name: "红河县"
        },
        {
          code: "532530",
          name: "金平苗族瑶族傣族自治县"
        },
        {
          code: "532531",
          name: "绿春县"
        },
        {
          code: "532532",
          name: "河口瑶族自治县"
        }
      ],
      [
        {
          code: "532601",
          name: "文山市"
        },
        {
          code: "532622",
          name: "砚山县"
        },
        {
          code: "532623",
          name: "西畴县"
        },
        {
          code: "532624",
          name: "麻栗坡县"
        },
        {
          code: "532625",
          name: "马关县"
        },
        {
          code: "532626",
          name: "丘北县"
        },
        {
          code: "532627",
          name: "广南县"
        },
        {
          code: "532628",
          name: "富宁县"
        }
      ],
      [
        {
          code: "532801",
          name: "景洪市"
        },
        {
          code: "532822",
          name: "勐海县"
        },
        {
          code: "532823",
          name: "勐腊县"
        }
      ],
      [
        {
          code: "532901",
          name: "大理市"
        },
        {
          code: "532922",
          name: "漾濞彝族自治县"
        },
        {
          code: "532923",
          name: "祥云县"
        },
        {
          code: "532924",
          name: "宾川县"
        },
        {
          code: "532925",
          name: "弥渡县"
        },
        {
          code: "532926",
          name: "南涧彝族自治县"
        },
        {
          code: "532927",
          name: "巍山彝族回族自治县"
        },
        {
          code: "532928",
          name: "永平县"
        },
        {
          code: "532929",
          name: "云龙县"
        },
        {
          code: "532930",
          name: "洱源县"
        },
        {
          code: "532931",
          name: "剑川县"
        },
        {
          code: "532932",
          name: "鹤庆县"
        }
      ],
      [
        {
          code: "533102",
          name: "瑞丽市"
        },
        {
          code: "533103",
          name: "芒市"
        },
        {
          code: "533122",
          name: "梁河县"
        },
        {
          code: "533123",
          name: "盈江县"
        },
        {
          code: "533124",
          name: "陇川县"
        }
      ],
      [
        {
          code: "533301",
          name: "泸水市"
        },
        {
          code: "533323",
          name: "福贡县"
        },
        {
          code: "533324",
          name: "贡山独龙族怒族自治县"
        },
        {
          code: "533325",
          name: "兰坪白族普米族自治县"
        }
      ],
      [
        {
          code: "533401",
          name: "香格里拉市"
        },
        {
          code: "533422",
          name: "德钦县"
        },
        {
          code: "533423",
          name: "维西傈僳族自治县"
        }
      ]
    ],
    [
      [
        {
          code: "540102",
          name: "城关区"
        },
        {
          code: "540103",
          name: "堆龙德庆区"
        },
        {
          code: "540104",
          name: "达孜区"
        },
        {
          code: "540121",
          name: "林周县"
        },
        {
          code: "540122",
          name: "当雄县"
        },
        {
          code: "540123",
          name: "尼木县"
        },
        {
          code: "540124",
          name: "曲水县"
        },
        {
          code: "540127",
          name: "墨竹工卡县"
        }
      ],
      [
        {
          code: "540202",
          name: "桑珠孜区"
        },
        {
          code: "540221",
          name: "南木林县"
        },
        {
          code: "540222",
          name: "江孜县"
        },
        {
          code: "540223",
          name: "定日县"
        },
        {
          code: "540224",
          name: "萨迦县"
        },
        {
          code: "540225",
          name: "拉孜县"
        },
        {
          code: "540226",
          name: "昂仁县"
        },
        {
          code: "540227",
          name: "谢通门县"
        },
        {
          code: "540228",
          name: "白朗县"
        },
        {
          code: "540229",
          name: "仁布县"
        },
        {
          code: "540230",
          name: "康马县"
        },
        {
          code: "540231",
          name: "定结县"
        },
        {
          code: "540232",
          name: "仲巴县"
        },
        {
          code: "540233",
          name: "亚东县"
        },
        {
          code: "540234",
          name: "吉隆县"
        },
        {
          code: "540235",
          name: "聂拉木县"
        },
        {
          code: "540236",
          name: "萨嘎县"
        },
        {
          code: "540237",
          name: "岗巴县"
        }
      ],
      [
        {
          code: "540302",
          name: "卡若区"
        },
        {
          code: "540321",
          name: "江达县"
        },
        {
          code: "540322",
          name: "贡觉县"
        },
        {
          code: "540323",
          name: "类乌齐县"
        },
        {
          code: "540324",
          name: "丁青县"
        },
        {
          code: "540325",
          name: "察雅县"
        },
        {
          code: "540326",
          name: "八宿县"
        },
        {
          code: "540327",
          name: "左贡县"
        },
        {
          code: "540328",
          name: "芒康县"
        },
        {
          code: "540329",
          name: "洛隆县"
        },
        {
          code: "540330",
          name: "边坝县"
        }
      ],
      [
        {
          code: "540402",
          name: "巴宜区"
        },
        {
          code: "540421",
          name: "工布江达县"
        },
        {
          code: "540422",
          name: "米林县"
        },
        {
          code: "540423",
          name: "墨脱县"
        },
        {
          code: "540424",
          name: "波密县"
        },
        {
          code: "540425",
          name: "察隅县"
        },
        {
          code: "540426",
          name: "朗县"
        }
      ],
      [
        {
          code: "540502",
          name: "乃东区"
        },
        {
          code: "540521",
          name: "扎囊县"
        },
        {
          code: "540522",
          name: "贡嘎县"
        },
        {
          code: "540523",
          name: "桑日县"
        },
        {
          code: "540524",
          name: "琼结县"
        },
        {
          code: "540525",
          name: "曲松县"
        },
        {
          code: "540526",
          name: "措美县"
        },
        {
          code: "540527",
          name: "洛扎县"
        },
        {
          code: "540528",
          name: "加查县"
        },
        {
          code: "540529",
          name: "隆子县"
        },
        {
          code: "540530",
          name: "错那县"
        },
        {
          code: "540531",
          name: "浪卡子县"
        }
      ],
      [
        {
          code: "542421",
          name: "那曲县"
        },
        {
          code: "542422",
          name: "嘉黎县"
        },
        {
          code: "542423",
          name: "比如县"
        },
        {
          code: "542424",
          name: "聂荣县"
        },
        {
          code: "542425",
          name: "安多县"
        },
        {
          code: "542426",
          name: "申扎县"
        },
        {
          code: "542427",
          name: "索县"
        },
        {
          code: "542428",
          name: "班戈县"
        },
        {
          code: "542429",
          name: "巴青县"
        },
        {
          code: "542430",
          name: "尼玛县"
        },
        {
          code: "542431",
          name: "双湖县"
        }
      ],
      [
        {
          code: "542521",
          name: "普兰县"
        },
        {
          code: "542522",
          name: "札达县"
        },
        {
          code: "542523",
          name: "噶尔县"
        },
        {
          code: "542524",
          name: "日土县"
        },
        {
          code: "542525",
          name: "革吉县"
        },
        {
          code: "542526",
          name: "改则县"
        },
        {
          code: "542527",
          name: "措勤县"
        }
      ]
    ],
    [
      [
        {
          code: "610102",
          name: "新城区"
        },
        {
          code: "610103",
          name: "碑林区"
        },
        {
          code: "610104",
          name: "莲湖区"
        },
        {
          code: "610111",
          name: "灞桥区"
        },
        {
          code: "610112",
          name: "未央区"
        },
        {
          code: "610113",
          name: "雁塔区"
        },
        {
          code: "610114",
          name: "阎良区"
        },
        {
          code: "610115",
          name: "临潼区"
        },
        {
          code: "610116",
          name: "长安区"
        },
        {
          code: "610117",
          name: "高陵区"
        },
        {
          code: "610118",
          name: "鄠邑区"
        },
        {
          code: "610122",
          name: "蓝田县"
        },
        {
          code: "610124",
          name: "周至县"
        }
      ],
      [
        {
          code: "610202",
          name: "王益区"
        },
        {
          code: "610203",
          name: "印台区"
        },
        {
          code: "610204",
          name: "耀州区"
        },
        {
          code: "610222",
          name: "宜君县"
        }
      ],
      [
        {
          code: "610302",
          name: "渭滨区"
        },
        {
          code: "610303",
          name: "金台区"
        },
        {
          code: "610304",
          name: "陈仓区"
        },
        {
          code: "610305",
          name: "凤翔区"
        },
        {
          code: "610323",
          name: "岐山县"
        },
        {
          code: "610324",
          name: "扶风县"
        },
        {
          code: "610326",
          name: "眉县"
        },
        {
          code: "610327",
          name: "陇县"
        },
        {
          code: "610328",
          name: "千阳县"
        },
        {
          code: "610329",
          name: "麟游县"
        },
        {
          code: "610330",
          name: "凤县"
        },
        {
          code: "610331",
          name: "太白县"
        }
      ],
      [
        {
          code: "610402",
          name: "秦都区"
        },
        {
          code: "610403",
          name: "杨陵区"
        },
        {
          code: "610404",
          name: "渭城区"
        },
        {
          code: "610422",
          name: "三原县"
        },
        {
          code: "610423",
          name: "泾阳县"
        },
        {
          code: "610424",
          name: "乾县"
        },
        {
          code: "610425",
          name: "礼泉县"
        },
        {
          code: "610426",
          name: "永寿县"
        },
        {
          code: "610427",
          name: "彬州市"
        },
        {
          code: "610428",
          name: "长武县"
        },
        {
          code: "610429",
          name: "旬邑县"
        },
        {
          code: "610430",
          name: "淳化县"
        },
        {
          code: "610431",
          name: "武功县"
        },
        {
          code: "610481",
          name: "兴平市"
        }
      ],
      [
        {
          code: "610502",
          name: "临渭区"
        },
        {
          code: "610503",
          name: "华州区"
        },
        {
          code: "610522",
          name: "潼关县"
        },
        {
          code: "610523",
          name: "大荔县"
        },
        {
          code: "610524",
          name: "合阳县"
        },
        {
          code: "610525",
          name: "澄城县"
        },
        {
          code: "610526",
          name: "蒲城县"
        },
        {
          code: "610527",
          name: "白水县"
        },
        {
          code: "610528",
          name: "富平县"
        },
        {
          code: "610581",
          name: "韩城市"
        },
        {
          code: "610582",
          name: "华阴市"
        }
      ],
      [
        {
          code: "610602",
          name: "宝塔区"
        },
        {
          code: "610603",
          name: "安塞区"
        },
        {
          code: "610621",
          name: "延长县"
        },
        {
          code: "610622",
          name: "延川县"
        },
        {
          code: "610623",
          name: "子长县"
        },
        {
          code: "610625",
          name: "志丹县"
        },
        {
          code: "610626",
          name: "吴起县"
        },
        {
          code: "610627",
          name: "甘泉县"
        },
        {
          code: "610628",
          name: "富县"
        },
        {
          code: "610629",
          name: "洛川县"
        },
        {
          code: "610630",
          name: "宜川县"
        },
        {
          code: "610631",
          name: "黄龙县"
        },
        {
          code: "610632",
          name: "黄陵县"
        }
      ],
      [
        {
          code: "610702",
          name: "汉台区"
        },
        {
          code: "610703",
          name: "南郑区"
        },
        {
          code: "610722",
          name: "城固县"
        },
        {
          code: "610723",
          name: "洋县"
        },
        {
          code: "610724",
          name: "西乡县"
        },
        {
          code: "610725",
          name: "勉县"
        },
        {
          code: "610726",
          name: "宁强县"
        },
        {
          code: "610727",
          name: "略阳县"
        },
        {
          code: "610728",
          name: "镇巴县"
        },
        {
          code: "610729",
          name: "留坝县"
        },
        {
          code: "610730",
          name: "佛坪县"
        }
      ],
      [
        {
          code: "610802",
          name: "榆阳区"
        },
        {
          code: "610803",
          name: "横山区"
        },
        {
          code: "610822",
          name: "府谷县"
        },
        {
          code: "610824",
          name: "靖边县"
        },
        {
          code: "610825",
          name: "定边县"
        },
        {
          code: "610826",
          name: "绥德县"
        },
        {
          code: "610827",
          name: "米脂县"
        },
        {
          code: "610828",
          name: "佳县"
        },
        {
          code: "610829",
          name: "吴堡县"
        },
        {
          code: "610830",
          name: "清涧县"
        },
        {
          code: "610831",
          name: "子洲县"
        },
        {
          code: "610881",
          name: "神木市"
        }
      ],
      [
        {
          code: "610902",
          name: "汉滨区"
        },
        {
          code: "610921",
          name: "汉阴县"
        },
        {
          code: "610922",
          name: "石泉县"
        },
        {
          code: "610923",
          name: "宁陕县"
        },
        {
          code: "610924",
          name: "紫阳县"
        },
        {
          code: "610925",
          name: "岚皋县"
        },
        {
          code: "610926",
          name: "平利县"
        },
        {
          code: "610927",
          name: "镇坪县"
        },
        {
          code: "610929",
          name: "白河县"
        },
        {
          code: "610981",
          name: "旬阳市"
        }
      ],
      [
        {
          code: "611002",
          name: "商州区"
        },
        {
          code: "611021",
          name: "洛南县"
        },
        {
          code: "611022",
          name: "丹凤县"
        },
        {
          code: "611023",
          name: "商南县"
        },
        {
          code: "611024",
          name: "山阳县"
        },
        {
          code: "611025",
          name: "镇安县"
        },
        {
          code: "611026",
          name: "柞水县"
        }
      ]
    ],
    [
      [
        {
          code: "620102",
          name: "城关区"
        },
        {
          code: "620103",
          name: "七里河区"
        },
        {
          code: "620104",
          name: "西固区"
        },
        {
          code: "620105",
          name: "安宁区"
        },
        {
          code: "620111",
          name: "红古区"
        },
        {
          code: "620121",
          name: "永登县"
        },
        {
          code: "620122",
          name: "皋兰县"
        },
        {
          code: "620123",
          name: "榆中县"
        }
      ],
      [
        {
          code: "620201",
          name: "雄关区"
        },
        {
          code: "620202",
          name: "镜铁区"
        },
        {
          code: "620203",
          name: "长城区"
        }
      ],
      [
        {
          code: "620302",
          name: "金川区"
        },
        {
          code: "620321",
          name: "永昌县"
        }
      ],
      [
        {
          code: "620402",
          name: "白银区"
        },
        {
          code: "620403",
          name: "平川区"
        },
        {
          code: "620421",
          name: "靖远县"
        },
        {
          code: "620422",
          name: "会宁县"
        },
        {
          code: "620423",
          name: "景泰县"
        }
      ],
      [
        {
          code: "620502",
          name: "秦州区"
        },
        {
          code: "620503",
          name: "麦积区"
        },
        {
          code: "620521",
          name: "清水县"
        },
        {
          code: "620522",
          name: "秦安县"
        },
        {
          code: "620523",
          name: "甘谷县"
        },
        {
          code: "620524",
          name: "武山县"
        },
        {
          code: "620525",
          name: "张家川回族自治县"
        }
      ],
      [
        {
          code: "620602",
          name: "凉州区"
        },
        {
          code: "620621",
          name: "民勤县"
        },
        {
          code: "620622",
          name: "古浪县"
        },
        {
          code: "620623",
          name: "天祝藏族自治县"
        }
      ],
      [
        {
          code: "620702",
          name: "甘州区"
        },
        {
          code: "620721",
          name: "肃南裕固族自治县"
        },
        {
          code: "620722",
          name: "民乐县"
        },
        {
          code: "620723",
          name: "临泽县"
        },
        {
          code: "620724",
          name: "高台县"
        },
        {
          code: "620725",
          name: "山丹县"
        }
      ],
      [
        {
          code: "620802",
          name: "崆峒区"
        },
        {
          code: "620821",
          name: "泾川县"
        },
        {
          code: "620822",
          name: "灵台县"
        },
        {
          code: "620823",
          name: "崇信县"
        },
        {
          code: "620824",
          name: "华亭县"
        },
        {
          code: "620825",
          name: "庄浪县"
        },
        {
          code: "620826",
          name: "静宁县"
        }
      ],
      [
        {
          code: "620902",
          name: "肃州区"
        },
        {
          code: "620921",
          name: "金塔县"
        },
        {
          code: "620922",
          name: "瓜州县"
        },
        {
          code: "620923",
          name: "肃北蒙古族自治县"
        },
        {
          code: "620924",
          name: "阿克塞哈萨克族自治县"
        },
        {
          code: "620981",
          name: "玉门市"
        },
        {
          code: "620982",
          name: "敦煌市"
        }
      ],
      [
        {
          code: "621002",
          name: "西峰区"
        },
        {
          code: "621021",
          name: "庆城县"
        },
        {
          code: "621022",
          name: "环县"
        },
        {
          code: "621023",
          name: "华池县"
        },
        {
          code: "621024",
          name: "合水县"
        },
        {
          code: "621025",
          name: "正宁县"
        },
        {
          code: "621026",
          name: "宁县"
        },
        {
          code: "621027",
          name: "镇原县"
        }
      ],
      [
        {
          code: "621102",
          name: "安定区"
        },
        {
          code: "621121",
          name: "通渭县"
        },
        {
          code: "621122",
          name: "陇西县"
        },
        {
          code: "621123",
          name: "渭源县"
        },
        {
          code: "621124",
          name: "临洮县"
        },
        {
          code: "621125",
          name: "漳县"
        },
        {
          code: "621126",
          name: "岷县"
        }
      ],
      [
        {
          code: "621202",
          name: "武都区"
        },
        {
          code: "621221",
          name: "成县"
        },
        {
          code: "621222",
          name: "文县"
        },
        {
          code: "621223",
          name: "宕昌县"
        },
        {
          code: "621224",
          name: "康县"
        },
        {
          code: "621225",
          name: "西和县"
        },
        {
          code: "621226",
          name: "礼县"
        },
        {
          code: "621227",
          name: "徽县"
        },
        {
          code: "621228",
          name: "两当县"
        }
      ],
      [
        {
          code: "622901",
          name: "临夏市"
        },
        {
          code: "622921",
          name: "临夏县"
        },
        {
          code: "622922",
          name: "康乐县"
        },
        {
          code: "622923",
          name: "永靖县"
        },
        {
          code: "622924",
          name: "广河县"
        },
        {
          code: "622925",
          name: "和政县"
        },
        {
          code: "622926",
          name: "东乡族自治县"
        },
        {
          code: "622927",
          name: "积石山保安族东乡族撒拉族自治县"
        }
      ],
      [
        {
          code: "623001",
          name: "合作市"
        },
        {
          code: "623021",
          name: "临潭县"
        },
        {
          code: "623022",
          name: "卓尼县"
        },
        {
          code: "623023",
          name: "舟曲县"
        },
        {
          code: "623024",
          name: "迭部县"
        },
        {
          code: "623025",
          name: "玛曲县"
        },
        {
          code: "623026",
          name: "碌曲县"
        },
        {
          code: "623027",
          name: "夏河县"
        }
      ]
    ],
    [
      [
        {
          code: "630102",
          name: "城东区"
        },
        {
          code: "630103",
          name: "城中区"
        },
        {
          code: "630104",
          name: "城西区"
        },
        {
          code: "630105",
          name: "城北区"
        },
        {
          code: "630121",
          name: "大通回族土族自治县"
        },
        {
          code: "630122",
          name: "湟中县"
        },
        {
          code: "630123",
          name: "湟源县"
        }
      ],
      [
        {
          code: "630202",
          name: "乐都区"
        },
        {
          code: "630203",
          name: "平安区"
        },
        {
          code: "630222",
          name: "民和回族土族自治县"
        },
        {
          code: "630223",
          name: "互助土族自治县"
        },
        {
          code: "630224",
          name: "化隆回族自治县"
        },
        {
          code: "630225",
          name: "循化撒拉族自治县"
        }
      ],
      [
        {
          code: "632221",
          name: "门源回族自治县"
        },
        {
          code: "632222",
          name: "祁连县"
        },
        {
          code: "632223",
          name: "海晏县"
        },
        {
          code: "632224",
          name: "刚察县"
        }
      ],
      [
        {
          code: "632321",
          name: "同仁县"
        },
        {
          code: "632322",
          name: "尖扎县"
        },
        {
          code: "632323",
          name: "泽库县"
        },
        {
          code: "632324",
          name: "河南蒙古族自治县"
        }
      ],
      [
        {
          code: "632521",
          name: "共和县"
        },
        {
          code: "632522",
          name: "同德县"
        },
        {
          code: "632523",
          name: "贵德县"
        },
        {
          code: "632524",
          name: "兴海县"
        },
        {
          code: "632525",
          name: "贵南县"
        }
      ],
      [
        {
          code: "632621",
          name: "玛沁县"
        },
        {
          code: "632622",
          name: "班玛县"
        },
        {
          code: "632623",
          name: "甘德县"
        },
        {
          code: "632624",
          name: "达日县"
        },
        {
          code: "632625",
          name: "久治县"
        },
        {
          code: "632626",
          name: "玛多县"
        }
      ],
      [
        {
          code: "632701",
          name: "玉树市"
        },
        {
          code: "632722",
          name: "杂多县"
        },
        {
          code: "632723",
          name: "称多县"
        },
        {
          code: "632724",
          name: "治多县"
        },
        {
          code: "632725",
          name: "囊谦县"
        },
        {
          code: "632726",
          name: "曲麻莱县"
        }
      ],
      [
        {
          code: "632801",
          name: "格尔木市"
        },
        {
          code: "632802",
          name: "德令哈市"
        },
        {
          code: "632821",
          name: "乌兰县"
        },
        {
          code: "632822",
          name: "都兰县"
        },
        {
          code: "632823",
          name: "天峻县"
        },
        {
          code: "632824",
          name: "冷湖行政委员会"
        },
        {
          code: "632825",
          name: "大柴旦行政委员会"
        },
        {
          code: "632826",
          name: "茫崖行政委员会"
        }
      ]
    ],
    [
      [
        {
          code: "640104",
          name: "兴庆区"
        },
        {
          code: "640105",
          name: "西夏区"
        },
        {
          code: "640106",
          name: "金凤区"
        },
        {
          code: "640121",
          name: "永宁县"
        },
        {
          code: "640122",
          name: "贺兰县"
        },
        {
          code: "640181",
          name: "灵武市"
        }
      ],
      [
        {
          code: "640202",
          name: "大武口区"
        },
        {
          code: "640205",
          name: "惠农区"
        },
        {
          code: "640221",
          name: "平罗县"
        }
      ],
      [
        {
          code: "640302",
          name: "利通区"
        },
        {
          code: "640303",
          name: "红寺堡区"
        },
        {
          code: "640323",
          name: "盐池县"
        },
        {
          code: "640324",
          name: "同心县"
        },
        {
          code: "640381",
          name: "青铜峡市"
        }
      ],
      [
        {
          code: "640402",
          name: "原州区"
        },
        {
          code: "640422",
          name: "西吉县"
        },
        {
          code: "640423",
          name: "隆德县"
        },
        {
          code: "640424",
          name: "泾源县"
        },
        {
          code: "640425",
          name: "彭阳县"
        }
      ],
      [
        {
          code: "640502",
          name: "沙坡头区"
        },
        {
          code: "640521",
          name: "中宁县"
        },
        {
          code: "640522",
          name: "海原县"
        }
      ]
    ],
    [
      [
        {
          code: "650102",
          name: "天山区"
        },
        {
          code: "650103",
          name: "沙依巴克区"
        },
        {
          code: "650104",
          name: "新市区"
        },
        {
          code: "650105",
          name: "水磨沟区"
        },
        {
          code: "650106",
          name: "头屯河区"
        },
        {
          code: "650107",
          name: "达坂城区"
        },
        {
          code: "650109",
          name: "米东区"
        },
        {
          code: "650121",
          name: "乌鲁木齐县"
        }
      ],
      [
        {
          code: "650202",
          name: "独山子区"
        },
        {
          code: "650203",
          name: "克拉玛依区"
        },
        {
          code: "650204",
          name: "白碱滩区"
        },
        {
          code: "650205",
          name: "乌尔禾区"
        }
      ],
      [
        {
          code: "650402",
          name: "高昌区"
        },
        {
          code: "650421",
          name: "鄯善县"
        },
        {
          code: "650422",
          name: "托克逊县"
        }
      ],
      [
        {
          code: "650502",
          name: "伊州区"
        },
        {
          code: "650521",
          name: "巴里坤哈萨克自治县"
        },
        {
          code: "650522",
          name: "伊吾县"
        }
      ],
      [
        {
          code: "652301",
          name: "昌吉市"
        },
        {
          code: "652302",
          name: "阜康市"
        },
        {
          code: "652323",
          name: "呼图壁县"
        },
        {
          code: "652324",
          name: "玛纳斯县"
        },
        {
          code: "652325",
          name: "奇台县"
        },
        {
          code: "652327",
          name: "吉木萨尔县"
        },
        {
          code: "652328",
          name: "木垒哈萨克自治县"
        }
      ],
      [
        {
          code: "652701",
          name: "博乐市"
        },
        {
          code: "652702",
          name: "阿拉山口市"
        },
        {
          code: "652722",
          name: "精河县"
        },
        {
          code: "652723",
          name: "温泉县"
        }
      ],
      [
        {
          code: "652801",
          name: "库尔勒市"
        },
        {
          code: "652822",
          name: "轮台县"
        },
        {
          code: "652823",
          name: "尉犁县"
        },
        {
          code: "652824",
          name: "若羌县"
        },
        {
          code: "652825",
          name: "且末县"
        },
        {
          code: "652826",
          name: "焉耆回族自治县"
        },
        {
          code: "652827",
          name: "和静县"
        },
        {
          code: "652828",
          name: "和硕县"
        },
        {
          code: "652829",
          name: "博湖县"
        }
      ],
      [
        {
          code: "652901",
          name: "阿克苏市"
        },
        {
          code: "652922",
          name: "温宿县"
        },
        {
          code: "652923",
          name: "库车县"
        },
        {
          code: "652924",
          name: "沙雅县"
        },
        {
          code: "652925",
          name: "新和县"
        },
        {
          code: "652926",
          name: "拜城县"
        },
        {
          code: "652927",
          name: "乌什县"
        },
        {
          code: "652928",
          name: "阿瓦提县"
        },
        {
          code: "652929",
          name: "柯坪县"
        }
      ],
      [
        {
          code: "653001",
          name: "阿图什市"
        },
        {
          code: "653022",
          name: "阿克陶县"
        },
        {
          code: "653023",
          name: "阿合奇县"
        },
        {
          code: "653024",
          name: "乌恰县"
        }
      ],
      [
        {
          code: "653101",
          name: "喀什市"
        },
        {
          code: "653121",
          name: "疏附县"
        },
        {
          code: "653122",
          name: "疏勒县"
        },
        {
          code: "653123",
          name: "英吉沙县"
        },
        {
          code: "653124",
          name: "泽普县"
        },
        {
          code: "653125",
          name: "莎车县"
        },
        {
          code: "653126",
          name: "叶城县"
        },
        {
          code: "653127",
          name: "麦盖提县"
        },
        {
          code: "653128",
          name: "岳普湖县"
        },
        {
          code: "653129",
          name: "伽师县"
        },
        {
          code: "653130",
          name: "巴楚县"
        },
        {
          code: "653131",
          name: "塔什库尔干塔吉克自治县"
        }
      ],
      [
        {
          code: "653201",
          name: "和田市"
        },
        {
          code: "653221",
          name: "和田县"
        },
        {
          code: "653222",
          name: "墨玉县"
        },
        {
          code: "653223",
          name: "皮山县"
        },
        {
          code: "653224",
          name: "洛浦县"
        },
        {
          code: "653225",
          name: "策勒县"
        },
        {
          code: "653226",
          name: "于田县"
        },
        {
          code: "653227",
          name: "民丰县"
        }
      ],
      [
        {
          code: "654002",
          name: "伊宁市"
        },
        {
          code: "654003",
          name: "奎屯市"
        },
        {
          code: "654004",
          name: "霍尔果斯市"
        },
        {
          code: "654021",
          name: "伊宁县"
        },
        {
          code: "654022",
          name: "察布查尔锡伯自治县"
        },
        {
          code: "654023",
          name: "霍城县"
        },
        {
          code: "654024",
          name: "巩留县"
        },
        {
          code: "654025",
          name: "新源县"
        },
        {
          code: "654026",
          name: "昭苏县"
        },
        {
          code: "654027",
          name: "特克斯县"
        },
        {
          code: "654028",
          name: "尼勒克县"
        }
      ],
      [
        {
          code: "654201",
          name: "塔城市"
        },
        {
          code: "654202",
          name: "乌苏市"
        },
        {
          code: "654203",
          name: "沙湾市"
        },
        {
          code: "654221",
          name: "额敏县"
        },
        {
          code: "654224",
          name: "托里县"
        },
        {
          code: "654225",
          name: "裕民县"
        },
        {
          code: "654226",
          name: "和布克赛尔蒙古自治县"
        }
      ],
      [
        {
          code: "654301",
          name: "阿勒泰市"
        },
        {
          code: "654321",
          name: "布尔津县"
        },
        {
          code: "654322",
          name: "富蕴县"
        },
        {
          code: "654323",
          name: "福海县"
        },
        {
          code: "654324",
          name: "哈巴河县"
        },
        {
          code: "654325",
          name: "青河县"
        },
        {
          code: "654326",
          name: "吉木乃县"
        }
      ],
      [
        {
          code: "659001",
          name: "石河子市"
        },
        {
          code: "659002",
          name: "阿拉尔市"
        },
        {
          code: "659003",
          name: "图木舒克市"
        },
        {
          code: "659004",
          name: "五家渠市"
        },
        {
          code: "659005",
          name: "北屯市"
        },
        {
          code: "659006",
          name: "铁门关市"
        },
        {
          code: "659007",
          name: "双河市"
        },
        {
          code: "659008",
          name: "可克达拉市"
        },
        {
          code: "659009",
          name: "昆玉市"
        }
      ]
    ],
    [
      [
        {
          code: "710101",
          name: "中正区"
        },
        {
          code: "710102",
          name: "大同区"
        },
        {
          code: "710103",
          name: "中山区"
        },
        {
          code: "710104",
          name: "松山区"
        },
        {
          code: "710105",
          name: "大安区"
        },
        {
          code: "710106",
          name: "万华区"
        },
        {
          code: "710107",
          name: "信义区"
        },
        {
          code: "710108",
          name: "士林区"
        },
        {
          code: "710109",
          name: "北投区"
        },
        {
          code: "710110",
          name: "内湖区"
        },
        {
          code: "710111",
          name: "南港区"
        },
        {
          code: "710112",
          name: "文山区"
        }
      ],
      [
        {
          code: "710201",
          name: "新兴区"
        },
        {
          code: "710202",
          name: "前金区"
        },
        {
          code: "710203",
          name: "苓雅区"
        },
        {
          code: "710204",
          name: "盐埕区"
        },
        {
          code: "710205",
          name: "鼓山区"
        },
        {
          code: "710206",
          name: "旗津区"
        },
        {
          code: "710207",
          name: "前镇区"
        },
        {
          code: "710208",
          name: "三民区"
        },
        {
          code: "710209",
          name: "左营区"
        },
        {
          code: "710210",
          name: "楠梓区"
        },
        {
          code: "710211",
          name: "小港区"
        },
        {
          code: "710242",
          name: "仁武区"
        },
        {
          code: "710243",
          name: "大社区"
        },
        {
          code: "710244",
          name: "冈山区"
        },
        {
          code: "710245",
          name: "路竹区"
        },
        {
          code: "710246",
          name: "阿莲区"
        },
        {
          code: "710247",
          name: "田寮区"
        },
        {
          code: "710248",
          name: "燕巢区"
        },
        {
          code: "710249",
          name: "桥头区"
        },
        {
          code: "710250",
          name: "梓官区"
        },
        {
          code: "710251",
          name: "弥陀区"
        },
        {
          code: "710252",
          name: "永安区"
        },
        {
          code: "710253",
          name: "湖内区"
        },
        {
          code: "710254",
          name: "凤山区"
        },
        {
          code: "710255",
          name: "大寮区"
        },
        {
          code: "710256",
          name: "林园区"
        },
        {
          code: "710257",
          name: "鸟松区"
        },
        {
          code: "710258",
          name: "大树区"
        },
        {
          code: "710259",
          name: "旗山区"
        },
        {
          code: "710260",
          name: "美浓区"
        },
        {
          code: "710261",
          name: "六龟区"
        },
        {
          code: "710262",
          name: "内门区"
        },
        {
          code: "710263",
          name: "杉林区"
        },
        {
          code: "710264",
          name: "甲仙区"
        },
        {
          code: "710265",
          name: "桃源区"
        },
        {
          code: "710266",
          name: "那玛夏区"
        },
        {
          code: "710267",
          name: "茂林区"
        },
        {
          code: "710268",
          name: "茄萣区"
        }
      ],
      [
        {
          code: "710301",
          name: "中西区"
        },
        {
          code: "710302",
          name: "东区"
        },
        {
          code: "710303",
          name: "南区"
        },
        {
          code: "710304",
          name: "北区"
        },
        {
          code: "710305",
          name: "安平区"
        },
        {
          code: "710306",
          name: "安南区"
        },
        {
          code: "710339",
          name: "永康区"
        },
        {
          code: "710340",
          name: "归仁区"
        },
        {
          code: "710341",
          name: "新化区"
        },
        {
          code: "710342",
          name: "左镇区"
        },
        {
          code: "710343",
          name: "玉井区"
        },
        {
          code: "710344",
          name: "楠西区"
        },
        {
          code: "710345",
          name: "南化区"
        },
        {
          code: "710346",
          name: "仁德区"
        },
        {
          code: "710347",
          name: "关庙区"
        },
        {
          code: "710348",
          name: "龙崎区"
        },
        {
          code: "710349",
          name: "官田区"
        },
        {
          code: "710350",
          name: "麻豆区"
        },
        {
          code: "710351",
          name: "佳里区"
        },
        {
          code: "710352",
          name: "西港区"
        },
        {
          code: "710353",
          name: "七股区"
        },
        {
          code: "710354",
          name: "将军区"
        },
        {
          code: "710355",
          name: "学甲区"
        },
        {
          code: "710356",
          name: "北门区"
        },
        {
          code: "710357",
          name: "新营区"
        },
        {
          code: "710358",
          name: "后壁区"
        },
        {
          code: "710359",
          name: "白河区"
        },
        {
          code: "710360",
          name: "东山区"
        },
        {
          code: "710361",
          name: "六甲区"
        },
        {
          code: "710362",
          name: "下营区"
        },
        {
          code: "710363",
          name: "柳营区"
        },
        {
          code: "710364",
          name: "盐水区"
        },
        {
          code: "710365",
          name: "善化区"
        },
        {
          code: "710366",
          name: "大内区"
        },
        {
          code: "710367",
          name: "山上区"
        },
        {
          code: "710368",
          name: "新市区"
        },
        {
          code: "710369",
          name: "安定区"
        }
      ],
      [
        {
          code: "710401",
          name: "中区"
        },
        {
          code: "710402",
          name: "东区"
        },
        {
          code: "710403",
          name: "南区"
        },
        {
          code: "710404",
          name: "西区"
        },
        {
          code: "710405",
          name: "北区"
        },
        {
          code: "710406",
          name: "北屯区"
        },
        {
          code: "710407",
          name: "西屯区"
        },
        {
          code: "710408",
          name: "南屯区"
        },
        {
          code: "710431",
          name: "太平区"
        },
        {
          code: "710432",
          name: "大里区"
        },
        {
          code: "710433",
          name: "雾峰区"
        },
        {
          code: "710434",
          name: "乌日区"
        },
        {
          code: "710435",
          name: "丰原区"
        },
        {
          code: "710436",
          name: "后里区"
        },
        {
          code: "710437",
          name: "石冈区"
        },
        {
          code: "710438",
          name: "东势区"
        },
        {
          code: "710439",
          name: "和平区"
        },
        {
          code: "710440",
          name: "新社区"
        },
        {
          code: "710441",
          name: "潭子区"
        },
        {
          code: "710442",
          name: "大雅区"
        },
        {
          code: "710443",
          name: "神冈区"
        },
        {
          code: "710444",
          name: "大肚区"
        },
        {
          code: "710445",
          name: "沙鹿区"
        },
        {
          code: "710446",
          name: "龙井区"
        },
        {
          code: "710447",
          name: "梧栖区"
        },
        {
          code: "710448",
          name: "清水区"
        },
        {
          code: "710449",
          name: "大甲区"
        },
        {
          code: "710450",
          name: "外埔区"
        },
        {
          code: "710451",
          name: "大安区"
        }
      ],
      [
        {
          code: "710614",
          name: "南投市"
        },
        {
          code: "710615",
          name: "中寮乡"
        },
        {
          code: "710616",
          name: "草屯镇"
        },
        {
          code: "710617",
          name: "国姓乡"
        },
        {
          code: "710618",
          name: "埔里镇"
        },
        {
          code: "710619",
          name: "仁爱乡"
        },
        {
          code: "710620",
          name: "名间乡"
        },
        {
          code: "710621",
          name: "集集镇"
        },
        {
          code: "710622",
          name: "水里乡"
        },
        {
          code: "710623",
          name: "鱼池乡"
        },
        {
          code: "710624",
          name: "信义乡"
        },
        {
          code: "710625",
          name: "竹山镇"
        },
        {
          code: "710626",
          name: "鹿谷乡"
        }
      ],
      [
        {
          code: "710701",
          name: "仁爱区"
        },
        {
          code: "710702",
          name: "信义区"
        },
        {
          code: "710703",
          name: "中正区"
        },
        {
          code: "710704",
          name: "中山区"
        },
        {
          code: "710705",
          name: "安乐区"
        },
        {
          code: "710706",
          name: "暖暖区"
        },
        {
          code: "710707",
          name: "七堵区"
        }
      ],
      [
        {
          code: "710801",
          name: "东区"
        },
        {
          code: "710802",
          name: "北区"
        },
        {
          code: "710803",
          name: "香山区"
        }
      ],
      [
        {
          code: "710901",
          name: "东区"
        },
        {
          code: "710902",
          name: "西区"
        }
      ],
      [
        {
          code: "711130",
          name: "万里区"
        },
        {
          code: "711131",
          name: "金山区"
        },
        {
          code: "711132",
          name: "板桥区"
        },
        {
          code: "711133",
          name: "汐止区"
        },
        {
          code: "711134",
          name: "深坑区"
        },
        {
          code: "711135",
          name: "石碇区"
        },
        {
          code: "711136",
          name: "瑞芳区"
        },
        {
          code: "711137",
          name: "平溪区"
        },
        {
          code: "711138",
          name: "双溪区"
        },
        {
          code: "711139",
          name: "贡寮区"
        },
        {
          code: "711140",
          name: "新店区"
        },
        {
          code: "711141",
          name: "坪林区"
        },
        {
          code: "711142",
          name: "乌来区"
        },
        {
          code: "711143",
          name: "永和区"
        },
        {
          code: "711144",
          name: "中和区"
        },
        {
          code: "711145",
          name: "土城区"
        },
        {
          code: "711146",
          name: "三峡区"
        },
        {
          code: "711147",
          name: "树林区"
        },
        {
          code: "711148",
          name: "莺歌区"
        },
        {
          code: "711149",
          name: "三重区"
        },
        {
          code: "711150",
          name: "新庄区"
        },
        {
          code: "711151",
          name: "泰山区"
        },
        {
          code: "711152",
          name: "林口区"
        },
        {
          code: "711153",
          name: "芦洲区"
        },
        {
          code: "711154",
          name: "五股区"
        },
        {
          code: "711155",
          name: "八里区"
        },
        {
          code: "711156",
          name: "淡水区"
        },
        {
          code: "711157",
          name: "三芝区"
        },
        {
          code: "711158",
          name: "石门区"
        }
      ],
      [
        {
          code: "711214",
          name: "宜兰市"
        },
        {
          code: "711215",
          name: "头城镇"
        },
        {
          code: "711216",
          name: "礁溪乡"
        },
        {
          code: "711217",
          name: "壮围乡"
        },
        {
          code: "711218",
          name: "员山乡"
        },
        {
          code: "711219",
          name: "罗东镇"
        },
        {
          code: "711220",
          name: "三星乡"
        },
        {
          code: "711221",
          name: "大同乡"
        },
        {
          code: "711222",
          name: "五结乡"
        },
        {
          code: "711223",
          name: "冬山乡"
        },
        {
          code: "711224",
          name: "苏澳镇"
        },
        {
          code: "711225",
          name: "南澳乡"
        }
      ],
      [
        {
          code: "711314",
          name: "竹北市"
        },
        {
          code: "711315",
          name: "湖口乡"
        },
        {
          code: "711316",
          name: "新丰乡"
        },
        {
          code: "711317",
          name: "新埔镇"
        },
        {
          code: "711318",
          name: "关西镇"
        },
        {
          code: "711319",
          name: "芎林乡"
        },
        {
          code: "711320",
          name: "宝山乡"
        },
        {
          code: "711321",
          name: "竹东镇"
        },
        {
          code: "711322",
          name: "五峰乡"
        },
        {
          code: "711323",
          name: "横山乡"
        },
        {
          code: "711324",
          name: "尖石乡"
        },
        {
          code: "711325",
          name: "北埔乡"
        },
        {
          code: "711326",
          name: "峨眉乡"
        }
      ],
      [
        {
          code: "711414",
          name: "中坜区"
        },
        {
          code: "711415",
          name: "平镇区"
        },
        {
          code: "711416",
          name: "龙潭区"
        },
        {
          code: "711417",
          name: "杨梅区"
        },
        {
          code: "711418",
          name: "新屋区"
        },
        {
          code: "711419",
          name: "观音区"
        },
        {
          code: "711420",
          name: "桃园区"
        },
        {
          code: "711421",
          name: "龟山区"
        },
        {
          code: "711422",
          name: "八德区"
        },
        {
          code: "711423",
          name: "大溪区"
        },
        {
          code: "711424",
          name: "复兴区"
        },
        {
          code: "711425",
          name: "大园区"
        },
        {
          code: "711426",
          name: "芦竹区"
        }
      ],
      [
        {
          code: "711519",
          name: "竹南镇"
        },
        {
          code: "711520",
          name: "头份市"
        },
        {
          code: "711521",
          name: "三湾乡"
        },
        {
          code: "711522",
          name: "南庄乡"
        },
        {
          code: "711523",
          name: "狮潭乡"
        },
        {
          code: "711524",
          name: "后龙镇"
        },
        {
          code: "711525",
          name: "通霄镇"
        },
        {
          code: "711526",
          name: "苑里镇"
        },
        {
          code: "711527",
          name: "苗栗市"
        },
        {
          code: "711528",
          name: "造桥乡"
        },
        {
          code: "711529",
          name: "头屋乡"
        },
        {
          code: "711530",
          name: "公馆乡"
        },
        {
          code: "711531",
          name: "大湖乡"
        },
        {
          code: "711532",
          name: "泰安乡"
        },
        {
          code: "711533",
          name: "铜锣乡"
        },
        {
          code: "711534",
          name: "三义乡"
        },
        {
          code: "711535",
          name: "西湖乡"
        },
        {
          code: "711536",
          name: "卓兰镇"
        }
      ],
      [
        {
          code: "711727",
          name: "彰化市"
        },
        {
          code: "711728",
          name: "芬园乡"
        },
        {
          code: "711729",
          name: "花坛乡"
        },
        {
          code: "711730",
          name: "秀水乡"
        },
        {
          code: "711731",
          name: "鹿港镇"
        },
        {
          code: "711732",
          name: "福兴乡"
        },
        {
          code: "711733",
          name: "线西乡"
        },
        {
          code: "711734",
          name: "和美镇"
        },
        {
          code: "711735",
          name: "伸港乡"
        },
        {
          code: "711736",
          name: "员林市"
        },
        {
          code: "711737",
          name: "社头乡"
        },
        {
          code: "711738",
          name: "永靖乡"
        },
        {
          code: "711739",
          name: "埔心乡"
        },
        {
          code: "711740",
          name: "溪湖镇"
        },
        {
          code: "711741",
          name: "大村乡"
        },
        {
          code: "711742",
          name: "埔盐乡"
        },
        {
          code: "711743",
          name: "田中镇"
        },
        {
          code: "711744",
          name: "北斗镇"
        },
        {
          code: "711745",
          name: "田尾乡"
        },
        {
          code: "711746",
          name: "埤头乡"
        },
        {
          code: "711747",
          name: "溪州乡"
        },
        {
          code: "711748",
          name: "竹塘乡"
        },
        {
          code: "711749",
          name: "二林镇"
        },
        {
          code: "711750",
          name: "大城乡"
        },
        {
          code: "711751",
          name: "芳苑乡"
        },
        {
          code: "711752",
          name: "二水乡"
        }
      ],
      [
        {
          code: "711919",
          name: "番路乡"
        },
        {
          code: "711920",
          name: "梅山乡"
        },
        {
          code: "711921",
          name: "竹崎乡"
        },
        {
          code: "711922",
          name: "阿里山乡"
        },
        {
          code: "711923",
          name: "中埔乡"
        },
        {
          code: "711924",
          name: "大埔乡"
        },
        {
          code: "711925",
          name: "水上乡"
        },
        {
          code: "711926",
          name: "鹿草乡"
        },
        {
          code: "711927",
          name: "太保市"
        },
        {
          code: "711928",
          name: "朴子市"
        },
        {
          code: "711929",
          name: "东石乡"
        },
        {
          code: "711930",
          name: "六脚乡"
        },
        {
          code: "711931",
          name: "新港乡"
        },
        {
          code: "711932",
          name: "民雄乡"
        },
        {
          code: "711933",
          name: "大林镇"
        },
        {
          code: "711934",
          name: "溪口乡"
        },
        {
          code: "711935",
          name: "义竹乡"
        },
        {
          code: "711936",
          name: "布袋镇"
        }
      ],
      [
        {
          code: "712121",
          name: "斗南镇"
        },
        {
          code: "712122",
          name: "大埤乡"
        },
        {
          code: "712123",
          name: "虎尾镇"
        },
        {
          code: "712124",
          name: "土库镇"
        },
        {
          code: "712125",
          name: "褒忠乡"
        },
        {
          code: "712126",
          name: "东势乡"
        },
        {
          code: "712127",
          name: "台西乡"
        },
        {
          code: "712128",
          name: "仑背乡"
        },
        {
          code: "712129",
          name: "麦寮乡"
        },
        {
          code: "712130",
          name: "斗六市"
        },
        {
          code: "712131",
          name: "林内乡"
        },
        {
          code: "712132",
          name: "古坑乡"
        },
        {
          code: "712133",
          name: "莿桐乡"
        },
        {
          code: "712134",
          name: "西螺镇"
        },
        {
          code: "712135",
          name: "二仑乡"
        },
        {
          code: "712136",
          name: "北港镇"
        },
        {
          code: "712137",
          name: "水林乡"
        },
        {
          code: "712138",
          name: "口湖乡"
        },
        {
          code: "712139",
          name: "四湖乡"
        },
        {
          code: "712140",
          name: "元长乡"
        }
      ],
      [
        {
          code: "712434",
          name: "屏东市"
        },
        {
          code: "712435",
          name: "三地门乡"
        },
        {
          code: "712436",
          name: "雾台乡"
        },
        {
          code: "712437",
          name: "玛家乡"
        },
        {
          code: "712438",
          name: "九如乡"
        },
        {
          code: "712439",
          name: "里港乡"
        },
        {
          code: "712440",
          name: "高树乡"
        },
        {
          code: "712441",
          name: "盐埔乡"
        },
        {
          code: "712442",
          name: "长治乡"
        },
        {
          code: "712443",
          name: "麟洛乡"
        },
        {
          code: "712444",
          name: "竹田乡"
        },
        {
          code: "712445",
          name: "内埔乡"
        },
        {
          code: "712446",
          name: "万丹乡"
        },
        {
          code: "712447",
          name: "潮州镇"
        },
        {
          code: "712448",
          name: "泰武乡"
        },
        {
          code: "712449",
          name: "来义乡"
        },
        {
          code: "712450",
          name: "万峦乡"
        },
        {
          code: "712451",
          name: "崁顶乡"
        },
        {
          code: "712452",
          name: "新埤乡"
        },
        {
          code: "712453",
          name: "南州乡"
        },
        {
          code: "712454",
          name: "林边乡"
        },
        {
          code: "712455",
          name: "东港镇"
        },
        {
          code: "712456",
          name: "琉球乡"
        },
        {
          code: "712457",
          name: "佳冬乡"
        },
        {
          code: "712458",
          name: "新园乡"
        },
        {
          code: "712459",
          name: "枋寮乡"
        },
        {
          code: "712460",
          name: "枋山乡"
        },
        {
          code: "712461",
          name: "春日乡"
        },
        {
          code: "712462",
          name: "狮子乡"
        },
        {
          code: "712463",
          name: "车城乡"
        },
        {
          code: "712464",
          name: "牡丹乡"
        },
        {
          code: "712465",
          name: "恒春镇"
        },
        {
          code: "712466",
          name: "满州乡"
        }
      ],
      [
        {
          code: "712517",
          name: "台东市"
        },
        {
          code: "712518",
          name: "绿岛乡"
        },
        {
          code: "712519",
          name: "兰屿乡"
        },
        {
          code: "712520",
          name: "延平乡"
        },
        {
          code: "712521",
          name: "卑南乡"
        },
        {
          code: "712522",
          name: "鹿野乡"
        },
        {
          code: "712523",
          name: "关山镇"
        },
        {
          code: "712524",
          name: "海端乡"
        },
        {
          code: "712525",
          name: "池上乡"
        },
        {
          code: "712526",
          name: "东河乡"
        },
        {
          code: "712527",
          name: "成功镇"
        },
        {
          code: "712528",
          name: "长滨乡"
        },
        {
          code: "712529",
          name: "金峰乡"
        },
        {
          code: "712530",
          name: "大武乡"
        },
        {
          code: "712531",
          name: "达仁乡"
        },
        {
          code: "712532",
          name: "太麻里乡"
        }
      ],
      [
        {
          code: "712615",
          name: "花莲市"
        },
        {
          code: "712616",
          name: "新城乡"
        },
        {
          code: "712618",
          name: "秀林乡"
        },
        {
          code: "712619",
          name: "吉安乡"
        },
        {
          code: "712620",
          name: "寿丰乡"
        },
        {
          code: "712621",
          name: "凤林镇"
        },
        {
          code: "712622",
          name: "光复乡"
        },
        {
          code: "712623",
          name: "丰滨乡"
        },
        {
          code: "712624",
          name: "瑞穗乡"
        },
        {
          code: "712625",
          name: "万荣乡"
        },
        {
          code: "712626",
          name: "玉里镇"
        },
        {
          code: "712627",
          name: "卓溪乡"
        },
        {
          code: "712628",
          name: "富里乡"
        }
      ],
      [
        {
          code: "712707",
          name: "马公市"
        },
        {
          code: "712708",
          name: "西屿乡"
        },
        {
          code: "712709",
          name: "望安乡"
        },
        {
          code: "712710",
          name: "七美乡"
        },
        {
          code: "712711",
          name: "白沙乡"
        },
        {
          code: "712712",
          name: "湖西乡"
        }
      ]
    ],
    [
      [
        {
          code: "810101",
          name: "中西区"
        },
        {
          code: "810102",
          name: "东区"
        },
        {
          code: "810103",
          name: "九龙城区"
        },
        {
          code: "810104",
          name: "观塘区"
        },
        {
          code: "810105",
          name: "南区"
        },
        {
          code: "810106",
          name: "深水埗区"
        },
        {
          code: "810107",
          name: "湾仔区"
        },
        {
          code: "810108",
          name: "黄大仙区"
        },
        {
          code: "810109",
          name: "油尖旺区"
        },
        {
          code: "810110",
          name: "离岛区"
        },
        {
          code: "810111",
          name: "葵青区"
        },
        {
          code: "810112",
          name: "北区"
        },
        {
          code: "810113",
          name: "西贡区"
        },
        {
          code: "810114",
          name: "沙田区"
        },
        {
          code: "810115",
          name: "屯门区"
        },
        {
          code: "810116",
          name: "大埔区"
        },
        {
          code: "810117",
          name: "荃湾区"
        },
        {
          code: "810118",
          name: "元朗区"
        }
      ]
    ],
    [
      [
        {
          code: "820101",
          name: "澳门半岛"
        },
        {
          code: "820102",
          name: "凼仔"
        },
        {
          code: "820103",
          name: "路凼城"
        },
        {
          code: "820104",
          name: "路环"
        }
      ]
    ]
  ];
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  const _sfc_main$3 = {
    name: "u-picker",
    emits: ["update:modelValue", "input", "confirm", "cancel", "columnchange"],
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      // picker中需要显示的参数
      params: {
        type: [Object, null],
        default() {
          return {
            year: true,
            month: true,
            day: true,
            hour: false,
            minute: false,
            second: false,
            province: true,
            city: true,
            area: true,
            timestamp: true
          };
        }
      },
      // 当mode=selector或者mode=multiSelector时，提供的数组
      range: {
        type: Array,
        default() {
          return [];
        }
      },
      // 当mode=selector或者mode=multiSelector时，提供的默认选中的下标
      defaultSelector: {
        type: Array,
        default() {
          return [0];
        }
      },
      // 当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
      rangeKey: {
        type: String,
        default: ""
      },
      // 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式
      mode: {
        type: String,
        default: "time"
      },
      // 年份开始时间
      startYear: {
        type: [String, Number],
        default: 1950
      },
      // 年份结束时间
      endYear: {
        type: [String, Number],
        default: 2050
      },
      // "取消"按钮的颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // "确定"按钮的颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
      defaultTime: {
        type: [String, null],
        default: ""
      },
      // 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
      defaultRegion: {
        type: [Array, null],
        default() {
          return [];
        }
      },
      // 时间模式时，是否显示后面的年月日中文提示
      showTimeTag: {
        type: Boolean,
        default: true
      },
      // 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
      areaCode: {
        type: [Array, null],
        default() {
          return [];
        }
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: false
      },
      // 是否允许通过点击遮罩关闭Picker
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      },
      // 顶部标题
      title: {
        type: String,
        default: ""
      },
      // 取消按钮的文字
      cancelText: {
        type: String,
        default: "取消"
      },
      // 确认按钮的文字
      confirmText: {
        type: String,
        default: "确认"
      },
      // 遮罩的模糊度
      blur: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        popupValue: false,
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: [],
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        reset: false,
        startDate: "",
        endDate: "",
        valueArr: [],
        provinces,
        citys: citys[0],
        areas: areas[0][0],
        province: 0,
        city: 0,
        area: 0,
        moving: false
        // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      propsChange() {
        let { mode, defaultTime, startYear, endYear, defaultRegion, areaCode, defaultSelector } = this;
        return JSON.stringify({ mode, defaultTime, startYear, endYear, defaultRegion, areaCode, defaultSelector });
      },
      regionChange() {
        return `${this.province}-${this.city}`;
      },
      yearAndMonth() {
        return `${this.year}-${this.month}`;
      },
      uZIndex() {
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      },
      // 用来兼容小程序、App、h5
      showColumnCom() {
        return true;
      }
    },
    watch: {
      propsChange() {
        this.reset = true;
        setTimeout(() => this.init(), 10);
      },
      // 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
      regionChange(val) {
        this.citys = citys[this.province];
        this.areas = areas[this.province][this.city];
      },
      // watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
      // 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
      yearAndMonth(val) {
        if (this.params && this.params.year)
          this.setDays();
      },
      // 微信和QQ小程序由于一些奇怪的原因(故同时对所有平台均初始化一遍)，需要重新初始化才能显示正确的值
      valueCom: {
        immediate: true,
        handler(n) {
          if (n) {
            this.reset = true;
            setTimeout(() => this.init(), 10);
          }
          this.popupValue = n;
        }
      }
    },
    methods: {
      // 标识滑动开始，只有微信小程序才有这样的事件
      pickstart() {
      },
      // 标识滑动结束
      pickend() {
      },
      // 对单列和多列形式的判断是否有传入变量的情况
      getItemValue(item, mode) {
        if (this.mode == mode) {
          return typeof item == "object" ? item[this.rangeKey] : item;
        }
      },
      // 小于10前面补0，用于月份，日期，时分秒等
      formatNumber(num) {
        return +num < 10 ? "0" + num : String(num);
      },
      // 生成递进的数组
      generateArray: function(start, end) {
        start = Number(start);
        end = Number(end);
        end = end > start ? end : start;
        return [...Array(end + 1).keys()].slice(start);
      },
      getIndex: function(arr, val) {
        let index = arr.indexOf(val);
        return ~index ? index : 0;
      },
      //日期时间处理
      initTimeValue() {
        let fdate;
        if (!this.defaultTime) {
          fdate = timeFormat(Date.now(), "yyyy/mm/dd hh:MM:ss");
        } else {
          fdate = this.defaultTime.replace(/\-/g, "/");
        }
        fdate = fdate && fdate.indexOf("/") == -1 ? `2020/01/01 ${fdate}` : fdate;
        let arr1 = fdate.split(" ");
        let arr1_1 = arr1[0] || "";
        let arr1_2 = arr1[1] || "";
        let arr2;
        if (arr1_1.indexOf("-") > -1) {
          arr2 = arr1_1.split("-");
        } else {
          arr2 = arr1_1.split("/");
        }
        let arr3 = arr1_2.split(":");
        let dateObj = {
          year: Number(arr2[0]),
          month: Number(arr2[1]) || 1,
          day: Number(arr2[2]) || 1,
          hour: Number(arr3[0]) || 0,
          minute: Number(arr3[1]) || 0,
          second: Number(arr3[2]) || 0
        };
        for (let key in dateObj) {
          if (dateObj[key] >= 0 && dateObj[key] < 10)
            dateObj[key] = `0${dateObj[key]}`;
        }
        fdate = `${dateObj.year}/${dateObj.month}/${dateObj.day} ${dateObj.hour}:${dateObj.minute}:${dateObj.second}`;
        let time = null;
        if (fdate)
          time = new Date(fdate);
        else
          time = /* @__PURE__ */ new Date();
        this.year = time.getFullYear();
        this.month = Number(time.getMonth()) + 1;
        this.day = time.getDate();
        this.hour = time.getHours();
        this.minute = time.getMinutes();
        this.second = time.getSeconds();
      },
      init() {
        this.valueArr = [];
        this.reset = false;
        let params = this.params || {};
        if (this.mode == "time") {
          this.initTimeValue();
          if (params.year) {
            this.valueArr.push(0);
            this.setYears();
          }
          if (params.month) {
            this.valueArr.push(0);
            this.setMonths();
          }
          if (params.day) {
            this.valueArr.push(0);
            this.setDays();
          }
          if (params.hour) {
            this.valueArr.push(0);
            this.setHours();
          }
          if (params.minute) {
            this.valueArr.push(0);
            this.setMinutes();
          }
          if (params.second) {
            this.valueArr.push(0);
            this.setSeconds();
          }
        } else if (this.mode == "region") {
          if (params.province) {
            this.valueArr.push(0);
            this.setProvinces();
          }
          if (params.city) {
            this.valueArr.push(0);
            this.setCitys();
          }
          if (params.area) {
            this.valueArr.push(0);
            this.setAreas();
          }
        } else if (this.mode == "selector") {
          this.valueArr = this.defaultSelector;
        } else if (this.mode == "multiSelector") {
          this.valueArr = this.defaultSelector;
          this.multiSelectorValue = this.defaultSelector;
        }
        this.$forceUpdate();
      },
      // 设置picker的某一列值
      setYears() {
        this.years = this.generateArray(this.startYear, this.endYear);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
      },
      setMonths() {
        this.months = this.generateArray(1, 12);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
      },
      setDays() {
        let params = this.params || {};
        let totalDays = new Date(this.year, this.month, 0).getDate();
        this.days = this.generateArray(1, totalDays);
        let index = 0;
        if (params.year && params.month)
          index = 2;
        else if (params.month)
          index = 1;
        else if (params.year)
          index = 1;
        else
          index = 0;
        if (this.day > this.days.length)
          this.day = this.days.length;
        this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
      },
      setHours() {
        this.hours = this.generateArray(0, 23);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
      },
      setMinutes() {
        this.minutes = this.generateArray(0, 59);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
      },
      setSeconds() {
        this.seconds = this.generateArray(0, 59);
        this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
      },
      setProvinces() {
        let params = this.params || {};
        if (!params.province)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode && this.areaCode.length) {
          tmp = this.areaCode[0];
          useCode = true;
        } else if (this.defaultRegion && this.defaultRegion.length)
          tmp = this.defaultRegion[0];
        else
          tmp = 0;
        provinces.map((v, k) => {
          if (useCode ? v.code == tmp : v.name == tmp) {
            tmp = k;
          }
        });
        this.province = tmp;
        this.provinces = provinces;
        this.valueArr.splice(0, 1, this.province);
      },
      setCitys() {
        let params = this.params || {};
        if (!params.city)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode && this.areaCode.length) {
          tmp = this.areaCode[1];
          useCode = true;
        } else if (this.defaultRegion && this.defaultRegion.length)
          tmp = this.defaultRegion[1];
        else
          tmp = 0;
        citys[this.province].map((v, k) => {
          if (useCode ? v.code == tmp : v.name == tmp) {
            tmp = k;
          }
        });
        this.city = tmp;
        this.citys = citys[this.province];
        this.valueArr.splice(1, 1, this.city);
      },
      setAreas() {
        let params = this.params || {};
        if (!params.area)
          return;
        let tmp = "";
        let useCode = false;
        if (this.areaCode && this.areaCode.length) {
          tmp = this.areaCode[2];
          useCode = true;
        } else if (this.defaultRegion && this.defaultRegion.length)
          tmp = this.defaultRegion[2];
        else
          tmp = 0;
        areas[this.province][this.city].map((v, k) => {
          if (useCode ? v.code == tmp : v.name == tmp) {
            tmp = k;
          }
        });
        this.area = tmp;
        this.areas = areas[this.province][this.city];
        this.valueArr.splice(2, 1, this.area);
      },
      close() {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      },
      // 用户更改picker的列选项
      change(e) {
        let params = this.params || {};
        let oldValueArr = JSON.parse(JSON.stringify(this.valueArr || []));
        this.valueArr = e.detail.value;
        let i = 0;
        if (this.mode == "time") {
          if (params.year)
            this.year = this.years[this.valueArr[i++]];
          if (params.month)
            this.month = this.months[this.valueArr[i++]];
          if (params.day)
            this.day = this.days[this.valueArr[i++]];
          if (params.hour)
            this.hour = this.hours[this.valueArr[i++]];
          if (params.minute)
            this.minute = this.minutes[this.valueArr[i++]];
          if (params.second)
            this.second = this.seconds[this.valueArr[i++]];
        } else if (this.mode == "region") {
          if (params.province)
            this.province = this.valueArr[i++];
          if (params.city)
            this.city = this.valueArr[i++];
          if (params.area)
            this.area = this.valueArr[i++];
        } else if (this.mode == "multiSelector") {
          let index = null;
          oldValueArr.map((val, idx) => {
            if (val !== e.detail.value[idx])
              index = idx;
          });
          if (index !== null) {
            this.$emit("columnchange", {
              column: index,
              index: e.detail.value[index]
            });
          }
        }
      },
      // 用户点击确定按钮
      getResult(event = null) {
        let params = this.params || {};
        let result = {};
        if (this.mode == "time") {
          if (params.year)
            result.year = this.formatNumber(this.year || 0);
          if (params.month)
            result.month = this.formatNumber(this.month || 0);
          if (params.day)
            result.day = this.formatNumber(this.day || 0);
          if (params.hour)
            result.hour = this.formatNumber(this.hour || 0);
          if (params.minute)
            result.minute = this.formatNumber(this.minute || 0);
          if (params.second)
            result.second = this.formatNumber(this.second || 0);
          if (params.timestamp)
            result.timestamp = this.getTimestamp();
        } else if (this.mode == "region") {
          if (params.province)
            result.province = provinces[this.province];
          if (params.city)
            result.city = citys[this.province][this.city];
          if (params.area)
            result.area = areas[this.province][this.city][this.area];
        } else if (this.mode == "selector") {
          result = this.valueArr;
        } else if (this.mode == "multiSelector") {
          result = this.valueArr;
        }
        if (event)
          this.$emit(event, result);
        this.close();
      },
      // 获取时间戳
      getTimestamp() {
        let time = this.year + "/" + this.month + "/" + this.day + " " + this.hour + ":" + this.minute + ":" + this.second;
        return new Date(time).getTime() / 1e3;
      },
      // 获得数据源
      getDateSource() {
        return {
          provinces,
          citys,
          areas
        };
      },
      // 智能识别省市区
      regionDiscern(addressText) {
        let address = "";
        let province = {};
        let city = {};
        let area = {};
        if (!addressText)
          return { code: -1, msg: "地址文本不能为空" };
        addressText.trim();
        let firstTwoKey = addressText.substring(0, 2);
        let provinceIndex = -1;
        for (let i = 0; i < provinces.length; i++) {
          let { code: code2, name } = provinces[i];
          if (name.indexOf(firstTwoKey) == 0) {
            province = { code: code2, name };
            provinceIndex = i;
            break;
          }
        }
        if (provinceIndex == -1)
          return { code: -1, msg: `省份【${firstTwoKey}】没有找到，请输入正确的地址` };
        let citysArr = citys[provinceIndex];
        let cityIndex = -1;
        for (let i = 0; i < citysArr.length; i++) {
          let { name, code: code2 } = citysArr[i];
          let cityName = name.substr(0, name.length - 1);
          if (addressText.indexOf(cityName) > -1) {
            city = { code: code2, name };
            cityIndex = i;
            break;
          }
        }
        if (cityIndex == -1)
          return { code: -1, msg: `地级市没有找到，请输入正确的地址` };
        let areasArr = areas[provinceIndex][cityIndex];
        let areaIndex = -1;
        for (let i = 0; i < areasArr.length; i++) {
          let { code: code2, name } = areasArr[i];
          let reg = name;
          if (name.length > 2)
            reg += `|${name.substr(0, name.length - 1)}`;
          let areaRegExp = new RegExp(reg);
          if (addressText.search(areaRegExp) > -1) {
            area = { code: code2, name };
            address = addressText.replace(new RegExp(reg), "{{~}}").split("{{~}}")[1];
            areaIndex = i;
            break;
          }
        }
        if (areaIndex == -1)
          return { code: -1, msg: "县级市没有找到，请输入正确的地址" };
        let formatted_address = `${province.name}${city.name}${area.name}${address}`;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            province,
            // 省
            city,
            // 市
            area,
            // 区
            address,
            // 街道地址
            formatted_address
            // 完整格式化地址
          }
        };
        return res;
      },
      // 智能识别收货信息
      addressDiscern(text2) {
        let name = "";
        let mobile2 = "";
        if (!text2)
          return { code: -1, msg: "地址文本不能为空" };
        let textArr = text2.split(/[^\u4e00-\u9fa5a-zA-Z0-9+-（）()]+/g).filter((v) => v.length);
        if (textArr.length != 3)
          return { code: -1, msg: "地址格式不正确，请按姓名 手机号 收货地址格式。" };
        let temp;
        let addressText;
        for (let [k, v] of textArr.entries()) {
          if (/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v)) {
            mobile2 = v;
            continue;
          }
          if (!temp) {
            temp = v;
            continue;
          }
          temp.length > v.length ? (addressText = temp, name = v) : (addressText = v, name = temp);
        }
        let positionRes = this.regionDiscern(addressText);
        if (positionRes.code !== 0)
          return positionRes;
        let res = {
          code: 0,
          msg: "ok",
          data: {
            name,
            // 姓名
            mobile: mobile2,
            // 手机号
            position: positionRes.data
            // 省市区街道信息
          }
        };
        return res;
      },
      stop() {
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_popup = resolveEasycom(vue.resolveDynamicComponent("u-popup"), __easycom_0$1);
    return vue.openBlock(), vue.createBlock(_component_u_popup, {
      maskCloseAble: $props.maskCloseAble,
      mode: "bottom",
      popup: false,
      modelValue: $data.popupValue,
      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $data.popupValue = $event),
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      onClose: $options.close,
      "z-index": $options.uZIndex,
      blur: $props.blur
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", { class: "u-datetime-picker" }, [
          vue.createElementVNode(
            "view",
            {
              class: "u-picker-header",
              onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop", "prevent"]))
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "u-btn-picker u-btn-picker--tips",
                  style: vue.normalizeStyle({ color: $props.cancelColor }),
                  "hover-class": "u-opacity",
                  "hover-stay-time": 150,
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.getResult("cancel"))
                },
                vue.toDisplayString($props.cancelText),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode(
                "view",
                { class: "u-picker__title" },
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "u-btn-picker u-btn-picker--primary",
                  style: vue.normalizeStyle({ color: $data.moving ? $props.cancelColor : $props.confirmColor }),
                  "hover-class": "u-opacity",
                  "hover-stay-time": 150,
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"])),
                  onClick: _cache[2] || (_cache[2] = vue.withModifiers(($event) => $options.getResult("confirm"), ["stop"]))
                },
                vue.toDisplayString($props.confirmText),
                37
                /* TEXT, STYLE, NEED_HYDRATION */
              )
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createElementVNode("view", { class: "u-picker-body" }, [
            $props.mode == "region" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 0,
              value: $data.valueArr,
              onChange: _cache[4] || (_cache[4] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[5] || (_cache[5] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[6] || (_cache[6] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom && $props.params && $props.params.province ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.provinces, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.city ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.citys, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.area ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.areas, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "time" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 1,
              value: $data.valueArr,
              onChange: _cache[7] || (_cache[7] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[8] || (_cache[8] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[9] || (_cache[9] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom && $props.params && $props.params.year ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString(item) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "年")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.month ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "月")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.day ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 2 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "日")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.hour ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 3 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "时")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.minute ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 4 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "分")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true),
              $options.showColumnCom && $props.params && $props.params.second ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 5 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString($options.formatNumber(item)) + " ",
                        1
                        /* TEXT */
                      ),
                      $props.showTimeTag ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "u-text"
                      }, "秒")) : vue.createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "selector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 2,
              value: $data.valueArr,
              onChange: _cache[10] || (_cache[10] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[11] || (_cache[11] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[12] || (_cache[12] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.range, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "u-column-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "view",
                        { class: "u-line-1" },
                        vue.toDisplayString($options.getItemValue(item, "selector")),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : $props.mode == "multiSelector" ? (vue.openBlock(), vue.createElementBlock("picker-view", {
              key: 3,
              value: $data.valueArr,
              onChange: _cache[13] || (_cache[13] = (...args) => $options.change && $options.change(...args)),
              class: "u-picker-view",
              onPickstart: _cache[14] || (_cache[14] = (...args) => $options.pickstart && $options.pickstart(...args)),
              onPickend: _cache[15] || (_cache[15] = (...args) => $options.pickend && $options.pickend(...args))
            }, [
              $options.showColumnCom ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($props.range, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("picker-view-column", { key: index }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (item1, index1) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "u-column-item",
                          key: index1
                        }, [
                          vue.createElementVNode(
                            "view",
                            { class: "u-line-1" },
                            vue.toDisplayString($options.getItemValue(item1, "multiSelector")),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true)
            ], 40, ["value"])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["maskCloseAble", "modelValue", "safeAreaInsetBottom", "onClose", "z-index", "blur"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-e8b59df9"], ["__file", "E:/git/wordPrompt/uni_modules/vk-uview-ui/components/u-picker/u-picker.vue"]]);
  const _sfc_main$2 = {
    __name: "settings",
    setup(__props, { expose: __expose }) {
      __expose();
      const { t, locale } = useI18n();
      const settingsStore = useSettingsStore();
      const settings = vue.ref(settingsStore.$state);
      const languages = kSupportedLocales.map((l) => l[0]);
      const languagesValues = kSupportedLocales.map((l) => l[1]);
      const currentLanguageIndex = vue.computed(
        () => languagesValues.findIndex((l) => l === locale.value)
      );
      const alignments = [
        t("SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Left"),
        t("SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Center"),
        t("SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Right"),
        t("SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Justified")
      ];
      const alignmentValues = ["left", "center", "right", "justify"];
      const currentAlignmentIndex = vue.computed(
        () => alignmentValues.findIndex((a) => a === settings.value.alignment)
      );
      const isFontPickerVisible = vue.ref(false);
      const fontObj = vue.computed(() => {
        const obj = fontList.find((o) => o.value == settingsStore.fontFamily);
        return obj;
      });
      const fontName = vue.computed(() => fontObj.value.name);
      const currentFontIndex = vue.computed(
        () => fontList.findIndex((o) => o.value == settingsStore.fontFamily)
      );
      const openFontPicker = () => {
        isFontPickerVisible.value = true;
      };
      const onFontChange = (e) => {
        const selectedFontIndex = e[0];
        const obj = fontList[selectedFontIndex];
        settingsStore.setFontFamily(obj.value);
        isFontPickerVisible.value = false;
      };
      const onLanguageChange = (e) => {
        const newLocale = kSupportedLocales[e.detail.value][1];
        locale.value = newLocale;
      };
      const onScrollSpeedChange = (e) => {
        const speed = parseFloat(e.detail.value).toFixed(1);
        settingsStore.setScrollSpeed(parseFloat(speed));
      };
      const onFontSizeChange = (e) => {
        settingsStore.setFontSize(e.detail.value);
      };
      const onAlignmentChange = (e) => {
        settingsStore.setAlignment(alignmentValues[e.detail.value]);
      };
      const onMirroredXChange = (e) => {
        settingsStore.setMirroredX(e.detail.value);
      };
      const onTransparentBackgroundChange = (e) => {
        settingsStore.setTransparentBackground(e.detail.value);
      };
      const onMirroredYChange = (e) => {
        settingsStore.setMirroredY(e.detail.value);
      };
      const onSideMarginChange = (e) => {
        settingsStore.setSideMargin(e.detail.value);
      };
      const onCountdownLineHeight = (e) => {
        settingsStore.setCountdownLineHeight(e.detail.value);
      };
      const resetSettings = () => {
        settingsStore.resetSettings();
      };
      const __returned__ = { t, locale, settingsStore, settings, languages, languagesValues, currentLanguageIndex, alignments, alignmentValues, currentAlignmentIndex, isFontPickerVisible, fontObj, fontName, currentFontIndex, openFontPicker, onFontChange, onLanguageChange, onScrollSpeedChange, onFontSizeChange, onAlignmentChange, onMirroredXChange, onTransparentBackgroundChange, onMirroredYChange, onSideMarginChange, onCountdownLineHeight, resetSettings, ref: vue.ref, computed: vue.computed, get useI18n() {
        return useI18n;
      }, get useSettingsStore() {
        return useSettingsStore;
      }, get kSupportedLocales() {
        return kSupportedLocales;
      }, get fontList() {
        return fontList;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_picker = resolveEasycom(vue.resolveDynamicComponent("u-picker"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "settings-screen" }, [
      vue.createElementVNode("view", { class: "settings-list" }, [
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.DropdownAppSetting_DefaultLanguage")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("picker", {
            value: $setup.currentLanguageIndex,
            range: $setup.languages,
            onChange: $setup.onLanguageChange
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.languages[$setup.currentLanguageIndex]),
              1
              /* TEXT */
            )
          ], 40, ["value", "range"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.NumberAppSetting_DefaultScrollSpeed")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("slider", {
            style: { "width": "50%" },
            value: $setup.settings.scrollSpeed,
            min: 1,
            max: 15,
            step: 0.5,
            "show-value": "",
            onChange: $setup.onScrollSpeedChange
          }, null, 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.NumberAppSetting_DefaultFontSize")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("slider", {
            style: { "width": "50%" },
            value: $setup.settings.fontSize,
            min: 20,
            max: 100,
            step: 1,
            "show-value": "",
            onChange: $setup.onFontSizeChange
          }, null, 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.DropdownAppSetting_DefaultTextAlignment")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("picker", {
            value: $setup.currentAlignmentIndex,
            range: $setup.alignments,
            onChange: $setup.onAlignmentChange
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.alignments[$setup.currentAlignmentIndex]),
              1
              /* TEXT */
            )
          ], 40, ["value"])
        ]),
        vue.createElementVNode("view", {
          class: "settings-item",
          onClick: $setup.openFontPicker
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.DropdownAppSetting_DefaultFontFamily")),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.fontName),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.BooleanAppSetting_DefaultFlipX")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("switch", {
            checked: $setup.settings.mirroredX,
            onChange: $setup.onMirroredXChange
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.BooleanAppSetting_DefaultFlipY")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("switch", {
            checked: $setup.settings.mirroredY,
            onChange: $setup.onMirroredYChange
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.NumberAppSetting_SideMargin")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("slider", {
            style: { "width": "50%" },
            value: $setup.settings.sideMargin,
            min: 0,
            max: 99,
            step: 1,
            "show-value": "",
            onChange: $setup.onSideMarginChange
          }, null, 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.NumberAppSetting_LineHeight")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("slider", {
            style: { "width": "50%" },
            value: $setup.settings.lineHeightRate,
            min: 1,
            max: 2,
            step: 0.1,
            "show-value": "",
            onChange: $setup.onCountdownLineHeight
          }, null, 40, ["value"])
        ]),
        vue.createElementVNode("view", { class: "settings-item" }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString(_ctx.$t("SettingsScreen.Transparent_Background")),
            1
            /* TEXT */
          ),
          vue.createElementVNode("switch", {
            checked: $setup.settings.transparentBackground,
            onChange: $setup.onTransparentBackgroundChange
          }, null, 40, ["checked"])
        ]),
        vue.createElementVNode(
          "button",
          {
            class: "reset-button",
            onClick: $setup.resetSettings
          },
          vue.toDisplayString(_ctx.$t("SettingsScreen.ListTile_Reset")),
          1
          /* TEXT */
        )
      ]),
      vue.createVNode(_component_u_picker, {
        mode: "selector",
        modelValue: $setup.isFontPickerVisible,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.isFontPickerVisible = $event),
        range: $setup.fontList,
        "range-key": "name",
        "default-selector": [$setup.currentFontIndex],
        onConfirm: $setup.onFontChange,
        onCancel: _cache[1] || (_cache[1] = ($event) => $setup.isFontPickerVisible = false)
      }, null, 8, ["modelValue", "range", "default-selector"])
    ]);
  }
  const PagesSettingsSettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-7fad0a1c"], ["__file", "E:/git/wordPrompt/pages/settings/settings.vue"]]);
  const _sfc_main$1 = {
    __name: "open-file",
    setup(__props, { expose: __expose }) {
      __expose();
      const scriptStore = useScriptStore();
      const scripts = vue.ref([]);
      vue.onMounted(async () => {
        loadScripts();
      });
      const loadScripts = async () => {
        scripts.value = await scriptStore.getScripts();
      };
      const selectFile = async () => {
        try {
          const [fileInfo] = await uni.chooseFile({
            count: 1,
            extension: [".txt"]
          });
          if (fileInfo) {
            const fileContent = await uni.getFileSystemManager().readFileSync(fileInfo.path, "utf8");
            scriptStore.setText(fileContent);
            scriptStore.setTitle(fileInfo.name);
            uni.navigateBack();
          }
        } catch (error) {
          formatAppLog("error", "at pages/open-file/open-file.vue:61", "File selection error:", error);
        }
      };
      const loadScript = async (scriptId) => {
        const content = await scriptStore.loadScript(scriptId);
        scriptStore.setText(content);
        uni.navigateBack();
      };
      const deleteScript = async (scriptId) => {
        await scriptStore.deleteScript(scriptId);
        loadScripts();
      };
      const __returned__ = { scriptStore, scripts, loadScripts, selectFile, loadScript, deleteScript, ref: vue.ref, onMounted: vue.onMounted, get useScriptStore() {
        return useScriptStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_0$3);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "open-file-screen" }, [
      vue.createElementVNode("view", { class: "button-container" }, [
        vue.createVNode(_component_u_button, { onClick: $setup.selectFile }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(
              vue.toDisplayString(_ctx.$t("OpenFileScreen.ElevatedButton_Select")),
              1
              /* TEXT */
            )
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      $setup.scripts.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "file-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.scripts, (script) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: script.id,
              class: "file-item"
            }, [
              vue.createElementVNode("view", {
                class: "file-info",
                onClick: ($event) => $setup.loadScript(script.id)
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "file-title" },
                  vue.toDisplayString(script.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "file-date" },
                  vue.toDisplayString(script.createdAt),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]),
              vue.createElementVNode("view", { class: "file-actions" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "trash",
                  size: "24",
                  onClick: ($event) => $setup.deleteScript(script.id)
                }, null, 8, ["onClick"])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "empty-state"
      }, [
        vue.createElementVNode(
          "text",
          { class: "empty-text" },
          vue.toDisplayString(_ctx.$t("OpenFileScreen.if_empty")),
          1
          /* TEXT */
        )
      ]))
    ]);
  }
  const PagesOpenFileOpenFile = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "E:/git/wordPrompt/pages/open-file/open-file.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/prompter/prompter", PagesPrompterPrompter);
  __definePage("pages/settings/settings", PagesSettingsSettings);
  __definePage("pages/open-file/open-file", PagesOpenFileOpenFile);
  const _sfc_main = {
    data() {
      return {
        showHeader: true
      };
    },
    onLaunch: function() {
      formatAppLog("log", "at App.vue:18", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:21", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:24", "App Hide");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_page_head = vue.resolveComponent("page-head");
    const _component_router_view = vue.resolveComponent("router-view");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $data.showHeader ? (vue.openBlock(), vue.createBlock(_component_page_head, { key: 0 })) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_router_view)
      ])
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/git/wordPrompt/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/).test(newValue);
  }
  function video(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8|3gp)$/).test(newValue);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  function string(value) {
    return typeof value === "string";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  const addUnit = function(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  };
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim$1(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title2, duration = 1500) {
    uni.showToast({
      title: title2,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(function() {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:26", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim: trim$1,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    addStyle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  const title$1 = "Teleprompter";
  const HomeScreen$1 = {
    TextField_hintText: "Enter your text here...",
    ElevatedButton_Start: "Start",
    ElevatedButton_Select: "Select File",
    ElevatedButton_Save: "Save",
    BottomSheet: {
      Text_Title: "Save Script",
      TextField_hintText: "Enter script title",
      ElevatedButton_Save: "Save"
    },
    IconButton_Settings: "Settings",
    IconButton_SourceCode: "Source Code",
    IconButton_SourceCode_Copied: "Source code URL copied!",
    IconButton_About: "About",
    Text_Saved: "Saved!"
  };
  const OpenFileScreen$1 = {
    title: "Open File",
    ElevatedButton_Select: "Select File",
    ListTile_Delete: "Delete",
    if_empty: "No saved prompts yet."
  };
  const SettingsScreen$1 = {
    title: "Settings",
    DropdownAppSetting_DefaultLanguage: "Language",
    NumberAppSetting_DefaultScrollSpeed: "Default Scroll Speed",
    NumberAppSetting_DefaultScrollSpeed_Unit: "lines/s",
    NumberAppSetting_DefaultFontSize: "Default Font Size",
    NumberAppSetting_DefaultFontSize_Unit: "pt",
    DropdownAppSetting_DefaultTextAlignment: "Default Text Alignment",
    DropdownAppSetting_DefaultTextAlignment_Unit: {
      Left: "Left",
      Center: "Center",
      Right: "Right",
      Justified: "Justified"
    },
    DropdownAppSetting_DefaultFontFamily: "Default Font",
    BooleanAppSetting_DefaultFlipX: "Mirror Horizontally",
    BooleanAppSetting_DefaultFlipY: "Mirror Vertically",
    NumberAppSetting_SideMargin: "Side Margin",
    NumberAppSetting_SideMargin_Unit: "%",
    NumberAppSetting_CountdownTimer: "Countdown Duration",
    NumberAppSetting_LineHeight: "lineHeightRate",
    NumberAppSetting_CountdownTimer_Unit: "s",
    ListTile_Reset: "Reset Settings",
    Transparent_Background: "Transparent Background"
  };
  const en = {
    title: title$1,
    HomeScreen: HomeScreen$1,
    OpenFileScreen: OpenFileScreen$1,
    SettingsScreen: SettingsScreen$1
  };
  const title = "提词器";
  const HomeScreen = {
    TextField_hintText: "在此输入文本...",
    ElevatedButton_Start: "开始",
    ElevatedButton_Select: "选择文件",
    ElevatedButton_Save: "保存",
    BottomSheet: {
      Text_Title: "保存脚本",
      TextField_hintText: "输入脚本标题",
      ElevatedButton_Save: "保存"
    },
    IconButton_Settings: "设置",
    IconButton_SourceCode: "源代码",
    IconButton_SourceCode_Copied: "源代码链接已复制！",
    IconButton_About: "关于",
    Text_Saved: "提示词已保存！"
  };
  const OpenFileScreen = {
    title: "打开文件",
    ElevatedButton_Select: "选择文件",
    ListTile_Delete: "删除",
    if_empty: "还没有保存提示词。"
  };
  const SettingsScreen = {
    title: "设置",
    DropdownAppSetting_DefaultLanguage: "语言",
    NumberAppSetting_DefaultScrollSpeed: "默认滚动速度",
    NumberAppSetting_DefaultScrollSpeed_Unit: "行/秒",
    NumberAppSetting_DefaultFontSize: "默认字体大小",
    NumberAppSetting_DefaultFontSize_Unit: "磅",
    DropdownAppSetting_DefaultTextAlignment: "默认文本对齐",
    DropdownAppSetting_DefaultTextAlignment_Unit: {
      Left: "左对齐",
      Center: "居中",
      Right: "右对齐",
      Justified: "两端对齐"
    },
    DropdownAppSetting_DefaultFontFamily: "默认字体",
    BooleanAppSetting_DefaultFlipX: "水平镜像",
    BooleanAppSetting_DefaultFlipY: "垂直镜像",
    NumberAppSetting_SideMargin: "侧边距",
    NumberAppSetting_SideMargin_Unit: "%",
    NumberAppSetting_CountdownTimer: "倒计时时长",
    NumberAppSetting_LineHeight: "行高系数",
    NumberAppSetting_CountdownTimer_Unit: "秒",
    ListTile_Reset: "重置设置",
    Transparent_Background: "透明背景"
  };
  const zhHans = {
    title,
    HomeScreen,
    OpenFileScreen,
    SettingsScreen
  };
  const messages = {
    legacy: false,
    "en-US": en,
    "zh-CN": zhHans
  };
  const i18n = createI18n({
    locale: uni.getStorageSync("locale") || "zh-CN",
    messages
  });
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    app.use(i18n);
    app.use(uView);
    return {
      app,
      Pinia
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

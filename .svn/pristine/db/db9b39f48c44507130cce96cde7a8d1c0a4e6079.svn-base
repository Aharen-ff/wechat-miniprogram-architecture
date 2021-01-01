Component({
  properties: {
    lat: String,
    lng: {
      type: String,
      value: '122.12345', // 默认值
    },
  },

  methods: {
    bindInput(e) {
      const {
        detail: { value },
        target: { id },
      } = e;

      // 使用 triggerEvent 向父组件（父页面）发送事件
      const payload = {
        key: id,
        value,
      };
      this.triggerEvent('on-edit', payload);
    },
  },
});

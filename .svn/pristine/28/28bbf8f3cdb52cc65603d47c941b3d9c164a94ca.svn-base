import { toast } from '../../../utils/index';
import { exampleApi } from '../apis/map.do';

Page({
  data: {
    lat: '',
    lng: '',
  },

  onEdit(e) {
    const {
      detail: { key, value }
    } = e; // e.detail 就是子组件传出的 payload

    // 建议统一在父页面进行数据更新，
    // 遵循数据单向流动原则
    this.setData({
      [key]: value,
    });
  },

  async bindRequest() {
    const { lat, lng } = this.data;

    let res;
    try {
      res = await exampleApi({ lat, lng });
    } catch (e) {
      toast(e.message);
    }
  },
});

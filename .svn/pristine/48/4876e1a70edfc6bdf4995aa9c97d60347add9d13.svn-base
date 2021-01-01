export function showModal() {
  if (!arguments[0]) return;
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...arguments[0],
      success: (res) => {
        if (res.confirm) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail: () => {
        resolve(false);
      },
    });
  });
}

/**
 * @func 首位补零
 * @param {number} number
 */
const zeroPrefix = (number) => {
  if ((typeof number) !== 'number' || number <= 0) return false;
  return number < 10
    ? `0${number}`
    : number;
};

/**
 * @func 格式化日期
 * @param {string|object} date
 * @param {string} separator
 */
const dateFormatter = (separator) => (date = Date.now()) => {
  const mDate = new Date(date);
  if (mDate.toString() === 'Invalid Date') return false;

  const year = zeroPrefix(mDate.getFullYear());
  const month = zeroPrefix(mDate.getMonth() + 1);
  const day = zeroPrefix(mDate.getDate());

  return `${year}${separator}${month}${separator}${day}`;
};
export const dashDate = dateFormatter('-');
export const splashDate = dateFormatter('/');

/**
 * @func 获取当前月天数
 * @param {string|object} date
 */
const getMonthDayCount = (date = Date.now()) => {
  const mDate = new Date(date);
  if (mDate.toString() === 'Invalid Date') return false;

  const currentYear = mDate.getFullYear();
  const currentMonth = mDate.getMonth() + 1;

  switch (currentMonth) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;
    case 4: case 6: case 9: case 11:
      return 30;
    case 2:
      return (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0
        ? 29
        : 28;
    default:
      return false;
  }
}

/**
 * @func 判断是否需要安全边距
 * @param {object} systemInfo
 * @param {string} systemInfo.brand 品牌
 * @param {string} systemInfo.model 型号
 */
export const needSafeBottom = ({ brand, model }) => {
  const brandStr = String(brand);
  const modelStr = String(model);
  return brandStr !== 'devtools'
    && (modelStr.search('iPhone X') !== -1
      || modelStr.search('iPhone 11') !== -1
      || modelStr.search('iPhone 12') !== -1);
}

/**
 * @func 封装toast
 * @param {string} title
 * @param {number} duration
 * @param {string} icon
 */
export function toast(e) {
  if (typeof e === 'string') {
    wx.showToast({
      title: e,
      icon: 'none',
    });
    return;
  }

  const { title = '', duration = 2000, icon = 'none' } = e;
  wx.showToast({
    icon,
    title,
    duration,
  });
};

export function json2Form(json) {
  const str = [];
  for (const p in json) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`);
  }
  return str.join('&');
}
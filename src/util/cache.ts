/**
 * 设置缓存
 */
export const setItem = (key: string, value: any) => {
  if (value == null) {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
    return false;
  }
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
};

/**
 * 获取缓存
 */
export const getItem = (key: string) => {
  let result = null;
  try {
    result = localStorage.getItem(key) as string;
    if (result != null) {
      result = JSON.parse(result);
    } else {
      result = null;
    }
  } catch (error) {
  } finally {
    return result;
  }
};

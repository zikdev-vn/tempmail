import { useState, useEffect } from 'react';

/**
 * Custom hook để quản lý localStorage an toàn
 * @param {string} key - Key trong localStorage
 * @param {any} initialValue - Giá trị mặc định
 * @returns {[value, setValue, removeValue]}
 */
export const useLocalStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Kiểm tra nếu đang chạy trên server (SSR)
      if (typeof window === 'undefined') {
        return initialValue;
      }

      // Lấy từ localStorage
      const item = window.localStorage.getItem(key);
      
      // Nếu item là 'undefined' hoặc không hợp lệ, xóa và trả về giá trị mặc định
      if (item === null || item === 'undefined' || item === 'null' || item === 'undefined' || item.trim() === '') {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      // Nếu có dữ liệu hợp lệ thì parse
      return JSON.parse(item);
      
    } catch (error) {
      console.error(`❌ Error reading localStorage key "${key}":`, error);
      console.error('Raw value:', window.localStorage.getItem(key));
      
      // Xóa dữ liệu bị lỗi
      try {
        window.localStorage.removeItem(key);
      } catch (removeError) {
        console.error('❌ Error removing corrupted localStorage item:', removeError);
      }
      
      return initialValue;
    }
  });

  // Hàm để set giá trị
  const setValue = (value) => {
    try {
      // Cho phép value là một function (giống useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Cập nhật state
      setStoredValue(valueToStore);
      
      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        if (valueToStore === null || valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error(`❌ Error setting localStorage key "${key}":`, error);
      
      // Lấy lại valueToStore trong catch block
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Nếu lỗi QuotaExceededError, thử xóa một số dữ liệu cũ
      if (error.name === 'QuotaExceededError') {
        console.warn('💾 LocalStorage quota exceeded, attempting to clear old data...');
        try {
          // Xóa tất cả dữ liệu (hoặc bạn có thể implement logic thông minh hơn)
          window.localStorage.clear();
          // Thử lưu lại
          if (valueToStore !== null && valueToStore !== undefined) {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          console.log('✅ Successfully saved after clearing localStorage');
        } catch (retryError) {
          console.error('❌ Still failed after clearing localStorage:', retryError);
        }
      }
    }
  };

  // Hàm để xóa giá trị
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`❌ Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};


/**
 * Hook để check localStorage có khả dụng không
 * @returns {boolean}
 */
export const useLocalStorageAvailable = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setIsAvailable(false);
        return;
      }

      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      setIsAvailable(true);
    } catch (error) {
      console.warn('⚠️ LocalStorage is not available:', error);
      setIsAvailable(false);
    }
  }, []);

  return isAvailable;
};

/**
 * Hook để lấy thông tin về localStorage
 * @returns {object} Thông tin về localStorage
 */
export const useLocalStorageInfo = () => {
  const [info, setInfo] = useState({
    isAvailable: false,
    usedSpace: 0,
    totalKeys: 0
  });

  useEffect(() => {
    const updateInfo = () => {
      try {
        if (typeof window === 'undefined') {
          return;
        }

        let usedSpace = 0;
        let totalKeys = 0;

        for (let key in window.localStorage) {
          if (window.localStorage.hasOwnProperty(key)) {
            usedSpace += window.localStorage[key].length + key.length;
            totalKeys++;
          }
        }

        setInfo({
          isAvailable: true,
          usedSpace,
          totalKeys
        });
      } catch (error) {
        setInfo({
          isAvailable: false,
          usedSpace: 0,
          totalKeys: 0
        });
      }
    };

    updateInfo();
    
    // Update info every 5 seconds
    const interval = setInterval(updateInfo, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return info;
};
import { useCallback } from 'react';
import { notification } from 'antd';

const useShowMessage = () => {
  return useCallback((text: string, type: 'success' | 'error' = 'success') => {
    switch (type) {
      case 'success':
        return notification.success({
          message: text,
          placement: 'top',
        });

      case 'error':
        return notification.error({
          message: text,
          placement: 'top',
        });

      default:
        break;
    }
  }, []);
};

export default useShowMessage;

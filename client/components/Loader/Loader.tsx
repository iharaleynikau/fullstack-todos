'use client';

import './Loader.css';
import { Spin } from 'antd';

const Loader = () => {
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  );
};

export default Loader;

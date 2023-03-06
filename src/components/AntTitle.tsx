import React from 'react';

import { Typography } from 'antd';
const { Title } = Typography;

const AntTitle = (props: { content: string }) => {
  return (
    <>
      <Title level={2}>{props.content}</Title>
    </>
  );
};

export default AntTitle;

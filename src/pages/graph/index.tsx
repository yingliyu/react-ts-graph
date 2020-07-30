import React from 'react';
import Graph from '../../components/graph';

const GraphPage: React.FC = props => (
  <div>
    <h3>知识图谱</h3>
    <Graph {...props}></Graph>
  </div>
);
export default GraphPage;

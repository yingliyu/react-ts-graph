import React from 'react';
import { Link } from 'react-router-dom';
const Home: React.FC = props => {
  console.log(props);

  return (
    <div>
      <h2>Welcome Here ... </h2>
      <Link to="/graph">To Graph</Link>
    </div>
  );
};
export default Home;

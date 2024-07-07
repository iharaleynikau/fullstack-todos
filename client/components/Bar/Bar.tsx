import AuthButtons from '../AuthButtons/AuthButtons';
import './Bar.css';

const Bar = () => {
  return (
    <div className="bar">
      <div className="bar-content container">
        <AuthButtons />
      </div>
    </div>
  );
};

export default Bar;

import paperImg from './assets/paper.png'

const Paper = ({ handleClick, display }) => {
    return display ? (
      <div>
        <img 
        src={paperImg} 
        alt='paper'
        onClick={handleClick} />
      </div>
    ) : null
  }
  
  export default Paper;
import rockImg from './assets/rock.png'

const PapRocker = ({ handleClick, display }) => {
    return display ? (
      <div>
        <img 
        src={rockImg} 
        alt='rock'
        onClick={handleClick} />
      </div>
    ) : null
  }
  
  export default Rock;

import { 
    url, 
    loader_img
} from '../../Data'


const Preloader  = ({text}) => {
    return (
        <div className="preloader-box">
            <div className="loader-dark-skin">
                <div className="loader-item">
                    <img src={loader_img('1.gif')} alt="preloader"/>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}


export default Preloader
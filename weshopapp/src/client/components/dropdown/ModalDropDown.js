
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'


const ModalDropDown = () => {
    return (
        <div className="modal-dropdown">
            <div className="dark-skin">
                <div className="modal-dropdown-body">
                    <div className="modal-close"><FontAwesomeIcon className="icon"  icon={faXmark} /></div>
                    <div className="body-modal">
                        <h4>Do you wish to delete this review?</h4>
                        <button>
                            <FontAwesomeIcon className="icon"  icon={faTrashCan} />Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalDropDown
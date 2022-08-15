// import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {  url, name } from '../../Data'


const LogoutDropDown = ({username, logoutUserModal, modalToggle}) => {
    return (
        <div className="modal-dropdown">
            <div className="dark-skin">
                <div className="modal-dropdown-body wd-2">
                    <div className="modal-close"><FontAwesomeIcon onClick={() => modalToggle(false, null)}className="icon"  icon={faXmark} /></div>
                    <div className="body-modal logout-modal">
                        <div className="title-header">
                            <h3>Logout user?</h3>
                        </div>
                        <p>{username ? (<b>{name(username)}, </b>) : ''} are you sure you want to logout?</p>
                        <div className="logout-button">
                            <button type="button" onClick={(e) => logoutUserModal(e)} className="logout">Logout</button>
                            <button type="button" onClick={() => modalToggle(false, null)}className="cancel">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LogoutDropDown
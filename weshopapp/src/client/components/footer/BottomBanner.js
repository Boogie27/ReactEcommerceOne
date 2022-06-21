import React  from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStar,
  faPlaneUp,
  faThumbsUp,
  faSackDollar,
  faPiggyBank,
} from '@fortawesome/free-solid-svg-icons'



const BottomBanner = () => {
    return (
      <div className="bottom-banner-container">
          <div className="bottom-banner">
            <Row className="show-grid">
              <Col xs={12} sm={6} md={6} lg={3}>
                <BottomBannerItems name={faSackDollar} text="14-DAY MONEY BACK"/>
              </Col>
              <Col xs={12} sm={6} md={6} lg={3}>
                <BottomBannerItems name={faPiggyBank} text="MONEY BACK GUARENTEE"/>
              </Col>
              <Col xs={12} sm={6} md={6} lg={3}>
                <BottomBannerItems name={faThumbsUp} text="SAVE 20% WHEN YOU"/>
              </Col>
              <Col xs={12} sm={6} md={6} lg={3}>
                <BottomBannerItems name={faPlaneUp} text="FAST FREE SHIPMENT"/>
              </Col>
            </Row>
          </div>
        </div>
    )
}



export default BottomBanner
  
  
  
const BottomBannerItems = ({name, text}) => {
    return (
      <div className="bottom-banner-item">
        <ul>
          <li><FontAwesomeIcon  className="icon"icon={name} /></li>
          <li><h4>{text}</h4></li>
        </ul>
      </div>
    )
}
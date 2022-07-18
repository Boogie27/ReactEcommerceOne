





const FloatItems = ({latestProduct, showQuickView}) => {
    const [floatImage, setFloatImage] = useState(false)
  
    const floatImageScreenIn = () => {
      setFloatImage(true)
    }
  
    const floatImageScreenOut = () => {
      setFloatImage(false)
    }
  
    return (
      <div className="float-item" onMouseEnter={() => floatImageScreenIn()} onMouseLeave={() => floatImageScreenOut()}>
        {
          latestProduct.image.length > 1 ? (
          <div className={`float-item-img ${floatImage && 'active'}`}>
           <NavLink to={`/detail?product=${latestProduct._id}`}>
              <img src={productImageURL + latestProduct.image[1]} alt={latestProduct.product_name}/>
            </NavLink>
          </div>
          ) : null
        }
        <div className="float-item-btn">
          <ul className={`${floatImage && 'active'}`}>
            <li className="icon-btn"><FontAwesomeIcon className="icon"  icon={faHeart} /></li>
            <li className="icon-btn"><FontAwesomeIcon onClick={() => showQuickView(latestProduct)} className="icon"  icon={faEye} /></li>
          </ul>
        </div>
      </div>
    )
}
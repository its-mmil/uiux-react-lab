function BakeryItem({name,price,image,description, addToCart}) {
    return (
        <div className="bakery-item" onClick={() => addToCart(name, price)}>
          <h3>{name} - {price}</h3>
          <img src={image} className="BakeryItem"/>
          <p className="description">{description}</p>

        </div>
    );
}

export default BakeryItem;
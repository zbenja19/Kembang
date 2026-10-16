import Text from '../atoms/Text';
import PriceTag from '../atoms/PriceTag';
<<<<<<< HEAD


function CardBody({ title, description, price, OriginalPrice}) {
 return (
   <>
     <Text variant="h5">{title}</Text>
     <Text variant="p">{description}</Text>
     <Text variant="span" className="text-muted">
     <PriceTag price={price} OriginalPrice={OriginalPrice} />
    
     </Text>
   </>
 );
=======
import "../../styles/molecules/CardBody.css";

// [Propio] Se recibe "originalPrice" (camelCase), igual a como lo envía ProductCard.
function CardBody({ title, description, price, originalPrice, children }) {
  return (
    <div className="cardbody">
      <Text variant="h5" className="cardbody__title">{title}</Text>
      <Text variant="p" className="cardbody__description">{description}</Text>

      <div className="cardbody__footer">
        <PriceTag price={price} OriginalPrice={originalPrice} />
        {children}
      </div>
    </div>
  );
>>>>>>> e447328 (registrar y product detail)
}

export default CardBody;
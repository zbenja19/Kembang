import Text from '../atoms/Text';
import PriceTag from '../atoms/PriceTag';
import '../../styles/molecules/CardBody.css';

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
}

export default CardBody;

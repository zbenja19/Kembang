function PriceTag({price, OriginalPrice}) {
    return (
        <div>
            {OriginalPrice && (
                <div className="text-decoration-line text-muted me-2">
                    ${OriginalPrice}
                </div>
            )}
            <div className={OriginalPrice ? "text-danger fw_bold" : ""}>${price}</div>
        </div>
    );
} 

export default PriceTag;
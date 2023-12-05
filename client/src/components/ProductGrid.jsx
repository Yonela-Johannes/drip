// import { useNavigation } from "react-router-dom";

const ProductGrid = ({products, title }) => {
  // const navigate = useNavigation();
  function getRandomDateInNext7Days() {
    const currentDate = new Date();
    const next7Days = new Date(currentDate);
    next7Days.setDate(currentDate.getDate() + 7);

    const randomDate = new Date(
      currentDate.getTime() +
        Math.random() * (next7Days.getTime() - currentDate.getTime())
    );

    const options = {
      day: "numeric",
      month: "long",
    };

    const formattedDate = randomDate.toLocaleDateString("en-US", options);

    return formattedDate;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between ">
        <h4 className="font-semibold">{title}</h4>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-col justify-center items-center cursor-pointer"
            // onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="flex flex-col items-start">
              <div className="flex justify-center mb-2 relative h-40 w-64">
                <img src={product?.imageUrl} className="object-center object-cover rounded-md" alt="product" />
              </div>

              <h3>{product?.name}</h3>
              <div className="flex items-center gap-2">
              </div>
              <div className="font-medium">
                <span>R</span>
                <span>{product?.price}</span>
              </div>

              <div className="text-sm">
                Get it by {getRandomDateInNext7Days()}
              </div>
              <div className="text-green-600 text-sm font-semibold">In stock</div>
            </div>
          </div>
        ))?.slice(0, 8)}
      </div>
    </div>
  );
};

export default ProductGrid;

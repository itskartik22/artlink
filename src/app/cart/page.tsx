import { Button } from "@/components/ui/button";

const Cart = () => {
  return (
    <div className="flex items-center m-10 mx-20 justify-between gap-4 max-sm:flex-col max-md:m-2">
      
      <div className="flex flex-col p-5 w-1/3 h-52 gap-2 bg-slate-200 max-md:w-[90%]">
        <p className="paragraph shadow-sm">Price details</p>
        <span className="flex flex-row justify-between">
          <p>price(3items)</p> <p>$200</p>
        </span>
        <span className="flex flex-row justify-between">
          <p>Discount</p> <p>$10</p>
        </span>
        <span className="flex flex-row justify-between shadow-sm">
          <p>Dilevery Charges</p>
          <p>
            <span className=" text-gray-500 line-through">$2</span>Free
          </p>
        </span>
        <span className="flex flex-row justify-between">
          <p>Total</p>
          <p className="text-red-900">$210</p>
        </span>
      </div>
      <div className="flex flex-col w-[60%] p-5 h-52 gap-2 bg-slate-300 max-md:w-[90%]">
        <div className="h-12">product 1</div>
        <div className="h-12">product 2</div>
        <div className="h-12">product 3</div>
        <Button>
            Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;

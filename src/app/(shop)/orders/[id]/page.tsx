import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}


export default function OrderPage({ params }: Props) {
  const { id } = params
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* shopping cart */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">Payed</span>
            </div>

            {/* Items */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex items-center mb-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    style={{
                      width: '150px',
                      height: '150px'
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                    <p className="font-bold">Subtotal: ${product.price}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Shipping Address</h2>
            <div className="mb-10">
              <p>Pancho Hernandez</p>
              <p>15th Street 8975</p>
              <p>Seattle, Washington</p>
            </div>


            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>Total quantity</span>
              <span className="text-right">3 products</span>

              <span>Shipping</span>
              <span className="text-right">Free</span>

              <span>Sales Tax</span>
              {/*TODO: hoverable icon that shows how sales tax are calculated */}
              <span className="text-right">$10</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="text-right mt-5 text-2xl">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div className={
                clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true
                  }
                )
              }>
                <IoCardOutline size={30} />
                <span className="mx-2">Payed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { getOrderById } from "@/actions";
import { OrderStatus, Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { PayPalButton } from '@/components';


interface Props {
  params: {
    id: string
  }
}


export default async function OrderPage({ params }: Props) {
  const { id } = params

  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* shopping cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {

              order!.OrderItem.map(item => (
                <div key={item.product.slug + '-' + item.size} className="flex items-center mb-5">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '150px',
                      height: '150px'
                    }}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>${item.price}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Shipping Address</h2>
            <div className="mb-10">
              <p className='text-xl'>{address!.firstName} {address!.lastName}</p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.zipCode}</p>
              <p>{address!.city}, {address!.countryId}</p>
              <p>{address!.phone}</p>
            </div>


            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>Total quantity</span>
              <span className="text-right">{order?.itemsInOrder == 1 ? '1 article' :
                `${order?.itemsInOrder} articles`}</span>

              <span>Shipping</span>
              <span className="text-right">Free</span>

              <span>Sales Tax</span>
              {/*TODO: hoverable icon that shows how sales tax are calculated */}
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subtotal)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="text-right mt-5 text-2xl">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {
                order?.isPaid
                  ? (
                    <OrderStatus isPaid={order?.isPaid ?? false} />
                  )
                  : (
                    <PayPalButton amount={order!.total} orderId={order!.id} />
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
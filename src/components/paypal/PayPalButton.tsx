'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from "@/actions"
import async from '../../app/(shop)/orders/[id]/page';

interface Props {
    orderId: string
    amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
    const [{ isPending }] = usePayPalScriptReducer()

    const roundedAmount = (Math.round(amount * 100)) / 100

    if (isPending) {
        return (
            <div className="animate-pulse mb-11">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded mt-2"></div>
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${roundedAmount}`,
                        currency_code: 'USD',
                    }
                }
            ]
        })

        const { ok } = await setTransactionId(orderId, transactionId)
        if (!ok) {
            throw new Error('could not set transaction id')
        }

        return transactionId
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture()
        if (!details) return
        if (details.id) {
            await paypalCheckPayment(details.id)
        }

    }

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )
}


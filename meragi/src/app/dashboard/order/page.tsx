import { Button } from "@/components/ui/button";

export default function Order () {
    const orders = [
        {
            tableId: 1,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 1,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 2,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 3,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 4,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 5,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        },
        {
            tableId: 6,
            orders: [
                {
                    item: 'Pizza',
                    qty: 1,
                    price: 189
                },
                {
                    item: 'Burger',
                    qty: 2,
                    price: 300
                }
            ]
        }
    ]

    const groupedOrders = orders.reduce((acc: any, order: any) => {
        if (!acc[order.tableId]) {
            acc[order.tableId] = [];
        }
        acc[order.tableId].push(order);
        return acc;
    }, {});

    return (
        <div>
            <h1>Order management</h1>
            <div className="flex gap-5 overflow-x-auto max-w-full">
                {Object.keys(groupedOrders).map((tableId) => (
                    <div className="mt-5 min-w-[15rem]" key={tableId}>
                        <h2 className="font-semibold text-sm text-center">Table {tableId}</h2>
                        <div className="mt-5">
                            {groupedOrders[tableId].map((item: any, index: number) => (
                                <div className="bg-green-200 text-xs p-3 mt-3 rounded-md" key={index}>
                                    <h2 className="font-bold">orderno #2323</h2>
                                    {item.orders.map((order: any, orderIndex: number) => (
                                        <div className="mt-2" key={orderIndex}>
                                            <div className="flex justify-between">
                                                <p>{order.item}</p>
                                                <p>{order.qty}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded-md font-semibold">
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button className="mt-5 w-full" variant="outline">Checkout order</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
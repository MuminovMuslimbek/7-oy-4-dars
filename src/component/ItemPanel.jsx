import React, { useState } from "react";
import Trousers from "../assets/trousers.png";
import Jacket from "../assets/jacket.png";
import Shoes from "../assets/shoes.png";

const initialItems = [
    { id: 1, name: Jacket, type: "body" },
    { id: 2, name: Trousers, type: "leg" },
    { id: 3, name: Shoes, type: "feet" },
]

function ItemPanel({ onItemUsed = () => { } }) {
    const [items, setItems] = useState(initialItems)

    function handleDragStart(e, item) {
        e.dataTransfer.setData("item", JSON.stringify(item))
    }

    function handleItemUsed(id) {
        setItems((prev) => prev.filter((item) => item.id !== id))
        onItemUsed(id)
    }

    return (
        <div className="flex flex-col gap-3 m-[20px]">
            {items.map((item) => (
                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item)} onDragEnd={() => handleItemUsed(item.id)} className="cursor-grab active:cursor-grabbing" >
                    <img className="w-[150px] pointer-events-auto" src={item.name} alt={`item-${item.id}`} />
                </div>
            ))}
        </div>
    )
}

export default ItemPanel;

import React, { useState } from "react";
import People from "../assets/people.png";

function AvatarModel({ onDrop }) {
    const [droppedItems, setDroppedItems] = useState([]);

    function handleDrop(e) {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData("item"));

        const positions = {
            1: 98,
            2: 280,
            3: 430,
        }

        const dropX = e.clientX - e.target.getBoundingClientRect().left - 123;
        const dropY = positions[item.id] || e.clientY - e.target.getBoundingClientRect().top;

        const newItem = { ...item, x: dropX, y: dropY }
        setDroppedItems((prev) => [...prev, newItem])
        onDrop(newItem)
    };

    function handleDragOver(e) {
        e.preventDefault();
    }

    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="relative m-5 p-4 border-dashed w-[250px] h-[650px]">
            <img src={People} className="h-full pointer-events-none object-cover" alt="avatar" />
            {droppedItems.map((element, index) => (
                <img key={index} src={element.name} className="absolute" style={{ top: `${element.y}px`, left: `${element.x}px`, width: `${index == 1 && '350px' || index == 2 && '250px' || index == 3 && '10px'}` }} />
            ))}
        </div>
    )
}

export default AvatarModel;

import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import BoardFrame from './BoardFrame'

function Pending({ products, cards }) {
    // Boardların içinde kod tekrarı olmaması için 
    // BoardFrame componenti kullandım
    return (
        <Droppable droppableId='Pending'>
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <BoardFrame
                            products={products}
                            title={'Pending'}
                            cards={cards}
                        />
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Pending
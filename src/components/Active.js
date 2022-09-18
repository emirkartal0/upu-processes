import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import BoardFrame from './BoardFrame'

function Active({ products, cards }) {
    // Boardların içinde kod tekrarı olmaması için 
    // BoardFrame componenti kullandım
    return (
        <Droppable droppableId='Active' >
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <BoardFrame
                            products={products}
                            title={'Active'}
                            cards={cards}
                        />
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Active
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import BoardFrame from './BoardFrame'

function Finished({ products, cards }) {
    // Boardların içinde kod tekrarı olmaması için 
    // BoardFrame componenti kullandım
    return (
        <Droppable droppableId='Finished'>
            {
                (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <BoardFrame
                            products={products}
                            title={'Finished'}
                            cards={cards}
                        />
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default Finished
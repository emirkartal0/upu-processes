import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import db from '../Firebase'
import Active from './Active'
import Finished from './Finished'
import Pending from './Pending'
import toast from 'react-hot-toast';

function Boards({ products }) {
    const [cards, setCards] = useState([]);

    // Kartları firebase'den çekip array'e atıyorum
    useEffect(() => {
        db.collection('Cards').onSnapshot(prod => {
            setCards(prod.docs.map((doc) => ({
                docId: doc.id,
                ID: doc.data().ID,
                boardName: doc.data().boardName,
                prodMacID: doc.data().prodMacID,
                prodEmpID: doc.data().prodEmpID,
                prodNameID: doc.data().prodNameID,
            })))
        })
    }, [])

    // Drag & Drop kartların yeni sütünlara kayıtları
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;
        if (destination.droppableId === 'Pending') {
            toast.error("Geçersiz işlem!")
            return
        };
        if (source.droppableId === 'Pending') {
            toast.error("Geçersiz işlem!")
            return
        };
        if (destination.droppableId === 'Active') {
            db.collection('Cards').doc(draggableId).update({
                boardName: 'Active',
            })
        }
        if (destination.droppableId === 'Finished') {
            db.collection('Cards').doc(draggableId).update({
                boardName: 'Finished',
            })
        }
    }
    // Boards komponentinin içinde kardları listeledikten sonra 
    // Kartları sütününa göre filtreleyip yolluyorum.
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Pending products={products} cards={cards.filter(card => card.boardName == 'Pending')} />
            <Active products={products} cards={cards.filter(card => card.boardName == 'Active')} />
            <Finished products={products} cards={cards.filter(card => card.boardName == 'Finished')} />
        </DragDropContext>
    )
}

export default Boards
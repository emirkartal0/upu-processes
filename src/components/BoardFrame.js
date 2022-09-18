import React, { useState, useEffect } from 'react';
import db from '../Firebase';
import Card from './Card';

function BoardFrame({ products, title, cards }) {

    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);
    
    // Çalışan ve Makine listesini firebase'den çekip array'e atıyorum
    useEffect(() => {
        db.collection('Employees').onSnapshot(prod => {
            setEmployees(prod.docs.map((doc) => ({
                docId: doc.id,
                ID: doc.data().ID,
                Name: doc.data().Name,
                img: doc.data().img,
            })))
        })
    }, [])

    useEffect(() => {
        db.collection('Machines').onSnapshot(prod => {
            setMachines(prod.docs.map((doc) => ({
                docId: doc.id,
                ID: doc.data().ID,
                Name: doc.data().Name,
                img: doc.data().img,
            })))
        })
    }, [])

    return (
        <div className='w-96 px-4 py-2 bg-green-100 rounded-md h-full'>
            {/* bir üst component'den gelen title */}
            <div className=' flex justify-center text-2xl text-brown-700 font-light my-1'>
                {title}
            </div>
            <hr /><hr />
            <div>
                {/* Cardları filtreleyip listeliyorum */}
                {
                    cards.map((card, index) =>
                    (
                        <Card
                            key={card.ID}
                            index={index}
                            card={card}
                            id={card.docId}
                            employees={employees}
                            machines={machines}
                            product={products.find(prod => prod.ID == card.prodNameID)}
                            employee={employees.find(emp => emp.ID == card.prodEmpID)}
                            machine={machines.find(mac => mac.ID == card.prodMacID)}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BoardFrame
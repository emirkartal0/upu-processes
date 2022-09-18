import React, { Fragment, useState } from 'react'
import { Avatar } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import db from '../Firebase';
import { Draggable } from 'react-beautiful-dnd';

function Card({ card, id, index, product, employee, machine, employees, machines }) {

    // personel ve makine fotoğrafı yoksa default img
    const empImg = employee?.img ? employee?.img : 'https://firebasestorage.googleapis.com/v0/b/upu-processes.appspot.com/o/Product%2FplusPerson.png?alt=media&token=4499b3b1-d218-4a9e-aeea-b63775b1f476';
    const macImg = machine?.img ? machine?.img : 'https://firebasestorage.googleapis.com/v0/b/upu-processes.appspot.com/o/Product%2Fplus.png?alt=media&token=d6452075-951d-495f-aeb4-e7cd31d246dd';

    // personel ve makine ataması için açılan dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    // personel ve makine ataması sırasında seçileni tutan state'ler
    // [0]. indexi vermemmin sebebi onChange'den dolayı değişiklik olmazsa
    // select state'lerin içi boş kalmaması için
    const [selectMac, setSelectMac] = useState(machines[0].ID);
    const [selectEmp, setSelectEmp] = useState(employees[0].ID);

    // Pending'deki cartlara personel ve makine ataması için fonk
    const setCard = () => {
        db.collection('Cards').doc(id).update({
            boardName: 'Active',
            prodEmpID: selectEmp,
            prodMacID: selectMac,
        })
        toast.success('Processes ACTIVE!');
        handleOpen()
    }

    return (
        <Draggable draggableId={card.docId.toString()} index={index} >
            {
                (provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='flex flex-row justify-around mt-2 pt-1 rounded-xl bg-gray-100'>
                        {/*  Kartın içindeki ürün, personel, makine'yi listelediğim alan  */}
                        <div className='flex flex-col items-center py-2 gap-1'>
                            <Avatar src={`${product?.img}`} alt="productImg" size='lg' />
                            {product?.Name}
                        </div>
                        <div className='flex flex-col items-center py-2 text-center'>
                            <Avatar className='cursor-pointer' onClick={handleOpen} src={empImg} size='lg' alt="employeeImg" variant="circular" />
                            {employee?.Name || 'Add Employee'}
                        </div>
                        <div className='flex flex-col items-center  py-2 text-center '>
                            <Avatar className='cursor-pointer' onClick={handleOpen} src={macImg} size='lg' alt="machineImg" />
                            {machine?.Name || 'Add Machine'}
                        </div>
                        {/*  personel ve makine'yi eklemek için açılan dialog  */}
                        <Fragment >
                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader className='ml-5'>Personel ve makine giriniz.</DialogHeader>
                                <DialogBody className='flex flex-col' divider>
                                    <div className='flex flex-col ml-5 gap-2'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-brown-600 ml-1'>Empoloyees:</span>
                                            <div className='flex items-center gap-10'>
                                                <select
                                                    defaultValue={employees[0].ID}
                                                    onChange={(e) => setSelectEmp(e.target.value)}
                                                    className="appearance-none cursor-pointer w-1/3 px-4 py-2 text-base font-light text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-teal-100 rounded-xl transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-teal-600 focus:outline-none" >
                                                    {employees.map(emp => (
                                                        <option key={emp.ID} value={emp.ID}>
                                                            {emp.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Avatar src={`${employees.find(emp => emp.ID == selectEmp).img}`} />
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-brown-600' >Machines:</span>
                                            <div className='flex items-center gap-10'>
                                                <select
                                                    defaultValue={machines[0].ID}
                                                    onChange={(e) => setSelectMac(e.target.value)}
                                                    className="appearance-none cursor-pointer w-1/3 px-4 py-2 text-base font-light text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-teal-100 rounded-xl transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-teal-600 focus:outline-none" >
                                                    {machines.map(mac => (
                                                        <option key={mac.ID} value={mac.ID} >
                                                            {mac.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Avatar src={`${machines.find(mac => mac.ID == selectMac).img}`} />
                                            </div>
                                        </div>
                                    </div>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" onClick={setCard}>
                                        <span>Confirm</span>
                                        <Toaster />
                                    </Button>
                                </DialogFooter>
                            </Dialog>
                        </Fragment>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Card
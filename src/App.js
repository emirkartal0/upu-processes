import React, { useState, useEffect } from "react";
import Boards from "./components/Boards";
import { Button } from "@material-tailwind/react";
import db from "./Firebase"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  // ürünleri tuttuğum array
  const [products, setProducts] = useState([]);
  // eklenecek ürünü seçip tuttuğum state
  const [selectedProd, setSelectedProd] = useState(products[0]?.ID);

  // Kart ekleme fonksiyonu
  const addCard = () => {
    const uid = Math.random() * 2
    db.collection('Cards').add({
      ID: uid,
      prodNameID: selectedProd,
      prodEmpID: '',
      prodMacID: '',
      boardName: 'Pending',
    })
    toast.success('Successfully add Processes!')
  }

  // ürünleri listelemek için Products'ı çekiyorum
  useEffect(() => {
    db.collection('Products').onSnapshot(prod => {
      setProducts(prod.docs.map((doc) => ({
        id: doc.id,
        ID: doc.data().ID,
        Name: doc.data().Name,
        img: doc.data().img,
      })))
    })
  }, [])

  return (
      <div className="h-screen w-screen flex flex-col items-center bg-green-50">
        <h1 className="flex flex-col mt-2 text-brown-600 items-center font-light text-4xl">upu processes</h1>
        <div className="flex flex-row gap-5 mt-5 w-2/3 items-center justify-center">
          {/* Ürünleri listelediğim select box 
              addCard buttonu ile Pending'e ürünü ekliyor */}
          <select className="appearance-none cursor-pointer w-1/3 px-4 py-2 text-base font-light text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-teal-100 rounded-xl transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-teal-600 focus:outline-none"
            onChange={(e) => {
              setSelectedProd(e.target.value)
            }} color="purple" label="Select Version" >
            {
              products.map((prod) => (
                <option key={prod.id} value={prod.ID} >
                  {prod.Name}
                </option>
              ))
            }
          </select>
          <Toaster />
          <Button onClick={addCard} className="font-medium rounded-xl" color="teal">Add Processes</Button>
        </div>
        <div className="grid grid-cols-3 gap-16 mt-5">
          <Boards products={products} />
        </div>
      </div>
  );
}

export default App;

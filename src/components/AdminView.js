import React, {useState} from 'react'
import Search from "./Search"
import styles from "./Client.module.css"
import ImageUpload from './ImageUpload';
import axios from 'axios';
export default function AdminView(props) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemSeller, setNewItemSeller] = useState("");
  const [newItemOriginal_price, setNewOriginal_price] = useState("");
  const [newItemPromotion_price, setNewPromotion_price] = useState("");
  const [newItemShipping, setNewShipping] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [newItemImageDetail, setNewItemImageDetail] = useState("");

  const callbackFunction = (childData) => {
    setNewItemImageDetail(childData)
      setNewItemImage(childData.name)

  }


  const addNewItem = () => {
    props.addNewItem(newItemName,
                     newItemSeller,
                     newItemOriginal_price,
                     newItemPromotion_price,
                     newItemShipping,
                     newItemImage);
   setNewItemName("");
   setNewItemSeller("");
   setNewOriginal_price("");
   setNewPromotion_price("");
   setNewShipping("");
   setNewItemImage("");

    // Create an object of formData
    const formData = new FormData();
    
    // Update the formData object
    formData.append(
      "myFile",
      newItemImageDetail,
      newItemImage
    );
  
    // Details of the uploaded file
  
  
    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);


  }

  const onDeleteItemClick = (itemId) => {
    console.log("clicked delete for item id " + itemId);
    props.deleteItem(itemId);
  }

    return (
        <div>
          <h1>Add new item</h1>
          <div className="input-form" >

          <div>
           Item Name <input type="text" onChange={ (event) => setNewItemName(event.target.value) }  value={newItemName}/>
          </div>
          <div>
            Seller <input type="text" onChange={ (event) => setNewItemSeller(event.target.value) } value={newItemSeller} />
          </div>
          <div>
           Original Price <input type="text" onChange={ (event) => setNewOriginal_price(event.target.value)} value={newItemOriginal_price}  />
          </div>
          <div>
           Promotion Price <input type="text" onChange={ (event) => setNewPromotion_price(event.target.value) }  value={newItemPromotion_price} />
          </div>
          <div>
           Shipping <input type="text" onChange={ (event) => setNewShipping(event.target.value) }  value={newItemShipping}/>
          </div>
          <div>
           Image Item <ImageUpload parentCallback = {callbackFunction} /> 
         
          </div>
         
          <button onClick={ addNewItem} >Add Item</button>
          <button onClick={ props.disableAdminMode }>Disable Admin Mode</button>

        </div>
       
        <h1>List of items</h1>
        <div className= {styles.body}>
        { props.items.map((item, index) =>
        <>
          <button  onClick={() => onDeleteItemClick(item.id)} style={{height:'50px',cursor:"pointer"}}>X</button>
        <Search key={index} {...item}> </Search>
        </>  )}
        </div>
    </div>
      
    )
    }

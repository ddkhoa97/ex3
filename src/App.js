
import React from 'react';
import data from './data.json';
import AdminView from './components/AdminView';
import ClientView from './components/ClientView';
import styles from "./App.module.css"
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      items: data.items,
      SeachString  : "",
      adminMode: false,
    }
  }
 
  onSearchFieldChange = (event) => {
    this.setState({ SeachString: event.target.value });
  }

  addNewItem = (name, seller, original_price,promotion_price,shipping,image) => {
    let newItems = [...this.state.items];
    newItems.push({
      id: newItems.length + 1,
      name: name,
      seller: seller,
      original_price: original_price,
      promotion_price:promotion_price,
      shipping:shipping,
      image:image,
    });

    

    this.setState({
      items: newItems
    });
  
  }
 
  deleteItem = itemId => this.setState({items: this.state.items.filter(item => item.id !== itemId)})
  render()
  {
    console.log(this.state.items)
    let output =
    <>
       <div>
         <div className={ styles.header }> 
           <input type="text" className={ styles.searchbox } placeholder="Search" onChange={ this.onSearchFieldChange } value={ this.state.SeachString }/>
           <button onClick={() => this.setState({adminMode: !this.state.adminMode})}>Admin mode</button>
         </div>
          
           <ClientView
            items={ this.state.items.filter((item) => item.name.includes(this.state.SeachString))}
           />
        </div>
    </>
  if(this.state.adminMode) {
    output = <AdminView
                disableAdminMode={() => this.setState({adminMode: false}) }
                addNewItem={ this.addNewItem }
                items={ this.state.items }
                deleteItem={ this.deleteItem }
             />;
  }



  return (
   <>
    {output}
   </>
  )
  }
}

export default App;

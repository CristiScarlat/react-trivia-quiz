import React, { useContext } from 'react';
import Home from './pages/home/home';
import Game from './pages/game/game';
import CustomModal from './components/modal/modal'
import { StoreContext } from './context/store';

function App() {

  const { globalState, dispatch } = useContext(StoreContext)

  console.log('app', globalState)

  const handleCloseModal = () => {
    dispatch({type: 'HANDLE_MODAL', modal:{
      show: false,
      title: 'Hi!!!',
      body:  `Hi ${globalState.name}, do you want to continue?`
    }})
  }

  const handleYesButtonModal = () => {
    handleCloseModal()
  }


  return (
    <div className="App">
      <Home />
      <CustomModal 
        show={globalState.modal.show} 
        title={globalState.modal.title} 
        onHide={handleCloseModal} 
        handleCancelButton={handleCloseModal}
        cancelButtonLabel='cancel'
        handleYesButton={handleYesButtonModal}
        yesButtonLabel='yes'>
        {globalState.modal.body}  
      </CustomModal>
    </div>
  );
}

export default App;

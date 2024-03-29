import React, { useContext,  useRef, useState } from 'react';
import  { Store } from '../store';
import api from '../API/api';

/*
* 
*@autor Adryan Ynfante <adryanynfante@gmail.com>
* se relaiza función para crear grupo de tareas,
* 
*/

export default function FormList() {
    const form = useRef(null);
    const { dispatch, state: { groupList } } = useContext(Store);
    const item = groupList.item;
    const [state, setState] = useState(item);

/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* se añade add para agregar el grupo de tareas
* 
*/

    const onAdd = async (event) => {
      const nombre = document.getElementById("name");
      /*Validación para nombre de proyecto*/
      if(!nombre.value)
    {
      nombre.focus();
      return false;
    }else if(nombre.value){

      
      const request = {
        name: state.name,
        id: null
      };
      
      try {
        const groupList = await api.grouplist.addGroupList(request);
        dispatch({ type: "add-item-group", item: groupList });
        setState({ name: "" });
        form.current.reset();
        
      }catch (error){
        console.log(error)
      }    
    }
      return true;
    }     
  
    const onEdit = async (event) => {
      //event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
        try {
            const todo = await api.todo.edit(request);
            dispatch({ type: "update-item", item: todo });
            setState({ name: "" });
            
            form.current.reset();
            
        } catch(error) {
            console.log(error);
        }
    }


/*
* 
* @autor Adryan Ynfante <adryanynfante@gmail.com>
* se retorna el input para solicitar información y botones donde  se añade grupo
* 
*/
    return (
        <form className="container">
            <img src="https://webassets.mongodb.com/_com_assets/cms/logo_baja-9r83aqmpo0.png" alt="Sofka" className='center'/>
            <br></br>
            <h1>Gestión de Proyectos</h1>
            <br></br>
          <div className="row">
            <input
                  className="form-control col-10"
                  type="text"
                  name="name"
                  id='name'
                  required="required" 
                  placeholder="Nombre de proyecto"
                  defaultValue={item.name}
                  onChange={(event) => {
                  setState({ ...state, name: event.target.value })
                  }} ></input>
                  <br></br>
            {item.id && <button className='btn btn-primary' onClick={() => { onEdit();  }}>Actualizar</button>}
            {!item.id && 
              <button className="btn btn-success btn-sm col-2" onClick={() => { onAdd();  }}>
                Crear proyecto
              </button>}
          </div>
        </form>
    );
  }

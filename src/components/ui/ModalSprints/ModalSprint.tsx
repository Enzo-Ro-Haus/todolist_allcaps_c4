import { sprintStore } from "../../../store/sprintStore";
import { FC, useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ModalSprint.module.css";

type IModalSprints = {
  handleCloseModal: VoidFunction;
};

const initialState: ISprint = {
  nombre: "",
  fechaInicio: null,
  fechaCierre: null,
};


export const ModalSprint: FC<IModalSprints> = ({handleCloseModal}) => {
  const sprintActivo = sprintStore((state) => state.sprintActivo);
  const [formValues, setFormValues] = useState<ISprint>(initialState);

  useEffect(()=>{
    if(sprintActivo) setFormValues(sprintActivo);
  },[]);

  console.log(formValues);

  return (
    <div className={styles.containerModalSprints}>
      <div className={styles.contentPopUP}>
        <div>
          <h3>{sprintActivo ? "Editar Sprint" : "Crear Sprint"}</h3>
        </div>
        <form className={styles.formContent}>
          <div>
            <input type="text" required autoComplete="off" placeholder="Ingrese un nombre" name="titulo" />
            <input type="date" required autoComplete="off" placeholder="Ingrese la fecha de inico" name="fechaInicio" />
            <input type="date" required autoComplete="off" placeholder="Ingrese la fecha de cierre" name="fechaCierre" />
          </div>
          <div className={styles.buttonCards}>
            <button type="submit" className={styles.buttonAcept}>
              {sprintActivo ? "Editar" : "Crear"}
            </button>
            <button className={styles.buttonCancel} onClick={handleCloseModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

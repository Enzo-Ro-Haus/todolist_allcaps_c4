import styles from "./ModalTareas.module.css";
import { tareaStore } from "../../../store/tareaStore";
import { FC, useEffect, useState } from "react";
import { ITarea } from "../../../types/ITarea";

type IModalTareas = {
  handleCloseModal: VoidFunction;
};

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: null,
};

export const ModalTareas: FC<IModalTareas> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const [formValues, setFormValues] = useState<ITarea>(initialState);

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  console.log(formValues);

  return (
    <div className={styles.containerModalTareas}>
      <div className={styles.contentPopUP}>
        <div className={styles.containerModalTitulo}>
          <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
        </div>
        <form className={styles.formContent}>
          <div>
            <div className={styles.containerTitulo}>
              <label htmlFor="titulo">Título:</label>
              <input
                type="text"
                required
                value={formValues.titulo}
                autoComplete="off"
                placeholder="Ingrese un título"
                name="titulo"
                className={styles.titulo}
              />
            </div>
            <div className={styles.containerDescripcion}>
              <label htmlFor="Descripcion">Descripción:</label>
              <textarea
                value={formValues.descripcion}
                required
                name="descripcion"
                placeholder="Ingrese una descripción"
                className={styles.descripcion}
              />
            </div>
            <div className={styles.conteinerFecha}>
              <label htmlFor="fechalimite">Fecha de limite:</label>
              <input
                type="date"
                required
                autoComplete="off"
                placeholder="Ingrese la fecha límite"
                name="fechaLimite"
                className={styles.fechaLimite}
              />
            </div>
          </div>
          <div className={styles.buttonCards}>
            <button type="submit" className={styles.buttonAcept}>
              {tareaActiva ? "Editar" : "Crear"}
            </button>
            <button className={styles.buttonCancel} onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

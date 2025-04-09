import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./CardListSprint.module.css";

type ICardListSprint = {
  sprint: ISprint;
  handleOpenModalEdit: (tarea: ISprint) => void;
};

export const CardListSprint: FC<ICardListSprint> = ({ sprint, handleOpenModalEdit }) => {
  const eliminarSprint = () => {
    console.log("Eliminar: ", sprint);
  };

  const verSprint = () =>{
    console.log("Ver sprint");
  }

  const editarSprint = () => {
    handleOpenModalEdit(sprint);
  };

  return (
    <div className={styles.containerCardListSprints}>
      <div>
        <h3>
          <p>ID: {sprint.id}</p>
          <p>Título: {sprint.nombre}</p>
        </h3>
        <p>
          <b>Fecha de inico: {sprint.fechaInicio!.toString()}</b>
        </p>
        <p>
          <b>Fecha de cierre: {sprint.fechaCierre!.toString()}</b>
        </p>
      </div>
      <div className={styles.actionCards}>
        <button onClick={verSprint}>Ver</button>
        <button onClick={editarSprint}>Editar</button>
        <button onClick={eliminarSprint}>Eliminar</button>
      </div>
    </div>
  );
};

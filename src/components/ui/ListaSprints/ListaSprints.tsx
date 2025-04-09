import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import styles from "./ListaSprints.module.css";
import { getAllSprints } from "../../../http/sprint";
import { CardListSprint } from "../CardlListSprints/CardListSprint";
import { ISprint } from "../../../types/ISprint";
import { ModalSprint } from "../ModalSprints/ModalSprint";

export const ListaSprints = () => {
  const sprint = sprintStore((state) => state.sprints);
  const setArraySprints = sprintStore((state) => state.setArrayDeSprints);
  const setSprintActivo = sprintStore((state) => state.setSprintActivo);

  const getSprint = async () => {
    const data = await getAllSprints();
    if(data) setArraySprints(data);
  }

  useEffect(()=>{
    getSprint();

  },[])


    const [openModalSprint, setOpenModalSprint] = useState(false);

    const handleOpenModalEdit = (sprint: ISprint) => {
        setSprintActivo(sprint);
        setOpenModalSprint(true);
    };

    const handleCloseModal = () => {
      setOpenModalSprint(false);
      setSprintActivo(null);
    }

  return (
    <>
    <div className={styles.containerCardListSprint}>
      <div className={styles.containerTitleAndButton}>
        <h2>Sprints:</h2>
        <button onClick={()=>{setOpenModalSprint(true)}}>Agregar sprint</button>
      </div>
      <div className={styles.containerList}>
        {sprint.length > 0 ? (
          sprint.map((el) => <CardListSprint
          handleOpenModalEdit={handleOpenModalEdit}
           sprint={el}/>)
        ) : (
          <div>
            <h3>No hay sprints</h3>
          </div>
        )}
      </div>
    </div>
    { openModalSprint && <ModalSprint handleCloseModal={handleCloseModal}/> }
    </>
  );
};

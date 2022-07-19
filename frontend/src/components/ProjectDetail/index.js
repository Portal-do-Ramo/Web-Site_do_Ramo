import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlinePicture } from 'react-icons/ai';
import styles from "./Modal.module.scss";


export function ProjectDetail({ project }) {
	if (!project) {
		return (
			<div className={styles.main}>
				<div className={styles.imageHolder}>
        		</div>

				<div className={styles.projectDescription}>
					<p> Nenhum projeto registrado </p>
				</div>
			</div>
		)	
	}

    return (
      <div className={styles.main}>
        <div className={styles.imageHolder}>
			<img src={project.imageURL}/>
        </div>

        <div className={styles.projectDescription}>
          <strong> {project.name} </strong>
          <p>
            {project.description}
          </p>
          <span>Status: <strong>Em Andamento</strong></span>
          <span>Membros</span>
          <div className={styles.members}>
            {
              project.members.split(",").map((member, idx) => {
                return (
                  <div className={styles.memberHolder} key={idx}>{member}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
}
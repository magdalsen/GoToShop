import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import style from './TaskCompleted.module.css';

const TaskCompleted = () => (
        <>
            <div>Udało się! Dziękujemy.</div>
            <div className={style.links}>
                <Link to="/mylists">
                    <Button colorScheme='blue' type="button">Moje listy</Button>
                </Link>
                <Link to="/todo">
                    <Button colorScheme='blue' type="button">Listy do realizacji</Button>
                </Link>
                <Link to="/">
                    <Button type="button">Wróć</Button>
                </Link>
            </div>
        </>
    )

export default TaskCompleted
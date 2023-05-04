import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ListCreated = () => {
    return (
        <>
            <div>Lista została stworzona. Dziękujemy.</div>
            <Link to="/mylists">
                <Button type="button">Moje listy</Button>
            </Link>
            <Link to="/addlist">
                <Button type="button">Wróć</Button>
            </Link>
        </>
    )
}

export default ListCreated
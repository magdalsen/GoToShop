import { Box } from "@chakra-ui/react";

import style from "./List.module.css";

const List = ({ ...values }) => (
        <Box bgImage="url('./list.png')" className={style.oneList}>
            <div>Nazwa listy: {values.listName}</div>
            <div>Szacowany koszt: {values.estimatedCost} zł</div>
            <div>Napiwek: {values.tip}%</div>
            <div>Data dostarczenia: {values.receiveDate}</div>
        </Box>
    )

export default List
import { Button } from "@mui/material";

const CuButton = (props) => {
    return <Button variant={props?.variant}
        className={props?.className}
        color={props?.color}
        onClick={props?.onClick}
        sx={{ fontFamily: 'yekanBakh-bold' }}>
        {props?.children}
    </Button>
};
export default CuButton;
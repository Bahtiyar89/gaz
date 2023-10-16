import {Chip, Menu, MenuItem} from "@mui/material";
import {useRef, useState} from "react";

export function CustomChip(props: {
  variants: string[];
  selected: number;
  state: any;
  //@ts-ignore
  // setSelected: (event:  MouseEvent<HTMLLIElement>) => void;
}) {
  const colors = [
    'success',
    'info',
    'warning',
    'error',
    'default',
    'primary',
    'secondary'
  ]
  const [showMenu, setShowMenu] = useState(false);
  const anchor = useRef(null);
  return <>
    <Chip
      ref={anchor}
      /*@ts-ignore*/
      color={colors[props.selected]}
      label={props.variants[props.selected]}
      onClick={() => setShowMenu(true)}
    />

    <Menu
      anchorEl={anchor.current}
      open={showMenu}
      onClose={() => setShowMenu(false)}
      // anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'left',
      // }}
      // transformOrigin={{
      //   vertical: 'top',
      //   horizontal: 'left',
      // }}
    >
      {props.variants.map((variant, index) =>
        <MenuItem
          key={variant}
          value={index}
          onClick={(e) => {
            //@ts-ignore
            props.state.status = parseInt(e.target.value);
            setShowMenu(false);
          }}
        >
          {variant}
        </MenuItem>
      )}
    </Menu>
  </>
}
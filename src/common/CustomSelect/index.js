import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: (props) => (props.width ? props.width : 120),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectEmpty2: {
    marginTop: theme.spacing(2),
    minHeight: '53.5px !important',
  },
  root: {
    whiteSpace: "normal",
  },
}));

const CustomSelect = ({ value, onChange, dataProvider, placeholder, id, IconComponent, width, isSafariBrowser }) => {
  const classes = useStyles({ width });

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        id={id}
        className={isSafariBrowser ? classes.selectEmpty2 : classes.selectEmpty}
        inputProps={{
          "aria-label": "Without label",
        }}
        IconComponent={IconComponent}
        renderValue={(value) => `${value}`}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {dataProvider.map((data) => (
          <MenuItem
            key={`${data.value} - ${data.label}`}
            classes={{
              root: classes.root,
            }}
            value={data.value}
          >
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

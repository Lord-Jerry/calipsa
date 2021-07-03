import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  FormControl,
  Button,
} from "@material-ui/core";
import "./index.css";

const Filters = ({
  from,
  to,
  outcome,
  setFrom,
  setTo,
  setOutcome,
  submitFilter,
}) => {
  return (
    <form className="filter-container">
      <TextField
        id="datetime-local"
        label="From"
        type="datetime-local"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local"
        label="To"
        type="datetime-local"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl>
        <InputLabel htmlFor="outcome">Outcome</InputLabel>
        <Select
          native
          name="Outcome"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          inputProps={{
            id: "outcome",
          }}
        >
          <option defaultValue value="any">
            Any
          </option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </Select>
      </FormControl>

      <Button
        className="prev-page-button"
        onClick={submitFilter}
        variant="contained"
        color="primary"
        disableElevation
      >
        Filter
      </Button>
    </form>
  );
};

export default Filters;

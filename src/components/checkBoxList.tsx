'use client'
import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";

type Props = {
    labels: string[]
}

type CheckedItemsState = {
    [key: string]: boolean;
};

const checkboxList = ({ labels }: Props) => {
    const [checkedItems, setCheckedItems] = useState<CheckedItemsState>(
        labels.reduce((acc, item) => ({ ...acc, [item]: false }), {})
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleClearAll = () => {
        setCheckedItems(
            labels.reduce((acc, item) => ({ ...acc, [item]: false }), {})
        );
    };

    return (
        <Box>
            <Box sx={{
                maxWidth: 300,
                margin: "0 auto",
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                ml: "6rem",
                paddingTop: "2rem",
                paddingBottom: "4rem"
            }}>
                <FormControl component="fieldset" aria-labelledby="checkbox-list-label">
                    <FormLabel id="checkbox-list-label">Select book genre</FormLabel>
                    <FormGroup>
                        {labels.map((label) => (
                            <FormControlLabel
                                key={label}
                                control={
                                    <Checkbox
                                        checked={checkedItems[label]}
                                        onChange={handleChange}
                                        name={label}
                                        inputProps={{ "aria-label": label }}
                                    />
                                }
                                label={label}
                            />
                        ))}
                    </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClearAll}
                    sx={{ marginTop: 2 }}
                >
                    Clear All
                </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default checkboxList;
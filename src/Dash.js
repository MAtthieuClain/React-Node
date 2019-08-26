import React from 'react';
import { Paper, Typography, makeStyles, Chip, Button, TextField } from '@material-ui/core';
import {CTX} from './Store'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3.2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    chatWindows: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}))
export default function Dash() {

    const classes = useStyles();

    const {allProducts, sendChatAction} = React.useContext(CTX);

    const [textValue, changeTextValue] = React.useState('')
    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                   Produits
                </Typography>
                <div className={classes.flex}>
                    
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={ (e) => changeTextValue(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            console.log("COuCOU", allProducts)
                            sendChatAction({name: 'Produits', type: textValue});
                            changeTextValue('')
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
import React, { Component } from 'react';
import { Modal,  Checkbox, TextField, List, ListItem, ListItemText, Button, styled, Paper, FormControlLabel } from '@material-ui/core';
//import logo from './logo.svg';
import './App.css';
import Dash from './Dash';
import Store from './Store';
const MyModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const MyPaper = styled(Paper)({
    backgroundColor: "white",
    border: '2px solid #000',
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            produits: [],
            name: '',
            type: '',
            price: 0,
            rating: 0,
            warranty_years: 1,
            avaible: true,
            _id: 0,
        };
    };

    getProduits() {
        fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({produits: res.produits})
        })
    }
    deleteProduits(id) {
        fetch("http://localhost:5000/delete/"+ id, {method: 'DELETE'})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({produits: res.produits})
        })
    }
    createProduits() {
        const produits = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                type: this.state.type,
                price: this.state.price,
                rating: this.state.rating,
                warranty_years: this.state.warranty_years,
                avaible: this.state.avaible
            }),
        };
        fetch("http://localhost:5000/new/", produits)
        .then(res => res.json())
        .then(res => {
            this.setState({produits: res.produits});
            this.resetNew();
            this.closeModal()
        })
    }
    modificationProduits(id) {
        const produits = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                type: this.state.type,
                price: this.state.price,
                rating: this.state.rating,
                warranty_years: this.state.warranty_years,
                avaible: this.state.avaible
            }),
        };
        fetch("http://localhost:5000/modification/"+ id, produits)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({produits: res.produits});
            this.resetNew();
            this.closeModal()
        })
    }

    resetNew() {
        this.setState({name: ''});
        this.setState({type: ''});
        this.setState({price: 0});
        this.setState({rating: 0});
        this.setState({warranty_years: 1});
        this.setState({avaible: true});
    }

    checked() {
        if (this.state.avaible === true) {
            this.setState({avaible: false})
        } else {
            this.setState({avaible: true})
        }
    }
    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
        this.resetNew()
    }

    openModal2(data) {
        this.setState({name: data.name});
        this.setState({type: data.type});
        this.setState({price: data.price});
        this.setState({rating: data.rating});
        this.setState({warranty_years: data.warranty_years});
        this.setState({avaible: data.avaible});
        this.setState({
            visible : true
        });
        this.setState({
            _id : data._id
        });
    }

    componentDidMount() {
        this.getProduits()
    }
    render() {
        return (
            <div className="App">
                <MyModal onClose={() => this.closeModal()} open={this.state.visible}>
                    <MyPaper>
                        <TextField
                            id="standard-number"
                            label="Name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Type"
                            value={this.state.type}
                            onChange={e => this.setState({ type: e.target.value})}
                            className="textField"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Price"
                            value={this.state.price}
                            onChange={e => this.setState({ price: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Rating"
                            value={this.state.rating}
                            onChange={e => this.setState({ rating: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Warranty Years"
                            value={this.state.warranty_years}
                            onChange={e => this.setState({ warranty_years: e.target.value})}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <FormControlLabel
                            value="top"
                            control={<Checkbox
                                        checked={this.state.avaible}
                                        onChange={e => this.checked()}
                                        value="checkedB"
                                        color="primary"
                                        label="Top"
                                        labelPlacement="top"
                                        inputProps={{
                                        'aria-label': 'secondary checkbox',
                                        }}
                                    />}
                            label="Avaible"
                            labelPlacement="top"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if (this.state._id === 0) {
                                        this.createProduits()
                                    } else {
                                        this.modificationProduits(this.state._id)
                                    }
                                }}
                            >
                                New
                            </Button>
                    </MyPaper>
                </MyModal>
                <div className='listProducts'>

                    <List>
                            {
                                this.state.produits.map((data, index) => (
                                    <ListItem key={index} button>
                                        <ListItemText primary={data.name} />
                                        <ListItemText primary={data.type} />
                                        <ListItemText primary={`${data.rating}/5`} />
                                        <ListItemText primary={`${data.price}€`} />
                                        <ListItemText primary={`${data.warranty_years} years`} />
                                        <Checkbox
                                            checked={data.avaible}
                                            disabled
                                            color="primary"
                                            inputProps={{
                                            'aria-label': 'secondary checkbox',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                this.openModal2(data)
                                            }}
                                        >
                                            Modification
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                this.deleteProduits(data._id)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </ListItem>
                                ))
                            }
                    </List>
                    <Button
                        variant="contained"
                        onClick={() => {
                            this.openModal()
                        }}
                    >
                       Nouveau
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;

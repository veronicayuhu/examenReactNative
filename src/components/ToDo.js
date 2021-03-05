import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import Request from '../server/Request.js';
import { UPDATE_TODO_DONE} from '../server/EndPoints.js';

class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            done: this.props.done
        }
    }

    cambiarEstado(id){
        var request = new Request('put', UPDATE_TODO_DONE + '/' + id, {}, (response) => {
          if(response.status == 200){
            this.setState({
              done: true
            })
          }
        });
        request.start();
    }

    render(){
        const fecha = new Date(this.props.date).toLocaleDateString();
        return (
            <View style={styles.tarea}>
                <Text style={styles.textoHora}>{this.props.hour}</Text>

                <View>
                    <Text style={this.state.done ? styles.tituloTareaCompletado : styles.tituloTarea}>{this.props.name}</Text>
                    <Text style={styles.textoDescripcion}>{this.props.description}</Text>
                    <Text style={styles.textoFecha}>{fecha}</Text>
                </View>
                <View>
                    <TouchableHighlight style={this.state.done? styles.btnCambiarEstadoDisabled : styles.btnCambiarEstado} 
                                    onPress={() => this.cambiarEstado(this.props.id)} 
                                    disabled={this.state.done}>
                        <Text style={styles.textoBtnCambiarEstado}>Completado</Text>
                    </TouchableHighlight>
                </View>
            
             </View>
        );
    }
}

const styles = StyleSheet.create({
    tarea: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6
    },
    tituloTarea: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2E4053'
    },
    tituloTareaCompletado: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2E4053',
        textDecorationLine: 'line-through'
    },
    textoHora: {
        color: '#B2BABB',
        fontSize: 16
    },
    textoDescripcion: {
        color: '#B2BABB',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textoFecha: {
        color: '#B2BABB',
        fontSize: 14,
    },
    btnCambiarEstado: {
        backgroundColor: 'cornflowerblue',
        padding: 8,
        borderRadius: 6
    },
    btnCambiarEstadoDisabled: {
        backgroundColor: '#7F8C8D',
        padding: 8,
        borderRadius: 6
    },
    textoBtnCambiarEstado: {
        color: 'white'
    }
});

export default ToDo;

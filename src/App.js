import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';

import ToDo from './components/ToDo';

import Request from './server/Request.js';
import { GET_TODO} from './server/EndPoints.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tareas: []
    };
  }

  componentDidMount(){
    var request = new Request('get', GET_TODO, {}, (response) => {
      if(response.status == 200){
        this.setState({
          tareas: response.data
        })
      }
    });
    request.start();
  }

  render(){
    return (
      <View style={styles.contenedor}>

        <Text style={styles.titulo}>To Do</Text>
        
        <View style={styles.contenido}>
          {
            this.state.tareas.length > 0 ? <View></View>
                                         : <Text style={styles.titulo}>No hay tareas</Text>
          }
        
          <FlatList 
            style={styles.listado}
            data = {this.state.tareas}
            renderItem = {({item}) => <ToDo id={item._id}
                                            name={item.name} 
                                            description={item.description}  
                                            date={item.date}
                                            hour={item.hour}
                                            done={item.done}
                                            onClick={() => {}}/>}
            keyExtractor = {(item) => item._id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#E5E8E8',
    flex: 1
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    margin: 16
  },
  contenido: {
    flex: 1,
    marginHorizontal: 16
  },
  listado: {
    flex: 1
  }
});

export default App;

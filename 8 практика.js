import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';

export default function App() {
  const [genres] = useState([
    { id: 1, name: 'Фантастика' },
    { id: 2, name: 'Комедия' },
    { id: 3, name: 'Драма' }
  ]);

  const [movies, setMovies] = useState([
    { id: 1, title: 'Интерстеллар', genreId: 1, year: 2014, description: 'Космическая эпопея' },
    { id: 2, title: 'Клик', genreId: 2, year: 2006, description: 'Комедия с элементами фантастики' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [title, setTitle] = useState('');
  const [genreId, setGenreId] = useState(1);
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  const saveMovie = () => {
    if (!title) return;
    const parsedYear = year ? parseInt(year, 10) : null;

    if (editMovie) {
      setMovies(movies.map(m =>
        m.id === editMovie.id
          ? { ...m, title, genreId, year: parsedYear, description }
          : m
      ));
    } else {
      const newMovie = {
        id: movies.length ? movies[movies.length - 1].id + 1 : 1,
        title,
        genreId,
        year: parsedYear,
        description
      };
      setMovies([...movies, newMovie]);
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setGenreId(1);
    setYear('');
    setDescription('');
    setEditMovie(null);
    setModalVisible(false);
  };

  const edit = (movie) => {
    setEditMovie(movie);
    setTitle(movie.title);
    setGenreId(movie.genreId);
    setYear(movie.year ? movie.year.toString() : '');
    setDescription(movie.description);
    setModalVisible(true);
  };

  const remove = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title} {item.year ? `(${item.year})` : ''}</Text>
      <Text>Жанр: {genres.find(g => g.id === item.genreId)?.name}</Text>
      <Text>{item.description}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => edit(item)}>
          <Text style={styles.btnText}>Редактировать</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => remove(item.id)}>
          <Text style={styles.btnText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centerBlock}>
        <Text style={styles.header}>Мои фильмы 🎬</Text>
        <Button title="Добавить фильм" onPress={() => setModalVisible(true)} />

        <FlatList
          style={{ marginTop: 20, width: '100%' }}
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovie}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalHeader}>
                {editMovie ? 'Редактировать фильм' : 'Добавить фильм'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Название"
                value={title}
                onChangeText={setTitle}
              />

              <Text>Жанр:</Text>
              <View style={styles.genreList}>
                {genres.map(g => (
                  <TouchableOpacity
                    key={g.id}
                    style={[styles.genreBtn, genreId === g.id && styles.genreSelected]}
                    onPress={() => setGenreId(g.id)}
                  >
                    <Text style={styles.genreText}>{g.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Год"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
              />

              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Описание"
                multiline
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.formButtons}>
                <Button title="Сохранить" onPress={saveMovie} />
                <Button title="Отмена" color="red" onPress={resetForm} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',   // центр по вертикали
    alignItems: 'center',       // центр по горизонтали
    padding: 20
  },
  centerBlock: {
    width: '100%',
    alignItems: 'center'
  },
  header:{fontSize:24,fontWeight:'bold',marginBottom:10,textAlign:'center'},
  movieItem:{padding:15,borderWidth:1,borderColor:'#ccc',borderRadius:8,marginBottom:10,width:'100%'},
  movieTitle:{fontSize:18,fontWeight:'bold'},
  buttons:{flexDirection:'row',justifyContent:'space-between',marginTop:10},
  btnEdit:{backgroundColor:'#4caf50',padding:5,borderRadius:5},
  btnDelete:{backgroundColor:'#f44336',padding:5,borderRadius:5},
  btnText:{color:'#fff'},
  modalBackground:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'},
  modalContainer:{width:'90%',backgroundColor:'#fff',padding:20,borderRadius:8},
  modalHeader:{fontSize:22,fontWeight:'bold',marginBottom:15,textAlign:'center'},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10,marginBottom:10},
  genreList:{flexDirection:'row',flexWrap:'wrap',marginBottom:10},
  genreBtn:{padding:10,backgroundColor:'#555',borderRadius:5,marginRight:10,marginBottom:10},
  genreSelected:{backgroundColor:'#2196F3'},
  genreText:{color:'#fff'},
  formButtons:{flexDirection:'row',justifyContent:'space-around',marginTop:10}
});

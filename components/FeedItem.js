import React, { Component } from 'react';//rnc =)))
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPressReadMore = () => {
    const {
      FI: { url }
    } = this.props;
    Linking.openURL(url).catch(err => console.error("Error!"));
  };

  render() {
    const {
      FI: { title, urlToImage, url, author, publishedAt, source }
    } = this.props;
    let _author = author;
    if(author===null)
    {
      _author = 'Unknown';
    }
    let _publishedAt = publishedAt.split("T")
    let _publishDate = _publishedAt[0].split("-") ;
    

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: urlToImage }} style={styles.img} />
        <Text style={styles.text}>Source: {source.name}</Text>
        <Text style={styles.text}>Author: {_author}</Text>
        <Text style={styles.text}>Published At: {_publishDate[2]}/{_publishDate[1]}/{_publishDate[0]}</Text>
        <TouchableOpacity style={styles.button} onPress={this.onPressReadMore}>
          <Text style={styles.buttonText}>Read more</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d9d9d9',
    marginHorizontal: 15,
    justifyContent: 'center',

  },

  text: {
    fontSize: 15,
    color: '#d9d9d9',
    justifyContent: 'flex-start',

  },
  img: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1a75ff',
    borderRadius: 20,
    height: 40,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  }

})
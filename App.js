import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './components/FeedItem';

export default class App extends Component {
  state = {
    isLoading: false,
    PAGE: 1,
    totalResults:0,
    listArtiles: [],
    isLoadMore:true,
  };
  componentDidMount = async () => {
    this.setState({
      isLoading: true,
      totalResults: 0,

     })
     this.callApi();
    // const { PAGE, listArtiles } = this.state;
    // const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=339bc5de439b41eda428e9c54c2fb5fb&page=${PAGE}`;
    // const response = await fetch(API_URL);
    // const jsonResponse = await response.json();

    // console.log(jsonResponse.articles);
    // this.setState({
    //   isLoading: false,
    //   listArtiles: listArtiles.concat(jsonResponse.articles),
    //   //listArtiles: [listArtiles, ...jsonResponse.articles],
    //   totalResults: response.totalResults,
    // })
  };
  callApi = async () => {
    
    const { PAGE, listArtiles } = this.state;
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=339bc5de439b41eda428e9c54c2fb5fb&page=${PAGE}`;
    const response = await fetch(API_URL);
    const jsonResponse = await response.json();

    console.log(jsonResponse.articles);
    this.setState({
      isLoading: false,
      listArtiles: listArtiles.concat(jsonResponse.articles),
      totalResults: response.totalResults,
    })
  }
  onEndReached = async () => {
    const {PAGE} = this.state;
    if(PAGE===1)
    {
    await this.setState({
      PAGE: PAGE + 1,
    })
    console.log(PAGE);
    await this.callApi();
  }
  };
  renderFooter = () => {
    const {isLoadMore, PAGE} = this.state;
    if(PAGE===2)
    {
      return (
      <View style={styles.container}>
      <Text style={styles.waitingText}>No more news...</Text>
    </View>
      )
    }
    return (
      <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="aqua"
        animating={isLoadMore} />
      <Text style={styles.waitingText}>Your news are coming soon...</Text>
    </View>
    )
  }
  onRefresh = async () => {
    await this.setState({
      listArtiles:[],
      isLoading:true,
      PAGE:1,
    })
    this.callApi();
  }
  render() {
    const { isLoading, listArtiles } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="aqua"
            animating={isLoading} />
          <Text style={styles.waitingText}>Your news are coming soon...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={listArtiles}
          style={styles.flatlist}
          renderItem={({ item }) => {
            return (
              //<Text>aaaaaa</Text>
              <FeedItem FI={item} />
            )
          }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.onRefresh}
          refreshing={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {

    marginTop:20,
  },
  waitingText: {
    color: 'aqua',
    justifyContent: 'center',
    fontSize: 20,
  }
});

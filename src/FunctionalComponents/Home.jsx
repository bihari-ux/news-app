import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
    };
  }

  async getAPIData() {
    this.setState({ page: 1 });

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${
          this.props.search ? this.props.search : this.props.q
        }&language=${
          this.props.language
        }&pageSize=24&page=1&sortBy=publishedAt&apiKey=807d700957354e9794ec9a60f0d7d8bc`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        this.setState({
          articles: data.articles.filter((x) => x.title !== "[Removed]"),
          totalResults: data.totalResults,
        });
      } else {
        console.error("API returned error:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData = async () => {
    const nextPage = this.state.page + 1;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${
          this.props.search ? this.props.search : this.props.q
        }&language=${
          this.props.language
        }&pageSize=24&page=${nextPage}&sortBy=publishedAt&apiKey=807d700957354e9794ec9a60f0d7d8bc`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (data?.status === "ok") {
        this.setState((prevState) => ({
          articles: [
            ...prevState.articles,
            ...data.articles.filter((x) => x.title !== "[Removed]"),
          ],
          page: nextPage,
        }));
      } else {
        console.error("API returned error:", data);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  componentDidMount() {
    this.getAPIData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.search !== prevProps.search ||
      this.props.q !== prevProps.q ||
      this.props.language !== prevProps.language
    ) {
      this.getAPIData();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h5 className="background text-light text-center p-2 mt-2 text-capitalize">
          {this.props.search ? this.props.search : this.props.q} Articles
        </h5>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="row">
            {this.state.articles.map((item, index) => (
              <NewsItem
                key={index}
                source={item.source.name ?? "N/A"}
                title={item.title}
                description={item.description}
                url={item.url}
                pic={item.urlToImage ?? "/images/noimage.png"}
                date={item.publishedAt}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

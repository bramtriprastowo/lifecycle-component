import React from "react";

const url1 = 'https://newsapi.org/v2/top-headlines?country=us';

export class Fetch extends React.Component{

    state = {  
        dataNews: [],
        search: ''
    }

    //Fungsi untuk menggunakan Fetch API
    fetchNews = (url) => {
        fetch(url, {
            headers: {
                'X-Api-Key': 'dfb0aebf0cb64552b1a1da8efe1d6002'
            }
            })
            .then((response) => response.json())
            .then((data) => this.setState({dataNews: data['articles']}));
    }

    render() {
        const {dataNews} = this.state;
        return(
            <>
                {/* Kolom Pencarian */}
                <div className='container my-4 py-3 sticky-top' style={{ backgroundColor: '#E9FFEE' }}>
                    <div className='row'>
                        <div className='input-group'>
                            <input type='text' className='form-control' name='search' placeholder='Search news' onChange={e => this.setState({search: e.target.value})}/>
                            <button type='button' className='btn btn-success' disabled>Search</button>
                        </div>
                    </div>
                </div>

                {/* Tampilan berita dalam bentuk kumpulan card */}
                <div className="container mt-5">
                    <div className="row gx-4 gy-5">

                        {dataNews.map((item, i) => {
                            return <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card border-success mx-auto">
                                <img src={item['urlToImage']} alt={item['title']} className="card-img-top"/>
                                <div className="card-body">
                                    <h5>{item['title']}</h5>
                                    <p className="fs-6">{new Date(item['publishedAt']).toLocaleDateString()} - {new Date(item['publishedAt']).toLocaleTimeString()}</p>
                                    <p className="card-text">{item['description']}</p>
                                    <a href={item['url']} className="btn btn-success">Read More</a>
                                </div>
                            </div>
                        </div>
                        })}
                        
                    </div>
                </div>
            </>
        )
    }

    //Melakukan fetch berita menggunakan componentDidMount
    componentDidMount(){
        this.fetchNews(url1);   
        console.log('componentDidMount');
    }

    // Menambahkan fitur live search dengan componentDidUpdate
    componentDidUpdate(prevProp, prevState){
        const url2 = `https://newsapi.org/v2/everything?q=${this.state.search}&searchIn=title`;
        const {search} = this.state;

        if(prevState.search !== search) {
            if(search.length > 0) {
                this.fetchNews(url2);
            } else if(search.length === 0) {
                this.fetchNews(url1);
            }           
        }
    }

}

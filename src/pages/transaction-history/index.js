import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { timeStamp2Date } from '../../services/utils.service';
import ApiService from '../../services/api.service';
import { connect } from 'react-redux'
import queryString from 'query-string'
import Pagination from '../../components/pagination'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            data : [],
            pages: 0,
            page: 1,
            page_numbers: 0,
            isFirst: false,
            isLast: false
        }
    }
    
    UNSAFE_componentWillReceiveProps(props){
        var isFirstPage = false
        var isLastPage = false
        var temp = +queryString.parse(this.props.location.search).page
        if (!temp)
            temp = 1;
        const { profile } = props
        this.apiService.getTransactionsOfUser(profile.public_key, temp, 10).then((res) => {
            var numbers = [];
            if (res.total_page > 2) {
                if (temp === 1)
                    for (var i = 1; i <= 3; i++)
                        numbers.push({
                            value: i,
                            isCurPage: i === temp,
                        });
                else if (temp === res.total_page)
                    for (var j = res.total_page - 2; j <= res.total_page; j++)
                        numbers.push({
                            value: j,
                            isCurPage: j === temp
                        });
                else {
                    numbers.push({
                        value: temp - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: temp,
                        isCurPage: true
                    });
                    numbers.push({
                        value: temp + 1,
                        isCurPage: false
                    });
                }
            } else if (res.total_page < 2) {
                isFirstPage = true;
                isLastPage = true;
                numbers.push({
                    value: temp,
                    isCurPage: true
                });
            } else {
                if (temp === 1) {
                    isFirstPage = true;
                    isLastPage = false;
                    numbers.push({
                        value: temp,
                        isCurPage: true
                    });
                    numbers.push({
                        value: temp + 1,
                        isCurPage: false
                    });
                } else {
                    isFirstPage = false;
                    isLastPage = true;
                    numbers.push({
                        value: temp - 1,
                        isCurPage: false
                    });
                    numbers.push({
                        value: temp,
                        isCurPage: true
                    });
                }
            }

            for (var z = 0; z < numbers.length; z++) {
                if (numbers[z].isCurPage === true && z === 0) {
                    isFirstPage = true;
                    break;
                }
                else if (numbers[z].isCurPage === true && z === (numbers.length - 1)) {
                    isLastPage = true;
                }
            }

            this.setState({
                data: res.transactions,
                pages: res.total_page,
                page_numbers: numbers,
                isFirst: isFirstPage,
                isLast: isLastPage
            })
      })
    }

    render() {
        const { data, pages, page_numbers, isFirst, isLast } = this.state;
        return (
            <Layout>
                <div className={styles.transactionHistory}>
                    <ReactTable
                        PaginationComponent={Pagination}
                        data={data}
                        columns={[
                            {
                                Header: "User",
                                columns: [
                                    {
                                        Header: "Public Key",
                                        accessor: "public_key"
                                    }
                                ]
                            },
                            {
                                Header: "Transaction History",
                                columns: [
                                    {
                                        Header: "Public Key Received",
                                        accessor: "public_key_received"
                                    },
                                    {
                                        Header: "Operation",
                                        accessor: "operation",
                                    },
                                    {
                                        Header: "Amount",
                                        accessor: "amount",
                                    },
                                    {
                                        Header: "Memo",
                                        accessor: "memo",
                                    },
                                    {
                                        Header: "Created At",
                                        id: "created_at",   
                                        accessor: d => timeStamp2Date(d.created_at),
                                    }
                                ]
                            }
                        ]}
                        showPageSizeOptions={false}
                        defaultPageSize={10}
                        style={{
                            height: "400px"
                        }}
                        className="-striped -highlight"
                    />
                    {data.length > 0 &&
                        <nav className="Bot" aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                {isFirst
                                    ?
                                    <li className="page-item disabled"><span className="page-link">First</span></li>
                                    :
                                    <li className="page-item"><Link to="?page=1" className="page-link">First</Link></li>
                                }
                                {!!page_numbers.length && page_numbers.map((item, key) => {
                                    if (item.isCurPage) {
                                        return <li key={key} className="active page-item"><Link to={'?page=' + item.value} className="page-link">{item.value}</Link></li>
                                    }
                                    return <li key={key} className="page-item"><Link to={'?page=' + item.value} className="page-link">{item.value}</Link></li>
                                })
                                }
                                {isLast
                                    ?
                                    <li className="page-item disabled"><span className="page-link">Last</span></li>
                                    :
                                    <li className="page-item"><Link to={'?page=' + pages} className="page-link">Last</Link></li>
                                }
                            </ul>
                        </nav>
                    }
                </div>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(TransactionHistory);

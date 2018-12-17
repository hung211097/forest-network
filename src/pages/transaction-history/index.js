import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { timeStamp2Date } from '../../services/utils.service';
import ApiService from '../../services/api.service';
import { connect } from 'react-redux'

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
            data: [{
                publicKey: "GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7",
                publicKeyReceived: "GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI",
                operation: "payment",
                amount: 100000000000,
                note: "Mua quà",
                createAt: timeStamp2Date("2018-12-11 15:01:27.965+07")
            },
            {
                publicKey: "Huỳnh",
                publicKeyReceived: "Hưng",
                operation: "payment",
                amount: 20,
                note: "Mua quà",
                createAt: timeStamp2Date("2018-12-11 15:01:27.965+07")
            }]
        };
    }

    componentDidMount(){

    }

    UNSAFE_componentWillReceiveProps(props){
      this.apiService.getTransactionsOfUser(1, 2).then((data) => {
        console.log(data);
      })
    }
    render() {
        const { data } = this.state
        // console.log(data)
        return (
            <Layout>
                <div className={styles.transactionHistory}>
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "User",
                                columns: [
                                    {
                                        Header: "Public Key",
                                        accessor: "publicKey"
                                    }
                                ]
                            },
                            {
                                Header: "Transaction History",
                                columns: [
                                    {
                                        Header: "Public Key Received",
                                        accessor: "publicKeyReceived"
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
                                        Header: "Note",
                                        accessor: "note",
                                    },
                                    {
                                        Header: "Create At",
                                        accessor: "createAt",
                                    }
                                ]
                            }
                        ]}
                        defaultPageSize={10}
                        style={{
                            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                        className="-striped -highlight"
                    />
                </div>
            </Layout>
        );
    }
}

export default connect(mapStateToProps)(TransactionHistory);
